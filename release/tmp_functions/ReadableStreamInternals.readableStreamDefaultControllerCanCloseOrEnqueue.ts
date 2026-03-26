// @ts-nocheck
// GENERATED TEMP FILE - DO NOT EDIT
// Sourced from ../../../src/js/builtins/ReadableStreamInternals.ts

// do not allow the bundler to rename a symbol to $
($);

$$capture_start$$(function(controller) {  if (__intrinsic__getByIdDirectPrivate(controller, "closeRequested")) {
    return false;
  }

  const controlledReadableStream = __intrinsic__getByIdDirectPrivate(controller, "controlledReadableStream");

  if (!__intrinsic__isObject(controlledReadableStream)) {
    return false;
  }

  return __intrinsic__getByIdDirectPrivate(controlledReadableStream, "state") === __intrinsic__streamReadable;
}).$$capture_end$$;
