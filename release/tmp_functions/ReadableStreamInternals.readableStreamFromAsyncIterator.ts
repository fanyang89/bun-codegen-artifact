// @ts-nocheck
// GENERATED TEMP FILE - DO NOT EDIT
// Sourced from ../../../src/js/builtins/ReadableStreamInternals.ts

// do not allow the bundler to rename a symbol to $
($);

$$capture_start$$(function(target,fn) {  var cancelled = false,
    iter: AsyncIterator<any>;

  // We must eagerly start the async generator to ensure that it works if objects are reused later.
  // This impacts Astro, amongst others.
  iter = fn.__intrinsic__call(target);
  fn = target = undefined;

  if (!__intrinsic__isAsyncGenerator(iter) && typeof iter.next !== "function") {
    __intrinsic__throwTypeError("Expected an async generator");
  }

  var runningAsyncIteratorPromise;
  async function runAsyncIterator(controller) {
    var closingError: Error | undefined, value, done, immediateTask;

    try {
      while (!cancelled && !done) {
        const promise = iter.next(controller);

        if (cancelled) {
          return;
        }

        if (__intrinsic__isPromise(promise) && ((__intrinsic__getPromiseInternalField((promise), __intrinsic__promiseFieldFlags) & __intrinsic__promiseStateMask) === __intrinsic__promiseStateFulfilled)) {
          clearImmediate(immediateTask);
          ({ value, done } = __intrinsic__getPromiseInternalField(promise, __intrinsic__promiseFieldReactionsOrResult));
          !(IS_BUN_DEVELOPMENT?$assert(!__intrinsic__isPromise(value),"!$isPromise(value)", "Expected a value, not a promise"):void 0);
        } else {
          immediateTask = setImmediate(() => immediateTask && controller?.flush?.(true));
          ({ value, done } = await promise);

          if (cancelled) {
            return;
          }
        }

        if (!__intrinsic__isUndefinedOrNull(value)) {
          controller.write(value);
        }
      }
    } catch (e) {
      closingError = e;
    } finally {
      clearImmediate(immediateTask);
      immediateTask = undefined;
      // "iter" will be undefined if the stream was closed above.

      // Stream was closed before we tried writing to it.
      if (closingError?.code === "ERR_INVALID_THIS") {
        await iter?.return?.();
        return;
      }

      if (closingError) {
        try {
          await iter.throw?.(closingError);
        } finally {
          iter = undefined;
          // eslint-disable-next-line no-throw-literal
          throw closingError;
        }
      } else {
        await controller.end();
        if (iter) {
          await iter.return?.();
        }
      }
      iter = undefined;
    }
  }

  return new ReadableStream({
    type: "direct",

    cancel(reason) {
      (IS_BUN_DEVELOPMENT?$debug_log("readableStreamFromAsyncIterator.cancel", reason):void 0);
      cancelled = true;

      if (iter) {
        const thisIter = iter;
        iter = undefined;
        if (reason) {
          // We return the value so that the caller can await it.
          return thisIter.throw?.(reason);
        } else {
          // undefined === Abort.
          //
          // We don't want to throw here because it will almost
          // inevitably become an uncatchable exception. So instead, we call the
          // synthetic return method if it exists to signal that the stream is
          // done.
          return thisIter?.return?.();
        }
      }
    },

    close() {
      cancelled = true;
    },

    async pull(controller) {
      // pull() may be called multiple times before a single call completes.
      //
      // But, we only call into the stream once while a stream is in-progress.
      if (!runningAsyncIteratorPromise) {
        const asyncIteratorPromise = runAsyncIterator(controller);
        runningAsyncIteratorPromise = asyncIteratorPromise;
        try {
          const result = await asyncIteratorPromise;
          return result;
        } finally {
          if (runningAsyncIteratorPromise === asyncIteratorPromise) {
            runningAsyncIteratorPromise = undefined;
          }
        }
      }

      return runningAsyncIteratorPromise;
    },
  });
}).$$capture_end$$;
