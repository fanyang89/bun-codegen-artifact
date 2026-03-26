// @ts-nocheck
// GENERATED TEMP FILE - DO NOT EDIT
// Sourced from ../../../src/js/builtins/ReadableStream.ts

// do not allow the bundler to rename a symbol to $
($);

$$capture_start$$(function(stream) {  if (!__intrinsic__isReadableStream(stream)) throw __intrinsic__makeErrorWithCode(118, "stream", "ReadableStream", typeof stream);
  // this is a direct stream
  var underlyingSource = __intrinsic__getByIdDirectPrivate(stream, "underlyingSource");
  if (underlyingSource != null) {
    return __intrinsic__readableStreamToArrayDirect(stream, underlyingSource);
  }
  if (__intrinsic__isReadableStreamLocked(stream)) return Promise.__intrinsic__reject(__intrinsic__makeErrorWithCode(136, "ReadableStream is locked"));
  return __intrinsic__readableStreamIntoArray(stream);
}).$$capture_end$$;
