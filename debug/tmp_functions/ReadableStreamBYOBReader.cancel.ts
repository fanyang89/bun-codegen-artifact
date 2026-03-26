// @ts-nocheck
// GENERATED TEMP FILE - DO NOT EDIT
// Sourced from ../../../src/js/builtins/ReadableStreamBYOBReader.ts

// do not allow the bundler to rename a symbol to $
($);

$$capture_start$$(function(reason) {  if (!__intrinsic__isReadableStreamBYOBReader(this)) return Promise.__intrinsic__reject(__intrinsic__makeErrorWithCode(138, "ReadableStreamBYOBReader"));

  if (!__intrinsic__getByIdDirectPrivate(this, "ownerReadableStream"))
    return Promise.__intrinsic__reject(__intrinsic__makeErrorWithCode(136, "The reader is not attached to a stream"));

  return __intrinsic__readableStreamReaderGenericCancel(this, reason);
}).$$capture_end$$;
