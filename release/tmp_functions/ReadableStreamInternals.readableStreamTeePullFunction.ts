// @ts-nocheck
// GENERATED TEMP FILE - DO NOT EDIT
// Sourced from ../../../src/js/builtins/ReadableStreamInternals.ts

const enum TeeStateFlags {
  canceled1 = 1 << 0,
  canceled2 = 1 << 1,
  reading = 1 << 2,
  closedOrErrored = 1 << 3,
  readAgain = 1 << 4,
}
// do not allow the bundler to rename a symbol to $
($);

$$capture_start$$(function(teeState,reader,shouldClone) {  "use strict";

  const pullAlgorithm = function () {
    if (teeState.flags & TeeStateFlags.reading) {
      teeState.flags |= TeeStateFlags.readAgain;
      return Promise.__intrinsic__resolve();
    }
    teeState.flags |= TeeStateFlags.reading;
    __intrinsic__Promise.prototype.__intrinsic__then.__intrinsic__call(
      __intrinsic__readableStreamDefaultReaderRead(reader),
      function (result) {
        !(IS_BUN_DEVELOPMENT?$assert(__intrinsic__isObject(result),"$isObject(result)"):void 0);
        !(IS_BUN_DEVELOPMENT?$assert(typeof result.done === "boolean","typeof result.done === \"boolean\""):void 0);
        const { done, value } = result;
        if (done) {
          // close steps.
          teeState.flags &= ~TeeStateFlags.reading;
          if (!(teeState.flags & TeeStateFlags.canceled1))
            __intrinsic__readableStreamDefaultControllerClose(teeState.branch1.__intrinsic__readableStreamController);
          if (!(teeState.flags & TeeStateFlags.canceled2))
            __intrinsic__readableStreamDefaultControllerClose(teeState.branch2.__intrinsic__readableStreamController);
          if (!(teeState.flags & TeeStateFlags.canceled1) || !(teeState.flags & TeeStateFlags.canceled2))
            teeState.cancelPromiseCapability.resolve.__intrinsic__call();
          return;
        }
        // chunk steps.
        teeState.flags &= ~TeeStateFlags.readAgain;
        let chunk1 = value;
        let chunk2 = value;
        if (!(teeState.flags & TeeStateFlags.canceled2) && shouldClone) {
          try {
            chunk2 = __intrinsic__structuredCloneForStream(value);
          } catch (e) {
            __intrinsic__readableStreamDefaultControllerError(teeState.branch1.__intrinsic__readableStreamController, e);
            __intrinsic__readableStreamDefaultControllerError(teeState.branch2.__intrinsic__readableStreamController, e);
            __intrinsic__readableStreamCancel(teeState.stream, e).__intrinsic__then(
              teeState.cancelPromiseCapability.resolve,
              teeState.cancelPromiseCapability.reject,
            );
            return;
          }
        }
        if (!(teeState.flags & TeeStateFlags.canceled1))
          __intrinsic__readableStreamDefaultControllerEnqueue(teeState.branch1.__intrinsic__readableStreamController, chunk1);
        if (!(teeState.flags & TeeStateFlags.canceled2))
          __intrinsic__readableStreamDefaultControllerEnqueue(teeState.branch2.__intrinsic__readableStreamController, chunk2);
        teeState.flags &= ~TeeStateFlags.reading;

        Promise.__intrinsic__resolve().__intrinsic__then(() => {
          if (teeState.flags & TeeStateFlags.readAgain) pullAlgorithm();
        });
      },
      () => {
        // error steps.
        teeState.flags &= ~TeeStateFlags.reading;
      },
    );
    return Promise.__intrinsic__resolve();
  };
  return pullAlgorithm;
}).$$capture_end$$;
