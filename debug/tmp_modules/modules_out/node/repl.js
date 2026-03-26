// @bun
// build/debug/tmp_modules/node/repl.ts
var $;
var { throwNotImplemented } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 32) || __intrinsic__createInternalModuleById(32);
var builtinModules = [
  "bun",
  "ffi",
  "assert",
  "assert/strict",
  "async_hooks",
  "buffer",
  "child_process",
  "cluster",
  "console",
  "constants",
  "crypto",
  "dgram",
  "diagnostics_channel",
  "dns",
  "dns/promises",
  "domain",
  "events",
  "fs",
  "fs/promises",
  "http",
  "http2",
  "https",
  "inspector",
  "inspector/promises",
  "module",
  "net",
  "os",
  "path",
  "path/posix",
  "path/win32",
  "perf_hooks",
  "process",
  "punycode",
  "querystring",
  "readline",
  "readline/promises",
  "repl",
  "stream",
  "stream/consumers",
  "stream/promises",
  "stream/web",
  "string_decoder",
  "sys",
  "timers",
  "timers/promises",
  "tls",
  "trace_events",
  "tty",
  "url",
  "util",
  "util/types",
  "v8",
  "vm",
  "wasi",
  "worker_threads",
  "zlib",
  "node:test"
];
$ = {
  lines: [],
  context: globalThis,
  historyIndex: -1,
  cursor: 0,
  historySize: 1000,
  removeHistoryDuplicates: false,
  crlfDelay: 100,
  completer: () => {
    throwNotImplemented("node:repl");
  },
  history: [],
  _initialPrompt: "> ",
  terminal: true,
  input: new Proxy({}, {
    get() {
      throwNotImplemented("node:repl");
    },
    has: () => false,
    ownKeys: () => [],
    getOwnPropertyDescriptor: () => __intrinsic__undefined,
    set() {
      throwNotImplemented("node:repl");
    }
  }),
  line: "",
  eval: () => {
    throwNotImplemented("node:repl");
  },
  isCompletionEnabled: true,
  escapeCodeTimeout: 500,
  tabSize: 8,
  breakEvalOnSigint: true,
  useGlobal: true,
  underscoreAssigned: false,
  last: __intrinsic__undefined,
  _domain: __intrinsic__undefined,
  allowBlockingCompletions: false,
  useColors: true,
  output: new Proxy({}, {
    get() {
      throwNotImplemented("node:repl");
    },
    has: () => false,
    ownKeys: () => [],
    getOwnPropertyDescriptor: () => __intrinsic__undefined,
    set() {
      throwNotImplemented("node:repl");
    }
  }),
  _builtinLibs: builtinModules,
  builtinModules
};
$$EXPORT$$($).$$EXPORT_END$$;
