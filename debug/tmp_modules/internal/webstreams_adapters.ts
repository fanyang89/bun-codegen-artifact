// @ts-nocheck
var $;// GENERATED TEMP FILE - DO NOT EDIT
// Sourced from src/js/internal/webstreams_adapters.ts


"use strict";

const {
  SafePromiseAll,
  SafeSet,
  TypedArrayPrototypeGetBuffer,
  TypedArrayPrototypeGetByteOffset,
  TypedArrayPrototypeGetByteLength,
} = (__intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 30/*internal/primordials*/) || __intrinsic__createInternalModuleById(30/*internal/primordials*/));

const Writable = (__intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 59/*internal/streams/writable*/) || __intrinsic__createInternalModuleById(59/*internal/streams/writable*/));
const Readable = (__intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 55/*internal/streams/readable*/) || __intrinsic__createInternalModuleById(55/*internal/streams/readable*/));
const Duplex = (__intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 44/*internal/streams/duplex*/) || __intrinsic__createInternalModuleById(44/*internal/streams/duplex*/));
const { destroyer } = (__intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 43/*internal/streams/destroy*/) || __intrinsic__createInternalModuleById(43/*internal/streams/destroy*/));
const { isDestroyed, isReadable, isWritable, isWritableEnded } = (__intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 58/*internal/streams/utils*/) || __intrinsic__createInternalModuleById(58/*internal/streams/utils*/));
const { kEmptyObject } = (__intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 32/*internal/shared*/) || __intrinsic__createInternalModuleById(32/*internal/shared*/));
const { validateBoolean, validateObject } = (__intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 68/*internal/validators*/) || __intrinsic__createInternalModuleById(68/*internal/validators*/));
const finished = (__intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 47/*internal/streams/end-of-stream*/) || __intrinsic__createInternalModuleById(47/*internal/streams/end-of-stream*/));

const normalizeEncoding = __intrinsic__lazy(37);

const ArrayPrototypeFilter = Array.prototype.filter;
const ArrayPrototypeMap = Array.prototype.map;
const ObjectEntries = Object.entries;
const PromiseWithResolvers = Promise.withResolvers.bind(Promise);
const PromiseResolve = Promise.__intrinsic__resolve.bind(Promise);
const PromisePrototypeThen = __intrinsic__Promise.prototype.__intrinsic__then;
const SafePromisePrototypeFinally = __intrinsic__Promise.prototype.finally;

const constants_zlib = __intrinsic__processBindingConstants.zlib;

function tryTransferToNativeReadable(stream, options) {
  const ptr = stream.__intrinsic__bunNativePtr;
  if (!ptr || ptr === -1) {
    return undefined;
  }
  return (__intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 51/*internal/streams/native-readable*/) || __intrinsic__createInternalModuleById(51/*internal/streams/native-readable*/)).constructNativeReadable(stream, options);
}

class ReadableFromWeb extends Readable {
  #reader;
  #closed;
  #pendingChunks;
  #stream;

  constructor(options, stream) {
    const { objectMode, highWaterMark, encoding, signal } = options;
    super({
      objectMode,
      highWaterMark,
      encoding,
      signal,
    });
    this.#pendingChunks = [];
    this.#reader = undefined;
    this.#stream = stream;
    this.#closed = false;
  }

  #drainPending() {
    var pendingChunks = this.#pendingChunks,
      pendingChunksI = 0,
      pendingChunksCount = pendingChunks.length;

    for (; pendingChunksI < pendingChunksCount; pendingChunksI++) {
      const chunk = pendingChunks[pendingChunksI];
      pendingChunks[pendingChunksI] = undefined;
      if (!this.push(chunk, undefined)) {
        this.#pendingChunks = pendingChunks.slice(pendingChunksI + 1);
        return true;
      }
    }

    if (pendingChunksCount > 0) {
      this.#pendingChunks = [];
    }

