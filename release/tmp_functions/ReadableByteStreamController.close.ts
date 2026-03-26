// @ts-nocheck
// GENERATED TEMP FILE - DO NOT EDIT
// Sourced from ../../../src/js/builtins/ReadableByteStreamController.ts

// do not allow the bundler to rename a symbol to $
($);

$$capture_start$$(function() {  if (!__intrinsic__isReadableByteStreamController(this)) throw __intrinsic__makeErrorWithCode(138, "ReadableByteStreamController");

  if (__intrinsic__getByIdDirectPrivate(this, "closeRequested")) __intrinsic__throwTypeError("Close has already been requested");

  if (__intrinsic__getByIdDirectPrivate(__intrinsic__getByIdDirectPrivate(this, "controlledReadableStream"), "state") !== __intrinsic__streamReadable)
    throw __intrinsic__makeErrorWithCode(136, "Controller is already closed");

  __intrinsic__readableByteStreamControllerClose(this);
}).$$capture_end$$;
