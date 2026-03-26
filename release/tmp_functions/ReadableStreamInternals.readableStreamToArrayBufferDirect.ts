// @ts-nocheck
// GENERATED TEMP FILE - DO NOT EDIT
// Sourced from ../../../src/js/builtins/ReadableStreamInternals.ts

// do not allow the bundler to rename a symbol to $
($);

$$capture_start$$(function(stream,underlyingSource,asUint8Array,) {  var sink = new Bun.ArrayBufferSink();
  __intrinsic__putByIdDirectPrivate(stream, "underlyingSource", null);
  __intrinsic__putByIdDirectPrivate(stream, "start", undefined);
  __intrinsic__putByIdDirectPrivate(stream, "reader", {});
  stream.__intrinsic__disturbed = true;
  var highWaterMark = __intrinsic__getByIdDirectPrivate(stream, "highWaterMark");
  sink.start({ highWaterMark, asUint8Array });
  var capability = __intrinsic__newPromiseCapability(Promise);
  var ended = false;
  var pull = underlyingSource.pull;
  var close = underlyingSource.close;

  var controller = {
    start() {},
    close(_reason) {
      if (!ended) {
        ended = true;
        if (close) {
          close();
        }

        __intrinsic__fulfillPromise(capability.promise, sink.end());
      }
    },
    end() {
      if (!ended) {
        ended = true;
        if (close) {
          close();
        }
        __intrinsic__fulfillPromise(capability.promise, sink.end());
      }
    },
    flush() {
      return 0;
    },
    write: sink.write.bind(sink),
  };

  var didError = false;
  try {
    var firstPull = pull(controller);
  } catch (e) {
    didError = true;
    __intrinsic__putByIdDirectPrivate(stream, "reader", undefined);
    __intrinsic__readableStreamError(stream, e);
    return Promise.__intrinsic__reject(e);
  } finally {
    if (!__intrinsic__isPromise(firstPull) && !didError) {
      if (stream) {
        __intrinsic__putByIdDirectPrivate(stream, "reader", undefined);
        __intrinsic__readableStreamCloseIfPossible(stream);
      }
      controller = close = sink = pull = stream = undefined;
      return capability.promise;
    }
  }

  !(IS_BUN_DEVELOPMENT?$assert(__intrinsic__isPromise(firstPull),"$isPromise(firstPull)"):void 0);
  return firstPull.then(
    () => {
      if (!didError && stream) {
        __intrinsic__putByIdDirectPrivate(stream, "reader", undefined);
        __intrinsic__readableStreamCloseIfPossible(stream);
      }
      controller = close = sink = pull = stream = undefined;
      return capability.promise;
    },
    e => {
      didError = true;
      __intrinsic__putByIdDirectPrivate(stream, "reader", undefined);
      if (__intrinsic__getByIdDirectPrivate(stream, "state") === __intrinsic__streamReadable) __intrinsic__readableStreamError(stream, e);
      return Promise.__intrinsic__reject(e);
    },
  );
}).$$capture_end$$;
