// @ts-nocheck
// GENERATED TEMP FILE - DO NOT EDIT
// Sourced from ../../../src/js/builtins/ReadableStreamBYOBReader.ts

// do not allow the bundler to rename a symbol to $
($);

$$capture_start$$(function(view) {  if (!__intrinsic__isReadableStreamBYOBReader(this)) return Promise.__intrinsic__reject(__intrinsic__makeErrorWithCode(138, "ReadableStreamBYOBReader"));

  if (!__intrinsic__getByIdDirectPrivate(this, "ownerReadableStream"))
    return Promise.__intrinsic__reject(__intrinsic__makeErrorWithCode(136, "The reader is not attached to a stream"));

  if (!__intrinsic__isObject(view)) return Promise.__intrinsic__reject(__intrinsic__makeErrorWithCode(118, "view", "Buffer, TypedArray, or DataView", view));

  if (!ArrayBuffer.__intrinsic__isView(view))
    return Promise.__intrinsic__reject(__intrinsic__makeErrorWithCode(118, "view", "Buffer, TypedArray, or DataView", view));

  if (view.byteLength === 0) return Promise.__intrinsic__reject(__intrinsic__makeTypeError("Provided view cannot have a 0 byteLength"));

  return __intrinsic__readableStreamBYOBReaderRead(this, view);
}).$$capture_end$$;
