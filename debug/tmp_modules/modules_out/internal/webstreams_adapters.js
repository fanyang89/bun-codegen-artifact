// @bun
// build/debug/tmp_modules/internal/webstreams_adapters.ts
var $;
var {
  SafePromiseAll,
  SafeSet,
  TypedArrayPrototypeGetBuffer,
  TypedArrayPrototypeGetByteOffset,
  TypedArrayPrototypeGetByteLength
} = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 30) || __intrinsic__createInternalModuleById(30);
var Writable = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 59) || __intrinsic__createInternalModuleById(59);
var Readable = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 55) || __intrinsic__createInternalModuleById(55);
var Duplex = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 44) || __intrinsic__createInternalModuleById(44);
var { destroyer } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 43) || __intrinsic__createInternalModuleById(43);
var { isDestroyed, isReadable, isWritable, isWritableEnded } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 58) || __intrinsic__createInternalModuleById(58);
var { kEmptyObject } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 32) || __intrinsic__createInternalModuleById(32);
var { validateBoolean, validateObject } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 68) || __intrinsic__createInternalModuleById(68);
var finished = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 47) || __intrinsic__createInternalModuleById(47);
var normalizeEncoding = __intrinsic__lazy(37);
var ArrayPrototypeFilter = __intrinsic__Array.prototype.filter;
var ArrayPrototypeMap = __intrinsic__Array.prototype.map;
var ObjectEntries = Object.entries;
var PromiseWithResolvers = __intrinsic__Promise.withResolvers.bind(__intrinsic__Promise);
var PromiseResolve = __intrinsic__Promise.__intrinsic__resolve.bind(__intrinsic__Promise);
var PromisePrototypeThen = __intrinsic__Promise.prototype.__intrinsic__then;
var SafePromisePrototypeFinally = __intrinsic__Promise.prototype.finally;
var constants_zlib = __intrinsic__processBindingConstants.zlib;
function tryTransferToNativeReadable(stream, options) {
  const ptr = stream.__intrinsic__bunNativePtr;
  if (!ptr || ptr === -1) {
    return __intrinsic__undefined;
  }
  return (__intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 51) || __intrinsic__createInternalModuleById(51)).constructNativeReadable(stream, options);
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
      signal
    });
    this.#pendingChunks = [];
    this.#reader = __intrinsic__undefined;
    this.#stream = stream;
    this.#closed = false;
  }
  #drainPending() {
    var pendingChunks = this.#pendingChunks, pendingChunksI = 0, pendingChunksCount = pendingChunks.length;
    for (;pendingChunksI < pendingChunksCount; pendingChunksI++) {
      const chunk = pendingChunks[pendingChunksI];
      pendingChunks[pendingChunksI] = __intrinsic__undefined;
      if (!this.push(chunk, __intrinsic__undefined)) {
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
    this.#reader = __intrinsic__undefined;
    this.#closed = true;
    this.push(null);
    return;
  }
  async _read() {
    $debug_log("ReadableFromWeb _read()", this.__id);
    var stream = this.#stream, reader = this.#reader;
    if (stream) {
      reader = this.#reader = stream.getReader();
      this.#stream = __intrinsic__undefined;
    } else if (this.#drainPending()) {
      return;
    }
    var deferredError;
    try {
      do {
        var done = false, value;
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
        for (let i = 1, count = value.length;i < count; i++) {
          if (!this.push(value[i])) {
            this.#pendingChunks = value.slice(i + 1);
            return;
          }
        }
      } while (!this.#closed);
    } catch (e) {
      deferredError = e;
    }
    if (deferredError)
      throw deferredError;
  }
  _destroy(error, callback) {
    if (!this.#closed) {
      var reader = this.#reader;
      if (reader) {
        this.#reader = __intrinsic__undefined;
        reader.cancel(error).finally(() => {
          this.#closed = true;
          callback(error);
        });
      }
      return;
    }
    try {
      callback(error);
    } catch (error2) {
      globalThis.reportError(error2);
    }
  }
}
var encoder = new TextEncoder;
var ZLIB_FAILURES = new SafeSet([
  ...ArrayPrototypeFilter.__intrinsic__call(ArrayPrototypeMap.__intrinsic__call(ObjectEntries(constants_zlib), ({ 0: code, 1: value }) => value < 0 ? code : null), Boolean),
  "Z_NEED_DICT"
]);
function handleKnownInternalErrors(cause) {
  switch (true) {
    case cause?.code === "ERR_STREAM_PREMATURE_CLOSE": {
      return __intrinsic__makeAbortError(__intrinsic__undefined, { cause });
    }
    case ZLIB_FAILURES.has(cause?.code): {
      const error = __intrinsic__makeTypeError(__intrinsic__undefined, { cause });
      error.code = cause.code;
      return error;
    }
    default:
      return cause;
  }
}
function newWritableStreamFromStreamWritable(streamWritable) {
  const checkIfWritableOrOutgoingMessage = streamWritable && typeof streamWritable?.write === "function" && typeof streamWritable?.on === "function";
  if (!checkIfWritableOrOutgoingMessage) {
    throw __intrinsic__makeErrorWithCode(118, "streamWritable", "stream.Writable", streamWritable);
  }
  if (isDestroyed(streamWritable) || !isWritable(streamWritable)) {
    const writable = new __intrinsic__WritableStream;
    writable.close();
    return writable;
  }
  const highWaterMark = streamWritable.writableHighWaterMark;
  const strategy = streamWritable.writableObjectMode ? new CountQueuingStrategy({ highWaterMark }) : { highWaterMark };
  let controller;
  let backpressurePromise;
  let closed;
  function onDrain() {
    if (backpressurePromise !== __intrinsic__undefined)
      backpressurePromise.resolve();
  }
  const cleanup = finished(streamWritable, (error) => {
    error = handleKnownInternalErrors(error);
    cleanup();
    streamWritable.on("error", () => {});
    if (error != null) {
      if (backpressurePromise !== __intrinsic__undefined)
        backpressurePromise.reject(error);
      if (closed !== __intrinsic__undefined) {
        closed.reject(error);
        closed = __intrinsic__undefined;
      }
      controller.error(error);
      controller = __intrinsic__undefined;
      return;
    }
    if (closed !== __intrinsic__undefined) {
      closed.resolve();
      closed = __intrinsic__undefined;
      return;
    }
    controller.error(__intrinsic__makeAbortError());
    controller = __intrinsic__undefined;
  });
  streamWritable.on("drain", onDrain);
  return new __intrinsic__WritableStream({
    start(c) {
      controller = c;
    },
    write(chunk) {
      if (streamWritable.writableNeedDrain || !streamWritable.write(chunk)) {
        backpressurePromise = PromiseWithResolvers();
        return SafePromisePrototypeFinally.__intrinsic__call(backpressurePromise.promise, () => {
          backpressurePromise = __intrinsic__undefined;
        });
      }
    },
    abort(reason) {
      destroyer(streamWritable, reason);
    },
    close() {
      if (closed === __intrinsic__undefined && !isWritableEnded(streamWritable)) {
        closed = PromiseWithResolvers();
        streamWritable.end();
        return closed.promise;
      }
      controller = __intrinsic__undefined;
      return PromiseResolve();
    }
  }, strategy);
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
        error = error.filter((e) => e);
        try {
          callback(error.length === 0 ? __intrinsic__undefined : error);
        } catch (error2) {
          process.nextTick(() => destroyer(writable, error2));
        }
      }
      PromisePrototypeThen.__intrinsic__call(writer.ready, () => {
        return PromisePrototypeThen.__intrinsic__call(SafePromiseAll(chunks, (data) => writer.write(data.chunk)), done, done);
      }, done);
    },
    write(chunk, encoding, callback) {
      if (typeof chunk === "string" && decodeStrings && !objectMode) {
        const enc = normalizeEncoding(encoding);
        if (enc === "utf8") {
          chunk = encoder.encode(chunk);
        } else {
          chunk = __intrinsic__Buffer.from(chunk, encoding);
          chunk = new __intrinsic__Uint8Array(TypedArrayPrototypeGetBuffer(chunk), TypedArrayPrototypeGetByteOffset(chunk), TypedArrayPrototypeGetByteLength(chunk));
        }
      }
      function done(error) {
        try {
          callback(error);
        } catch (error2) {
          destroyer(writable, error2);
        }
      }
      PromisePrototypeThen.__intrinsic__call(writer.ready, () => {
        return PromisePrototypeThen.__intrinsic__call(writer.write(chunk), done, done);
      }, done);
    },
    destroy(error, callback) {
      function done() {
        try {
          callback(error);
        } catch (error2) {
          process.nextTick(() => {
            throw error2;
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
        } catch (error2) {
          process.nextTick(() => destroyer(writable, error2));
        }
      }
      if (!closed) {
        PromisePrototypeThen.__intrinsic__call(writer.close(), done, done);
      }
    }
  });
  PromisePrototypeThen.__intrinsic__call(writer.closed, () => {
    closed = true;
    if (!isWritableEnded(writable))
      destroyer(writable, __intrinsic__makeErrorWithCode(230));
  }, (error) => {
    closed = true;
    destroyer(writable, error);
  });
  return writable;
}
function newReadableStreamFromStreamReadable(streamReadable, options = kEmptyObject) {
  if (typeof streamReadable?._readableState !== "object") {
    throw __intrinsic__makeErrorWithCode(118, "streamReadable", "stream.Readable", streamReadable);
  }
  if (isDestroyed(streamReadable) || !isReadable(streamReadable)) {
    const readable = new __intrinsic__ReadableStream;
    readable.cancel();
    return readable;
  }
  const objectMode = streamReadable.readableObjectMode;
  const highWaterMark = streamReadable.readableHighWaterMark;
  const evaluateStrategyOrFallback = (strategy2) => {
    if (strategy2)
      return strategy2;
    if (objectMode) {
      return new CountQueuingStrategy({ highWaterMark });
    }
    return new ByteLengthQueuingStrategy({ highWaterMark });
  };
  const strategy = evaluateStrategyOrFallback(options?.strategy);
  let controller;
  let wasCanceled = false;
  function onData(chunk) {
    if (__intrinsic__Buffer.isBuffer(chunk) && !objectMode)
      chunk = new __intrinsic__Uint8Array(chunk);
    controller.enqueue(chunk);
    if (controller.desiredSize <= 0)
      streamReadable.pause();
  }
  streamReadable.pause();
  const cleanup = finished(streamReadable, (error) => {
    error = handleKnownInternalErrors(error);
    cleanup();
    streamReadable.on("error", () => {});
    if (error)
      return controller.error(error);
    if (wasCanceled) {
      return;
    }
    controller.close();
  });
  streamReadable.on("data", onData);
  return new __intrinsic__ReadableStream({
    start(c) {
      controller = c;
    },
    pull() {
      streamReadable.resume();
    },
    cancel(reason) {
      wasCanceled = true;
      destroyer(streamReadable, reason);
    }
  }, strategy);
}
function newStreamReadableFromReadableStream(readableStream, options = kEmptyObject) {
  if (!__intrinsic__inherits(1, readableStream)) {
    throw __intrinsic__makeErrorWithCode(118, "readableStream", "ReadableStream", readableStream);
  }
  validateObject(options, "options");
  const { highWaterMark, encoding, objectMode = false, signal } = options;
  if (encoding !== __intrinsic__undefined && !__intrinsic__Buffer.isEncoding(encoding))
    throw __intrinsic__makeErrorWithCode(119, "options.encoding", encoding);
  validateBoolean(objectMode, "options.objectMode");
  const nativeStream = tryTransferToNativeReadable(readableStream, options);
  return nativeStream || new ReadableFromWeb({
    highWaterMark,
    encoding,
    objectMode,
    signal
  }, readableStream);
}
function newReadableWritablePairFromDuplex(duplex) {
  if (typeof duplex?._writableState !== "object" || typeof duplex?._readableState !== "object") {
    throw __intrinsic__makeErrorWithCode(118, "duplex", "stream.Duplex", duplex);
  }
  if (isDestroyed(duplex)) {
    const writable2 = new __intrinsic__WritableStream;
    const readable2 = new __intrinsic__ReadableStream;
    writable2.close();
    readable2.cancel();
    return { readable: readable2, writable: writable2 };
  }
  const writable = isWritable(duplex) ? newWritableStreamFromStreamWritable(duplex) : new __intrinsic__WritableStream;
  if (!isWritable(duplex))
    writable.close();
  const readable = isReadable(duplex) ? newReadableStreamFromStreamReadable(duplex) : new __intrinsic__ReadableStream;
  if (!isReadable(duplex))
    readable.cancel();
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
  if (encoding !== __intrinsic__undefined && !__intrinsic__Buffer.isEncoding(encoding))
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
        error = error.filter((e) => e);
        try {
          callback(error.length === 0 ? __intrinsic__undefined : error);
        } catch (error2) {
          process.nextTick(() => destroyer(duplex, error2));
        }
      }
      PromisePrototypeThen.__intrinsic__call(writer.ready, () => {
        return PromisePrototypeThen.__intrinsic__call(SafePromiseAll(chunks, (data) => writer.write(data.chunk)), done, done);
      }, done);
    },
    write(chunk, encoding2, callback) {
      if (typeof chunk === "string" && decodeStrings && !objectMode) {
        const enc = normalizeEncoding(encoding2);
        if (enc === "utf8") {
          chunk = encoder.encode(chunk);
        } else {
          chunk = __intrinsic__Buffer.from(chunk, encoding2);
          chunk = new __intrinsic__Uint8Array(TypedArrayPrototypeGetBuffer(chunk), TypedArrayPrototypeGetByteOffset(chunk), TypedArrayPrototypeGetByteLength(chunk));
        }
      }
      function done(error) {
        try {
          callback(error);
        } catch (error2) {
          destroyer(duplex, error2);
        }
      }
      PromisePrototypeThen.__intrinsic__call(writer.ready, () => {
        return PromisePrototypeThen.__intrinsic__call(writer.write(chunk), done, done);
      }, done);
    },
    final(callback) {
      function done(error) {
        try {
          callback(error);
        } catch (error2) {
          process.nextTick(() => destroyer(duplex, error2));
        }
      }
      if (!writableClosed) {
        PromisePrototypeThen.__intrinsic__call(writer.close(), done, done);
      }
    },
    read() {
      PromisePrototypeThen.__intrinsic__call(reader.read(), (chunk) => {
        if (chunk.done) {
          duplex.push(null);
        } else {
          duplex.push(chunk.value);
        }
      }, (error) => destroyer(duplex, error));
    },
    destroy(error, callback) {
      function done() {
        try {
          callback(error);
        } catch (error2) {
          process.nextTick(() => {
            throw error2;
          });
        }
      }
      async function closeWriter() {
        if (!writableClosed)
          await writer.abort(error);
      }
      async function closeReader() {
        if (!readableClosed)
          await reader.cancel(error);
      }
      if (!writableClosed || !readableClosed) {
        PromisePrototypeThen.__intrinsic__call(SafePromiseAll([closeWriter(), closeReader()]), done, done);
        return;
      }
      done();
    }
  });
  PromisePrototypeThen.__intrinsic__call(writer.closed, () => {
    writableClosed = true;
    if (!isWritableEnded(duplex))
      destroyer(duplex, __intrinsic__makeErrorWithCode(230));
  }, (error) => {
    writableClosed = true;
    readableClosed = true;
    destroyer(duplex, error);
  });
  PromisePrototypeThen.__intrinsic__call(reader.closed, () => {
    readableClosed = true;
  }, (error) => {
    writableClosed = true;
    readableClosed = true;
    destroyer(duplex, error);
  });
  return duplex;
}
$ = {
  newWritableStreamFromStreamWritable,
  newReadableStreamFromStreamReadable,
  newStreamWritableFromWritableStream,
  newStreamReadableFromReadableStream,
  newReadableWritablePairFromDuplex,
  newStreamDuplexFromReadableWritablePair,
  _ReadableFromWeb: ReadableFromWeb
};
$$EXPORT$$($).$$EXPORT_END$$;
