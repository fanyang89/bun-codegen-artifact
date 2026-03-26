// @ts-nocheck
// GENERATED TEMP FILE - DO NOT EDIT
// Sourced from ../../../src/js/builtins/ReadableStream.ts

// do not allow the bundler to rename a symbol to $
($);

$$capture_start$$(function(stream) {  if (!__intrinsic__isReadableStream(stream)) throw __intrinsic__makeErrorWithCode(118, "stream", "ReadableStream", typeof stream);
  if (__intrinsic__isReadableStreamLocked(stream)) return Promise.__intrinsic__reject(__intrinsic__makeErrorWithCode(136, "ReadableStream is locked"));

  return (
    __intrinsic__tryUseReadableStreamBufferedFastPath(stream, "blob") ||
    Promise.__intrinsic__resolve(Bun.readableStreamToArray(stream)).then(array => new Blob(array))
  );
}).$$capture_end$$;
