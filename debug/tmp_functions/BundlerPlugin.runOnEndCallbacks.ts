// @ts-nocheck
// GENERATED TEMP FILE - DO NOT EDIT
// Sourced from ../../../src/js/builtins/BundlerPlugin.ts

// do not allow the bundler to rename a symbol to $
($);

$$capture_start$$(function(promise,buildResult,buildRejection,) {  const callbacks = this.onEndCallbacks;
  if (!callbacks) return;
  const promises: PromiseLike<unknown>[] = [];

  for (const callback of callbacks) {
    try {
      const result = callback(buildResult);

      if (result && __intrinsic__isPromise(result)) {
        __intrinsic__arrayPush(promises, result);
      }
    } catch (e) {
      __intrinsic__arrayPush(promises, Promise.__intrinsic__reject(e));
    }
  }

  if (promises.length > 0) {
    // we return the promise here because detecting if the promise was handled or not
    // in bundle_v2.zig is done by checking if this function did not return undefined
    return Promise.all(promises).then(
      () => {
        if (buildRejection !== undefined) {
          __intrinsic__rejectPromise(promise, buildRejection);
        } else {
          __intrinsic__resolvePromise(promise, buildResult);
        }
      },
      e => {
        __intrinsic__rejectPromise(promise, e);
      },
    );
  }
}).$$capture_end$$;
