// @ts-nocheck
// GENERATED TEMP FILE - DO NOT EDIT
// Sourced from ../../../src/js/builtins/ReadableByteStreamInternals.ts

// do not allow the bundler to rename a symbol to $
($);

$$capture_start$$(function(controller) {  !(IS_BUN_DEVELOPMENT?$assert(controller,"controller"):void 0);
  const stream = __intrinsic__getByIdDirectPrivate(controller, "controlledReadableStream");
  if (!stream) {
    return false;
  }

  if (__intrinsic__getByIdDirectPrivate(stream, "state") !== __intrinsic__streamReadable) return false;
  if (__intrinsic__getByIdDirectPrivate(controller, "closeRequested")) return false;
  if (!(__intrinsic__getByIdDirectPrivate(controller, "started") > 0)) return false;
  const reader = __intrinsic__getByIdDirectPrivate(stream, "reader");

  if (reader && (__intrinsic__getByIdDirectPrivate(reader, "readRequests")?.isNotEmpty() || !!reader.__intrinsic__bunNativePtr)) return true;
  if (
    __intrinsic__readableStreamHasBYOBReader(stream) &&
    __intrinsic__getByIdDirectPrivate(__intrinsic__getByIdDirectPrivate(stream, "reader"), "readIntoRequests")?.isNotEmpty()
  )
    return true;
  if (__intrinsic__readableByteStreamControllerGetDesiredSize(controller) > 0) return true;
  return false;
}).$$capture_end$$;
