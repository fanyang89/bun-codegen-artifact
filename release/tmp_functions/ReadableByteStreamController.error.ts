// @ts-nocheck
// GENERATED TEMP FILE - DO NOT EDIT
// Sourced from ../../../src/js/builtins/ReadableByteStreamController.ts

// do not allow the bundler to rename a symbol to $
($);

$$capture_start$$(function(error) {  if (!__intrinsic__isReadableByteStreamController(this)) throw __intrinsic__makeErrorWithCode(138, "ReadableByteStreamController");

  if (__intrinsic__getByIdDirectPrivate(__intrinsic__getByIdDirectPrivate(this, "controlledReadableStream"), "state") !== __intrinsic__streamReadable)
    throw __intrinsic__makeErrorWithCode(136, "Controller is already closed");

  __intrinsic__readableByteStreamControllerError(this, error);
}).$$capture_end$$;
