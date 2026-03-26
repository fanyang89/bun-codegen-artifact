(function (){"use strict";
let $debug_trace = Bun.env.TRACE && Bun.env.TRACE === '1';
let $debug_log_enabled = ((env) => (
  // The rationale for checking all these variables is just so you don't have to exactly remember which one you set.
  (env.BUN_DEBUG_ALL && env.BUN_DEBUG_ALL !== '0')
  || (env.BUN_DEBUG_JS && env.BUN_DEBUG_JS !== '0')
  || (env.BUN_DEBUG_CHILD_PROCESS === '1')
  || (env.DEBUG_NODE_CHILD_PROCESS === '1')
))(Bun.env);
let $debug_pid_prefix = Bun.env.SHOW_PID === '1';
let $debug_log = $debug_log_enabled ? (...args) => {
  // warn goes to stderr without colorizing
  console[$debug_trace ? 'trace' : 'warn'](($debug_pid_prefix ? `[${process.pid}] ` : '') + (Bun.enableANSIColors ? '\x1b[90m[child_process]\x1b[0m' : '[child_process]'), ...args);
} : () => {};

let $assert = function(check, sourceString, ...message) {
  if (!check) {
    const prevPrepareStackTrace = Error.prepareStackTrace;
    Error.prepareStackTrace = (e, stack) => {
      return e.name + ': ' + e.message + '\n' + stack.slice(1).map(x => '  at ' + x.toString()).join('\n');
    };
    const e = new Error(sourceString);
    e.stack; // materialize stack
    e.name = 'AssertionError';
    Error.prepareStackTrace = prevPrepareStackTrace;
    console.error('[child_process] ASSERTION FAILED: ' + sourceString);
    if (message.length) console.warn(...message);
    console.warn(e.stack.split('\n')[1] + '\n');
    if (Bun.env.ASSERT === 'CRASH') process.exit(0xAA);
    throw e;
  }
}
// build/debug/tmp_modules/node/child_process.ts
var $;
var EventEmitter = @getInternalField(@internalModuleRegistry, 96) || @createInternalModuleById(96);
var OsModule = @getInternalField(@internalModuleRegistry, 105) || @createInternalModuleById(105);
var { kHandle } = @getInternalField(@internalModuleRegistry, 32) || @createInternalModuleById(32);
var {
  validateBoolean,
  validateFunction,
  validateString,
  validateAbortSignal,
  validateArray,
  validateObject,
  validateOneOf
} = @getInternalField(@internalModuleRegistry, 68) || @createInternalModuleById(68);
var NetModule;
var ObjectCreate = Object.create;
var ObjectAssign = Object.assign;
var BufferConcat = @Buffer.concat;
var BufferIsEncoding = @Buffer.isEncoding;
var kEmptyObject = ObjectCreate(null);
var signals = OsModule.constants.signals;
var ArrayPrototypeJoin = @Array.prototype.join;
var ArrayPrototypeIncludes = @Array.prototype.includes;
var ArrayPrototypeSlice = @Array.prototype.slice;
var ArrayPrototypeUnshift = @Array.prototype.unshift;
var ArrayPrototypeFilter = @Array.prototype.filter;
var ArrayPrototypeSort = @Array.prototype.sort;
var StringPrototypeToUpperCase = @String.prototype.toUpperCase;
var ArrayPrototypePush = @Array.prototype.push;
var ArrayPrototypeLastIndexOf = @Array.prototype.lastIndexOf;
var ArrayPrototypeSplice = @Array.prototype.splice;
var ArrayBufferIsView = @ArrayBuffer.isView;
var NumberIsInteger = Number.isInteger;
var StringPrototypeIncludes = @String.prototype.includes;
var Uint8ArrayPrototypeIncludes = @Uint8Array.prototype.includes;
var MAX_BUFFER = 1024 * 1024;
var kFromNode = Symbol("kFromNode");
if ($debug_log_enabled) {
  $debug_log("child_process: debug mode on");
  globalThis.__lastId = null;
  globalThis.__getId = () => {
    return globalThis.__lastId !== null ? globalThis.__lastId++ : 0;
  };
}
function spawn(file, args, options) {
  options = normalizeSpawnArguments(file, args, options);
  validateTimeout(options.timeout);
  validateAbortSignal(options.signal, "options.signal");
  const killSignal = sanitizeKillSignal(options.killSignal);
  const child = new ChildProcess;
  $debug_log("spawn", options);
  options[kFromNode] = true;
  child.spawn(options);
  const timeout = options.timeout;
  if (timeout && timeout > 0) {
    let timeoutId = setTimeout(() => {
      if (timeoutId) {
        timeoutId = null;
        try {
          child.kill(killSignal);
        } catch (err) {
          child.emit("error", err);
        }
      }
    }, timeout).unref();
    child.once("exit", () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
    });
  }
  const signal = options.signal;
  if (signal) {
    let onAbortListener2 = function() {
      abortChildProcess(child, killSignal, signal.reason);
    };
    var onAbortListener = onAbortListener2;
    if (signal.aborted) {
      process.nextTick(onAbortListener2);
    } else {
      signal.addEventListener("abort", onAbortListener2, { once: true });
      child.once("exit", () => signal.removeEventListener("abort", onAbortListener2));
    }
  }
  return child;
}
function execFile(file, args, options, callback) {
  ({ file, args, options, callback } = normalizeExecFileArgs(file, args, options, callback));
  options = {
    __proto__: null,
    encoding: "utf8",
    timeout: 0,
    maxBuffer: MAX_BUFFER,
    killSignal: "SIGTERM",
    cwd: null,
    env: null,
    shell: false,
    ...options
  };
  const maxBuffer = options.maxBuffer;
  validateTimeout(options.timeout);
  validateMaxBuffer(maxBuffer);
  options.killSignal = sanitizeKillSignal(options.killSignal);
  const child = spawn(file, args, {
    cwd: options.cwd,
    env: options.env,
    timeout: options.timeout,
    killSignal: options.killSignal,
    uid: options.uid,
    gid: options.gid,
    windowsHide: options.windowsHide,
    windowsVerbatimArguments: options.windowsVerbatimArguments,
    shell: options.shell,
    signal: options.signal
  });
  let encoding;
  const _stdout = [];
  const _stderr = [];
  if (options.encoding !== "buffer" && BufferIsEncoding(options.encoding)) {
    encoding = options.encoding;
  } else {
    encoding = null;
  }
  let killed = false;
  let exited = false;
  let timeoutId;
  let ex = null;
  let cmd = file;
  function exitHandler(code = 0, signal) {
    if (exited)
      return;
    exited = true;
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
    if (!callback)
      return;
    let stdout;
    let stderr;
    if (encoding || child.stdout?.readableEncoding) {
      stdout = ArrayPrototypeJoin.@call(_stdout, "");
    } else {
      stdout = BufferConcat(_stdout);
    }
    if (encoding || child.stderr?.readableEncoding) {
      stderr = ArrayPrototypeJoin.@call(_stderr, "");
    } else {
      stderr = BufferConcat(_stderr);
    }
    if (!ex && code === 0 && signal === null) {
      callback(null, stdout, stderr);
      return;
    }
    if (args?.length)
      cmd += ` ${ArrayPrototypeJoin.@call(args, " ")}`;
    if (!ex) {
      const { getSystemErrorName } = @getInternalField(@internalModuleRegistry, 126) || @createInternalModuleById(126);
      let message = `Command failed: ${cmd}`;
      if (stderr)
        message += `
${stderr}`;
      ex = genericNodeError(message, {
        code: code < 0 ? getSystemErrorName(code) : code,
        killed: child.killed || killed,
        signal
      });
    }
    ex.cmd = cmd;
    callback(ex, stdout, stderr);
  }
  function errorHandler(e) {
    ex = e;
    const { stdout, stderr } = child;
    if (stdout)
      stdout.destroy();
    if (stderr)
      stderr.destroy();
    exitHandler();
  }
  function kill() {
    const { stdout, stderr } = child;
    if (stdout)
      stdout.destroy();
    if (stderr)
      stderr.destroy();
    killed = true;
    try {
      child.kill(options.killSignal);
    } catch (e) {
      ex = e;
      exitHandler();
    }
  }
  if (options.timeout > 0) {
    timeoutId = setTimeout(function delayedKill() {
      timeoutId = null;
      kill();
    }, options.timeout).unref();
  }
  function addOnDataListener(child_buffer, _buffer, kind) {
    if (encoding)
      child_buffer.setEncoding(encoding);
    let totalLen = 0;
    if (maxBuffer === @Infinity) {
      child_buffer.on("data", function onDataNoMaxBuf(chunk) {
        @arrayPush(_buffer, chunk);
      });
      return;
    }
    child_buffer.on("data", function onData(chunk) {
      const encoding2 = child_buffer.readableEncoding;
      if (encoding2) {
        const length = @Buffer.byteLength(chunk, encoding2);
        totalLen += length;
        if (totalLen > maxBuffer) {
          const truncatedLen = maxBuffer - (totalLen - length);
          @arrayPush(_buffer, @String.prototype.slice.@call(chunk, 0, truncatedLen));
          ex = @makeErrorWithCode(15, kind);
          kill();
        } else {
          @arrayPush(_buffer, chunk);
        }
      } else {
        const length = chunk.length;
        totalLen += length;
        if (totalLen > maxBuffer) {
          const truncatedLen = maxBuffer - (totalLen - length);
          @arrayPush(_buffer, chunk.slice(0, truncatedLen));
          ex = @makeErrorWithCode(15, kind);
          kill();
        } else {
          @arrayPush(_buffer, chunk);
        }
      }
    });
  }
  if (child.stdout)
    addOnDataListener(child.stdout, _stdout, "stdout");
  if (child.stderr)
    addOnDataListener(child.stderr, _stderr, "stderr");
  child.addListener("close", exitHandler);
  child.addListener("error", errorHandler);
  return child;
}
function exec(command, options, callback) {
  const opts = normalizeExecArgs(command, options, callback);
  return execFile(opts.file, opts.options, opts.callback);
}
var kCustomPromisifySymbol = Symbol.for("nodejs.util.promisify.custom");
var customPromiseExecFunction = (orig) => {
  return (...args) => {
    const { resolve, reject, promise } = @Promise.withResolvers();
    promise.child = orig(...args, (err, stdout, stderr) => {
      if (err !== null) {
        err.stdout = stdout;
        err.stderr = stderr;
        reject(err);
      } else {
        resolve({ stdout, stderr });
      }
    });
    return promise;
  };
};
Object.defineProperty(exec, kCustomPromisifySymbol, {
  __proto__: null,
  configurable: true,
  value: customPromiseExecFunction(exec)
});
exec[kCustomPromisifySymbol][kCustomPromisifySymbol] = exec[kCustomPromisifySymbol];
Object.defineProperty(execFile, kCustomPromisifySymbol, {
  __proto__: null,
  configurable: true,
  value: customPromiseExecFunction(execFile)
});
execFile[kCustomPromisifySymbol][kCustomPromisifySymbol] = execFile[kCustomPromisifySymbol];
function spawnSync(file, args, options) {
  options = {
    __proto__: null,
    maxBuffer: MAX_BUFFER,
    ...normalizeSpawnArguments(file, args, options)
  };
  const maxBuffer = options.maxBuffer;
  const encoding = options.encoding;
  $debug_log("spawnSync", options);
  validateTimeout(options.timeout);
  validateMaxBuffer(maxBuffer);
  options.killSignal = sanitizeKillSignal(options.killSignal);
  const stdio = options.stdio || "pipe";
  const bunStdio = getBunStdioFromOptions(stdio);
  var { input } = options;
  if (input) {
    if (ArrayBufferIsView(input)) {
      bunStdio[0] = input;
    } else if (typeof input === "string") {
      bunStdio[0] = @Buffer.from(input, encoding || "utf8");
    } else {
      throw @makeErrorWithCode(118, `options.stdio[0]`, ["string", "Buffer", "TypedArray", "DataView"], input);
    }
  }
  var error;
  try {
    var {
      stdout = null,
      stderr = null,
      exitCode,
      signalCode,
      exitedDueToTimeout,
      exitedDueToMaxBuffer,
      pid
    } = Bun.spawnSync({
      cmd: [options.file, ...@Array.prototype.slice.@call(options.args, 1)],
      env: options.env || @undefined,
      cwd: options.cwd || @undefined,
      stdio: bunStdio,
      windowsVerbatimArguments: options.windowsVerbatimArguments,
      windowsHide: options.windowsHide,
      argv0: options.args[0],
      timeout: options.timeout,
      killSignal: options.killSignal,
      maxBuffer: options.maxBuffer
    });
  } catch (err) {
    error = err;
    stdout = null;
    stderr = null;
  }
  const outputStdout = typeof stdout === "number" ? null : stdout;
  const outputStderr = typeof stderr === "number" ? null : stderr;
  const result = {
    signal: signalCode ?? null,
    status: exitCode,
    output: [null, outputStdout, outputStderr],
    pid
  };
  if (error) {
    result.error = error;
  }
  if (outputStdout && encoding && encoding !== "buffer") {
    result.output[1] = result.output[1]?.toString(encoding);
  }
  if (outputStderr && encoding && encoding !== "buffer") {
    result.output[2] = result.output[2]?.toString(encoding);
  }
  result.stdout = result.output[1];
  result.stderr = result.output[2];
  if (exitedDueToTimeout && error == null) {
    result.error = new SystemError("spawnSync " + options.file + " ETIMEDOUT", options.file, "spawnSync " + options.file, etimedoutErrorCode(), "ETIMEDOUT");
  }
  if (exitedDueToMaxBuffer && error == null) {
    result.error = new SystemError("spawnSync " + options.file + " ENOBUFS (stdout or stderr buffer reached maxBuffer size limit)", options.file, "spawnSync " + options.file, enobufsErrorCode(), "ENOBUFS");
  }
  if (result.error) {
    result.error.syscall = "spawnSync " + options.file;
    result.error.spawnargs = ArrayPrototypeSlice.@call(options.args, 1);
  }
  return result;
}
var etimedoutErrorCode = @lazy(43);
var enobufsErrorCode = @lazy(44);
function execFileSync(file, args, options) {
  ({ file, args, options } = normalizeExecFileArgs(file, args, options));
  const inheritStderr = !options.stdio;
  const ret = spawnSync(file, args, options);
  if (inheritStderr && ret.stderr)
    process.stderr.write(ret.stderr);
  const errArgs = [options.argv0 || file];
  ArrayPrototypePush.@apply(errArgs, args);
  const err = checkExecSyncError(ret, errArgs);
  if (err)
    throw err;
  return ret.stdout;
}
function execSync(command, options) {
  const opts = normalizeExecArgs(command, options, null);
  const inheritStderr = !opts.options.stdio;
  const ret = spawnSync(opts.file, opts.options);
  if (inheritStderr && ret.stderr)
    process.stderr.write(ret.stderr);
  const err = checkExecSyncError(ret, @undefined, command);
  if (err)
    throw err;
  return ret.stdout;
}
function stdioStringToArray(stdio, channel) {
  let options;
  switch (stdio) {
    case "ignore":
    case "overlapped":
    case "pipe":
      options = [stdio, stdio, stdio];
      break;
    case "inherit":
      options = [0, 1, 2];
      break;
    default:
      throw @makeErrorWithCode(119, "stdio", stdio);
  }
  if (channel)
    @arrayPush(options, channel);
  return options;
}
function fork(modulePath, args = [], options) {
  modulePath = getValidatedPath(modulePath, "modulePath");
  if (args == null) {
    args = [];
  } else if (typeof args === "object" && !@isJSArray(args)) {
    options = args;
    args = [];
  } else {
    validateArray(args, "args");
  }
  if (options != null) {
    validateObject(options, "options");
  }
  options = { __proto__: null, ...options, shell: false };
  options.execPath = options.execPath || process.execPath;
  validateArgumentNullCheck(options.execPath, "options.execPath");
  let execArgv = options.execArgv || process.execArgv;
  validateArgumentsNullCheck(execArgv, "options.execArgv");
  if (execArgv === process.execArgv && process._eval != null) {
    const index = ArrayPrototypeLastIndexOf.@call(execArgv, process._eval);
    if (index > 0) {
      execArgv = ArrayPrototypeSlice.@call(execArgv);
      ArrayPrototypeSplice.@call(execArgv, index - 1, 2);
    }
  }
  args = [...execArgv, modulePath, ...args];
  if (typeof options.stdio === "string") {
    options.stdio = stdioStringToArray(options.stdio, "ipc");
  } else if (!@isJSArray(options.stdio)) {
    options.stdio = stdioStringToArray(options.silent ? "pipe" : "inherit", "ipc");
  } else if (!ArrayPrototypeIncludes.@call(options.stdio, "ipc")) {
    throw @makeErrorWithCode(14, "options.stdio");
  }
  return spawn(options.execPath, args, options);
}
function convertToValidSignal(signal) {
  if (typeof signal === "number" && getSignalsToNamesMapping()[signal])
    return signal;
  if (typeof signal === "string") {
    const signalName = signals[StringPrototypeToUpperCase.@call(signal)];
    if (signalName)
      return signalName;
  }
  throw ERR_UNKNOWN_SIGNAL(signal);
}
function sanitizeKillSignal(killSignal) {
  if (typeof killSignal === "string" || typeof killSignal === "number") {
    return convertToValidSignal(killSignal);
  } else if (killSignal != null) {
    throw @makeErrorWithCode(118, "options.killSignal", ["string", "number"], killSignal);
  }
}
var signalsToNamesMapping;
function getSignalsToNamesMapping() {
  if (signalsToNamesMapping !== @undefined)
    return signalsToNamesMapping;
  signalsToNamesMapping = ObjectCreate(null);
  for (const key in signals) {
    signalsToNamesMapping[signals[key]] = key;
  }
  return signalsToNamesMapping;
}
function normalizeExecFileArgs(file, args, options, callback) {
  if (@isJSArray(args)) {
    args = ArrayPrototypeSlice.@call(args);
  } else if (args != null && typeof args === "object") {
    callback = options;
    options = args;
    args = null;
  } else if (typeof args === "function") {
    callback = args;
    options = null;
    args = null;
  }
  if (args == null) {
    args = [];
  }
  if (typeof options === "function") {
    callback = options;
  } else if (options != null) {
    validateObject(options, "options");
  }
  if (options == null) {
    options = kEmptyObject;
  }
  if (callback != null) {
    validateFunction(callback, "callback");
  }
  if (options.argv0 != null) {
    validateString(options.argv0, "options.argv0");
    validateArgumentNullCheck(options.argv0, "options.argv0");
  }
  return { file, args, options, callback };
}
function normalizeExecArgs(command, options, callback) {
  validateString(command, "command");
  validateArgumentNullCheck(command, "command");
  if (typeof options === "function") {
    callback = options;
    options = @undefined;
  }
  options = { __proto__: null, ...options };
  options.shell = typeof options.shell === "string" ? options.shell : true;
  return {
    file: command,
    options,
    callback
  };
}
var kBunEnv = Symbol("bunEnv");
function normalizeSpawnArguments(file, args, options) {
  validateString(file, "file");
  validateArgumentNullCheck(file, "file");
  if (file.length === 0)
    throw @makeErrorWithCode(119, "file", file, "cannot be empty");
  if (@isJSArray(args)) {
    args = ArrayPrototypeSlice.@call(args);
  } else if (args == null) {
    args = [];
  } else if (typeof args !== "object") {
    throw @makeErrorWithCode(118, "args", "object", args);
  } else {
    options = args;
    args = [];
  }
  validateArgumentsNullCheck(args, "args");
  if (options === @undefined)
    options = {};
  else
    validateObject(options, "options");
  options = { __proto__: null, ...options };
  let cwd = options.cwd;
  if (cwd != null) {
    cwd = getValidatedPath(cwd, "options.cwd");
  }
  if (options.detached != null) {
    validateBoolean(options.detached, "options.detached");
  }
  if (options.uid != null && !isInt32(options.uid)) {
    throw @makeErrorWithCode(118, "options.uid", "int32", options.uid);
  }
  if (options.gid != null && !isInt32(options.gid)) {
    throw @makeErrorWithCode(118, "options.gid", "int32", options.gid);
  }
  if (options.shell != null && typeof options.shell !== "boolean" && typeof options.shell !== "string") {
    throw @makeErrorWithCode(118, "options.shell", ["boolean", "string"], options.shell);
  }
  if (options.argv0 != null) {
    validateString(options.argv0, "options.argv0");
    validateArgumentNullCheck(options.argv0, "options.argv0");
  }
  if (options.windowsHide != null) {
    validateBoolean(options.windowsHide, "options.windowsHide");
  }
  let { windowsVerbatimArguments } = options;
  if (windowsVerbatimArguments != null) {
    validateBoolean(windowsVerbatimArguments, "options.windowsVerbatimArguments");
  }
  if (options.shell) {
    validateArgumentNullCheck(options.shell, "options.shell");
    const command = ArrayPrototypeJoin.@call([file, ...args], " ");
    if (false) {} else {
      if (typeof options.shell === "string")
        file = options.shell;
      else if (false)
        ;
      else
        file = "/bin/sh";
      args = ["-c", command];
    }
  }
  if (typeof options.argv0 === "string") {
    ArrayPrototypeUnshift.@call(args, options.argv0);
  } else {
    ArrayPrototypeUnshift.@call(args, file);
  }
  const env = options.env || process.env;
  const bunEnv = {};
  let envKeys = [];
  for (const key in env) {
    ArrayPrototypePush.@call(envKeys, key);
  }
  if (false) {}
  for (const key of envKeys) {
    const value = env[key];
    if (value !== @undefined) {
      validateArgumentNullCheck(key, `options.env['${key}']`);
      validateArgumentNullCheck(value, `options.env['${key}']`);
      bunEnv[key] = value;
    }
  }
  return {
    __proto__: null,
    ...options,
    args,
    cwd,
    detached: !!options.detached,
    [kBunEnv]: bunEnv,
    file,
    windowsHide: !!options.windowsHide,
    windowsVerbatimArguments: !!windowsVerbatimArguments,
    argv0: options.argv0
  };
}
function checkExecSyncError(ret, args, cmd) {
  let err;
  if (ret.error) {
    err = ret.error;
    ObjectAssign(err, ret);
    delete err.error;
  } else if (ret.status !== 0) {
    let msg = "Command failed: ";
    msg += cmd || ArrayPrototypeJoin.@call(args, " ");
    if (ret.stderr && ret.stderr.length > 0)
      msg += `
${ret.stderr.toString()}`;
    err = genericNodeError(msg, ret);
  }
  return err;
}
function parseEnvPairs(envPairs) {
  if (!envPairs)
    return @undefined;
  const resEnv = {};
  for (const line of envPairs) {
    const [key, ...value] = line.split("=", 2);
    resEnv[key] = value.join("=");
  }
  return resEnv;
}

class ChildProcess extends EventEmitter {
  #handle;
  #closesNeeded = 1;
  #closesGot = 0;
  signalCode = null;
  exitCode = null;
  spawnfile;
  spawnargs;
  pid;
  channel;
  killed = false;
  [Symbol.dispose]() {
    if (!this.killed) {
      this.kill();
    }
  }
  #handleOnExit(exitCode, signalCode, err) {
    if (signalCode) {
      this.signalCode = signalCode;
    } else {
      this.exitCode = exitCode;
    }
    {
      if (this.#stdin) {
        this.#stdin.destroy();
      } else {
        this.#stdioOptions[0] = "destroyed";
      }
      if (err) {
        this.#stdioOptions[1] = this.#stdioOptions[2] = "destroyed";
      }
      const stdout = this.#stdout, stderr = this.#stderr;
      if (stdout === @undefined) {
        this.#stdout = this.#getBunSpawnIo(1, this.#encoding, true);
      } else if (stdout && this.#stdioOptions[1] === "pipe" && !stdout?.destroyed) {
        stdout.resume?.();
      }
      if (stderr === @undefined) {
        this.#stderr = this.#getBunSpawnIo(2, this.#encoding, true);
      } else if (stderr && this.#stdioOptions[2] === "pipe" && !stderr?.destroyed) {
        stderr.resume?.();
      }
    }
    if (err) {
      if (this.spawnfile)
        err.path = this.spawnfile;
      err.spawnargs = ArrayPrototypeSlice.@call(this.spawnargs, 1);
      err.pid = this.pid;
      this.emit("error", err);
    } else if (exitCode < 0) {
      const err2 = new SystemError(`Spawned process exited with error code: ${exitCode}`, @undefined, "spawn", "EUNKNOWN", "ERR_CHILD_PROCESS_UNKNOWN_ERROR");
      err2.pid = this.pid;
      if (this.spawnfile)
        err2.path = this.spawnfile;
      err2.spawnargs = ArrayPrototypeSlice.@call(this.spawnargs, 1);
      this.emit("error", err2);
    }
    this.emit("exit", this.exitCode, this.signalCode);
    this.#maybeClose();
  }
  #getBunSpawnIo(i, encoding, autoResume = false) {
    if ($debug_log_enabled && !this.#handle) {
      if (this.#handle === null) {
        $debug_log("ChildProcess: getBunSpawnIo: this.#handle is null. This means the subprocess already exited");
      } else {
        $debug_log("ChildProcess: getBunSpawnIo: this.#handle is undefined");
      }
    }
    const handle = this.#handle;
    const io = this.#stdioOptions[i];
    switch (i) {
      case 0: {
        switch (io) {
          case "pipe": {
            const stdin = handle?.stdin;
            if (!stdin) {
              const Writable = @getInternalField(@internalModuleRegistry, 59) || @createInternalModuleById(59);
              const stream = new Writable({
                write(chunk, encoding2, callback) {
                  if (callback)
                    callback();
                  return false;
                }
              });
              stream.destroy();
              return stream;
            }
            const result = (@getInternalField(@internalModuleRegistry, 23) || @createInternalModuleById(23)).writableFromFileSink(stdin);
            result.readable = false;
            return result;
          }
          case "inherit":
            return null;
          case "destroyed": {
            const Writable = @getInternalField(@internalModuleRegistry, 59) || @createInternalModuleById(59);
            const stream = new Writable({
              write(chunk, encoding2, callback) {
                if (callback)
                  callback();
                return false;
              }
            });
            stream.destroy();
            return stream;
          }
          case "undefined":
            return @undefined;
          default:
            return null;
        }
      }
      case 2:
      case 1: {
        switch (io) {
          case "pipe": {
            const value = handle?.[fdToStdioName(i)];
            if (!value) {
              const Readable = @getInternalField(@internalModuleRegistry, 55) || @createInternalModuleById(55);
              const stream = new Readable({ read() {} });
              stream.destroy();
              return stream;
            }
            const pipe = (@getInternalField(@internalModuleRegistry, 51) || @createInternalModuleById(51)).constructNativeReadable(value, { encoding });
            this.#closesNeeded++;
            pipe.once("close", () => this.#maybeClose());
            if (autoResume)
              pipe.resume();
            return pipe;
          }
          case "destroyed": {
            const Readable = @getInternalField(@internalModuleRegistry, 55) || @createInternalModuleById(55);
            const stream = new Readable({ read() {} });
            stream.destroy();
            return stream;
          }
          case "undefined":
            return @undefined;
          default:
            return null;
        }
      }
      default:
        switch (io) {
          case "pipe":
            if (!NetModule)
              NetModule = @getInternalField(@internalModuleRegistry, 104) || @createInternalModuleById(104);
            const fd = handle && handle.stdio[i];
            if (!fd)
              return null;
            return NetModule.connect({ fd });
        }
        return null;
    }
  }
  #stdin;
  #stdout;
  #stderr;
  #stdioObject;
  #encoding;
  #stdioOptions;
  #createStdioObject() {
    const opts = this.#stdioOptions;
    const length = opts.length;
    let result = new @Array(length);
    for (let i = 0;i < length; i++) {
      const element = opts[i];
      if (element === "undefined") {
        return @undefined;
      }
      if (element !== "pipe") {
        result[i] = null;
        continue;
      }
      switch (i) {
        case 0:
          result[i] = this.stdin;
          continue;
        case 1:
          result[i] = this.stdout;
          continue;
        case 2:
          result[i] = this.stderr;
          continue;
        default:
          result[i] = this.#getBunSpawnIo(i, this.#encoding, false);
          continue;
      }
    }
    return result;
  }
  get stdin() {
    return this.#stdin ??= this.#getBunSpawnIo(0, this.#encoding, false);
  }
  get stdout() {
    return this.#stdout ??= this.#getBunSpawnIo(1, this.#encoding, false);
  }
  get stderr() {
    return this.#stderr ??= this.#getBunSpawnIo(2, this.#encoding, false);
  }
  get stdio() {
    return this.#stdioObject ??= this.#createStdioObject();
  }
  get connected() {
    const handle = this.#handle;
    if (handle === null)
      return false;
    return handle.connected ?? false;
  }
  get [kHandle]() {
    return this.#handle;
  }
  spawn(options) {
    validateObject(options, "options");
    validateOneOf(options.serialization, "options.serialization", [@undefined, "json", "advanced"]);
    const serialization = options.serialization || "json";
    const stdio = options.stdio || ["pipe", "pipe", "pipe"];
    const bunStdio = getBunStdioFromOptions(stdio);
    const has_ipc = @isJSArray(stdio) && stdio.includes("ipc");
    if (has_ipc) {
      if (options.envPairs !== @undefined) {
        validateArray(options.envPairs, "options.envPairs");
      }
    }
    var env = options[kBunEnv] || parseEnvPairs(options.envPairs) || process.env;
    const detachedOption = options.detached;
    this.#encoding = options.encoding || @undefined;
    this.#stdioOptions = bunStdio;
    const stdioCount = stdio.length;
    const hasSocketsToEagerlyLoad = stdioCount >= 3;
    validateString(options.file, "options.file");
    var file;
    file = this.spawnfile = options.file;
    var spawnargs;
    if (options.args === @undefined) {
      spawnargs = this.spawnargs = [];
    } else {
      validateArray(options.args, "options.args");
      spawnargs = this.spawnargs = options.args;
    }
    try {
      this.#handle = Bun.spawn({
        cmd: [file, ...@Array.prototype.slice.@call(spawnargs, 1)],
        stdio: bunStdio,
        cwd: options.cwd || @undefined,
        env,
        detached: typeof detachedOption !== "undefined" ? !!detachedOption : false,
        onExit: (handle, exitCode, signalCode, err) => {
          this.#handle = handle;
          this.pid = this.#handle.pid;
          $debug_log("ChildProcess: onExit", exitCode, signalCode, err, this.pid);
          if (hasSocketsToEagerlyLoad) {
            process.nextTick(() => {
              this.stdio;
              $debug_log("ChildProcess: onExit", exitCode, signalCode, err, this.pid);
            });
          }
          process.nextTick((exitCode2, signalCode2, err2) => this.#handleOnExit(exitCode2, signalCode2, err2), exitCode, signalCode, err);
        },
        lazy: true,
        ipc: has_ipc ? this.#emitIpcMessage.bind(this) : @undefined,
        onDisconnect: has_ipc ? (ok) => this.#onDisconnect(ok) : @undefined,
        serialization,
        argv0: spawnargs[0],
        windowsHide: !!options.windowsHide,
        windowsVerbatimArguments: !!options.windowsVerbatimArguments
      });
      this.pid = this.#handle.pid;
      $debug_log("ChildProcess: spawn", this.pid, spawnargs);
      process.nextTick(() => {
        this.emit("spawn");
      });
      if (has_ipc) {
        this.send = this.#send;
        this.disconnect = this.#disconnect;
        this.channel = new Control;
        Object.defineProperty(this, "_channel", {
          get() {
            return this.channel;
          },
          set(value) {
            this.channel = value;
          }
        });
        if (options[kFromNode])
          this.#closesNeeded += 1;
      }
      if (hasSocketsToEagerlyLoad) {
        for (let item of this.stdio) {
          item?.ref?.();
        }
      }
    } catch (ex) {
      if (ex != null && typeof ex === "object" && Object.hasOwn(ex, "code") && (ex.code === "EACCES" || ex.code === "EAGAIN" || ex.code === "EMFILE" || ex.code === "ENFILE" || ex.code === "ENOENT")) {
        this.#handle = null;
        ex.syscall = "spawn " + this.spawnfile;
        ex.spawnargs = @Array.prototype.slice.@call(this.spawnargs, 1);
        process.nextTick(() => {
          this.emit("error", ex);
          this.emit("close", ex.errno ?? -1);
        });
        if (ex.code === "EMFILE" || ex.code === "ENFILE") {
          this.#stdioOptions[0] = "undefined";
          this.#stdioOptions[1] = "undefined";
          this.#stdioOptions[2] = "undefined";
        }
      } else {
        throw ex;
      }
    }
  }
  #emitIpcMessage(message, _, handle) {
    this.emit("message", message, handle);
  }
  #send(message, handle, options, callback) {
    if (typeof handle === "function") {
      callback = handle;
      handle = @undefined;
      options = @undefined;
    } else if (typeof options === "function") {
      callback = options;
      options = @undefined;
    } else if (options !== @undefined) {
      if (typeof options !== "object" || options === null) {
        throw @makeErrorWithCode(118, "options", "object", options);
      }
    }
    if (!this.#handle) {
      if (callback) {
        process.nextTick(callback, @makeTypeError("Process was closed while trying to send message"));
      } else {
        this.emit("error", @makeTypeError("Process was closed while trying to send message"));
      }
      return false;
    }
    return this.#handle.send(message, handle, options, (err) => {
      if (callback) {
        callback(err);
      } else if (err) {
        this.emit("error", err);
      }
    });
  }
  #onDisconnect(firstTime) {
    if (!firstTime) {
      return;
    }
    $assert(!this.connected, "!this.connected");
    process.nextTick(() => this.emit("disconnect"));
    process.nextTick(() => this.#maybeClose());
  }
  #disconnect() {
    if (!this.connected) {
      this.emit("error", @makeErrorWithCode(144));
      return;
    }
    this.#handle.disconnect();
    this.channel = null;
  }
  kill(sig) {
    const signal = sig === 0 ? sig : convertToValidSignal(sig === @undefined ? "SIGTERM" : sig);
    const handle = this.#handle;
    if (handle) {
      if (handle.killed) {
        this.killed = true;
        return true;
      }
      try {
        handle.kill(signal);
        this.killed = true;
        return true;
      } catch (e) {
        this.emit("error", e);
      }
    }
    return false;
  }
  #maybeClose() {
    $debug_log("Attempting to maybe close...");
    this.#closesGot++;
    if (this.#closesGot === this.#closesNeeded) {
      this.emit("close", this.exitCode, this.signalCode);
    }
  }
  ref() {
    if (this.#handle)
      this.#handle.ref();
  }
  unref() {
    if (this.#handle)
      this.#handle.unref();
  }
  static {
    Object.defineProperties(this.prototype, {
      stdin: {
        get: function() {
          const value = this.#stdin ??= this.#getBunSpawnIo(0, this.#encoding, false);
          Object.defineProperty(this, "stdin", {
            value,
            enumerable: true,
            configurable: true,
            writable: true
          });
          return value;
        },
        enumerable: true,
        configurable: true
      },
      stdout: {
        get: function() {
          const value = this.#stdout ??= this.#getBunSpawnIo(1, this.#encoding, false);
          Object.defineProperty(this, "stdout", {
            value,
            enumerable: true,
            configurable: true,
            writable: true
          });
          return value;
        },
        enumerable: true,
        configurable: true
      },
      stderr: {
        get: function() {
          const value = this.#stderr ??= this.#getBunSpawnIo(2, this.#encoding, false);
          Object.defineProperty(this, "stderr", {
            value,
            enumerable: true,
            configurable: true,
            writable: true
          });
          return value;
        },
        enumerable: true,
        configurable: true
      },
      stdio: {
        get: function() {
          const value = this.#stdioObject ??= this.#createStdioObject();
          Object.defineProperty(this, "stdio", {
            value,
            enumerable: true,
            configurable: true,
            writable: true
          });
          return value;
        },
        enumerable: true,
        configurable: true
      }
    });
  }
}
var nodeToBunLookup = {
  ignore: null,
  pipe: "pipe",
  overlapped: "pipe",
  inherit: "inherit",
  ipc: "ipc"
};
function nodeToBun(item, index) {
  if (item == null) {
    return index > 2 ? "ignore" : "pipe";
  }
  if (typeof item === "number") {
    return item;
  }
  if (isNodeStreamReadable(item)) {
    if (Object.hasOwn(item, "fd") && typeof item.fd === "number")
      return item.fd;
    if (item._handle && typeof item._handle.fd === "number")
      return item._handle.fd;
    throw new Error(`TODO: stream.Readable stdio @ ${index}`);
  }
  if (isNodeStreamWritable(item)) {
    if (Object.hasOwn(item, "fd") && typeof item.fd === "number")
      return item.fd;
    if (item._handle && typeof item._handle.fd === "number")
      return item._handle.fd;
    throw new Error(`TODO: stream.Writable stdio @ ${index}`);
  }
  const result = nodeToBunLookup[item];
  if (result === @undefined) {
    throw new Error(`Invalid stdio option[${index}] "${item}"`);
  }
  return result;
}
function isNodeStreamReadable(item) {
  if (typeof item !== "object")
    return false;
  if (!item)
    return false;
  if (typeof item.on !== "function")
    return false;
  if (typeof item.pipe !== "function")
    return false;
  return true;
}
function isNodeStreamWritable(item) {
  if (typeof item !== "object")
    return false;
  if (!item)
    return false;
  if (typeof item.on !== "function")
    return false;
  if (typeof item.write !== "function")
    return false;
  return true;
}
function fdToStdioName(fd) {
  switch (fd) {
    case 0:
      return "stdin";
    case 1:
      return "stdout";
    case 2:
      return "stderr";
    default:
      return null;
  }
}
function getBunStdioFromOptions(stdio) {
  const normalizedStdio = normalizeStdio(stdio);
  if (normalizedStdio.filter((v) => v === "ipc").length > 1)
    throw @makeErrorWithCode(145);
  const bunStdio = normalizedStdio.map(nodeToBun);
  return bunStdio;
}
function normalizeStdio(stdio) {
  if (typeof stdio === "string") {
    switch (stdio) {
      case "ignore":
        return ["ignore", "ignore", "ignore"];
      case "pipe":
        return ["pipe", "pipe", "pipe"];
      case "inherit":
        return ["inherit", "inherit", "inherit"];
      default:
        throw ERR_INVALID_OPT_VALUE("stdio", stdio);
    }
  } else if (@isJSArray(stdio)) {
    let processedStdio;
    if (stdio.length === 0)
      processedStdio = ["pipe", "pipe", "pipe"];
    else if (stdio.length === 1)
      processedStdio = [stdio[0], "pipe", "pipe"];
    else if (stdio.length === 2)
      processedStdio = [stdio[0], stdio[1], "pipe"];
    else if (stdio.length >= 3)
      processedStdio = stdio;
    return processedStdio;
  } else {
    throw ERR_INVALID_OPT_VALUE("stdio", stdio);
  }
}
function abortChildProcess(child, killSignal, reason) {
  if (!child)
    return;
  try {
    if (child.kill(killSignal)) {
      child.emit("error", @makeAbortError(@undefined, { cause: reason }));
    }
  } catch (err) {
    child.emit("error", err);
  }
}

class Control extends EventEmitter {
  constructor() {
    super();
  }
}
function validateMaxBuffer(maxBuffer) {
  if (maxBuffer != null && !(typeof maxBuffer === "number" && maxBuffer >= 0)) {
    throw @makeErrorWithCode(156, "options.maxBuffer", "a positive number", maxBuffer);
  }
}
function validateArgumentNullCheck(arg, propName) {
  if (typeof arg === "string" && StringPrototypeIncludes.@call(arg, "\x00")) {
    throw @makeErrorWithCode(119, propName, arg, "must be a string without null bytes");
  }
}
function validateArgumentsNullCheck(args, propName) {
  for (let i = 0;i < args.length; ++i) {
    validateArgumentNullCheck(args[i], `${propName}[${i}]`);
  }
}
function validateTimeout(timeout) {
  if (timeout != null && !(NumberIsInteger(timeout) && timeout >= 0)) {
    throw @makeErrorWithCode(156, "timeout", "an unsigned integer", timeout);
  }
}
function isInt32(value) {
  return value === (value | 0);
}
function nullCheck(path, propName, throwError = true) {
  const pathIsString = typeof path === "string";
  const pathIsUint8Array = isUint8Array(path);
  if (!pathIsString && !pathIsUint8Array || pathIsString && !StringPrototypeIncludes.@call(path, "\x00") || pathIsUint8Array && !Uint8ArrayPrototypeIncludes.@call(path, 0)) {
    return;
  }
  const err = @makeErrorWithCode(119, propName, path, "must be a string or Uint8Array without null bytes");
  if (throwError) {
    throw err;
  }
  return err;
}
function validatePath(path, propName = "path") {
  if (typeof path !== "string" && !isUint8Array(path)) {
    throw @makeErrorWithCode(118, propName, ["string", "Buffer", "URL"], path);
  }
  const err = nullCheck(path, propName, false);
  if (err !== @undefined) {
    throw err;
  }
}
function getValidatedPath(fileURLOrPath, propName = "path") {
  const path = toPathIfFileURL(fileURLOrPath);
  validatePath(path, propName);
  return path;
}
function isUint8Array(value) {
  return typeof value === "object" && value !== null && value instanceof @Uint8Array;
}
function isURLInstance(fileURLOrPath) {
  return fileURLOrPath != null && fileURLOrPath.href && fileURLOrPath.origin;
}
function toPathIfFileURL(fileURLOrPath) {
  if (!isURLInstance(fileURLOrPath))
    return fileURLOrPath;
  return Bun.fileURLToPath(fileURLOrPath);
}
var Error = globalThis.Error;
var TypeError = globalThis.TypeError;
function genericNodeError(message, errorProperties) {
  const err = new Error(message);
  ObjectAssign(err, errorProperties);
  return err;
}
function ERR_UNKNOWN_SIGNAL(name) {
  const err = @makeTypeError(`Unknown signal: ${name}`);
  err.code = "ERR_UNKNOWN_SIGNAL";
  return err;
}
function ERR_INVALID_OPT_VALUE(name, value) {
  const err = @makeTypeError(`The value "${value}" is invalid for option "${name}"`);
  err.code = "ERR_INVALID_OPT_VALUE";
  return err;
}

class SystemError extends Error {
  path;
  syscall;
  errno;
  code;
  constructor(message, path, syscall, errno, code) {
    super(message);
    this.path = path;
    this.syscall = syscall;
    this.errno = errno;
    this.code = code;
  }
  get name() {
    return "SystemError";
  }
}
$ = {
  ChildProcess,
  spawn,
  execFile,
  exec,
  fork,
  spawnSync,
  execFileSync,
  execSync
};
return $})
