// @bun
// build/debug/tmp_modules/internal/html.ts
var $;
var initial = performance.now();
var argv = process.argv;
var path = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 107) || __intrinsic__createInternalModuleById(107);
var env = Bun.env;
async function start() {
  let args = [];
  const cwd = process.cwd();
  let hostname = "localhost";
  let port = __intrinsic__undefined;
  let enableConsoleLog = false;
  for (let i = 1, argvLength = argv.length;i < argvLength; i++) {
    const arg = argv[i];
    if (!arg.endsWith(".html")) {
      if (arg.startsWith("--hostname=")) {
        hostname = arg.slice("--hostname=".length);
        if (hostname.includes(":")) {
          const [host, portString] = hostname.split(":");
          hostname = host;
          port = parseInt(portString, 10);
        }
      } else if (arg.startsWith("--port=")) {
        port = parseInt(arg.slice("--port=".length), 10);
      } else if (arg.startsWith("--host=")) {
        hostname = arg.slice("--host=".length);
        if (hostname.includes(":")) {
          const [host, portString] = hostname.split(":");
          hostname = host;
          port = parseInt(portString, 10);
        }
      } else if (arg === "--console") {
        enableConsoleLog = true;
      } else if (arg === "--no-console") {
        enableConsoleLog = false;
      }
      if (arg === "--help") {
        console.log(`
Bun v${Bun.version} (html)

Usage:
  bun [...html-files] [options]

Options:

  --port=<NUM>
  --host=<STR>, --hostname=<STR>
  --console # print console logs from browser
  --no-console # don't print console logs from browser
Examples:

  bun index.html
  bun ./index.html ./about.html --port=3000
  bun index.html --host=localhost:3000
  bun index.html --hostname=localhost:3000
  bun ./*.html
  bun index.html --console

This is a small wrapper around Bun.serve() that automatically serves the HTML files you pass in without
having to manually call Bun.serve() or write the boilerplate yourself. This runs Bun's bundler on
the HTML files, their JavaScript, and CSS, and serves them up. This doesn't do anything you can't do
yourself with Bun.serve().
`);
        process.exit(0);
      }
      continue;
    }
    if (arg.includes("*") || arg.includes("**") || arg.includes("{")) {
      const glob = new Bun.Glob(arg);
      for (const file of glob.scanSync(cwd)) {
        let resolved = path.resolve(cwd, file);
        if (resolved.includes(path.sep + "node_modules" + path.sep)) {
          continue;
        }
        try {
          resolved = Bun.resolveSync(resolved, cwd);
        } catch {
          resolved = Bun.resolveSync("./" + resolved, cwd);
        }
        if (resolved.includes(path.sep + "node_modules" + path.sep)) {
          continue;
        }
        args.push(resolved);
      }
    } else {
      let resolved = arg;
      try {
        resolved = Bun.resolveSync(arg, cwd);
      } catch {
        resolved = Bun.resolveSync("./" + arg, cwd);
      }
      if (resolved.includes(path.sep + "node_modules" + path.sep)) {
        continue;
      }
      args.push(resolved);
    }
    if (args.length > 1) {
      args = [...new Set(args)];
    }
  }
  if (args.length === 0) {
    throw new Error("No HTML files found matching " + JSON.stringify(Bun.main));
  }
  args.sort((a, b) => {
    return a.localeCompare(b);
  });
  let needsPop = false;
  if (args.length === 1) {
    args.push(process.cwd());
    needsPop = true;
  }
  let longestCommonPath = args.reduce((acc, curr) => {
    if (!acc)
      return curr;
    let i = 0;
    while (i < acc.length && i < curr.length && acc[i] === curr[i])
      i++;
    return acc.slice(0, i);
  });
  if (path.platform === "win32") {
    longestCommonPath = longestCommonPath.replaceAll("\\", "/");
  }
  if (needsPop) {
    args.pop();
  }
  const servePaths = args.map((arg) => {
    if (false) {}
    const basename = path.basename(arg);
    const isIndexHtml = basename === "index.html";
    let servePath = arg;
    if (servePath.startsWith(longestCommonPath)) {
      servePath = servePath.slice(longestCommonPath.length);
    } else {
      const relative = path.relative(longestCommonPath, servePath);
      if (!relative.startsWith("..")) {
        servePath = relative;
      }
    }
    if (isIndexHtml && servePath.length === 0) {
      servePath = "/";
    } else if (isIndexHtml) {
      servePath = servePath.slice(0, -"index.html".length);
    }
    if (servePath.endsWith(".html")) {
      servePath = servePath.slice(0, -".html".length);
    }
    if (servePath.endsWith("/")) {
      servePath = servePath.slice(0, -1);
    }
    if (servePath.startsWith("/")) {
      servePath = servePath.slice(1);
    }
    if (servePath === "/")
      servePath = "";
    return servePath;
  });
  const htmlImports = await __intrinsic__Promise.all(args.map((arg) => {
    return import(arg).then((m) => m.default);
  }));
  if (htmlImports.length === 1) {
    servePaths[0] = "*";
  }
  const staticRoutes = htmlImports.reduce((acc, htmlImport, index) => {
    const html = htmlImport;
    const servePath = servePaths[index];
    acc["/" + servePath] = html;
    return acc;
  }, {});
  var server;
  getServer: {
    try {
      server = Bun.serve({
        static: staticRoutes,
        development: env.NODE_ENV !== "production" ? {
          console: enableConsoleLog,
          hmr: __intrinsic__undefined
        } : false,
        hostname,
        port,
        fetch(_req) {
          return new Response("Not found", { status: 404 });
        }
      });
      break getServer;
    } catch (error) {
      if (error?.code === "EADDRINUSE") {
        let defaultPort = port || parseInt(env.PORT || env.BUN_PORT || env.NODE_PORT || "3000", 10);
        for (let remainingTries = 5;remainingTries > 0; remainingTries--) {
          try {
            server = Bun.serve({
              static: staticRoutes,
              development: env.NODE_ENV !== "production" ? {
                console: enableConsoleLog,
                hmr: __intrinsic__undefined
              } : false,
              hostname,
              port: defaultPort++,
              fetch(_req) {
                return new Response("Not found", { status: 404 });
              }
            });
            break getServer;
          } catch (error2) {
            if (error2?.code === "EADDRINUSE") {
              continue;
            }
            throw error2;
          }
        }
      }
      throw error;
    }
  }
  const elapsed = (performance.now() - initial).toFixed(2);
  const enableANSIColors = Bun.enableANSIColors;
  function printInitialMessage(isFirst) {
    let pathnameToPrint;
    if (servePaths.length === 1) {
      pathnameToPrint = servePaths[0];
    } else {
      const indexRoute = servePaths.find((a) => {
        return a === "index" || a === "" || a === "/";
      });
      pathnameToPrint = indexRoute !== __intrinsic__undefined ? indexRoute : servePaths[0];
    }
    pathnameToPrint ||= "/";
    if (pathnameToPrint === "*") {
      pathnameToPrint = "/";
    }
    if (enableANSIColors) {
      let topLine = `${server.development ? "\x1B[34;7m DEV \x1B[0m " : ""}\x1B[1;34m\x1B[5mBun\x1B[0m \x1B[1;34mv${Bun.version}\x1B[0m`;
      if (isFirst) {
        topLine += ` \x1B[2mready in\x1B[0m \x1B[1m${elapsed}\x1B[0m ms`;
      }
      if (process.env.BUN_DEBUG_DevServer) {
        topLine += `\x1B[2m (PID ${process.pid})\x1B[0m`;
      }
      console.log(topLine + `
`);
      console.log(`\x1B[1;34m\u279C\x1B[0m \x1B[36m${new URL(pathnameToPrint, server.url)}\x1B[0m`);
    } else {
      let topLine = `Bun v${Bun.version}`;
      if (isFirst) {
        if (server.development) {
          topLine += " dev server";
        }
        topLine += ` ready in ${elapsed} ms`;
      }
      console.log(topLine + `
`);
      console.log(`url: ${new URL(pathnameToPrint, server.url)}`);
    }
    if (htmlImports.length > 1 || servePaths[0] !== "" && servePaths[0] !== "*") {
      console.log(`
Routes:`);
      const pairs = [];
      for (let i = 0, length = servePaths.length;i < length; i++) {
        const route = servePaths[i];
        const importPath = args[i];
        pairs.push({ route, importPath });
      }
      pairs.sort((a, b) => {
        if (b.route === "")
          return 1;
        if (a.route === "")
          return -1;
        return a.route.localeCompare(b.route);
      });
      for (let i = 0, length = pairs.length;i < length; i++) {
        const { route, importPath } = pairs[i];
        const isLast = i === length - 1;
        const prefix = isLast ? "  \u2514\u2500\u2500 " : "  \u251C\u2500\u2500 ";
        if (enableANSIColors) {
          console.log(`${prefix}\x1B[36m/${route}\x1B[0m \x1B[2m\u2192 ${path.relative(process.cwd(), importPath)}\x1B[0m`);
        } else {
          console.log(`${prefix}/${route} \u2192 ${path.relative(process.cwd(), importPath)}`);
        }
      }
    }
    if (isFirst && process.stdin.isTTY) {
      if (enableANSIColors) {
        console.log();
        console.log("\x1B[2mPress \x1B[2;36mh + Enter\x1B[39;2m to show shortcuts\x1B[0m");
      } else {
        console.log();
        console.log("Press h + Enter to show shortcuts");
      }
    }
  }
  printInitialMessage(true);
  if (process.stdin.isTTY) {
    process.on("SIGINT", () => process.exit());
    process.on("SIGHUP", () => process.exit());
    process.on("SIGTERM", () => process.exit());
    process.stdin.on("data", (data) => {
      const key = data.toString().toLowerCase().replaceAll(`\r
`, `
`);
      switch (key) {
        case "\x03":
        case `q
`:
          process.exit();
          break;
        case `c
`:
          console.clear();
          printInitialMessage(false);
          break;
        case `o
`:
          const url = server.url.toString();
          if (false) {} else if (false) {} else {
            Bun.spawn(["xdg-open", url]).exited.catch(() => {});
          }
          break;
        case `h
`:
          console.clear();
          printInitialMessage(false);
          console.log(`
  Shortcuts\x1B[2m:\x1B[0m
`);
          console.log("  \x1B[2m\u2192\x1B[0m   \x1B[36mc + Enter\x1B[0m   clear screen");
          console.log("  \x1B[2m\u2192\x1B[0m   \x1B[36mo + Enter\x1B[0m   open in browser");
          console.log(`  \x1B[2m\u2192\x1B[0m   \x1B[36mq + Enter\x1B[0m   quit (or Ctrl+C)
`);
          break;
      }
    });
  }
}
$ = start;
$$EXPORT$$($).$$EXPORT_END$$;
