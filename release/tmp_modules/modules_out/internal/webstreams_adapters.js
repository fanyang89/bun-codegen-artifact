// @bun
// build/release/tmp_modules/internal/webstreams_adapters.ts
var $, {
  SafePromiseAll,
  SafeSet,
  TypedArrayPrototypeGetBuffer,
  TypedArrayPrototypeGetByteOffset,
  TypedArrayPrototypeGetByteLength
} = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 30) || __intrinsic__createInternalModuleById(30), Writable = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 59) || __intrinsic__createInternalModuleById(59), Readable = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 55) || __intrinsic__createInternalModuleById(55), Duplex = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 44) || __intrinsic__createInternalModuleById(44), { destroyer } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 43) || __intrinsic__createInternalModuleById(43), { isDestroyed, isReadable, isWritable, isWritableEnded } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 58) || __intrinsic__createInternalModuleById(58), { kEmptyObject } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 32) || __intrinsic__createInternalModuleById(32), { validateBoolean, validateObject } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 68) || __intrinsic__createInternalModuleById(68), finished = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 47) || __intrinsic__createInternalModuleById(47), normalizeEncoding = __intrinsic__lazy(37), ArrayPrototypeFilter = __intrinsic__Array.prototype.filter, ArrayPrototypeMap = __intrinsic__Array.prototype.map, ObjectEntries = Object.entries, PromiseWithResolvers = __intrinsic__Promise.withResolvers.bind(__intrinsic__Promise), PromiseResolve = __intrinsic__Promise.__intrinsic__resolve.bind(__intrinsic__Promise), PromisePrototypeThen = __intrinsic__Promise.prototype.__intrinsic__then, SafePromisePrototypeFinally = __intrinsic__Promise.prototype.finally, constants_zlib = __intrinsic__processBindingConstants.zlib;
function tryTransferToNativeReadable(stream, options) {
  let ptr = stream.__intrinsic__bunNativePtr;
  if (!ptr || ptr === -1)
    return __intrinsic__undefined;
  return (__intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 51) || __intrinsic__createInternalModuleById(51)).constructNativeReadable(stream, options);
}