    return false;
  }

  #handleDone(reader) {
    reader.releaseLock();
    this.#reader = undefined;
    this.#closed = true;
    this.push(null);
    return;
  }

  async _read() {
    (IS_BUN_DEVELOPMENT?$debug_log("ReadableFromWeb _read()", this.__id):void 0);
    var stream = this.#stream,
      reader = this.#reader;
    if (stream) {
      reader = this.#reader = stream.getReader();
      this.#stream = undefined;
    } else if (this.#drainPending()) {
      return;
    }

    var deferredError: Error | undefined;
    try {
      do {
        var done = false,
          value;
        const firstResult = reader.readMany();

        if (__intrinsic__isPromise(firstResult)) {
          ({ done, value } = await firstResult);

          if (this.#closed) {
            this.#pendingChunks.push(...value);
            return;
          }
        } else {
          ({ done, value } = firstResult);
        }

        if (done) {
          this.#handleDone(reader);
          return;
        }

        if (!this.push(value[0])) {
          this.#pendingChunks = value.slice(1);
          return;
        }

        for (let i = 1, count = value.length; i < count; i++) {
          if (!this.push(value[i])) {
            this.#pendingChunks = value.slice(i + 1);
            return;
          }
        }
      } while (!this.#closed);
    } catch (e) {
      deferredError = e as Error;
    }

    if (deferredError) throw deferredError;
  }

  _destroy(error, callback) {
    if (!this.#closed) {
      var reader = this.#reader;
      if (reader) {
        this.#reader = undefined;
        reader.cancel(error).finally(() => {
          this.#closed = true;
          callback(error);
        });
      }

      return;
    }
    try {
      callback(error);
    } catch (error) {
      globalThis.reportError(error);
    }
  }
}

const encoder = new TextEncoder();

// Collect all negative (error) ZLIB codes and Z_NEED_DICT
const ZLIB_FAILURES: Set<string> = new SafeSet([
  ...ArrayPrototypeFilter.__intrinsic__call(
    ArrayPrototypeMap.__intrinsic__call(ObjectEntries(constants_zlib), ({ 0: code, 1: value }) => (value < 0 ? code : null)),
    Boolean,
  ),
  "Z_NEED_DICT",
]);

function handleKnownInternalErrors(cause: Error | null): Error | null {
  switch (true) {
    case cause?.code === "ERR_STREAM_PREMATURE_CLOSE": {
      return __intrinsic__makeAbortError(undefined, { cause });
    }
    case ZLIB_FAILURES.has(cause?.code): {
      const error = __intrinsic__makeTypeError(undefined, { cause });
      error.code = cause.code;
      return error;
    }
    default:
      return cause;
  }
}

function newWritableStreamFromStreamWritable(streamWritable) {
  // Not using the internal/streams/utils isWritableNodeStream utility
  // here because it will return false if streamWritable is a Duplex
  // whose writable option is false. For a Duplex that is not writable,
  // we want it to pass this check but return a closed WritableStream.
  // We check if the given stream is a stream.Writable or http.OutgoingMessage
  const checkIfWritableOrOutgoingMessage =
    streamWritable && typeof streamWritable?.write === "function" && typeof streamWritable?.on === "function";
  if (!checkIfWritableOrOutgoingMessage) {
    throw __intrinsic__makeErrorWithCode(118, "streamWritable", "stream.Writable", streamWritable);
  }

  if (isDestroyed(streamWritable) || !isWritable(streamWritable)) {
    const writable = new WritableStream();
    writable.close();
    return writable;
  }

  const highWaterMark = streamWritable.writableHighWaterMark;
  const strategy = streamWritable.writableObjectMode ? new CountQueuingStrategy({ highWaterMark }) : { highWaterMark };

  let controller;
  let backpressurePromise;
  let closed;

  function onDrain() {
    if (backpressurePromise !== undefined) backpressurePromise.resolve();
  }

  const cleanup = finished(streamWritable, error => {
    error = handleKnownInternalErrors(error);

    cleanup();
    // This is a protection against non-standard, legacy streams
    // that happen to emit an error event again after finished is called.
    streamWritable.on("error", () => {});
    if (error != null) {
      if (backpressurePromise !== undefined) backpressurePromise.reject(error);
      // If closed is not undefined, the error is happening
      // after the WritableStream close has already started.
      // We need to reject it here.
      if (closed !== undefined) {
        closed.reject(error);
        closed = undefined;
      }
      controller.error(error);
      controller = undefined;
      return;
    }

    if (closed !== undefined) {
      closed.resolve();
      closed = undefined;
      return;
    }
    controller.error(__intrinsic__makeAbortError());
    controller = undefined;
  });

  streamWritable.on("drain", onDrain);

  return new WritableStream(
    {
      start(c) {
        controller = c;
      },

      write(chunk) {
        if (streamWritable.writableNeedDrain || !streamWritable.write(chunk)) {
          backpressurePromise = PromiseWithResolvers();
          return SafePromisePrototypeFinally.__intrinsic__call(backpressurePromise.promise, () => {
            backpressurePromise = undefined;
          });
        }
      },

      abort(reason) {
        destroyer(streamWritable, reason);
      },

      close() {
        if (closed === undefined && !isWritableEnded(streamWritable)) {
          closed = PromiseWithResolvers();
          streamWritable.end();
          return closed.promise;
        }

        controller = undefined;
        return PromiseResolve();
      },
    },
    strategy,
  );
}

