// @ts-nocheck
// GENERATED TEMP FILE - DO NOT EDIT
// Sourced from ../../../src/js/builtins/ReadableStreamInternals.ts

// do not allow the bundler to rename a symbol to $
($);

$$capture_start$$(function(stream,error) {  !(IS_BUN_DEVELOPMENT?$assert(__intrinsic__isReadableStream(stream),"$isReadableStream(stream)"):void 0);
  __intrinsic__putByIdDirectPrivate(stream, "state", __intrinsic__streamErrored);
  __intrinsic__putByIdDirectPrivate(stream, "storedError", error);
  const reader = __intrinsic__getByIdDirectPrivate(stream, "reader");

  if (!reader) return;

  __intrinsic__getByIdDirectPrivate(reader, "closedPromiseCapability").reject.__intrinsic__call(undefined, error);
  const promise = __intrinsic__getByIdDirectPrivate(reader, "closedPromiseCapability").promise;
  __intrinsic__markPromiseAsHandled(promise);

  if (__intrinsic__isReadableStreamDefaultReader(reader)) {
    __intrinsic__readableStreamDefaultReaderErrorReadRequests(reader, error);
  } else {
    !(IS_BUN_DEVELOPMENT?$assert(__intrinsic__isReadableStreamBYOBReader(reader),"$isReadableStreamBYOBReader(reader)"):void 0);
    const requests = __intrinsic__getByIdDirectPrivate(reader, "readIntoRequests");
    __intrinsic__putByIdDirectPrivate(reader, "readIntoRequests", __intrinsic__createFIFO());
    for (var request = requests.shift(); request; request = requests.shift()) __intrinsic__rejectPromise(request, error);
  }
}).$$capture_end$$;
