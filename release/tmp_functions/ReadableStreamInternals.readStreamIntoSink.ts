// @ts-nocheck
// GENERATED TEMP FILE - DO NOT EDIT
// Sourced from ../../../src/js/builtins/ReadableStreamInternals.ts

// do not allow the bundler to rename a symbol to $
($);

$$capture_start$$(async function(stream,sink,isNative) {  var didClose = false;
  var didThrow = false;
  var started = false;
  const highWaterMark = __intrinsic__getByIdDirectPrivate(stream, "highWaterMark") || 0;

  try {
    var reader = stream.getReader();
    var many = reader.readMany();
    function onSinkClose(stream, reason) {
      if (!didThrow && !didClose && stream && stream.__intrinsic__state !== __intrinsic__streamClosed) {
        __intrinsic__readableStreamCancel(stream, reason);
      }
    }

    if (many && __intrinsic__isPromise(many)) {
      // Some time may pass before this Promise is fulfilled. The sink may
      // abort, for example. So we have to start it, if only so that we can
      // receive a notification when it closes or cancels.
      // https://github.com/oven-sh/bun/issues/6758
      if (isNative) __intrinsic__startDirectStream.__intrinsic__call(sink, stream, undefined, onSinkClose, stream.__intrinsic__asyncContext);
      sink.start({ highWaterMark });
      started = true;

      many = await many;
    }
    if (many.done) {
      didClose = true;
      return sink.end();
    }

    if (!started) {
      if (isNative) __intrinsic__startDirectStream.__intrinsic__call(sink, stream, undefined, onSinkClose, stream.__intrinsic__asyncContext);
      sink.start({ highWaterMark });
    }

    for (var i = 0, values = many.value, length = many.value.length; i < length; i++) {
      sink.write(values[i]);
    }

    var streamState = __intrinsic__getByIdDirectPrivate(stream, "state");
    if (streamState === __intrinsic__streamClosed) {
      didClose = true;
      return sink.end();
    }

    while (true) {
      var { value, done } = await reader.read();
      if (done) {
        didClose = true;
        return sink.end();
      }

      sink.write(value);
    }
  } catch (e) {
    didThrow = true;

    try {
      reader = undefined;
      const prom = stream.cancel(e);
      if (__intrinsic__isPromise(prom)) {
        __intrinsic__markPromiseAsHandled(prom);
      }
    } catch {}

    if (sink && !didClose) {
      didClose = true;
      try {
        sink.close(e);
      } catch (j) {
        throw new globalThis.AggregateError([e, j]);
      }
    }

    throw e;
  } finally {
    if (reader) {
      try {
        reader.releaseLock();
      } catch {}
      reader = undefined;
    }
    sink = undefined;
    if (stream) {
      var streamState = __intrinsic__getByIdDirectPrivate(stream, "state");
      // make it easy for this to be GC'd
      // but don't do property transitions
      var readableStreamController = __intrinsic__getByIdDirectPrivate(stream, "readableStreamController");
      if (readableStreamController) {
        if (__intrinsic__getByIdDirectPrivate(readableStreamController, "underlyingSource"))
          __intrinsic__putByIdDirectPrivate(readableStreamController, "underlyingSource", null);
        if (__intrinsic__getByIdDirectPrivate(readableStreamController, "controlledReadableStream"))
          __intrinsic__putByIdDirectPrivate(readableStreamController, "controlledReadableStream", null);

        __intrinsic__putByIdDirectPrivate(stream, "readableStreamController", null);
        if (__intrinsic__getByIdDirectPrivate(stream, "underlyingSource")) __intrinsic__putByIdDirectPrivate(stream, "underlyingSource", null);
        readableStreamController = undefined;
      }

      if (stream && !didThrow && streamState !== __intrinsic__streamClosed && streamState !== __intrinsic__streamErrored) {
        __intrinsic__readableStreamCloseIfPossible(stream);
      }
      stream = undefined;
    }
  }
}).$$capture_end$$;
