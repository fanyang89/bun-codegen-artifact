// @ts-nocheck
// GENERATED TEMP FILE - DO NOT EDIT
// Sourced from ../../../src/js/builtins/ReadableStreamInternals.ts

// do not allow the bundler to rename a symbol to $
($);

$$capture_start$$(function(stream,reason) {  stream.__intrinsic__disturbed = true;
  const state = __intrinsic__getByIdDirectPrivate(stream, "state");
  if (state === __intrinsic__streamClosed) return Promise.__intrinsic__resolve();
  if (state === __intrinsic__streamErrored) return Promise.__intrinsic__reject(__intrinsic__getByIdDirectPrivate(stream, "storedError"));
  __intrinsic__readableStreamClose(stream);

  const controller = __intrinsic__getByIdDirectPrivate(stream, "readableStreamController");
  if (controller === null) return Promise.__intrinsic__resolve();

  const cancel = controller.__intrinsic__cancel;
  if (cancel) return cancel(controller, reason).__intrinsic__then(function () {});

  const close = controller.close;
  if (close) return Promise.__intrinsic__resolve(controller.close(reason));

  __intrinsic__throwTypeError("ReadableStreamController has no cancel or close method");
}).$$capture_end$$;
