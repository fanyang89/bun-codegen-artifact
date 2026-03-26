// @ts-nocheck
// GENERATED TEMP FILE - DO NOT EDIT
// Sourced from ../../../src/js/builtins/ReadableByteStreamController.ts

// do not allow the bundler to rename a symbol to $
($);

$$capture_start$$(function(chunk) {  if (!__intrinsic__isReadableByteStreamController(this)) throw __intrinsic__makeErrorWithCode(138, "ReadableByteStreamController");

  if (__intrinsic__getByIdDirectPrivate(this, "closeRequested")) throw __intrinsic__makeErrorWithCode(136, "Controller is already closed");

  if (__intrinsic__getByIdDirectPrivate(__intrinsic__getByIdDirectPrivate(this, "controlledReadableStream"), "state") !== __intrinsic__streamReadable)
    throw __intrinsic__makeErrorWithCode(136, "Controller is already closed");

  if (!__intrinsic__isObject(chunk) || !ArrayBuffer.__intrinsic__isView(chunk))
    throw __intrinsic__makeErrorWithCode(118, "buffer", "Buffer, TypedArray, or DataView", chunk);

  return __intrinsic__readableByteStreamControllerEnqueue(this, chunk);
}).$$capture_end$$;
