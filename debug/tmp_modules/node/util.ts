// @ts-nocheck
var $;// GENERATED TEMP FILE - DO NOT EDIT
// Sourced from src/js/node/util.ts


// Hardcoded module "node:util"
const types = (__intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 144/*node:util/types*/) || __intrinsic__createInternalModuleById(144/*node:util/types*/));
/** @type {import('node-inspect-extracted')} */
const utl = (__intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 66/*internal/util/inspect*/) || __intrinsic__createInternalModuleById(66/*internal/util/inspect*/));
const { promisify } = (__intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 31/*internal/promisify*/) || __intrinsic__createInternalModuleById(31/*internal/promisify*/));
const { validateString, validateOneOf } = (__intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 68/*internal/validators*/) || __intrinsic__createInternalModuleById(68/*internal/validators*/));
const { MIMEType, MIMEParams } = (__intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 67/*internal/util/mime*/) || __intrinsic__createInternalModuleById(67/*internal/util/mime*/));
const { deprecate } = (__intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 65/*internal/util/deprecate*/) || __intrinsic__createInternalModuleById(65/*internal/util/deprecate*/));

const internalErrorName = __intrinsic__lazy(84);
const parseEnv = __intrinsic__lazy(85);

const NumberIsSafeInteger = Number.isSafeInteger;
const ObjectKeys = Object.keys;

var cjs_exports;

function isBuffer(value) {
  return Buffer.isBuffer(value);
}
function isFunction(value) {
  return typeof value === "function";
}

const deepEquals = Bun.deepEquals;
const isDeepStrictEqual = (a, b) => deepEquals(a, b, true);

const parseArgs = __intrinsic__lazy(86);

const inspect = utl.inspect;
const formatWithOptions = utl.formatWithOptions;
const format = utl.format;
const stripVTControlCharacters = utl.stripVTControlCharacters;

var debugs = {};
var debugEnvRegex = /^$/;
if (process.env.NODE_DEBUG) {
  debugEnv = process.env.NODE_DEBUG;
  debugEnv = debugEnv
    .replace(/[|\\{}()[\]^$+?.]/g, "\\$&")
    .replace(/\*/g, ".*")
    .replace(/,/g, "$|^")
    .toUpperCase();
  debugEnvRegex = new RegExp("^" + debugEnv + "$", "i");
}
var debugEnv;
function debuglog(set) {
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (debugEnvRegex.test(set)) {
      var pid = process.pid;
      debugs[set] = function () {
        var msg = format.__intrinsic__apply(cjs_exports, arguments);
        console.error("%s %d: %s", set, pid, msg);
      };
    } else {
      debugs[set] = function () {};
    }
  }
  return debugs[set];
}

function isBoolean(arg) {
  return typeof arg === "boolean";
}

function isNull(arg) {
  return arg === null;
}

function isNullOrUndefined(arg) {
  return arg == null;
}

function isNumber(arg) {
  return typeof arg === "number";
}

function isString(arg) {
  return typeof arg === "string";
}

function isSymbol(arg) {
  return typeof arg === "symbol";
}
function isUndefined(arg) {
  return arg === void 0;
}
var isRegExp = types.isRegExp;
function isObject(arg) {
  return typeof arg === "object" && arg !== null;
}
var isDate = types.isDate;
var isError = __intrinsic__lazy(87);
function isPrimitive(arg) {
  return (
    arg === null ||
    typeof arg === "boolean" ||
    typeof arg === "number" ||
    typeof arg === "string" ||
    typeof arg === "symbol" ||
    typeof arg === "undefined"
  );
}
function pad(n) {
  return n < 10 ? "0" + n.toString(10) : n.toString(10);
}
var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()), pad(d.getMinutes()), pad(d.getSeconds())].join(":");
  return [d.getDate(), months[d.getMonth()], time].join(" ");
}
var log = function log() {
  console.log("%s - %s", timestamp(), format.__intrinsic__apply(cjs_exports, arguments));
};
var inherits = function inherits(ctor, superCtor) {
  if (ctor === undefined || ctor === null) {
    throw __intrinsic__makeErrorWithCode(118, "ctor", "function", ctor);
  }

  if (superCtor === undefined || superCtor === null) {
    throw __intrinsic__makeErrorWithCode(118, "superCtor", "function", superCtor);
  }

  if (superCtor.prototype === undefined) {
    throw __intrinsic__makeErrorWithCode(118, "superCtor.prototype", "object", superCtor.prototype);
  }
  Object.defineProperty(ctor, "super_", {
    // @ts-ignore
    __proto__: null,
    value: superCtor,
    writable: true,
    configurable: true,
  });
  Object.setPrototypeOf(ctor.prototype, superCtor.prototype);
};
var _extend = function (origin, add) {
  if (!add || !isObject(add)) return origin;
  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function callbackifyOnRejected(reason, cb) {
  if (!reason) {
    var newReason = new Error("Promise was rejected with a falsy value");
    newReason.reason = reason;
    newReason.code = "ERR_FALSY_VALUE_REJECTION";
    reason = newReason;
  }
  return cb(reason);
}
function callbackify(original) {
  const { validateFunction } = (__intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 68/*internal/validators*/) || __intrinsic__createInternalModuleById(68/*internal/validators*/));
  validateFunction(original, "original");

  // We DO NOT return the promise as it gives the user a false sense that
  // the promise is actually somehow related to the callback's execution
  // and that the callback throwing will reject the promise.
  function callbackified(...args) {
    const maybeCb = Array.prototype.pop.__intrinsic__call(args);
    validateFunction(maybeCb, "last argument");
    const cb = Function.prototype.bind.__intrinsic__call(maybeCb, this);
    // In true node style we process the callback on `nextTick` with all the
    // implications (stack, `uncaughtException`, `async_hooks`)
    original.__intrinsic__apply(this, args).then(
      ret => process.nextTick(cb, null, ret),
      rej => process.nextTick(callbackifyOnRejected, rej, cb),
    );
  }

  const descriptors = Object.getOwnPropertyDescriptors(original);
  // It is possible to manipulate a functions `length` or `name` property. This
  // guards against the manipulation.
  if (typeof descriptors.length.value === "number") {
    descriptors.length.value++;
  }
  if (typeof descriptors.name.value === "string") {
    descriptors.name.value += "Callbackified";
  }
  const propertiesValues = Object.values(descriptors);
  for (let i = 0; i < propertiesValues.length; i++) {
    // We want to use null-prototype objects to not rely on globally mutable
    // %Object.prototype%.
    Object.setPrototypeOf(propertiesValues[i], null);
  }
  Object.defineProperties(callbackified, descriptors);
  return callbackified;
}
var toUSVString = input => {
  return (input + "").toWellFormed();
};

