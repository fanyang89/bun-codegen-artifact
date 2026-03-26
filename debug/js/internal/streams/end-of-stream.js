(function (){"use strict";// build/debug/tmp_modules/internal/streams/end-of-stream.ts
var $;
var { kEmptyObject, once } = @getInternalField(@internalModuleRegistry, 32) || @createInternalModuleById(32);
var { validateAbortSignal, validateFunction, validateObject, validateBoolean } = @getInternalField(@internalModuleRegistry, 68) || @createInternalModuleById(68);
var {
  isClosed,
  isReadable,
  isReadableNodeStream,
  isReadableStream,
  isReadableFinished,
  isReadableErrored,
  isWritable,
  isWritableNodeStream,
  isWritableStream,
  isWritableFinished,
  isWritableErrored,
  isNodeStream,
  willEmitClose: _willEmitClose,
  kIsClosedPromise
} = @getInternalField(@internalModuleRegistry, 58) || @createInternalModuleById(58);
var SymbolDispose = Symbol.dispose;
var PromisePrototypeThen = @Promise.prototype.@then;
var addAbortListener;
var AsyncLocalStorage;
function isRequest(stream) {
  return stream.setHeader && typeof stream.abort === "function";
}
var nop = () => {};
function eos(stream, options, callback) {
  if (arguments.length === 2) {
    callback = options;
    options = kEmptyObject;
  } else if (options == null) {
    options = kEmptyObject;
  } else {
    validateObject(options, "options");
  }
  validateFunction(callback, "callback");
  validateAbortSignal(options.signal, "options.signal");
  AsyncLocalStorage ??= (@getInternalField(@internalModuleRegistry, 86) || @createInternalModuleById(86)).AsyncLocalStorage;
  callback = once(AsyncLocalStorage.bind(callback));
  if (isReadableStream(stream) || isWritableStream(stream)) {
    return eosWeb(stream, options, callback);
  }
  if (!isNodeStream(stream)) {
    throw @makeErrorWithCode(118, "stream", ["ReadableStream", "WritableStream", "Stream"], stream);
  }
  const readable = options.readable ?? isReadableNodeStream(stream);
  const writable = options.writable ?? isWritableNodeStream(stream);
  const wState = stream._writableState;
  const rState = stream._readableState;
  const onlegacyfinish = () => {
    if (!stream.writable) {
      onfinish();
    }
  };
  let willEmitClose = _willEmitClose(stream) && isReadableNodeStream(stream) === readable && isWritableNodeStream(stream) === writable;
  let writableFinished = isWritableFinished(stream, false);
  const onfinish = () => {
    writableFinished = true;
    if (stream.destroyed) {
      willEmitClose = false;
    }
    if (willEmitClose && (!stream.readable || readable)) {
      return;
    }
    if (!readable || readableFinished) {
      callback.@call(stream);
    }
  };
  let readableFinished = isReadableFinished(stream, false);
  const onend = () => {
    readableFinished = true;
    if (stream.destroyed) {
      willEmitClose = false;
    }
    if (willEmitClose && (!stream.writable || writable)) {
      return;
    }
    if (!writable || writableFinished) {
      callback.@call(stream);
    }
  };
  const onerror = (err) => {
    callback.@call(stream, err);
  };
  let closed = isClosed(stream);
  const onclose = () => {
    closed = true;
    const errored = isWritableErrored(stream) || isReadableErrored(stream);
    if (errored && typeof errored !== "boolean") {
      return callback.@call(stream, errored);
    }
    if (readable && !readableFinished && isReadableNodeStream(stream, true)) {
      if (!isReadableFinished(stream, false))
        return callback.@call(stream, @makeErrorWithCode(230));
    }
    if (writable && !writableFinished) {
      if (!isWritableFinished(stream, false))
        return callback.@call(stream, @makeErrorWithCode(230));
    }
    callback.@call(stream);
  };
  const onclosed = () => {
    closed = true;
    const errored = isWritableErrored(stream) || isReadableErrored(stream);
    if (errored && typeof errored !== "boolean") {
      return callback.@call(stream, errored);
    }
    callback.@call(stream);
  };
  const onrequest = () => {
    stream.req.on("finish", onfinish);
  };
  if (isRequest(stream)) {
    stream.on("complete", onfinish);
    if (!willEmitClose) {
      stream.on("abort", onclose);
    }
    if (stream.req) {
      onrequest();
    } else {
      stream.on("request", onrequest);
    }
  } else if (writable && !wState) {
    stream.on("end", onlegacyfinish);
    stream.on("close", onlegacyfinish);
  }
  if (!willEmitClose && typeof stream.aborted === "boolean") {
    stream.on("aborted", onclose);
  }
  stream.on("end", onend);
  stream.on("finish", onfinish);
  if (options.error !== false) {
    stream.on("error", onerror);
  }
  stream.on("close", onclose);
  if (closed) {
    process.nextTick(onclose);
  } else if (wState?.errorEmitted || rState?.errorEmitted) {
    if (!willEmitClose) {
      process.nextTick(onclosed);
    }
  } else if (!readable && (!willEmitClose || isReadable(stream)) && (writableFinished || isWritable(stream) === false) && (wState == null || wState.pendingcb === @undefined || wState.pendingcb === 0)) {
    process.nextTick(onclosed);
  } else if (!writable && (!willEmitClose || isWritable(stream)) && (readableFinished || isReadable(stream) === false)) {
    process.nextTick(onclosed);
  } else if (rState && stream.req && stream.aborted) {
    process.nextTick(onclosed);
  }
  const cleanup = () => {
    callback = nop;
    stream.removeListener("aborted", onclose);
    stream.removeListener("complete", onfinish);
    stream.removeListener("abort", onclose);
    stream.removeListener("request", onrequest);
    if (stream.req)
      stream.req.removeListener("finish", onfinish);
    stream.removeListener("end", onlegacyfinish);
    stream.removeListener("close", onlegacyfinish);
    stream.removeListener("finish", onfinish);
    stream.removeListener("end", onend);
    stream.removeListener("error", onerror);
    stream.removeListener("close", onclose);
  };
  if (options.signal && !closed) {
    const abort = () => {
      const endCallback = callback;
      cleanup();
      endCallback.@call(stream, @makeAbortError(@undefined, { cause: options.signal.reason }));
    };
    if (options.signal.aborted) {
      process.nextTick(abort);
    } else {
      addAbortListener ??= (@getInternalField(@internalModuleRegistry, 3) || @createInternalModuleById(3)).addAbortListener;
      const disposable = addAbortListener(options.signal, abort);
      const originalCallback = callback;
      callback = once((...args) => {
        disposable[SymbolDispose]();
        originalCallback.@apply(stream, args);
      });
    }
  }
  return cleanup;
}
function eosWeb(stream, options, callback) {
  let isAborted = false;
  let abort = nop;
  if (options.signal) {
    abort = () => {
      isAborted = true;
      callback.@call(stream, @makeAbortError(@undefined, { cause: options.signal.reason }));
    };
    if (options.signal.aborted) {
      process.nextTick(abort);
    } else {
      addAbortListener ??= (@getInternalField(@internalModuleRegistry, 3) || @createInternalModuleById(3)).addAbortListener;
      const disposable = addAbortListener(options.signal, abort);
      const originalCallback = callback;
      callback = once((...args) => {
        disposable[SymbolDispose]();
        originalCallback.@apply(stream, args);
      });
    }
  }
  const resolverFn = (...args) => {
    if (!isAborted) {
      process.nextTick(() => callback.@apply(stream, args));
    }
  };
  PromisePrototypeThen.@call(stream[kIsClosedPromise].promise, resolverFn, resolverFn);
  return nop;
}
function finished(stream, opts) {
  let autoCleanup = false;
  if (opts === null) {
    opts = kEmptyObject;
  }
  if (opts?.cleanup) {
    validateBoolean(opts.cleanup, "cleanup");
    autoCleanup = opts.cleanup;
  }
  return new @Promise((resolve, reject) => {
    const cleanup = eos(stream, opts, (err) => {
      if (autoCleanup) {
        cleanup();
      }
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}
eos.finished = finished;
$ = eos;
return $})