class ReadableFromWeb extends Readable {
  #reader;
  #closed;
  #pendingChunks;
  #stream;
  constructor(options, stream) {
    let { objectMode, highWaterMark, encoding, signal } = options;
    super({
      objectMode,
      highWaterMark,
      encoding,
      signal
    });
    this.#pendingChunks = [], this.#reader = __intrinsic__undefined, this.#stream = stream, this.#closed = !1;
  }
  #drainPending() {
    var pendingChunks = this.#pendingChunks, pendingChunksI = 0, pendingChunksCount = pendingChunks.length;
    for (;pendingChunksI < pendingChunksCount; pendingChunksI++) {
      let chunk = pendingChunks[pendingChunksI];
      if (pendingChunks[pendingChunksI] = __intrinsic__undefined, !this.push(chunk, __intrinsic__undefined))
        return this.#pendingChunks = pendingChunks.slice(pendingChunksI + 1), !0;
    }
    if (pendingChunksCount > 0)
      this.#pendingChunks = [];
    return !1;
  }
  #handleDone(reader) {
    reader.releaseLock(), this.#reader = __intrinsic__undefined, this.#closed = !0, this.push(null);
    return;
  }
  async _read() {
    var stream = this.#stream, reader = this.#reader;
    if (stream)
      reader = this.#reader = stream.getReader(), this.#stream = __intrinsic__undefined;
    else if (this.#drainPending())
      return;
    var deferredError;
    try {
      do {
        var done = !1, value;
        let firstResult = reader.readMany();
        if (__intrinsic__isPromise(firstResult)) {
          if ({ done, value } = await firstResult, this.#closed) {
            this.#pendingChunks.push(...value);
            return;
          }
        } else
          ({ done, value } = firstResult);
        if (done) {
          this.#handleDone(reader);
          return;
        }
        if (!this.push(value[0])) {
          this.#pendingChunks = value.slice(1);
          return;
        }
        for (let i = 1, count = value.length;i < count; i++)
          if (!this.push(value[i])) {
            this.#pendingChunks = value.slice(i + 1);
            return;
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
      if (reader)
        this.#reader = __intrinsic__undefined, reader.cancel(error).finally(() => {
          this.#closed = !0, callback(error);
        });
      return;
    }
    try {
      callback(error);
    } catch (error2) {
      globalThis.reportError(error2);
    }
  }
}
var encoder = /* @__PURE__ */ new TextEncoder, ZLIB_FAILURES = new SafeSet([
  ...ArrayPrototypeFilter.__intrinsic__call(ArrayPrototypeMap.__intrinsic__call(ObjectEntries(constants_zlib), ({ 0: code, 1: value }) => value < 0 ? code : null), Boolean),
  "Z_NEED_DICT"
]);
function handleKnownInternalErrors(cause) {
  switch (!0) {
    case cause?.code === "ERR_STREAM_PREMATURE_CLOSE":
      return __intrinsic__makeAbortError(__intrinsic__undefined, { cause });
    case ZLIB_FAILURES.has(cause?.code): {
      let error = __intrinsic__makeTypeError(__intrinsic__undefined, { cause });
      return error.code = cause.code, error;
    }
    default:
      return cause;
  }
}
function newWritableStreamFromStreamWritable(streamWritable) {
  if (!(streamWritable && typeof streamWritable?.write === "function" && typeof streamWritable?.on === "function"))
    throw __intrinsic__makeErrorWithCode(118, "streamWritable", "stream.Writable", streamWritable);
  if (isDestroyed(streamWritable) || !isWritable(streamWritable)) {
    let writable = new __intrinsic__WritableStream;
    return writable.close(), writable;
  }
  let highWaterMark = streamWritable.writableHighWaterMark, strategy = streamWritable.writableObjectMode ? new CountQueuingStrategy({ highWaterMark }) : { highWaterMark }, controller, backpressurePromise, closed;
  function onDrain() {
    if (backpressurePromise !== __intrinsic__undefined)
      backpressurePromise.resolve();
  }
  let cleanup = finished(streamWritable, (error) => {
    if (error = handleKnownInternalErrors(error), cleanup(), streamWritable.on("error", () => {}), error != null) {
      if (backpressurePromise !== __intrinsic__undefined)
        backpressurePromise.reject(error);
      if (closed !== __intrinsic__undefined)
        closed.reject(error), closed = __intrinsic__undefined;
      controller.error(error), controller = __intrinsic__undefined;
      return;
    }
    if (closed !== __intrinsic__undefined) {
      closed.resolve(), closed = __intrinsic__undefined;
      return;
    }
    controller.error(__intrinsic__makeAbortError()), controller = __intrinsic__undefined;
  });
  return streamWritable.on("drain", onDrain), new __intrinsic__WritableStream({
    start(c) {
      controller = c;
    },
    write(chunk) {
      if (streamWritable.writableNeedDrain || !streamWritable.write(chunk))
        return backpressurePromise = PromiseWithResolvers(), SafePromisePrototypeFinally.__intrinsic__call(backpressurePromise.promise, () => {
          backpressurePromise = __intrinsic__undefined;
        });
    },
    abort(reason) {
      destroyer(streamWritable, reason);
    },
    close() {
      if (closed === __intrinsic__undefined && !isWritableEnded(streamWritable))
        return closed = PromiseWithResolvers(), streamWritable.end(), closed.promise;
      return controller = __intrinsic__undefined, PromiseResolve();
    }
  }, strategy);
}
function newStreamWritableFromWritableStream(writableStream, options = kEmptyObject) {
  if (!__intrinsic__inherits(2, writableStream))
    throw __intrinsic__makeErrorWithCode(118, "writableStream", "WritableStream", writableStream);
  validateObject(options, "options");
  let { highWaterMark, decodeStrings = !0, objectMode = !1, signal } = options;
  validateBoolean(objectMode, "options.objectMode"), validateBoolean(decodeStrings, "options.decodeStrings");
  let writer = writableStream.getWriter(), closed = !1, writable = new Writable({
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
      if (typeof chunk === "string" && decodeStrings && !objectMode)
        if (normalizeEncoding(encoding) === "utf8")
          chunk = encoder.encode(chunk);
        else
          chunk = __intrinsic__Buffer.from(chunk, encoding), chunk = new __intrinsic__Uint8Array(TypedArrayPrototypeGetBuffer(chunk), TypedArrayPrototypeGetByteOffset(chunk), TypedArrayPrototypeGetByteLength(chunk));
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
        if (error != null)
          PromisePrototypeThen.__intrinsic__call(writer.abort(error), done, done);
        else
          PromisePrototypeThen.__intrinsic__call(writer.close(), done, done);
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
      if (!closed)
        PromisePrototypeThen.__intrinsic__call(writer.close(), done, done);
    }
  });
  return PromisePrototypeThen.__intrinsic__call(writer.closed, () => {
    if (closed = !0, !isWritableEnded(writable))
      destroyer(writable, __intrinsic__makeErrorWithCode(230));
  }, (error) => {
    closed = !0, destroyer(writable, error);
  }), writable;
}
function newReadableStreamFromStreamReadable(streamReadable, options = kEmptyObject) {
  if (typeof streamReadable?._readableState !== "object")
    throw __intrinsic__makeErrorWithCode(118, "streamReadable", "stream.Readable", streamReadable);
  if (isDestroyed(streamReadable) || !isReadable(streamReadable)) {
    let readable = new __intrinsic__ReadableStream;
    return readable.cancel(), readable;
  }
  let { readableObjectMode: objectMode, readableHighWaterMark: highWaterMark } = streamReadable, strategy = ((strategy2) => {
    if (strategy2)
      return strategy2;
    if (objectMode)
      return new CountQueuingStrategy({ highWaterMark });
    return new ByteLengthQueuingStrategy({ highWaterMark });
  })(options?.strategy), controller, wasCanceled = !1;
  function onData(chunk) {
    if (__intrinsic__Buffer.isBuffer(chunk) && !objectMode)
      chunk = new __intrinsic__Uint8Array(chunk);
    if (controller.enqueue(chunk), controller.desiredSize <= 0)
      streamReadable.pause();
  }
  streamReadable.pause();
  let cleanup = finished(streamReadable, (error) => {
    if (error = handleKnownInternalErrors(error), cleanup(), streamReadable.on("error", () => {}), error)
      return controller.error(error);
    if (wasCanceled)
      return;
    controller.close();
  });
  return streamReadable.on("data", onData), new __intrinsic__ReadableStream({
    start(c) {
      controller = c;
    },
    pull() {
      streamReadable.resume();
    },
    cancel(reason) {
      wasCanceled = !0, destroyer(streamReadable, reason);
    }
  }, strategy);
}
function newStreamReadableFromReadableStream(readableStream, options = kEmptyObject) {
  if (!__intrinsic__inherits(1, readableStream))
    throw __intrinsic__makeErrorWithCode(118, "readableStream", "ReadableStream", readableStream);
  validateObject(options, "options");
  let { highWaterMark, encoding, objectMode = !1, signal } = options;
  if (encoding !== __intrinsic__undefined && !__intrinsic__Buffer.isEncoding(encoding))
    throw __intrinsic__makeErrorWithCode(119, "options.encoding", encoding);
  return validateBoolean(objectMode, "options.objectMode"), tryTransferToNativeReadable(readableStream, options) || new ReadableFromWeb({
    highWaterMark,
    encoding,
    objectMode,
    signal
  }, readableStream);
}
function newReadableWritablePairFromDuplex(duplex) {
  if (typeof duplex?._writableState !== "object" || typeof duplex?._readableState !== "object")
    throw __intrinsic__makeErrorWithCode(118, "duplex", "stream.Duplex", duplex);
  if (isDestroyed(duplex)) {
    let writable2 = new __intrinsic__WritableStream, readable2 = new __intrinsic__ReadableStream;
    return writable2.close(), readable2.cancel(), { readable: readable2, writable: writable2 };
  }
  let writable = isWritable(duplex) ? newWritableStreamFromStreamWritable(duplex) : new __intrinsic__WritableStream;
  if (!isWritable(duplex))
    writable.close();
  let readable = isReadable(duplex) ? newReadableStreamFromStreamReadable(duplex) : new __intrinsic__ReadableStream;
  if (!isReadable(duplex))
    readable.cancel();
  return { writable, readable };
}
function newStreamDuplexFromReadableWritablePair(pair = kEmptyObject, options = kEmptyObject) {
  validateObject(pair, "pair");
  let { readable: readableStream, writable: writableStream } = pair;
  if (!__intrinsic__inherits(1, readableStream))
    throw __intrinsic__makeErrorWithCode(118, "pair.readable", "ReadableStream", readableStream);
  if (!__intrinsic__inherits(2, writableStream))
    throw __intrinsic__makeErrorWithCode(118, "pair.writable", "WritableStream", writableStream);
  validateObject(options, "options");
  let { allowHalfOpen = !1, objectMode = !1, encoding, decodeStrings = !0, highWaterMark, signal } = options;
  if (validateBoolean(objectMode, "options.objectMode"), encoding !== __intrinsic__undefined && !__intrinsic__Buffer.isEncoding(encoding))
    throw __intrinsic__makeErrorWithCode(119, encoding, "options.encoding");
  let writer = writableStream.getWriter(), reader = readableStream.getReader(), writableClosed = !1, readableClosed = !1, duplex = new Duplex({
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
      if (typeof chunk === "string" && decodeStrings && !objectMode)
        if (normalizeEncoding(encoding2) === "utf8")
          chunk = encoder.encode(chunk);
        else
          chunk = __intrinsic__Buffer.from(chunk, encoding2), chunk = new __intrinsic__Uint8Array(TypedArrayPrototypeGetBuffer(chunk), TypedArrayPrototypeGetByteOffset(chunk), TypedArrayPrototypeGetByteLength(chunk));
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
      if (!writableClosed)
        PromisePrototypeThen.__intrinsic__call(writer.close(), done, done);
    },
    read() {
      PromisePrototypeThen.__intrinsic__call(reader.read(), (chunk) => {
        if (chunk.done)
          duplex.push(null);
        else
          duplex.push(chunk.value);
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
  return PromisePrototypeThen.__intrinsic__call(writer.closed, () => {
    if (writableClosed = !0, !isWritableEnded(duplex))
      destroyer(duplex, __intrinsic__makeErrorWithCode(230));
  }, (error) => {
    writableClosed = !0, readableClosed = !0, destroyer(duplex, error);
  }), PromisePrototypeThen.__intrinsic__call(reader.closed, () => {
    readableClosed = !0;
  }, (error) => {
    writableClosed = !0, readableClosed = !0, destroyer(duplex, error);
  }), duplex;
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
