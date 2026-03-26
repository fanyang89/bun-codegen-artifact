// @ts-nocheck
// GENERATED TEMP FILE - DO NOT EDIT
// Sourced from ../../../src/js/builtins/ReadableStreamDefaultController.ts

// do not allow the bundler to rename a symbol to $
($);

$$capture_start$$(function(chunk) {  if (!__intrinsic__isReadableStreamDefaultController(this)) throw __intrinsic__makeErrorWithCode(138, "ReadableStreamDefaultController");

  if (!__intrinsic__readableStreamDefaultControllerCanCloseOrEnqueue(this)) {
    throw __intrinsic__makeErrorWithCode(136, "Controller is already closed");
  }

  return __intrinsic__readableStreamDefaultControllerEnqueue(this, chunk);
}).$$capture_end$$;
