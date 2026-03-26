// @bun
var __require = import.meta.require;

// src/js/eval/feedback.ts
import { spawnSync } from "child_process";
import { closeSync, promises as fsp, openSync } from "fs";
import os from "os";
import path from "path";
import readline from "readline";
import tty from "tty";
import { parseArgs as nodeParseArgs } from "util";
var supportsAnsi = Boolean(process.stdout.isTTY && !("NO_COLOR" in process.env));
var reset = supportsAnsi ? "\x1B[0m" : "";
var bold = supportsAnsi ? "\x1B[1m" : "";
var dim = supportsAnsi ? "\x1B[2m" : "";
var red = supportsAnsi ? "\x1B[31m" : "";
var green = supportsAnsi ? "\x1B[32m" : "";
var cyan = supportsAnsi ? "\x1B[36m" : "";
var gray = supportsAnsi ? "\x1B[90m" : "";
var symbols = {
  question: `${cyan}?${reset}`,
  check: `${green}\u2714${reset}`,
  cross: `${red}\u2716${reset}`
};
var inputPrefix = `${gray}> ${reset}`;
var thankYouBanner = `
${supportsAnsi ? bold : ""}THANK YOU! ${reset}`;
function openTerminal() {
  if (process.stdin.isTTY && process.stdout.isTTY) {
    return {
      input: process.stdin,
      output: process.stdout,
      cleanup: () => {}
    };
  }
  const candidates = ["/dev/tty"];
  for (const candidate of candidates) {
    try {
      const fd = openSync(candidate, "r+");
      const input = new tty.ReadStream(fd);
      const output = new tty.WriteStream(fd);
      input.setEncoding("utf8");
      return {
        input,
        output,
        cleanup: () => {
          input.destroy();
          output.destroy();
          try {
            closeSync(fd);
          } catch {}
        }
      };
    } catch {}
  }
  return null;
}
var logError = (message) => {
  process.stderr.write(`${symbols.cross} ${message}
`);
};
var isValidEmail = (value) => {
  if (!value)
    return false;
  const trimmed = value.trim();
  if (!trimmed.includes("@"))
    return false;
  if (!trimmed.includes("."))
    return false;
  return true;
};
function parseCliArgs(argv) {
  try {
    const { values, positionals } = nodeParseArgs({
      args: argv,
      allowPositionals: true,
      strict: false,
      options: {
        email: {
          type: "string",
          short: "e"
        },
        help: {
          type: "boolean",
          short: "h"
        }
      }
    });
    return {
      email: values.email,
      help: Boolean(values.help),
      positionals
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    logError(message);
    process.exit(1);
    return { email: undefined, help: false, positionals: [] };
  }
}
function printHelp() {
  const heading = `${bold}${cyan}bun feedback${reset}`;
  const usage = `${bold}Usage${reset}
  bun feedback [options] [feedback text ... | files ...]`;
  const options = `${bold}Options${reset}
  ${cyan}-e${reset}, ${cyan}--email${reset} <email>   Set the email address used for this submission
  ${cyan}-h${reset}, ${cyan}--help${reset}            Show this help message and exit`;
  const examples = `${bold}Examples${reset}
  bun feedback "Love the new release!"
  bun feedback report.txt details.log
  echo "please document X" | bun feedback --email you@example.com`;
  console.log([heading, "", usage, "", options, "", examples].join(`
`));
}
async function readEmailFromBunInstall() {
  const installRoot = process.env.BUN_INSTALL ?? path.join(os.homedir(), ".bun");
  const emailFile = path.join(installRoot, "feedback");
  try {
    const data = await fsp.readFile(emailFile, "utf8");
    const trimmed = data.trim();
    return trimmed.length > 0 ? trimmed : undefined;
  } catch (error) {
    if (error.code !== "ENOENT") {
      console.warn(`Unable to read ${emailFile}:`, error.message);
    }
    return;
  }
}
async function persistEmailToBunInstall(email) {
  const installRoot = process.env.BUN_INSTALL;
  if (!installRoot)
    return;
  const emailFile = path.join(installRoot, "feedback");
  try {
    await fsp.mkdir(path.dirname(emailFile), { recursive: true });
    await fsp.writeFile(emailFile, `${email.trim()}
`, "utf8");
  } catch (error) {
    console.warn(`Unable to persist email to ${emailFile}:`, error.message);
  }
}
function readEmailFromGitConfig() {
  const result = spawnSync("git", ["config", "user.email"], {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "ignore"]
  });
  if (result.status !== 0) {
    return;
  }
  const output = result.stdout.trim();
  return output.length > 0 ? output : undefined;
}
async function promptForEmail(terminal, defaultEmail) {
  if (!terminal) {
    return defaultEmail && isValidEmail(defaultEmail) ? defaultEmail : undefined;
  }
  let currentDefault = defaultEmail;
  for (;; ) {
    const answer = await promptForEmailInteractive(terminal, currentDefault);
    if (typeof answer === "string" && isValidEmail(answer)) {
      return answer.trim();
    }
    terminal.output.write(`${symbols.cross} Please provide a valid email address containing "@" and ".".
`);
    currentDefault = undefined;
  }
}
async function promptForEmailInteractive(terminal, defaultEmail) {
  const input = terminal.input;
  const output = terminal.output;
  readline.emitKeypressEvents(input);
  const hadRawMode = typeof input.isRaw === "boolean" ? input.isRaw : undefined;
  if (typeof input.setRawMode === "function") {
    input.setRawMode(true);
  }
  if (typeof input.resume === "function") {
    input.resume();
  }
  const placeholder = defaultEmail ?? "";
  let placeholderActive = placeholder.length > 0;
  let value = "";
  let resolved = false;
  const render = () => {
    output.write(`\r\x1B[2K${symbols.question} ${bold}Email${reset}: `);
    if (placeholderActive && placeholder.length > 0) {
      output.write(`${dim}<${placeholder}>${reset}`);
      output.write(`\x1B[${placeholder.length + 2}D`);
    } else {
      output.write(value);
    }
  };
  render();
  return await new Promise((resolve) => {
    const cleanup = (result) => {
      if (resolved)
        return;
      resolved = true;
      input.removeListener("keypress", onKeypress);
      if (typeof input.setRawMode === "function") {
        if (typeof hadRawMode === "boolean") {
          input.setRawMode(hadRawMode);
        } else {
          input.setRawMode(false);
        }
      }
      if (typeof input.pause === "function") {
        input.pause();
      }
      output.write(`
`);
      resolve(result);
    };
    const onKeypress = (str, key) => {
      if (!key && str) {
        if (placeholderActive) {
          placeholderActive = false;
          value = "";
          render();
        }
        value += str;
        output.write(str);
        return;
      }
      if (key && (key.sequence === "\x03" || key.ctrl && key.name === "c")) {
        cleanup();
        process.exit(130);
        return;
      }
      if (key?.name === "return") {
        if (placeholderActive && placeholder.length > 0) {
          cleanup(placeholder);
          return;
        }
        const trimmed = value.trim();
        cleanup(trimmed.length > 0 ? trimmed : undefined);
        return;
      }
      if (key?.name === "backspace") {
        if (placeholderActive) {
          return;
        }
        if (value.length > 0) {
          value = value.slice(0, -1);
          render();
        }
        return;
      }
      if (!str) {
        return;
      }
      if (key && key.name && key.name.length > 1 && key.name !== "space") {
        return;
      }
      if (placeholderActive) {
        placeholderActive = false;
        value = "";
        render();
      }
      value += str;
      output.write(str);
    };
    input.on("keypress", onKeypress);
  });
}
async function promptForBody(terminal, attachments) {
  if (!terminal) {
    return;
  }
  const input = terminal.input;
  const output = terminal.output;
  readline.emitKeypressEvents(input);
  const hadRawMode = typeof input.isRaw === "boolean" ? input.isRaw : undefined;
  if (typeof input.setRawMode === "function") {
    input.setRawMode(true);
  }
  if (typeof input.resume === "function") {
    input.resume();
  }
  const header = `${symbols.question} ${bold}Share your feedback with Bun's team${reset} ${dim}(Enter to send, Shift+Enter for a newline)${reset}`;
  output.write(`${header}
`);
  if (attachments.length > 0) {
    output.write(`${dim}+ ${attachments.map((file) => file.filename).join(", ")}${reset}
`);
  }
  output.write(`${inputPrefix}`);
  const lines = [""];
  let currentLine = 0;
  let resolved = false;
  return await new Promise((resolve) => {
    const cleanup = (value) => {
      if (resolved)
        return;
      resolved = true;
      input.removeListener("keypress", onKeypress);
      if (typeof input.setRawMode === "function") {
        if (typeof hadRawMode === "boolean") {
          input.setRawMode(hadRawMode);
        } else {
          input.setRawMode(false);
        }
      }
      if (typeof input.pause === "function") {
        input.pause();
      }
      output.write(`
`);
      resolve(value);
    };
    const onKeypress = (str, key) => {
      if (!key) {
        if (str) {
          lines[currentLine] += str;
          output.write(str);
        }
        return;
      }
      if (key.sequence === "\x03" || key.ctrl && key.name === "c") {
        cleanup();
        process.exit(130);
        return;
      }
      if (key.name === "return") {
        if (key.shift) {
          lines.push("");
          currentLine += 1;
          output.write(`
${inputPrefix}`);
          return;
        }
        const message = lines.join(`
`);
        cleanup(message);
        return;
      }
      if (key.name === "backspace") {
        const current = lines[currentLine];
        if (current.length > 0) {
          lines[currentLine] = current.slice(0, -1);
          output.write("\b \b");
        } else if (currentLine > 0) {
          lines.pop();
          currentLine -= 1;
          output.write("\r\x1B[2K");
          output.write("\x1B[F");
          output.write("\r\x1B[2K");
          output.write(`${inputPrefix}${lines[currentLine]}`);
        }
        return;
      }
      if (key.name && key.name.length > 1 && key.name !== "space") {
        return;
      }
      if (str) {
        lines[currentLine] += str;
        output.write(str);
      }
    };
    input.on("keypress", onKeypress);
  });
}
async function readFromStdin() {
  const stdin = process.stdin;
  if (!stdin || stdin.isTTY)
    return;
  if (typeof stdin.setEncoding === "function") {
    stdin.setEncoding("utf8");
  }
  if (typeof stdin.resume === "function") {
    stdin.resume();
  }
  const chunks = [];
  for await (const chunk of stdin) {
    chunks.push(typeof chunk === "string" ? chunk : chunk.toString("utf8"));
  }
  const content = chunks.join("");
  return content.length > 0 ? content : undefined;
}
async function resolveFileCandidate(token) {
  const candidates = new Set;
  candidates.add(token);
  if (token.startsWith("~/")) {
    candidates.add(path.join(os.homedir(), token.slice(2)));
  }
  const resolved = path.join(process.cwd(), token);
  candidates.add(resolved);
  for (const candidate of candidates) {
    try {
      const stat = await fsp.stat(candidate);
      if (stat.isFile()) {
        return candidate;
      }
    } catch (error) {
      const code = error.code;
      if (code && (code === "ENOENT" || code === "ENOTDIR")) {
        continue;
      }
      console.warn(`Unable to inspect ${candidate}:`, error.message);
    }
  }
  return;
}
async function readFromPositionals(positionals) {
  const messageParts = [];
  const files = [];
  let literalTokens = [];
  const flushTokens = () => {
    if (literalTokens.length > 0) {
      messageParts.push(literalTokens.join(" "));
      literalTokens = [];
    }
  };
  for (const token of positionals) {
    const filePath = await resolveFileCandidate(token);
    if (filePath) {
      try {
        let fileContents = await Bun.file(filePath).bytes();
        if (fileContents.length > 1024 * 1024 * 10) {
          fileContents = fileContents.slice(0, 1024 * 1024 * 10);
        }
        flushTokens();
        files.push({
          filename: path.normalize(path.relative(process.cwd(), filePath)),
          content: fileContents
        });
        continue;
      } catch {}
    }
    literalTokens.push(token);
  }
  flushTokens();
  return { messageParts, files };
}
function getIPSupport(networkInterface, original) {
  if (networkInterface.family === "IPv4") {
    switch (original) {
      case "none" /* none */:
        return "ipv4" /* ipv4 */;
      case "ipv4" /* ipv4 */:
        return "ipv4_and_ipv6" /* ipv4_and_ipv6 */;
      case "ipv6" /* ipv6 */:
        return "ipv4_and_ipv6" /* ipv4_and_ipv6 */;
      case "ipv4_and_ipv6" /* ipv4_and_ipv6 */:
        return "ipv4_and_ipv6" /* ipv4_and_ipv6 */;
    }
  } else if (networkInterface.family === "IPv6") {
    switch (original) {
      case "none" /* none */:
        return "ipv6" /* ipv6 */;
      case "ipv4" /* ipv4 */:
        return "ipv4_and_ipv6" /* ipv4_and_ipv6 */;
      case "ipv6" /* ipv6 */:
        return "ipv4_and_ipv6" /* ipv4_and_ipv6 */;
      case "ipv4_and_ipv6" /* ipv4_and_ipv6 */:
        return "ipv4_and_ipv6" /* ipv4_and_ipv6 */;
    }
  }
  return original;
}
function getOldestGitSha() {
  const result = spawnSync("git", ["rev-list", "--max-parents=0", "HEAD"], {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "ignore"]
  });
  if (result.status !== 0) {
    return;
  }
  const firstLine = result.stdout.split(/\r?\n/).find((line) => line.trim().length > 0);
  return firstLine?.trim();
}
async function main() {
  const rawArgv = process.argv.slice(1);
  let terminal = null;
  try {
    const { email: emailFlag, help, positionals } = parseCliArgs(rawArgv);
    if (help) {
      printHelp();
      return;
    }
    terminal = openTerminal();
    const exit = (code) => {
      terminal?.cleanup();
      process.exit(code);
    };
    if (emailFlag && !isValidEmail(emailFlag)) {
      logError("The provided email must include both '@' and '.'.");
      exit(1);
    }
    const storedEmailRaw = await readEmailFromBunInstall();
    const storedEmail = isValidEmail(storedEmailRaw) ? storedEmailRaw.trim() : undefined;
    const gitEmailRaw = readEmailFromGitConfig();
    const gitEmail = isValidEmail(gitEmailRaw) ? gitEmailRaw.trim() : undefined;
    const canPrompt = terminal !== null;
    let email = emailFlag?.trim() ?? storedEmail ?? gitEmail;
    if (canPrompt && !emailFlag && !storedEmail) {
      email = await promptForEmail(terminal, email ?? gitEmail ?? undefined);
    }
    if (!isValidEmail(email)) {
      if (!canPrompt) {
        logError("Unable to determine email automatically. Pass --email <address>.");
      } else {
        logError("An email address is required. Pass --email or configure git user.email.");
      }
      exit(1);
      return;
    }
    const normalizedEmail = email.trim();
    if (process.env.BUN_INSTALL && !storedEmail) {
      await persistEmailToBunInstall(normalizedEmail);
    }
    const stdinContent = await readFromStdin();
    const positionalContent = await readFromPositionals(positionals);
    const positionalParts = positionalContent.messageParts;
    const pieces = [];
    if (stdinContent && stdinContent.trim().length > 0)
      pieces.push(stdinContent);
    for (const part of positionalParts) {
      if (part.trim().length > 0) {
        pieces.push(part);
      }
    }
    let message = pieces.length > 0 ? pieces.join(pieces.length > 1 ? `

` : "") : "";
    if (message.trim().length === 0 && terminal) {
      const interactiveBody = await promptForBody(terminal, positionalContent.files);
      if (interactiveBody && interactiveBody.trim().length > 0) {
        message = interactiveBody;
      }
    }
    const normalizedMessage = message.trim();
    if (normalizedMessage.length === 0) {
      logError("No feedback provided. Supply text, file paths, or pipe input.");
      exit(1);
      return;
    }
    const messageBody = normalizedMessage;
    const projectId = getOldestGitSha();
    const endpoint = process.env.BUN_FEEDBACK_URL || "https://bun.report/v1/feedback";
    const form = new FormData;
    form.append("email", normalizedEmail);
    form.append("message", messageBody);
    for (const file of positionalContent.files) {
      form.append("files[]", new Blob([file.content]), file.filename);
    }
    const id = Bun.randomUUIDv7();
    form.append("platform", "linux");
    form.append("arch", "x64");
    form.append("bunRevision", Bun.revision);
    form.append("hardwareConcurrency", String(navigator.hardwareConcurrency));
    form.append("bunVersion", Bun.version);
    form.append("bunBuild", path.basename(process.release.sourceUrl, path.extname(process.release.sourceUrl)));
    form.append("availableMemory", String(process.availableMemory()));
    form.append("totalMemory", String(os.totalmem()));
    form.append("osVersion", String(os.version()));
    form.append("osRelease", String(os.release()));
    form.append("id", id);
    let inDocker = false;
    if (true) {
      if (__require("fs").existsSync("/.dockerenv")) {
        inDocker = true;
      }
    }
    if (inDocker) {
      form.append("docker", "true");
    }
    let remoteIP = "none" /* none */;
    let localIP = "none" /* none */;
    try {
      const networkInterfaces = Object.entries(os.networkInterfaces() || {});
      for (const [_name, interfaces] of networkInterfaces) {
        for (const networkInterface of interfaces || []) {
          if (networkInterface.family === "IPv4") {
            if (networkInterface.internal) {
              localIP = getIPSupport(networkInterface, localIP);
            } else {
              remoteIP = getIPSupport(networkInterface, remoteIP);
            }
          } else if (networkInterface.family === "IPv6") {
            if (networkInterface.internal) {
              localIP = getIPSupport(networkInterface, localIP);
            } else {
              remoteIP = getIPSupport(networkInterface, remoteIP);
            }
          }
        }
      }
    } catch {}
    form.append("localIPSupport", localIP);
    form.append("remoteIPSupport", remoteIP);
    if (true) {
      let isRemoteFilesystem = false;
      try {
        const cwd = process.cwd();
        const stats = await fsp.statfs(cwd);
        const remoteFsTypes = new Set([
          26985,
          4283649346,
          1702057286
        ]);
        if (remoteFsTypes.has(stats.type)) {
          isRemoteFilesystem = true;
        }
      } catch {}
      if (isRemoteFilesystem) {
        form.append("remoteFilesystem", "true");
      }
    }
    if (projectId) {
      form.append("projectId", projectId);
    }
    const response = await fetch(endpoint, {
      method: "POST",
      body: form
    });
    if (!response.ok || response.status !== 200) {
      const bodyText = await response.text().catch(() => "");
      logError(`Failed to send feedback (${response.status} ${response.statusText}).`);
      if (bodyText) {
        process.stderr.write(`${bodyText}
`);
      }
      exit(1);
    }
    let IDBanner = ``;
    if (supportsAnsi) {
      IDBanner = `
${dim}ID: ${id}${reset}`;
    } else {
      IDBanner = `
ID: ${id}`;
    }
    process.stdout.write(`${symbols.check} Feedback sent.
${IDBanner}${thankYouBanner}
`);
  } finally {
    terminal?.cleanup();
  }
}
await main().catch((error) => {
  const detail = error instanceof Error ? error.message : String(error);
  logError(`Unexpected error while sending feedback: ${detail}`);
  process.exit(1);
});
