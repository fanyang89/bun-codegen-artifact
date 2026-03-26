// @bun
// build/debug/tmp_modules/node/async_hooks.ts
var $;
var setAsyncHooksEnabled = __intrinsic__lazy(41);
var cleanupLater = __intrinsic__lazy(42);
var { validateFunction, validateString, validateObject } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 68) || __intrinsic__createInternalModuleById(68);
function assertValidAsyncContextArray(array) {
  if (array === __intrinsic__undefined)
    return true;
  $assert(__intrinsic__Array.isArray(array), "Array.isArray(array)", "AsyncContextData must be an array or undefined, got", Bun.inspect(array, { depth: 1 }));
  $assert(array.length % 2 === 0, "array.length % 2 === 0", "AsyncContextData should be even-length, got", Bun.inspect(array, { depth: 1 }));
  $assert(array.length > 0, "array.length > 0", "AsyncContextData should be undefined if empty, got", Bun.inspect(array, { depth: 1 }));
  for (var i = 0;i < array.length; i += 2) {
    $assert(array[i] instanceof AsyncLocalStorage, "array[i] instanceof AsyncLocalStorage", `Odd indexes in AsyncContextData should be an array of AsyncLocalStorage
Index %s was %s`, i, array[i]);
  }
  return true;
}
function debugFormatContextValue(value) {
  if (value === __intrinsic__undefined)
    return "undefined";
  let str = `{
`;
  for (var i = 0;i < value.length; i += 2) {
    str += `  ${value[i].__id__}: typeof = ${typeof value[i + 1]}
`;
  }
  str += "}";
  return str;
}
function get() {
  $debug_log("get", debugFormatContextValue(__intrinsic__getInternalField(__intrinsic__asyncContext, 0)));
  return __intrinsic__getInternalField(__intrinsic__asyncContext, 0);
}
function set(contextValue) {
  $assert(assertValidAsyncContextArray(contextValue), "assertValidAsyncContextArray(contextValue)");
  $debug_log("set", debugFormatContextValue(contextValue));
  return __intrinsic__putInternalField(__intrinsic__asyncContext, 0, contextValue);
}

