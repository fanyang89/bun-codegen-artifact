// @ts-nocheck
// GENERATED TEMP FILE - DO NOT EDIT
// Sourced from ../../../src/js/builtins/ReadableStreamBYOBRequest.ts

// do not allow the bundler to rename a symbol to $
($);

$$capture_start$$(function(view) {  if (!__intrinsic__isReadableStreamBYOBRequest(this)) throw __intrinsic__makeErrorWithCode(138, "ReadableStreamBYOBRequest");

  if (__intrinsic__getByIdDirectPrivate(this, "associatedReadableByteStreamController") == null)
    throw __intrinsic__makeErrorWithCode(136, "This BYOB request has been invalidated");

  if (!__intrinsic__isObject(view)) throw __intrinsic__makeErrorWithCode(118, "view", "Buffer, TypedArray, or DataView", view);

  if (!ArrayBuffer.__intrinsic__isView(view)) throw __intrinsic__makeErrorWithCode(118, "view", "Buffer, TypedArray, or DataView", view);

  return __intrinsic__readableByteStreamControllerRespondWithNewView(
    __intrinsic__getByIdDirectPrivate(this, "associatedReadableByteStreamController"),
    view,
  );
}).$$capture_end$$;
