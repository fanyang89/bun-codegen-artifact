// @bun
// build/debug/tmp_modules/internal/promisify.ts
var $;
var kCustomPromisifiedSymbol = Symbol.for("nodejs.util.promisify.custom");
var kCustomPromisifyArgsSymbol = Symbol("customPromisifyArgs");
var { validateFunction } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 68) || __intrinsic__createInternalModuleById(68);
function defineCustomPromisify(target, callback) {
  Object.defineProperty(target, kCustomPromisifiedSymbol, {
    value: callback,
    configurable: true
  });
  return callback;
}
function defineCustomPromisifyArgs(target, args) {
  Object.defineProperty(target, kCustomPromisifyArgsSymbol, {
    value: args,
    enumerable: false
  });
  return args;
}
var promisify = function promisify2(original) {
  validateFunction(original, "original");
  const custom = original[kCustomPromisifiedSymbol];
  if (custom) {
    validateFunction(custom, "custom");
    return defineCustomPromisify(custom, custom);
  }
  const callbackArgs = original[kCustomPromisifyArgsSymbol];
  function fn(...originalArgs) {
    const { promise, resolve, reject } = __intrinsic__Promise.withResolvers();
    try {
      const maybePromise = original.__intrinsic__apply(this, [
        ...originalArgs,
        function(err, ...values) {
          if (err) {
            return reject(err);
          }
          if (callbackArgs !== __intrinsic__undefined) {
            const result = {};
            for (let i = 0;i < callbackArgs.length; i++) {
              result[callbackArgs[i]] = values[i];
            }
            resolve(result);
          } else {
            resolve(values[0]);
          }
        }
      ]);
      if (__intrinsic__isPromise(maybePromise)) {
        process.emitWarning("Calling promisify on a function that returns a Promise is likely a mistake.", "DeprecationWarning", "DEP0174");
      }
    } catch (err) {
      reject(err);
    }
    return promise;
  }
  Object.setPrototypeOf(fn, Object.getPrototypeOf(original));
  defineCustomPromisify(fn, fn);
  return Object.defineProperties(fn, Object.getOwnPropertyDescriptors(original));
};
promisify.custom = kCustomPromisifiedSymbol;
{
  const { setTimeout: timeout, setImmediate: immediate, setInterval: interval } = globalThis;
  const {
    setTimeout: timeoutPromise,
    setImmediate: immediatePromise,
    setInterval: intervalPromise
  } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 120) || __intrinsic__createInternalModuleById(120);
  if (timeout && __intrinsic__isCallable(timeout)) {
    defineCustomPromisify(timeout, timeoutPromise);
  }
  if (immediate && __intrinsic__isCallable(immediate)) {
    defineCustomPromisify(immediate, immediatePromise);
  }
  if (interval && __intrinsic__isCallable(interval)) {
    defineCustomPromisify(interval, intervalPromise);
  }
}
$ = {
  defineCustomPromisify,
  defineCustomPromisifyArgs,
  promisify
};
$$EXPORT$$($).$$EXPORT_END$$;
