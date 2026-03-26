// @ts-nocheck
// GENERATED TEMP FILE - DO NOT EDIT
// Sourced from ../../../src/js/builtins/ReadableStreamBYOBRequest.ts

// do not allow the bundler to rename a symbol to $
($);

$$capture_start$$(function(bytesWritten) {  if (!__intrinsic__isReadableStreamBYOBRequest(this)) throw __intrinsic__makeErrorWithCode(138, "ReadableStreamBYOBRequest");

  if (__intrinsic__getByIdDirectPrivate(this, "associatedReadableByteStreamController") == null)
    throw __intrinsic__makeErrorWithCode(136, "This BYOB request has been invalidated");

  return __intrinsic__readableByteStreamControllerRespond(
    __intrinsic__getByIdDirectPrivate(this, "associatedReadableByteStreamController"),
    bytesWritten,
  );
}).$$capture_end$$;
