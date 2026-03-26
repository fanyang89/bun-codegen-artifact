// @bun
// build/release/tmp_modules/internal/promisify.ts
var $, kCustomPromisifiedSymbol = Symbol.for("nodejs.util.promisify.custom"), kCustomPromisifyArgsSymbol = Symbol("customPromisifyArgs"), { validateFunction } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 68) || __intrinsic__createInternalModuleById(68);
function defineCustomPromisify(target, callback) {
  return Object.defineProperty(target, kCustomPromisifiedSymbol, {
    value: callback,
    configurable: !0
  }), callback;
}
function defineCustomPromisifyArgs(target, args) {
  return Object.defineProperty(target, kCustomPromisifyArgsSymbol, {
    value: args,
    enumerable: !1
  }), args;
}
var promisify = function promisify2(original) {
  validateFunction(original, "original");
  let custom = original[kCustomPromisifiedSymbol];
  if (custom)
    return validateFunction(custom, "custom"), defineCustomPromisify(custom, custom);
  let callbackArgs = original[kCustomPromisifyArgsSymbol];
  function fn(...originalArgs) {
    let { promise, resolve, reject } = __intrinsic__Promise.withResolvers();
    try {
      let maybePromise = original.__intrinsic__apply(this, [
        ...originalArgs,
        function(err, ...values) {
          if (err)
            return reject(err);
          if (callbackArgs !== __intrinsic__undefined) {
            let result = {};
            for (let i = 0;i < callbackArgs.length; i++)
              result[callbackArgs[i]] = values[i];
            resolve(result);
          } else
            resolve(values[0]);
        }
      ]);
      if (__intrinsic__isPromise(maybePromise))
        process.emitWarning("Calling promisify on a function that returns a Promise is likely a mistake.", "DeprecationWarning", "DEP0174");
    } catch (err) {
      reject(err);
    }
    return promise;
  }
  return Object.setPrototypeOf(fn, Object.getPrototypeOf(original)), defineCustomPromisify(fn, fn), Object.defineProperties(fn, Object.getOwnPropertyDescriptors(original));
};
promisify.custom = kCustomPromisifiedSymbol;
{
  let { setTimeout: timeout, setImmediate: immediate, setInterval: interval } = globalThis, {
    setTimeout: timeoutPromise,
    setImmediate: immediatePromise,
    setInterval: intervalPromise
  } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 120) || __intrinsic__createInternalModuleById(120);
  if (timeout && __intrinsic__isCallable(timeout))
    defineCustomPromisify(timeout, timeoutPromise);
  if (immediate && __intrinsic__isCallable(immediate))
    defineCustomPromisify(immediate, immediatePromise);
  if (interval && __intrinsic__isCallable(interval))
    defineCustomPromisify(interval, intervalPromise);
}
$ = {
  defineCustomPromisify,
  defineCustomPromisifyArgs,
  promisify
};
$$EXPORT$$($).$$EXPORT_END$$;