class AsyncLocalStorage {
  #disabled = false;
  constructor() {
    setAsyncHooksEnabled(true);
    if (true) {
      const uid = Math.random().toString(36).slice(2, 8);
      const source = (__intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 139) || __intrinsic__createInternalModuleById(139)).callerSourceOrigin();
      this.__id__ = uid + "@" + (__intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 107) || __intrinsic__createInternalModuleById(107)).basename(source);
      $debug_log("new AsyncLocalStorage uid=", this.__id__, source);
    }
  }
  static bind(fn, ...args) {
    validateFunction(fn);
    return this.snapshot().bind(null, fn, ...args);
  }
  static snapshot() {
    var context = get();
    return (fn, ...args) => {
      var prev = get();
      set(context);
      try {
        return fn(...args);
      } finally {
        set(prev);
      }
    };
  }
  enterWith(store) {
    cleanupLater();
    this.#disabled = false;
    var context = get();
    if (!context) {
      set([this, store]);
      return;
    }
    var { length } = context;
    $assert(length > 0, "length > 0");
    $assert(length % 2 === 0, "length % 2 === 0");
    for (var i = 0;i < length; i += 2) {
      if (context[i] === this) {
        $assert(length > i + 1, "length > i + 1");
        const clone = context.slice();
        clone[i + 1] = store;
        set(clone);
        return;
      }
    }
    set(context.concat(this, store));
    $assert(this.getStore() === store, "this.getStore() === store");
  }
  exit(cb, ...args) {
    return this.run(__intrinsic__undefined, cb, ...args);
  }
  run(store_value, callback, ...args) {
    $debug_log("run " + this.__id__);
    var context = get();
    var hasPrevious = false;
    var previous_value;
    var i = 0;
    var contextWasAlreadyInit = !context;
    const wasDisabled = this.#disabled;
    this.#disabled = false;
    if (contextWasAlreadyInit) {
      set(context = [this, store_value]);
    } else {
      context = context.slice();
      i = context.indexOf(this);
      if (i > -1) {
        $assert(i % 2 === 0, "i % 2 === 0");
        hasPrevious = true;
        previous_value = context[i + 1];
        context[i + 1] = store_value;
      } else {
        i = context.length;
        context.push(this, store_value);
        $assert(i % 2 === 0, "i % 2 === 0");
        $assert(context.length % 2 === 0, "context.length % 2 === 0");
      }
      set(context);
    }
    $assert(i > -1, "i > -1", "i was not set");
    $assert(this.getStore() === store_value, "this.getStore() === store_value", "run: store_value was not set");
    try {
      return callback(...args);
    } finally {
      if (!wasDisabled) {
        var context2 = get();
        if (context2 === context && contextWasAlreadyInit) {
          $assert(context2.length === 2, "context2.length === 2", "context was mutated without copy");
          set(__intrinsic__undefined);
        } else {
          context2 = context2.slice();
          $assert(context2[i] === this, "context2[i] === this");
          if (hasPrevious) {
            context2[i + 1] = previous_value;
            set(context2);
          } else {
            context2.splice(i, 2);
            $assert(context2.length % 2 === 0, "context2.length % 2 === 0");
            set(context2.length ? context2 : __intrinsic__undefined);
          }
        }
        $assert(this.getStore() === previous_value, "this.getStore() === previous_value", "run: previous_value", Bun.inspect(previous_value), "was not restored, i see", this.getStore());
      }
    }
  }
  disable() {
    $debug_log("disable " + this.__id__);
    if (this.#disabled)
      return;
    this.#disabled = true;
    var context = get();
    if (context) {
      var { length } = context;
      for (var i = 0;i < length; i += 2) {
        if (context[i] === this) {
          context.splice(i, 2);
          set(context.length ? context : __intrinsic__undefined);
          break;
        }
      }
    }
  }
  getStore() {
    $debug_log("getStore " + this.__id__);
    if (this.#disabled)
      return;
    var context = get();
    if (!context)
      return;
    var { length } = context;
    for (var i = 0;i < length; i += 2) {
      if (context[i] === this)
        return context[i + 1];
    }
  }
  _enable() {}
  _propagate(_resource, _triggerResource, _type) {}
}
if (true) {
  AsyncLocalStorage.prototype[Bun.inspect.custom] = function(depth, options) {
    if (depth < 0)
      return `AsyncLocalStorage { ${Bun.inspect(this.__id__, options)} }`;
    return `AsyncLocalStorage { [${options.stylize("debug id", "special")}]: ${Bun.inspect(this.__id__, options)} }`;
  };
}

class AsyncResource {
  type;
  #snapshot;
  constructor(type, opts) {
    validateString(type, "type");
    let triggerAsyncId = opts;
    if (opts != null) {
      if (typeof opts !== "number") {
        triggerAsyncId = opts.triggerAsyncId === __intrinsic__undefined ? 1 : opts.triggerAsyncId;
      }
      if (!Number.isSafeInteger(triggerAsyncId) || triggerAsyncId < -1) {
        throw __intrinsic__makeErrorWithCode(120, "triggerAsyncId", triggerAsyncId);
      }
    }
    if (hasEnabledCreateHook && type.length === 0) {
      throw __intrinsic__makeErrorWithCode(6, type);
    }
    setAsyncHooksEnabled(true);
    this.type = type;
    this.#snapshot = get();
  }
  emitBefore() {
    return true;
  }
  emitAfter() {
    return true;
  }
  asyncId() {
    return 0;
  }
  triggerAsyncId() {
    return 0;
  }
  emitDestroy() {}
  runInAsyncScope(fn, thisArg, ...args) {
    var prev = get();
    set(this.#snapshot);
    try {
      return fn.__intrinsic__apply(thisArg, args);
    } finally {
      set(prev);
    }
  }
  bind(fn, thisArg) {
    validateFunction(fn, "fn");
    return this.runInAsyncScope.bind(this, fn, thisArg ?? this);
  }
  static bind(fn, type, thisArg) {
    type = type || fn.name;
    return new AsyncResource(type || "bound-anonymous-fn").bind(fn, thisArg);
  }
}
function createWarning(message, isCreateHook) {
  let warned = false;
  var wrapped = function(arg1) {
    if (warned || !Bun.env.BUN_FEATURE_FLAG_VERBOSE_WARNINGS && (warned = true))
      return;
    const known_supported_modules = [
      "zx/build/core.js",
      "datadog-core/src/storage/async_resource.js"
    ];
    const e = new Error().stack;
    if (known_supported_modules.some((m) => e.includes(m)))
      return;
    if (isCreateHook && arg1) {
      if (typeof arg1 === "object") {
        const { init, promiseResolve, destroy } = arg1;
        if (init && promiseResolve && destroy) {
          if (isEmptyFunction(init) && isEmptyFunction(destroy))
            return;
        }
      }
    }
    warned = true;
    console.warn("[bun] Warning:", message);
  };
  return wrapped;
}
function isEmptyFunction(f) {
  let str = f.toString();
  if (!str.startsWith("function()"))
    return false;
  str = str.slice("function()".length).trim();
  return /^{\s*}$/.test(str);
}
var createHookNotImpl = createWarning("async_hooks.createHook is not implemented in Bun. Hooks can still be created but will never be called.", true);
var hasEnabledCreateHook = false;
function createHook(hook) {
  validateObject(hook, "hook");
  const { init, before, after, destroy, promiseResolve } = hook;
  if (init !== __intrinsic__undefined && typeof init !== "function")
    throw __intrinsic__makeErrorWithCode(5, "hook.init");
  if (before !== __intrinsic__undefined && typeof before !== "function")
    throw __intrinsic__makeErrorWithCode(5, "hook.before");
  if (after !== __intrinsic__undefined && typeof after !== "function")
    throw __intrinsic__makeErrorWithCode(5, "hook.after");
  if (destroy !== __intrinsic__undefined && typeof destroy !== "function")
    throw __intrinsic__makeErrorWithCode(5, "hook.destroy");
  if (promiseResolve !== __intrinsic__undefined && typeof promiseResolve !== "function")
    throw __intrinsic__makeErrorWithCode(5, "hook.promiseResolve");
  return {
    enable() {
      createHookNotImpl(hook);
      hasEnabledCreateHook = true;
      return this;
    },
    disable() {
      createHookNotImpl();
      return this;
    }
  };
}
var executionAsyncIdNotImpl = createWarning("async_hooks.executionAsyncId/triggerAsyncId are not implemented in Bun. It will return 0 every time.");
function executionAsyncId() {
  executionAsyncIdNotImpl();
  return 0;
}
function triggerAsyncId() {
  return 0;
}
var executionAsyncResourceWarning = createWarning("async_hooks.executionAsyncResource is not implemented in Bun. It returns a reference to process.stdin every time.");
function executionAsyncResource() {
  executionAsyncResourceWarning();
  return process.stdin;
}
var asyncWrapProviders = {
  NONE: 0,
  DIRHANDLE: 1,
  DNSCHANNEL: 2,
  ELDHISTOGRAM: 3,
  FILEHANDLE: 4,
  FILEHANDLECLOSEREQ: 5,
  FIXEDSIZEBLOBCOPY: 6,
  FSEVENTWRAP: 7,
  FSREQCALLBACK: 8,
  FSREQPROMISE: 9,
  GETADDRINFOREQWRAP: 10,
  GETNAMEINFOREQWRAP: 11,
  HEAPSNAPSHOT: 12,
  HTTP2SESSION: 13,
  HTTP2STREAM: 14,
  HTTP2PING: 15,
  HTTP2SETTINGS: 16,
  HTTPINCOMINGMESSAGE: 17,
  HTTPCLIENTREQUEST: 18,
  JSSTREAM: 19,
  JSUDPWRAP: 20,
  MESSAGEPORT: 21,
  PIPECONNECTWRAP: 22,
  PIPESERVERWRAP: 23,
  PIPEWRAP: 24,
  PROCESSWRAP: 25,
  PROMISE: 26,
  QUERYWRAP: 27,
  SHUTDOWNWRAP: 28,
  SIGNALWRAP: 29,
  STATWATCHER: 30,
  STREAMPIPE: 31,
  TCPCONNECTWRAP: 32,
  TCPSERVERWRAP: 33,
  TCPWRAP: 34,
  TTYWRAP: 35,
  UDPSENDWRAP: 36,
  UDPWRAP: 37,
  SIGINTWATCHDOG: 38,
  WORKER: 39,
  WORKERHEAPSNAPSHOT: 40,
  WRITEWRAP: 41,
  ZLIB: 42,
  CHECKPRIMEREQUEST: 43,
  PBKDF2REQUEST: 44,
  KEYPAIRGENREQUEST: 45,
  KEYGENREQUEST: 46,
  KEYEXPORTREQUEST: 47,
  CIPHERREQUEST: 48,
  DERIVEBITSREQUEST: 49,
  HASHREQUEST: 50,
  RANDOMBYTESREQUEST: 51,
  RANDOMPRIMEREQUEST: 52,
  SCRYPTREQUEST: 53,
  SIGNREQUEST: 54,
  TLSWRAP: 55,
  VERIFYREQUEST: 56,
  INSPECTORJSBINDING: 57
};
$ = {
  AsyncLocalStorage,
  createHook,
  executionAsyncId,
  triggerAsyncId,
  executionAsyncResource,
  asyncWrapProviders,
  AsyncResource
};
$$EXPORT$$($).$$EXPORT_END$$;
