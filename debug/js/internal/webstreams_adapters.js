(function (){"use strict";
let $debug_trace = Bun.env.TRACE && Bun.env.TRACE === '1';
let $debug_log_enabled = ((env) => (
  // The rationale for checking all these variables is just so you don't have to exactly remember which one you set.
  (env.BUN_DEBUG_ALL && env.BUN_DEBUG_ALL !== '0')
  || (env.BUN_DEBUG_JS && env.BUN_DEBUG_JS !== '0')
  || (env.BUN_DEBUG_WEBSTREAMS_ADAPTERS === '1')
  || (env.DEBUG_INTERNAL_WEBSTREAMS_ADAPTERS === '1')
))(Bun.env);
let $debug_pid_prefix = Bun.env.SHOW_PID === '1';
let $debug_log = $debug_log_enabled ? (...args) => {
  // warn goes to stderr without colorizing
  console[$debug_trace ? 'trace' : 'warn'](($debug_pid_prefix ? `[${process.pid}] ` : '') + (Bun.enableANSIColors ? '\x1b[90m[internal:webstreams_adapters]\x1b[0m' : '[internal:webstreams_adapters]'), ...args);
} : () => {};
// build/debug/tmp_modules/internal/webstreams_adapters.ts
var $;
var {
  SafePromiseAll,
  SafeSet,
  TypedArrayPrototypeGetBuffer,
  TypedArrayPrototypeGetByteOffset,
  TypedArrayPrototypeGetByteLength
} = @getInternalField(@internalModuleRegistry, 30) || @createInternalModuleById(30);
var Writable = @getInternalField(@internalModuleRegistry, 59) || @createInternalModuleById(59);
var Readable = @getInternalField(@internalModuleRegistry, 55) || @createInternalModuleById(55);
var Duplex = @getInternalField(@internalModuleRegistry, 44) || @createInternalModuleById(44);
var { destroyer } = @getInternalField(@internalModuleRegistry, 43) || @createInternalModuleById(43);
var { isDestroyed, isReadable, isWritable, isWritableEnded } = @getInternalField(@internalModuleRegistry, 58) || @createInternalModuleById(58);
var { kEmptyObject } = @getInternalField(@internalModuleRegistry, 32) || @createInternalModuleById(32);
var { validateBoolean, validateObject } = @getInternalField(@internalModuleRegistry, 68) || @createInternalModuleById(68);
var finished = @getInternalField(@internalModuleRegistry, 47) || @createInternalModuleById(47);
var normalizeEncoding = @lazy(37);
var ArrayPrototypeFilter = @Array.prototype.filter;
var ArrayPrototypeMap = @Array.prototype.map;
var ObjectEntries = Object.entries;
var PromiseWithResolvers = @Promise.withResolvers.bind(@Promise);
var PromiseResolve = @Promise.@resolve.bind(@Promise);
var PromisePrototypeThen = @Promise.prototype.@then;
var SafePromisePrototypeFinally = @Promise.prototype.finally;
var constants_zlib = @processBindingConstants.zlib;
function tryTransferToNativeReadable(stream, options) {
  const ptr = stream.@bunNativePtr;
  if (!ptr || ptr === -1) {
    return @undefined;
  }
  return (@getInternalField(@internalModuleRegistry, 51) || @createInternalModuleById(51)).constructNativeReadable(stream, options);
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
    this.#reader = @undefined;
    this.#stream = stream;
    this.#closed = false;
  }
  #drainPending() {
    var pendingChunks = this.#pendingChunks, pendingChunksI = 0, pendingChunksCount = pendingChunks.length;
    for (;pendingChunksI < pendingChunksCount; pendingChunksI++) {
      const chunk = pendingChunks[pendingChunksI];
      pendingChunks[pendingChunksI] = @undefined;
      if (!this.push(chunk, @undefined)) {
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
    this.#reader = @undefined;
    this.#closed = true;
    this.push(null);
    return;
  }
  async _read() {
    $debug_log("ReadableFromWeb _read()", this.__id);
    var stream = this.#stream, reader = this.#reader;
    if (stream) {
      reader = this.#reader = stream.getReader();
      this.#stream = @undefined;
    } else if (this.#drainPending()) {
      return;
    }
    var deferredError;
    try {
      do {
        var done = false, value;
        const firstResult = reader.readMany();
        if (@isPromise(firstResult)) {
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
        this.#reader = @undefined;
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
  ...ArrayPrototypeFilter.@call(ArrayPrototypeMap.@call(ObjectEntries(constants_zlib), ({ 0: code, 1: value }) => value < 0 ? code : null), Boolean),
  "Z_NEED_DICT"
]);
function handleKnownInternalErrors(cause) {
  switch (true) {
    case cause?.code === "ERR_STREAM_PREMATURE_CLOSE": {
      return @makeAbortError(@undefined, { cause });
    }
    case ZLIB_FAILURES.has(cause?.code): {
      const error = @makeTypeError(@undefined, { cause });
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
    throw @makeErrorWithCode(118, "streamWritable", "stream.Writable", streamWritable);
  }
  if (isDestroyed(streamWritable) || !isWritable(streamWritable)) {
    const writable = new @WritableStream;
    writable.close();
    return writable;
  }
  const highWaterMark = streamWritable.writableHighWaterMark;
  const strategy = streamWritable.writableObjectMode ? new CountQueuingStrategy({ highWaterMark }) : { highWaterMark };
  let controller;
  let backpressurePromise;
  let closed;
  function onDrain() {
    if (backpressurePromise !== @undefined)
      backpressurePromise.resolve();
  }
  const cleanup = finished(streamWritable, (error) => {
    error = handleKnownInternalErrors(error);
    cleanup();
    streamWritable.on("error", () => {});
    if (error != null) {
      if (backpressurePromise !== @undefined)
        backpressurePromise.reject(error);
      if (closed !== @undefined) {
        closed.reject(error);
        closed = @undefined;
      }
      controller.error(error);
      controller = @undefined;
      return;
    }
    if (closed !== @undefined) {
      closed.resolve();
      closed = @undefined;
      return;
    }
    controller.error(@makeAbortError());
    controller = @undefined;
  });
  streamWritable.on("drain", onDrain);
  return new @WritableStream({
    start(c) {
      controller = c;
    },
    write(chunk) {
      if (streamWritable.writableNeedDrain || !streamWritable.write(chunk)) {
        backpressurePromise = PromiseWithResolvers();
        return SafePromisePrototypeFinally.@call(backpressurePromise.promise, () => {
          backpressurePromise = @undefined;
        });
      }
    },
    abort(reason) {
      destroyer(streamWritable, reason);
    },
    close() {
      if (closed === @undefined && !isWritableEnded(streamWritable)) {
        closed = PromiseWithResolvers();
        streamWritable.end();
        return closed.promise;
      }
      controller = @undefined;
      return PromiseResolve();
    }
  }, strategy);
}
function newStreamWritableFromWritableStream(writableStream, options = kEmptyObject) {
  if (!@inherits(2, writableStream)) {
    throw @makeErrorWithCode(118, "writableStream", "WritableStream", writableStream);
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
          callback(error.length === 0 ? @undefined : error);
        } catch (error2) {
          process.nextTick(() => destroyer(writable, error2));
        }
      }
      PromisePrototypeThen.@call(writer.ready, () => {
        return PromisePrototypeThen.@call(SafePromiseAll(chunks, (data) => writer.write(data.chunk)), done, done);
      }, done);
    },
    write(chunk, encoding, callback) {
      if (typeof chunk === "string" && decodeStrings && !objectMode) {
        const enc = normalizeEncoding(encoding);
        if (enc === "utf8") {
          chunk = encoder.encode(chunk);
        } else {
          chunk = @Buffer.from(chunk, encoding);
          chunk = new @Uint8Array(TypedArrayPrototypeGetBuffer(chunk), TypedArrayPrototypeGetByteOffset(chunk), TypedArrayPrototypeGetByteLength(chunk));
        }
      }
      function done(error) {
        try {
          callback(error);
        } catch (error2) {
          destroyer(writable, error2);
        }
      }
      PromisePrototypeThen.@call(writer.ready, () => {
        return PromisePrototypeThen.@call(writer.write(chunk), done, done);
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
          PromisePrototypeThen.@call(writer.abort(error), done, done);
        } else {
          PromisePrototypeThen.@call(writer.close(), done, done);
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
        PromisePrototypeThen.@call(writer.close(), done, done);
      }
    }
  });
  PromisePrototypeThen.@call(writer.closed, () => {
    closed = true;
    if (!isWritableEnded(writable))
      destroyer(writable, @makeErrorWithCode(230));
  }, (error) => {
    closed = true;
    destroyer(writable, error);
  });
  return writable;
}
function newReadableStreamFromStreamReadable(streamReadable, options = kEmptyObject) {
  if (typeof streamReadable?._readableState !== "object") {
    throw @makeErrorWithCode(118, "streamReadable", "stream.Readable", streamReadable);
  }
  if (isDestroyed(streamReadable) || !isReadable(streamReadable)) {
    const readable = new @ReadableStream;
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
    if (@Buffer.isBuffer(chunk) && !objectMode)
      chunk = new @Uint8Array(chunk);
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
  return new @ReadableStream({
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
  if (!@inherits(1, readableStream)) {
    throw @makeErrorWithCode(118, "readableStream", "ReadableStream", readableStream);
  }
  validateObject(options, "options");
  const { highWaterMark, encoding, objectMode = false, signal } = options;
  if (encoding !== @undefined && !@Buffer.isEncoding(encoding))
    throw @makeErrorWithCode(119, "options.encoding", encoding);
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
    throw @makeErrorWithCode(118, "duplex", "stream.Duplex", duplex);
  }
  if (isDestroyed(duplex)) {
    const writable2 = new @WritableStream;
    const readable2 = new @ReadableStream;
    writable2.close();
    readable2.cancel();
    return { readable: readable2, writable: writable2 };
  }
  const writable = isWritable(duplex) ? newWritableStreamFromStreamWritable(duplex) : new @WritableStream;
  if (!isWritable(duplex))
    writable.close();
  const readable = isReadable(duplex) ? newReadableStreamFromStreamReadable(duplex) : new @ReadableStream;
  if (!isReadable(duplex))
    readable.cancel();
  return { writable, readable };
}
function newStreamDuplexFromReadableWritablePair(pair = kEmptyObject, options = kEmptyObject) {
  validateObject(pair, "pair");
  const { readable: readableStream, writable: writableStream } = pair;
  if (!@inherits(1, readableStream)) {
    throw @makeErrorWithCode(118, "pair.readable", "ReadableStream", readableStream);
  }
  if (!@inherits(2, writableStream)) {
    throw @makeErrorWithCode(118, "pair.writable", "WritableStream", writableStream);
  }
  validateObject(options, "options");
  const { allowHalfOpen = false, objectMode = false, encoding, decodeStrings = true, highWaterMark, signal } = options;
  validateBoolean(objectMode, "options.objectMode");
  if (encoding !== @undefined && !@Buffer.isEncoding(encoding))
    throw @makeErrorWithCode(119, encoding, "options.encoding");
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
          callback(error.length === 0 ? @undefined : error);
        } catch (error2) {
          process.nextTick(() => destroyer(duplex, error2));
        }
      }
      PromisePrototypeThen.@call(writer.ready, () => {
        return PromisePrototypeThen.@call(SafePromiseAll(chunks, (data) => writer.write(data.chunk)), done, done);
      }, done);
    },
    write(chunk, encoding2, callback) {
      if (typeof chunk === "string" && decodeStrings && !objectMode) {
        const enc = normalizeEncoding(encoding2);
        if (enc === "utf8") {
          chunk = encoder.encode(chunk);
        } else {
          chunk = @Buffer.from(chunk, encoding2);
          chunk = new @Uint8Array(TypedArrayPrototypeGetBuffer(chunk), TypedArrayPrototypeGetByteOffset(chunk), TypedArrayPrototypeGetByteLength(chunk));
        }
      }
      function done(error) {
        try {
          callback(error);
        } catch (error2) {
          destroyer(duplex, error2);
        }
      }
      PromisePrototypeThen.@call(writer.ready, () => {
        return PromisePrototypeThen.@call(writer.write(chunk), done, done);
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
        PromisePrototypeThen.@call(writer.close(), done, done);
      }
    },
    read() {
      PromisePrototypeThen.@call(reader.read(), (chunk) => {
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
        PromisePrototypeThen.@call(SafePromiseAll([closeWriter(), closeReader()]), done, done);
        return;
      }
      done();
    }
  });
  PromisePrototypeThen.@call(writer.closed, () => {
    writableClosed = true;
    if (!isWritableEnded(duplex))
      destroyer(duplex, @makeErrorWithCode(230));
  }, (error) => {
    writableClosed = true;
    readableClosed = true;
    destroyer(duplex, error);
  });
  PromisePrototypeThen.@call(reader.closed, () => {
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
return $})
