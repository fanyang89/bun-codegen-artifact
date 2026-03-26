// @ts-nocheck
// GENERATED TEMP FILE - DO NOT EDIT
// Sourced from ../../../src/js/builtins/ReadableStreamInternals.ts

// do not allow the bundler to rename a symbol to $
($);

$$capture_start$$(function(stream,sink) {  const highWaterMark = __intrinsic__getByIdDirectPrivate(stream, "highWaterMark") || 0;
  let error: Error | null = null;
  let reading = false;
  let closed = false;
  let reader: ReadableStreamDefaultReader | undefined;

  function releaseReader() {
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

      if (stream && !error && streamState !== __intrinsic__streamClosed && streamState !== __intrinsic__streamErrored) {
        __intrinsic__readableStreamCloseIfPossible(stream);
      }
      stream = undefined;
    }
  }
  function endSink(...args: any[]) {
    try {
      sink?.end(...args);
    } catch {} // should never throw
    releaseReader();
  }

  try {
    // always call start even if reader throws

    sink.start({ highWaterMark });

    reader = stream.getReader();

    async function drainReaderIntoSink() {
      if (error || closed || reading) return;
      reading = true;

      try {
        while (true) {
          var { value, done } = await reader!.read();
          if (closed) break;

          if (done) {
            closed = true;
            // lets cover just in case we have a value when done is true
            // this shouldn't happen but just in case
            if (value) {
              sink.write(value);
            }
            // clean end
            return endSink();
          }

          if (value) {
            // write returns false under backpressure
            if (!sink.write(value)) {
              break;
            }
          }
        }
      } catch (e: any) {
        error = e;
        closed = true;
        try {
          const prom = stream?.cancel(e);
          if (__intrinsic__isPromise(prom)) {
            __intrinsic__markPromiseAsHandled(prom);
          }
        } catch {}
        // end with the error NT so we can simplify the flow to only listen to end
        queueMicrotask(endSink.bind(null, e));
      } finally {
        reading = false;
      }
    }

    function cancelStream(reason: Error | null) {
      if (closed) return;
      let wasClosed = closed;
      closed = true;
      if (stream && !error && !wasClosed && stream.__intrinsic__state !== __intrinsic__streamClosed) {
        __intrinsic__readableStreamCancel(stream, reason);
      }
      releaseReader();
    }
    // drain is called when the backpressure is release so we can continue draining
    // cancel is called if closed or errored by the other side
    sink.setHandlers(drainReaderIntoSink, cancelStream);

    drainReaderIntoSink();
  } catch (e: any) {
    error = e;
    closed = true;
    // end with the error
    queueMicrotask(endSink.bind(null, e));
  }
}).$$capture_end$$;
