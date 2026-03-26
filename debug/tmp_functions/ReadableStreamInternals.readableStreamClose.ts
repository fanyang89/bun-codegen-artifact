// @ts-nocheck
// GENERATED TEMP FILE - DO NOT EDIT
// Sourced from ../../../src/js/builtins/ReadableStreamInternals.ts

// do not allow the bundler to rename a symbol to $
($);

$$capture_start$$(function(stream) {  !(IS_BUN_DEVELOPMENT?$assert(
    __intrinsic__getByIdDirectPrivate(stream, "state") === __intrinsic__streamReadable ||
      __intrinsic__getByIdDirectPrivate(stream, "state") === __intrinsic__streamClosing,"$getByIdDirectPrivate(stream, \"state\") === $streamReadable ||\n      $getByIdDirectPrivate(stream, \"state\") === $streamClosing"):void 0);
  __intrinsic__putByIdDirectPrivate(stream, "state", __intrinsic__streamClosed);
  const reader = __intrinsic__getByIdDirectPrivate(stream, "reader");
  if (!reader) return;

  if (__intrinsic__isReadableStreamDefaultReader(reader)) {
    const requests = __intrinsic__getByIdDirectPrivate(reader, "readRequests");
    if (requests.isNotEmpty()) {
      __intrinsic__putByIdDirectPrivate(reader, "readRequests", __intrinsic__createFIFO());

      for (var request = requests.shift(); request; request = requests.shift())
        __intrinsic__fulfillPromise(request, { value: undefined, done: true });
    }
  }

  __intrinsic__getByIdDirectPrivate(__intrinsic__getByIdDirectPrivate(stream, "reader"), "closedPromiseCapability").resolve.__intrinsic__call();
}).$$capture_end$$;