function newStreamWritableFromWritableStream(writableStream, options = kEmptyObject) {
  if (!__intrinsic__inherits(2, writableStream)) {
    throw __intrinsic__makeErrorWithCode(118, "writableStream", "WritableStream", writableStream);
  }

  validateObject(options, "options");
  const { highWaterMark, decodeStrings = true, objectMode = false, signal } = options;

  validateBoolean(objectMode, "options.objectMode");
  validateBoolean(decodeStrings, "options.decodeStrings");

  const writer = writableStream.getWriter();
  let closed = false;

  const writable = new Writable({
    highWaterMark,
    objectMode,
    decodeStrings,
    signal,

    writev(chunks, callback) {
      function done(error) {
        error = error.filter(e => e);
        try {
          callback(error.length === 0 ? undefined : error);
        } catch (error) {
          // In a next tick because this is happening within
          // a promise context, and if there are any errors
          // thrown we don't want those to cause an unhandled
          // rejection. Let's just escape the promise and
          // handle it separately.
          process.nextTick(() => destroyer(writable, error));
        }
      }

      PromisePrototypeThen.__intrinsic__call(
        writer.ready,
        () => {
          return PromisePrototypeThen.__intrinsic__call(
            SafePromiseAll(chunks, data => writer.write(data.chunk)),
            done,
            done,
          );
        },
        done,
      );
    },

    write(chunk, encoding, callback) {
      if (typeof chunk === "string" && decodeStrings && !objectMode) {
        const enc = normalizeEncoding(encoding);

        if (enc === "utf8") {
          chunk = encoder.encode(chunk);
        } else {
          chunk = Buffer.from(chunk, encoding);
          chunk = new Uint8Array(
            TypedArrayPrototypeGetBuffer(chunk),
            TypedArrayPrototypeGetByteOffset(chunk),
            TypedArrayPrototypeGetByteLength(chunk),
          );
        }
      }

      function done(error) {
        try {
          callback(error);
        } catch (error) {
          destroyer(writable, error);
        }
      }

      PromisePrototypeThen.__intrinsic__call(
        writer.ready,
        () => {
          return PromisePrototypeThen.__intrinsic__call(writer.write(chunk), done, done);
        },
        done,
      );
    },

    destroy(error, callback) {
      function done() {
        try {
          callback(error);
        } catch (error) {
          // In a next tick because this is happening within
          // a promise context, and if there are any errors
          // thrown we don't want those to cause an unhandled
          // rejection. Let's just escape the promise and
          // handle it separately.
          process.nextTick(() => {
            throw error;
          });
        }
      }

      if (!closed) {
        if (error != null) {
          PromisePrototypeThen.__intrinsic__call(writer.abort(error), done, done);
        } else {
          PromisePrototypeThen.__intrinsic__call(writer.close(), done, done);
        }
        return;
      }

      done();
    },

    final(callback) {
      function done(error) {
        try {
          callback(error);
        } catch (error) {
          // In a next tick because this is happening within
          // a promise context, and if there are any errors
          // thrown we don't want those to cause an unhandled
          // rejection. Let's just escape the promise and
          // handle it separately.
          process.nextTick(() => destroyer(writable, error));
        }
      }

      if (!closed) {
        PromisePrototypeThen.__intrinsic__call(writer.close(), done, done);
      }
    },
  });

  PromisePrototypeThen.__intrinsic__call(
    writer.closed,
    () => {
      // If the WritableStream closes before the stream.Writable has been
      // ended, we signal an error on the stream.Writable.
      closed = true;
      if (!isWritableEnded(writable)) destroyer(writable, __intrinsic__makeErrorWithCode(230, ));
    },
    error => {
      // If the WritableStream errors before the stream.Writable has been
      // destroyed, signal an error on the stream.Writable.
      closed = true;
      destroyer(writable, error);
    },
  );

  return writable;
}

