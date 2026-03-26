(function (){"use strict";// build/debug/tmp_modules/node/timers.promises.ts
var $;
var { validateBoolean, validateAbortSignal, validateObject, validateNumber } = @getInternalField(@internalModuleRegistry, 68) || @createInternalModuleById(68);
var symbolAsyncIterator = Symbol.asyncIterator;
var setImmediateGlobal = globalThis.setImmediate;
var setTimeoutGlobal = globalThis.setTimeout;
var setIntervalGlobal = globalThis.setInterval;
function asyncIterator({ next: nextFunction, return: returnFunction }) {
  const result = {};
  if (typeof nextFunction === "function") {
    result.next = nextFunction;
  }
  if (typeof returnFunction === "function") {
    result.return = returnFunction;
  }
  result[symbolAsyncIterator] = function() {
    return this;
  };
  return result;
}
function setTimeout(after = 1, value, options = {}) {
  const arguments_ = [].concat(value ?? []);
  try {
    if (typeof after != "number") {
      validateNumber(after, "delay");
    }
  } catch (error) {
    return @Promise.@reject(error);
  }
  try {
    validateObject(options, "options");
  } catch (error) {
    return @Promise.@reject(error);
  }
  const { signal, ref: reference = true } = options;
  try {
    validateAbortSignal(signal, "options.signal");
  } catch (error) {
    return @Promise.@reject(error);
  }
  try {
    validateBoolean(reference, "options.ref");
  } catch (error) {
    return @Promise.@reject(error);
  }
  if (signal?.aborted) {
    return @Promise.@reject(@makeAbortError(@undefined, { cause: signal.reason }));
  }
  let onCancel;
  const returnValue = new @Promise((resolve, reject) => {
    const timeout = setTimeoutGlobal(() => resolve(value), after, ...arguments_);
    if (!reference) {
      timeout?.unref?.();
    }
    if (signal) {
      onCancel = () => {
        clearTimeout(timeout);
        reject(@makeAbortError(@undefined, { cause: signal.reason }));
      };
      signal.addEventListener("abort", onCancel);
    }
  });
  return typeof onCancel !== "undefined" ? returnValue.finally(() => signal.removeEventListener("abort", onCancel)) : returnValue;
}
function setImmediate(value, options = {}) {
  try {
    validateObject(options, "options");
  } catch (error) {
    return @Promise.@reject(error);
  }
  const { signal, ref: reference = true } = options;
  try {
    validateAbortSignal(signal, "options.signal");
  } catch (error) {
    return @Promise.@reject(error);
  }
  try {
    validateBoolean(reference, "options.ref");
  } catch (error) {
    return @Promise.@reject(error);
  }
  if (signal?.aborted) {
    return @Promise.@reject(@makeAbortError(@undefined, { cause: signal.reason }));
  }
  let onCancel;
  const returnValue = new @Promise((resolve, reject) => {
    const immediate = setImmediateGlobal(() => resolve(value));
    if (!reference) {
      immediate?.unref?.();
    }
    if (signal) {
      onCancel = () => {
        clearImmediate(immediate);
        reject(@makeAbortError(@undefined, { cause: signal.reason }));
      };
      signal.addEventListener("abort", onCancel);
    }
  });
  return typeof onCancel !== "undefined" ? returnValue.finally(() => signal.removeEventListener("abort", onCancel)) : returnValue;
}
function setInterval(after = 1, value, options = {}) {
  try {
    if (typeof after != "number") {
      validateNumber(after, "delay");
    }
  } catch (error) {
    return asyncIterator({
      next: function() {
        return @Promise.@reject(error);
      }
    });
  }
  try {
    validateObject(options, "options");
  } catch (error) {
    return asyncIterator({
      next: function() {
        return @Promise.@reject(error);
      }
    });
  }
  const { signal, ref: reference = true } = options;
  try {
    validateAbortSignal(signal, "options.signal");
  } catch (error) {
    return asyncIterator({
      next: function() {
        return @Promise.@reject(error);
      }
    });
  }
  try {
    validateBoolean(reference, "options.ref");
  } catch (error) {
    return asyncIterator({
      next: function() {
        return @Promise.@reject(error);
      }
    });
  }
  if (signal?.aborted) {
    return asyncIterator({
      next: function() {
        return @Promise.@reject(@makeAbortError(@undefined, { cause: signal.reason }));
      }
    });
  }
  let onCancel, interval;
  try {
    let notYielded = 0;
    let callback;
    interval = setIntervalGlobal(() => {
      notYielded++;
      if (callback) {
        callback();
        callback = @undefined;
      }
    }, after);
    if (!reference) {
      interval?.unref?.();
    }
    if (signal) {
      onCancel = () => {
        clearInterval(interval);
        if (callback) {
          callback();
          callback = @undefined;
        }
      };
      signal.addEventListener("abort", onCancel);
    }
    return asyncIterator({
      next: function() {
        return new @Promise((resolve, reject) => {
          if (!signal?.aborted) {
            if (notYielded === 0) {
              callback = resolve;
            } else {
              resolve();
            }
          } else if (notYielded === 0) {
            reject(@makeAbortError(@undefined, { cause: signal.reason }));
          } else {
            resolve();
          }
        }).then(() => {
          if (notYielded > 0) {
            notYielded = notYielded - 1;
            return { done: false, value };
          } else if (signal?.aborted) {
            throw @makeAbortError(@undefined, { cause: signal.reason });
          }
          return { done: true };
        });
      },
      return: function() {
        clearInterval(interval);
        signal?.removeEventListener("abort", onCancel);
        return @Promise.@resolve({});
      }
    });
  } catch {
    return asyncIterator({
      next: function() {
        clearInterval(interval);
        signal?.removeEventListener("abort", onCancel);
      }
    });
  }
}
$ = {
  setTimeout,
  setImmediate,
  setInterval,
  scheduler: {
    wait: (delay, options) => setTimeout(delay, @undefined, options),
    yield: setImmediate
  }
};
return $})
