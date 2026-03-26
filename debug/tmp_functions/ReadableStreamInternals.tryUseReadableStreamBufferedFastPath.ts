// @ts-nocheck
// GENERATED TEMP FILE - DO NOT EDIT
// Sourced from ../../../src/js/builtins/ReadableStreamInternals.ts

// do not allow the bundler to rename a symbol to $
($);

$$capture_start$$(function(stream,method) {  // -- Fast path for Blob.prototype.stream(), fetch body streams, and incoming Request body streams --
  const ptr = stream.__intrinsic__bunNativePtr;
  if (
    // only available on native streams
    ptr &&
    // don't even attempt it if the stream was used in some way
    !__intrinsic__isReadableStreamDisturbed(stream) &&
    // feature-detect if supported
    __intrinsic__isCallable(ptr[method])
  ) {
    const promise = ptr[method]();
    // if it throws, let it throw without setting $disturbed
    stream.__intrinsic__disturbed = true;

    // Clear the lazy load function.
    __intrinsic__putByIdDirectPrivate(stream, "start", undefined);
    __intrinsic__putByIdDirectPrivate(stream, "reader", {});

    if (Bun.peek.status(promise) === "fulfilled") {
      stream.__intrinsic__reader = undefined;
      __intrinsic__readableStreamCloseIfPossible(stream);
      return promise;
    }

    return promise
      .catch(e => {
        stream.__intrinsic__reader = undefined;
        __intrinsic__readableStreamCancel(stream, e);
        return Promise.__intrinsic__reject(e);
      })
      .finally(() => {
        stream.__intrinsic__reader = undefined;
        __intrinsic__readableStreamCloseIfPossible(stream);
      });
  }
}).$$capture_end$$;
