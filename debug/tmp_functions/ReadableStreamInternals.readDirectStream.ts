// @ts-nocheck
// GENERATED TEMP FILE - DO NOT EDIT
// Sourced from ../../../src/js/builtins/ReadableStreamInternals.ts

// do not allow the bundler to rename a symbol to $
($);

$$capture_start$$(function(stream,sink,underlyingSource) {  __intrinsic__putByIdDirectPrivate(stream, "underlyingSource", null); // doing this causes isReadableStreamDefaultController to return false
  __intrinsic__putByIdDirectPrivate(stream, "start", undefined);
  function close(stream, reason) {
    const cancelFn = underlyingSource?.cancel;
    if (cancelFn) {
      try {
        var prom = cancelFn.__intrinsic__call(underlyingSource, reason);
        if (__intrinsic__isPromise(prom)) {
          __intrinsic__markPromiseAsHandled(prom);
        }
      } catch {}

      underlyingSource = undefined;
    }

    if (stream) {
      __intrinsic__putByIdDirectPrivate(stream, "readableStreamController", undefined);
      __intrinsic__putByIdDirectPrivate(stream, "reader", undefined);
      if (reason) {
        __intrinsic__putByIdDirectPrivate(stream, "state", __intrinsic__streamErrored);
        __intrinsic__putByIdDirectPrivate(stream, "storedError", reason);
      } else {
        __intrinsic__putByIdDirectPrivate(stream, "state", __intrinsic__streamClosed);
      }
      stream = undefined;
    }
  }

  if (!underlyingSource.pull) {
    close();
    return;
  }

  if (!__intrinsic__isCallable(underlyingSource.pull)) {
    close();
    __intrinsic__throwTypeError("pull is not a function");
    return;
  }
  __intrinsic__putByIdDirectPrivate(stream, "readableStreamController", sink);
  const highWaterMark = __intrinsic__getByIdDirectPrivate(stream, "highWaterMark");
  sink.start({
    highWaterMark: !highWaterMark || highWaterMark < 64 ? 64 : highWaterMark,
  });

  __intrinsic__startDirectStream.__intrinsic__call(sink, stream, underlyingSource.pull, close, stream.__intrinsic__asyncContext);

  __intrinsic__putByIdDirectPrivate(stream, "reader", {});

  var maybePromise = underlyingSource.pull(sink);
  sink = undefined;
  if (maybePromise && __intrinsic__isPromise(maybePromise)) {
    if (maybePromise.__intrinsic__then) {
      return maybePromise.__intrinsic__then(() => {});
    }

    return maybePromise.then(() => {});
  }
}).$$capture_end$$;
