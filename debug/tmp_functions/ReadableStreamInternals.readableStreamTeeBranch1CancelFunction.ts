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

$$capture_start$$(function(teeState,stream) {  return function (r) {
    teeState.flags |= TeeStateFlags.canceled1;
    teeState.reason1 = r;
    if (teeState.flags & TeeStateFlags.canceled2) {
      __intrinsic__readableStreamCancel(stream, [teeState.reason1, teeState.reason2]).__intrinsic__then(
        teeState.cancelPromiseCapability.resolve,
        teeState.cancelPromiseCapability.reject,
      );
    }
    return teeState.cancelPromiseCapability.promise;
  };
}).$$capture_end$$;