function styleText(format, text) {
  validateString(text, "text");

  if (__intrinsic__isJSArray(format)) {
    let left = "";
    let right = "";
    for (const key of format) {
      const formatCodes = inspect.colors[key];
      if (formatCodes == null) {
        validateOneOf(key, "format", ObjectKeys(inspect.colors));
      }
      left += `\u001b[${formatCodes[0]}m`;
      right = `\u001b[${formatCodes[1]}m${right}`;
    }

    return `${left}${text}${right}`;
  }

  let formatCodes = inspect.colors[format];

  if (formatCodes == null) {
    validateOneOf(format, "format", ObjectKeys(inspect.colors));
  }
  return `\u001b[${formatCodes[0]}m${text}\u001b[${formatCodes[1]}m`;
}

function getSystemErrorName(err: any) {
  if (typeof err !== "number") throw __intrinsic__makeErrorWithCode(118, "err", "number", err);
  if (err >= 0 || !NumberIsSafeInteger(err)) throw __intrinsic__makeErrorWithCode(156, "err", "a negative integer", err);
  return internalErrorName(err);
}

let lazyAbortedRegistry: FinalizationRegistry<{
  ref: WeakRef<AbortSignal>;
  unregisterToken: (...args: any[]) => void;
}>;
function onAbortedCallback(resolveFn: Function) {
  lazyAbortedRegistry.unregister(resolveFn);

  resolveFn();
}

function aborted(signal: AbortSignal, resource: object) {
  if (!__intrinsic__isObject(signal) || !(signal instanceof AbortSignal)) {
    throw __intrinsic__makeErrorWithCode(118, "signal", "AbortSignal", signal);
  }

  if (!__intrinsic__isObject(resource)) {
    throw __intrinsic__makeErrorWithCode(118, "resource", "object", resource);
  }

  if (signal.aborted) {
    return Promise.__intrinsic__resolve();
  }

  const { promise, resolve } = __intrinsic__newPromiseCapability(Promise);
  const unregisterToken = onAbortedCallback.bind(undefined, resolve);
  signal.addEventListener(
    "abort",
    // Do not leak the current scope into the listener.
    // Instead, create a new function.
    unregisterToken,
    { once: true },
  );

  if (!lazyAbortedRegistry) {
    lazyAbortedRegistry = new FinalizationRegistry(({ ref, unregisterToken }) => {
      const signal = ref.deref();
      if (signal) signal.removeEventListener("abort", unregisterToken);
    });
  }

  // When the resource is garbage collected, clear the listener from the
  // AbortSignal so we do not cause the AbortSignal itself to leak (AbortSignal
  // keeps alive until it is signaled).
  lazyAbortedRegistry.register(
    resource,
    {
      ref: new WeakRef(signal),
      unregisterToken,
    },
    unregisterToken,
  );

  return promise;
}

cjs_exports = {
  // This is in order of `node --print 'Object.keys(util)'`
  // _errnoException,
  // _exceptionWithHostPort,
  _extend,
  callbackify,
  debug: debuglog,
  debuglog,
  deprecate,
  format,
  styleText,
  formatWithOptions,
  // getCallSite,
  // getCallSites,
  // getSystemErrorMap,
  getSystemErrorName,
  // getSystemErrorMessage,
  inherits,
  inspect,
  isDeepStrictEqual,
  promisify,
  stripVTControlCharacters,
  toUSVString,
  // transferableAbortSignal,
  // transferableAbortController,
  aborted,
  types,
  parseEnv,
  parseArgs,
  TextDecoder,
  TextEncoder,
  MIMEType,
  MIMEParams,

  // Deprecated in Node.js 22, removed in 23
  isArray: __intrinsic__isArray,
  isBoolean,
  isBuffer,
  isNull,
  isNullOrUndefined,
  isNumber,
  isString,
  isSymbol,
  isUndefined,
  isRegExp,
  isObject,
  isDate,
  isError,
  isFunction,
  isPrimitive,
  log,
};

$ = cjs_exports;
;$$EXPORT$$($).$$EXPORT_END$$;
