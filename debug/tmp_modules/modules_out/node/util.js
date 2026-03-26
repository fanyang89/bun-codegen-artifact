// @bun
// build/debug/tmp_modules/node/util.ts
var $;
var types = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 144) || __intrinsic__createInternalModuleById(144);
var utl = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 66) || __intrinsic__createInternalModuleById(66);
var { promisify } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 31) || __intrinsic__createInternalModuleById(31);
var { validateString, validateOneOf } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 68) || __intrinsic__createInternalModuleById(68);
var { MIMEType, MIMEParams } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 67) || __intrinsic__createInternalModuleById(67);
var { deprecate } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 65) || __intrinsic__createInternalModuleById(65);
var internalErrorName = __intrinsic__lazy(84);
var parseEnv = __intrinsic__lazy(85);
var NumberIsSafeInteger = Number.isSafeInteger;
var ObjectKeys = Object.keys;
var cjs_exports;
function isBuffer(value) {
  return __intrinsic__Buffer.isBuffer(value);
}
function isFunction(value) {
  return typeof value === "function";
}
var deepEquals = Bun.deepEquals;
var isDeepStrictEqual = (a, b) => deepEquals(a, b, true);
var parseArgs = __intrinsic__lazy(86);
var inspect = utl.inspect;
var formatWithOptions = utl.formatWithOptions;
var format = utl.format;
var stripVTControlCharacters = utl.stripVTControlCharacters;
var debugs = {};
var debugEnvRegex = /^$/;
if (process.env.NODE_DEBUG) {
  debugEnv = process.env.NODE_DEBUG;
  debugEnv = debugEnv.replace(/[|\\{}()[\]^$+?.]/g, "\\$&").replace(/\*/g, ".*").replace(/,/g, "$|^").toUpperCase();
  debugEnvRegex = new __intrinsic__RegExp("^" + debugEnv + "$", "i");
}
var debugEnv;
function debuglog(set) {
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (debugEnvRegex.test(set)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = format.__intrinsic__apply(cjs_exports, arguments);
        console.error("%s %d: %s", set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
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
  return arg === undefined;
}
var isRegExp = types.isRegExp;
function isObject(arg) {
  return typeof arg === "object" && arg !== null;
}
var isDate = types.isDate;
var isError = __intrinsic__lazy(87);
function isPrimitive(arg) {
  return arg === null || typeof arg === "boolean" || typeof arg === "number" || typeof arg === "string" || typeof arg === "symbol" || typeof arg === "undefined";
}
function pad(n) {
  return n < 10 ? "0" + n.toString(10) : n.toString(10);
}
var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function timestamp() {
  var d = new Date;
  var time = [pad(d.getHours()), pad(d.getMinutes()), pad(d.getSeconds())].join(":");
  return [d.getDate(), months[d.getMonth()], time].join(" ");
}
var log = function log2() {
  console.log("%s - %s", timestamp(), format.__intrinsic__apply(cjs_exports, arguments));
};
var inherits = function inherits2(ctor, superCtor) {
  if (ctor === __intrinsic__undefined || ctor === null) {
    throw __intrinsic__makeErrorWithCode(118, "ctor", "function", ctor);
  }
  if (superCtor === __intrinsic__undefined || superCtor === null) {
    throw __intrinsic__makeErrorWithCode(118, "superCtor", "function", superCtor);
  }
  if (superCtor.prototype === __intrinsic__undefined) {
    throw __intrinsic__makeErrorWithCode(118, "superCtor.prototype", "object", superCtor.prototype);
  }
  Object.defineProperty(ctor, "super_", {
    __proto__: null,
    value: superCtor,
    writable: true,
    configurable: true
  });
  Object.setPrototypeOf(ctor.prototype, superCtor.prototype);
};
var _extend = function(origin, add) {
  if (!add || !isObject(add))
    return origin;
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
  const { validateFunction } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 68) || __intrinsic__createInternalModuleById(68);
  validateFunction(original, "original");
  function callbackified(...args) {
    const maybeCb = __intrinsic__Array.prototype.pop.__intrinsic__call(args);
    validateFunction(maybeCb, "last argument");
    const cb = Function.prototype.bind.__intrinsic__call(maybeCb, this);
    original.__intrinsic__apply(this, args).then((ret) => process.nextTick(cb, null, ret), (rej) => process.nextTick(callbackifyOnRejected, rej, cb));
  }
  const descriptors = Object.getOwnPropertyDescriptors(original);
  if (typeof descriptors.length.value === "number") {
    descriptors.length.value++;
  }
  if (typeof descriptors.name.value === "string") {
    descriptors.name.value += "Callbackified";
  }
  const propertiesValues = Object.values(descriptors);
  for (let i = 0;i < propertiesValues.length; i++) {
    Object.setPrototypeOf(propertiesValues[i], null);
  }
  Object.defineProperties(callbackified, descriptors);
  return callbackified;
}
var toUSVString = (input) => {
  return (input + "").toWellFormed();
};
function styleText(format2, text) {
  validateString(text, "text");
  if (__intrinsic__isJSArray(format2)) {
    let left = "";
    let right = "";
    for (const key of format2) {
      const formatCodes2 = inspect.colors[key];
      if (formatCodes2 == null) {
        validateOneOf(key, "format", ObjectKeys(inspect.colors));
      }
      left += `\x1B[${formatCodes2[0]}m`;
      right = `\x1B[${formatCodes2[1]}m${right}`;
    }
    return `${left}${text}${right}`;
  }
  let formatCodes = inspect.colors[format2];
  if (formatCodes == null) {
    validateOneOf(format2, "format", ObjectKeys(inspect.colors));
  }
  return `\x1B[${formatCodes[0]}m${text}\x1B[${formatCodes[1]}m`;
}
function getSystemErrorName(err) {
  if (typeof err !== "number")
    throw __intrinsic__makeErrorWithCode(118, "err", "number", err);
  if (err >= 0 || !NumberIsSafeInteger(err))
    throw __intrinsic__makeErrorWithCode(156, "err", "a negative integer", err);
  return internalErrorName(err);
}
var lazyAbortedRegistry;
function onAbortedCallback(resolveFn) {
  lazyAbortedRegistry.unregister(resolveFn);
  resolveFn();
}
function aborted(signal, resource) {
  if (!__intrinsic__isObject(signal) || !(signal instanceof __intrinsic__AbortSignal)) {
    throw __intrinsic__makeErrorWithCode(118, "signal", "AbortSignal", signal);
  }
  if (!__intrinsic__isObject(resource)) {
    throw __intrinsic__makeErrorWithCode(118, "resource", "object", resource);
  }
  if (signal.aborted) {
    return __intrinsic__Promise.__intrinsic__resolve();
  }
  const { promise, resolve } = __intrinsic__newPromiseCapability(__intrinsic__Promise);
  const unregisterToken = onAbortedCallback.bind(__intrinsic__undefined, resolve);
  signal.addEventListener("abort", unregisterToken, { once: true });
  if (!lazyAbortedRegistry) {
    lazyAbortedRegistry = new FinalizationRegistry(({ ref, unregisterToken: unregisterToken2 }) => {
      const signal2 = ref.deref();
      if (signal2)
        signal2.removeEventListener("abort", unregisterToken2);
    });
  }
  lazyAbortedRegistry.register(resource, {
    ref: new WeakRef(signal),
    unregisterToken
  }, unregisterToken);
  return promise;
}
cjs_exports = {
  _extend,
  callbackify,
  debug: debuglog,
  debuglog,
  deprecate,
  format,
  styleText,
  formatWithOptions,
  getSystemErrorName,
  inherits,
  inspect,
  isDeepStrictEqual,
  promisify,
  stripVTControlCharacters,
  toUSVString,
  aborted,
  types,
  parseEnv,
  parseArgs,
  TextDecoder,
  TextEncoder,
  MIMEType,
  MIMEParams,
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
  log
};
$ = cjs_exports;
$$EXPORT$$($).$$EXPORT_END$$;