function newReadableStreamFromStreamReadable(streamReadable, options = kEmptyObject) {
  // Not using the internal/streams/utils isReadableNodeStream utility
  // here because it will return false if streamReadable is a Duplex
  // whose readable option is false. For a Duplex that is not readable,
  // we want it to pass this check but return a closed ReadableStream.
  if (typeof streamReadable?._readableState !== "object") {
    throw __intrinsic__makeErrorWithCode(118, "streamReadable", "stream.Readable", streamReadable);
  }

  if (isDestroyed(streamReadable) || !isReadable(streamReadable)) {
    const readable = new ReadableStream();
    readable.cancel();
    return readable;
  }

  const objectMode = streamReadable.readableObjectMode;
  const highWaterMark = streamReadable.readableHighWaterMark;

  const evaluateStrategyOrFallback = strategy => {
    // If there is a strategy available, use it
    if (strategy) return strategy;

    if (objectMode) {
      // When running in objectMode explicitly but no strategy, we just fall
      // back to CountQueuingStrategy
      return new CountQueuingStrategy({ highWaterMark });
    }

    return new ByteLengthQueuingStrategy({ highWaterMark });
  };

  const strategy = evaluateStrategyOrFallback(options?.strategy);

  let controller;
  let wasCanceled = false;

  function onData(chunk) {
    // Copy the Buffer to detach it from the pool.
    if (Buffer.isBuffer(chunk) && !objectMode) chunk = new Uint8Array(chunk);
    controller.enqueue(chunk);
    if (controller.desiredSize <= 0) streamReadable.pause();
  }

  streamReadable.pause();

  const cleanup = finished(streamReadable, error => {
    error = handleKnownInternalErrors(error);

    cleanup();
    // This is a protection against non-standard, legacy streams
    // that happen to emit an error event again after finished is called.
    streamReadable.on("error", () => {});
    if (error) return controller.error(error);
    // Was already canceled
    if (wasCanceled) {
      return;
    }
    controller.close();
  });

  streamReadable.on("data", onData);

  return new ReadableStream(
    {
      start(c) {
        controller = c;
      },

      pull() {
        streamReadable.resume();
      },

      cancel(reason) {
        wasCanceled = true;
        destroyer(streamReadable, reason);
      },
    },
    strategy,
  );
}

function newStreamReadableFromReadableStream(readableStream, options: Record<string, unknown> = kEmptyObject) {
  if (!__intrinsic__inherits(1, readableStream)) {
    throw __intrinsic__makeErrorWithCode(118, "readableStream", "ReadableStream", readableStream);
  }

  validateObject(options, "options");
  const { highWaterMark, encoding, objectMode = false, signal } = options;

  if (encoding !== undefined && !Buffer.isEncoding(encoding))
    throw __intrinsic__makeErrorWithCode(119, "options.encoding", encoding);
  validateBoolean(objectMode, "options.objectMode");

  const nativeStream = tryTransferToNativeReadable(readableStream, options);

  return (
    nativeStream ||
    new ReadableFromWeb(
      {
        highWaterMark,
        encoding,
        objectMode,
        signal,
      },
      readableStream,
    )
  );
}

function newReadableWritablePairFromDuplex(duplex) {
  // Not using the internal/streams/utils isWritableNodeStream and
  // isReadableNodeStream utilities here because they will return false
  // if the duplex was created with writable or readable options set to
  // false. Instead, we'll check the readable and writable state after
  // and return closed WritableStream or closed ReadableStream as
  // necessary.
  if (typeof duplex?._writableState !== "object" || typeof duplex?._readableState !== "object") {
    throw __intrinsic__makeErrorWithCode(118, "duplex", "stream.Duplex", duplex);
  }

  if (isDestroyed(duplex)) {
    const writable = new WritableStream();
    const readable = new ReadableStream();
    writable.close();
    readable.cancel();
    return { readable, writable };
  }

  const writable = isWritable(duplex) ? newWritableStreamFromStreamWritable(duplex) : new WritableStream();

  if (!isWritable(duplex)) writable.close();

  const readable = isReadable(duplex) ? newReadableStreamFromStreamReadable(duplex) : new ReadableStream();

  if (!isReadable(duplex)) readable.cancel();

  return { writable, readable };
}

