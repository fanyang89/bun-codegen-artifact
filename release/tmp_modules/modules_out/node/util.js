// @bun
// build/release/tmp_modules/node/util.ts
var $, types = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 144) || __intrinsic__createInternalModuleById(144), utl = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 66) || __intrinsic__createInternalModuleById(66), { promisify } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 31) || __intrinsic__createInternalModuleById(31), { validateString, validateOneOf } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 68) || __intrinsic__createInternalModuleById(68), { MIMEType, MIMEParams } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 67) || __intrinsic__createInternalModuleById(67), { deprecate } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 65) || __intrinsic__createInternalModuleById(65), internalErrorName = __intrinsic__lazy(84), parseEnv = __intrinsic__lazy(85), NumberIsSafeInteger = Number.isSafeInteger, ObjectKeys = Object.keys, cjs_exports;
function isBuffer(value) {
  return __intrinsic__Buffer.isBuffer(value);
}
function isFunction(value) {
  return typeof value === "function";
}
var deepEquals = Bun.deepEquals, isDeepStrictEqual = (a, b) => deepEquals(a, b, !0), parseArgs = __intrinsic__lazy(86), inspect = utl.inspect, formatWithOptions = utl.formatWithOptions, format = utl.format, stripVTControlCharacters = utl.stripVTControlCharacters, debugs = {}, debugEnvRegex = /^$/;
if (process.env.NODE_DEBUG)
  debugEnv = process.env.NODE_DEBUG, debugEnv = debugEnv.replace(/[|\\{}()[\]^$+?.]/g, "\\$&").replace(/\*/g, ".*").replace(/,/g, "$|^").toUpperCase(), debugEnvRegex = new __intrinsic__RegExp("^" + debugEnv + "$", "i");
var debugEnv;
function debuglog(set) {
  if (set = set.toUpperCase(), !debugs[set])
    if (debugEnvRegex.test(set)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = format.__intrinsic__apply(cjs_exports, arguments);
        console.error("%s %d: %s", set, pid, msg);
      };
    } else
      debugs[set] = function() {};
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
var isDate = types.isDate, isError = __intrinsic__lazy(87);
function isPrimitive(arg) {
  return arg === null || typeof arg === "boolean" || typeof arg === "number" || typeof arg === "string" || typeof arg === "symbol" || typeof arg > "u";
}
function pad(n) {
  return n < 10 ? "0" + n.toString(10) : n.toString(10);
}
var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function timestamp() {
  var d = /* @__PURE__ */ new Date, time = [pad(d.getHours()), pad(d.getMinutes()), pad(d.getSeconds())].join(":");
  return [d.getDate(), months[d.getMonth()], time].join(" ");
}
var log = function log2() {
  console.log("%s - %s", timestamp(), format.__intrinsic__apply(cjs_exports, arguments));
}, inherits = function inherits2(ctor, superCtor) {
  if (ctor === __intrinsic__undefined || ctor === null)
    throw __intrinsic__makeErrorWithCode(118, "ctor", "function", ctor);
  if (superCtor === __intrinsic__undefined || superCtor === null)
    throw __intrinsic__makeErrorWithCode(118, "superCtor", "function", superCtor);
  if (superCtor.prototype === __intrinsic__undefined)
    throw __intrinsic__makeErrorWithCode(118, "superCtor.prototype", "object", superCtor.prototype);
  Object.defineProperty(ctor, "super_", {
    __proto__: null,
    value: superCtor,
    writable: !0,
    configurable: !0
  }), Object.setPrototypeOf(ctor.prototype, superCtor.prototype);
}, _extend = function(origin, add) {
  if (!add || !isObject(add))
    return origin;
  var keys = Object.keys(add), i = keys.length;
  while (i--)
    origin[keys[i]] = add[keys[i]];
  return origin;
};
function callbackifyOnRejected(reason, cb) {
  if (!reason) {
    var newReason = Error("Promise was rejected with a falsy value");
    newReason.reason = reason, newReason.code = "ERR_FALSY_VALUE_REJECTION", reason = newReason;
  }
  return cb(reason);
}
function callbackify(original) {
  let { validateFunction } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 68) || __intrinsic__createInternalModuleById(68);
  validateFunction(original, "original");
  function callbackified(...args) {
    let maybeCb = __intrinsic__Array.prototype.pop.__intrinsic__call(args);
    validateFunction(maybeCb, "last argument");
    let cb = Function.prototype.bind.__intrinsic__call(maybeCb, this);
    original.__intrinsic__apply(this, args).then((ret) => process.nextTick(cb, null, ret), (rej) => process.nextTick(callbackifyOnRejected, rej, cb));
  }
  let descriptors = Object.getOwnPropertyDescriptors(original);
  if (typeof descriptors.length.value === "number")
    descriptors.length.value++;
  if (typeof descriptors.name.value === "string")
    descriptors.name.value += "Callbackified";
  let propertiesValues = Object.values(descriptors);
  for (let i = 0;i < propertiesValues.length; i++)
    Object.setPrototypeOf(propertiesValues[i], null);
  return Object.defineProperties(callbackified, descriptors), callbackified;
}
var toUSVString = (input) => {
  return (input + "").toWellFormed();
};
function styleText(format2, text) {
  if (validateString(text, "text"), __intrinsic__isJSArray(format2)) {
    let left = "", right = "";
    for (let key of format2) {
      let formatCodes2 = inspect.colors[key];
      if (formatCodes2 == null)
        validateOneOf(key, "format", ObjectKeys(inspect.colors));
      left += `\x1B[${formatCodes2[0]}m`, right = `\x1B[${formatCodes2[1]}m${right}`;
    }
    return `${left}${text}${right}`;
  }
  let formatCodes = inspect.colors[format2];
  if (formatCodes == null)
    validateOneOf(format2, "format", ObjectKeys(inspect.colors));
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
  lazyAbortedRegistry.unregister(resolveFn), resolveFn();
}
function aborted(signal, resource) {
  if (!__intrinsic__isObject(signal) || !(signal instanceof __intrinsic__AbortSignal))
    throw __intrinsic__makeErrorWithCode(118, "signal", "AbortSignal", signal);
  if (!__intrinsic__isObject(resource))
    throw __intrinsic__makeErrorWithCode(118, "resource", "object", resource);
  if (signal.aborted)
    return __intrinsic__Promise.__intrinsic__resolve();
  let { promise, resolve } = __intrinsic__newPromiseCapability(__intrinsic__Promise), unregisterToken = onAbortedCallback.bind(__intrinsic__undefined, resolve);
  if (signal.addEventListener("abort", unregisterToken, { once: !0 }), !lazyAbortedRegistry)
    lazyAbortedRegistry = new FinalizationRegistry(({ ref, unregisterToken: unregisterToken2 }) => {
      let signal2 = ref.deref();
      if (signal2)
        signal2.removeEventListener("abort", unregisterToken2);
    });
  return lazyAbortedRegistry.register(resource, {
    ref: new WeakRef(signal),
    unregisterToken
  }, unregisterToken), promise;
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
