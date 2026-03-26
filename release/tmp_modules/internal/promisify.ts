// @ts-nocheck
var $;// GENERATED TEMP FILE - DO NOT EDIT
// Sourced from src/js/internal/promisify.ts


const kCustomPromisifiedSymbol = Symbol.for("nodejs.util.promisify.custom");
const kCustomPromisifyArgsSymbol = Symbol("customPromisifyArgs");

const { validateFunction } = (__intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 68/*internal/validators*/) || __intrinsic__createInternalModuleById(68/*internal/validators*/));

function defineCustomPromisify(target, callback) {
  Object.defineProperty(target, kCustomPromisifiedSymbol, {
    value: callback,
    configurable: true,
  });

  return callback;
}

function defineCustomPromisifyArgs(target, args) {
  Object.defineProperty(target, kCustomPromisifyArgsSymbol, {
    value: args,
    enumerable: false,
  });
  return args;
}

var promisify = function promisify(original) {
  validateFunction(original, "original");
  const custom = original[kCustomPromisifiedSymbol];
  if (custom) {
    validateFunction(custom, "custom");
    // ensure that we don't create another promisified function wrapper
    return defineCustomPromisify(custom, custom);
  }

  const callbackArgs = original[kCustomPromisifyArgsSymbol];
  function fn(...originalArgs) {
    const { promise, resolve, reject } = Promise.withResolvers();
    try {
      const maybePromise = original.__intrinsic__apply(this, [
        ...originalArgs,
        function (err, ...values) {
          if (err) {
            return reject(err);
          }

          if (callbackArgs !== undefined) {
            // if (!Array.isArray(callbackArgs)) {
            //   throw new TypeError('The "customPromisifyArgs" argument must be of type Array');
            // }
            // if (callbackArgs.length !== values.length) {
            //   throw new Error("Mismatched length in promisify callback args");
            // }
            const result = {};
            for (let i = 0; i < callbackArgs.length; i++) {
              result[callbackArgs[i]] = values[i];
            }
            resolve(result);
          } else {
            resolve(values[0]);
          }
        },
      ]);

      if (__intrinsic__isPromise(maybePromise)) {
        process.emitWarning(
          "Calling promisify on a function that returns a Promise is likely a mistake.",
          "DeprecationWarning",
          "DEP0174",
        );
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

// Load node:timers/promises promisified functions onto the global timers.
{
  const { setTimeout: timeout, setImmediate: immediate, setInterval: interval } = globalThis;
  const {
    setTimeout: timeoutPromise,
    setImmediate: immediatePromise,
    setInterval: intervalPromise,
  } = (__intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 120/*node:timers/promises*/) || __intrinsic__createInternalModuleById(120/*node:timers/promises*/));

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
  promisify,
};
;$$EXPORT$$($).$$EXPORT_END$$;