function newStreamDuplexFromReadableWritablePair(pair = kEmptyObject, options = kEmptyObject) {
  validateObject(pair, "pair");
  const { readable: readableStream, writable: writableStream } = pair;

  if (!__intrinsic__inherits(1, readableStream)) {
    throw __intrinsic__makeErrorWithCode(118, "pair.readable", "ReadableStream", readableStream);
  }
  if (!__intrinsic__inherits(2, writableStream)) {
    throw __intrinsic__makeErrorWithCode(118, "pair.writable", "WritableStream", writableStream);
  }

  validateObject(options, "options");
  const { allowHalfOpen = false, objectMode = false, encoding, decodeStrings = true, highWaterMark, signal } = options;

  validateBoolean(objectMode, "options.objectMode");
  if (encoding !== undefined && !Buffer.isEncoding(encoding))
    throw __intrinsic__makeErrorWithCode(119, encoding, "options.encoding");

  const writer = writableStream.getWriter();
  const reader = readableStream.getReader();
  let writableClosed = false;
  let readableClosed = false;

  const duplex = new Duplex({
    allowHalfOpen,
    highWaterMark,
    objectMode,
    encoding,
    decodeStrings,
    signal,

    writev(chunks, callback) {
      function done(error) {
        error = error.filter(e => e);
        try {
          callback(error.length === 0 ? undefined : error);
        } catch (error) {
          // In a next tick because this is happening within
          // a promise context, and if there are any errors
          // thrown we don't want those to cause an unhandled
          // rejection. Let's just escape the promise and
          // handle it separately.
          process.nextTick(() => destroyer(duplex, error));
        }
      }

      PromisePrototypeThen.__intrinsic__call(
        writer.ready,
        () => {
          return PromisePrototypeThen.__intrinsic__call(
            SafePromiseAll(chunks, data => writer.write(data.chunk)),
            done,
            done,
          );
        },
        done,
      );
    },

    write(chunk, encoding, callback) {
      if (typeof chunk === "string" && decodeStrings && !objectMode) {
        const enc = normalizeEncoding(encoding);

        if (enc === "utf8") {
          chunk = encoder.encode(chunk);
        } else {
          chunk = Buffer.from(chunk, encoding);
          chunk = new Uint8Array(
            TypedArrayPrototypeGetBuffer(chunk),
            TypedArrayPrototypeGetByteOffset(chunk),
            TypedArrayPrototypeGetByteLength(chunk),
          );
        }
      }

      function done(error) {
        try {
          callback(error);
        } catch (error) {
          destroyer(duplex, error);
        }
      }

      PromisePrototypeThen.__intrinsic__call(
        writer.ready,
        () => {
          return PromisePrototypeThen.__intrinsic__call(writer.write(chunk), done, done);
        },
        done,
      );
    },

    final(callback) {
      function done(error) {
        try {
          callback(error);
        } catch (error) {
          // In a next tick because this is happening within
          // a promise context, and if there are any errors
          // thrown we don't want those to cause an unhandled
          // rejection. Let's just escape the promise and
          // handle it separately.
          process.nextTick(() => destroyer(duplex, error));
        }
      }

      if (!writableClosed) {
        PromisePrototypeThen.__intrinsic__call(writer.close(), done, done);
      }
    },

    read() {
      PromisePrototypeThen.__intrinsic__call(
        reader.read(),
        chunk => {
          if (chunk.done) {
            duplex.push(null);
          } else {
            duplex.push(chunk.value);
          }
        },
        error => destroyer(duplex, error),
      );
    },

    destroy(error, callback) {
      function done() {
        try {
          callback(error);
        } catch (error) {
          // In a next tick because this is happening within
          // a promise context, and if there are any errors
          // thrown we don't want those to cause an unhandled
          // rejection. Let's just escape the promise and
          // handle it separately.
          process.nextTick(() => {
            throw error;
          });
        }
      }

      async function closeWriter() {
        if (!writableClosed) await writer.abort(error);
      }

      async function closeReader() {
        if (!readableClosed) await reader.cancel(error);
      }

      if (!writableClosed || !readableClosed) {
        PromisePrototypeThen.__intrinsic__call(SafePromiseAll([closeWriter(), closeReader()]), done, done);
        return;
      }

      done();
    },
  });

  PromisePrototypeThen.__intrinsic__call(
    writer.closed,
    () => {
      writableClosed = true;
      if (!isWritableEnded(duplex)) destroyer(duplex, __intrinsic__makeErrorWithCode(230, ));
    },
    error => {
      writableClosed = true;
      readableClosed = true;
      destroyer(duplex, error);
    },
  );

  PromisePrototypeThen.__intrinsic__call(
    reader.closed,
    () => {
      readableClosed = true;
    },
    error => {
      writableClosed = true;
      readableClosed = true;
      destroyer(duplex, error);
    },
  );

  return duplex;
}

$ = {
  newWritableStreamFromStreamWritable,
  newReadableStreamFromStreamReadable,
  newStreamWritableFromWritableStream,
  newStreamReadableFromReadableStream,
  newReadableWritablePairFromDuplex,
  newStreamDuplexFromReadableWritablePair,
  _ReadableFromWeb: ReadableFromWeb,
};
;$$EXPORT$$($).$$EXPORT_END$$;
