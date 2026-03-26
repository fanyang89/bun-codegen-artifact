// @bun
// build/debug/tmp_modules/internal/streams/writable.ts
var $;
var EE = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 96) || __intrinsic__createInternalModuleById(96);
var { Stream } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 50) || __intrinsic__createInternalModuleById(50);
var destroyImpl = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 43) || __intrinsic__createInternalModuleById(43);
var eos = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 47) || __intrinsic__createInternalModuleById(47);
var { addAbortSignal } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 41) || __intrinsic__createInternalModuleById(41);
var { getHighWaterMark, getDefaultHighWaterMark } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 56) || __intrinsic__createInternalModuleById(56);
var {
  kOnConstructed,
  kState,
  kObjectMode,
  kErrorEmitted,
  kAutoDestroy,
  kEmitClose,
  kDestroyed,
  kClosed,
  kCloseEmitted,
  kErrored,
  kConstructed
} = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 58) || __intrinsic__createInternalModuleById(58);
var ObjectDefineProperties = Object.defineProperties;
var ArrayPrototypeSlice = __intrinsic__Array.prototype.slice;
var ObjectDefineProperty = Object.defineProperty;
var SymbolHasInstance = Symbol.hasInstance;
var FunctionPrototypeSymbolHasInstance = Function.prototype[Symbol.hasInstance];
var StringPrototypeToLowerCase = __intrinsic__String.prototype.toLowerCase;
var SymbolAsyncDispose = Symbol.asyncDispose;
var { errorOrDestroy } = destroyImpl;
function nop() {}
var kOnFinishedValue = Symbol("kOnFinishedValue");
var kErroredValue = Symbol("kErroredValue");
var kDefaultEncodingValue = Symbol("kDefaultEncodingValue");
var kWriteCbValue = Symbol("kWriteCbValue");
var kAfterWriteTickInfoValue = Symbol("kAfterWriteTickInfoValue");
var kBufferedValue = Symbol("kBufferedValue");
var kSync = 1 << 9;
var kFinalCalled = 1 << 10;
var kNeedDrain = 1 << 11;
var kEnding = 1 << 12;
var kFinished = 1 << 13;
var kDecodeStrings = 1 << 14;
var kWriting = 1 << 15;
var kBufferProcessing = 1 << 16;
var kPrefinished = 1 << 17;
var kAllBuffers = 1 << 18;
var kAllNoop = 1 << 19;
var kOnFinished = 1 << 20;
var kHasWritable = 1 << 21;
var kWritable = 1 << 22;
var kCorked = 1 << 23;
var kDefaultUTF8Encoding = 1 << 24;
var kWriteCb = 1 << 25;
var kExpectWriteCb = 1 << 26;
var kAfterWriteTickInfo = 1 << 27;
var kAfterWritePending = 1 << 28;
var kBuffered = 1 << 29;
var kEnded = 1 << 30;
function makeBitMapDescriptor(bit) {
  return {
    enumerable: false,
    get() {
      return (this[kState] & bit) !== 0;
    },
    set(value) {
      if (value)
        this[kState] |= bit;
      else
        this[kState] &= ~bit;
    }
  };
}
WritableState.prototype = {};
ObjectDefineProperties(WritableState.prototype, {
  objectMode: makeBitMapDescriptor(kObjectMode),
  finalCalled: makeBitMapDescriptor(kFinalCalled),
  needDrain: makeBitMapDescriptor(kNeedDrain),
  ending: makeBitMapDescriptor(kEnding),
  ended: makeBitMapDescriptor(kEnded),
  finished: makeBitMapDescriptor(kFinished),
  destroyed: makeBitMapDescriptor(kDestroyed),
  decodeStrings: makeBitMapDescriptor(kDecodeStrings),
  writing: makeBitMapDescriptor(kWriting),
  sync: makeBitMapDescriptor(kSync),
  bufferProcessing: makeBitMapDescriptor(kBufferProcessing),
  constructed: makeBitMapDescriptor(kConstructed),
  prefinished: makeBitMapDescriptor(kPrefinished),
  errorEmitted: makeBitMapDescriptor(kErrorEmitted),
  emitClose: makeBitMapDescriptor(kEmitClose),
  autoDestroy: makeBitMapDescriptor(kAutoDestroy),
  closed: makeBitMapDescriptor(kClosed),
  closeEmitted: makeBitMapDescriptor(kCloseEmitted),
  allBuffers: makeBitMapDescriptor(kAllBuffers),
  allNoop: makeBitMapDescriptor(kAllNoop),
  errored: {
    __proto__: null,
    enumerable: false,
    get() {
      return (this[kState] & kErrored) !== 0 ? this[kErroredValue] : null;
    },
    set(value) {
      if (value) {
        this[kErroredValue] = value;
        this[kState] |= kErrored;
      } else {
        this[kState] &= ~kErrored;
      }
    }
  },
  writable: {
    __proto__: null,
    enumerable: false,
    get() {
      return (this[kState] & kHasWritable) !== 0 ? (this[kState] & kWritable) !== 0 : __intrinsic__undefined;
    },
    set(value) {
      if (value == null) {
        this[kState] &= ~(kHasWritable | kWritable);
      } else if (value) {
        this[kState] |= kHasWritable | kWritable;
      } else {
        this[kState] |= kHasWritable;
        this[kState] &= ~kWritable;
      }
    }
  },
  defaultEncoding: {
    __proto__: null,
    enumerable: false,
    get() {
      return (this[kState] & kDefaultUTF8Encoding) !== 0 ? "utf8" : this[kDefaultEncodingValue];
    },
    set(value) {
      if (value === "utf8" || value === "utf-8") {
        this[kState] |= kDefaultUTF8Encoding;
      } else {
        this[kState] &= ~kDefaultUTF8Encoding;
        this[kDefaultEncodingValue] = value;
      }
    }
  },
  writecb: {
    __proto__: null,
    enumerable: false,
    get() {
      return (this[kState] & kWriteCb) !== 0 ? this[kWriteCbValue] : nop;
    },
    set(value) {
      this[kWriteCbValue] = value;
      if (value) {
        this[kState] |= kWriteCb;
      } else {
        this[kState] &= ~kWriteCb;
      }
    }
  },
  afterWriteTickInfo: {
    __proto__: null,
    enumerable: false,
    get() {
      return (this[kState] & kAfterWriteTickInfo) !== 0 ? this[kAfterWriteTickInfoValue] : null;
    },
    set(value) {
      this[kAfterWriteTickInfoValue] = value;
      if (value) {
        this[kState] |= kAfterWriteTickInfo;
      } else {
        this[kState] &= ~kAfterWriteTickInfo;
      }
    }
  },
  buffered: {
    __proto__: null,
    enumerable: false,
    get() {
      return (this[kState] & kBuffered) !== 0 ? this[kBufferedValue] : [];
    },
    set(value) {
      this[kBufferedValue] = value;
      if (value) {
        this[kState] |= kBuffered;
      } else {
        this[kState] &= ~kBuffered;
      }
    }
  }
});
function WritableState(options, stream, isDuplex) {
  this[kState] = kSync | kConstructed | kEmitClose | kAutoDestroy;
  if (options?.objectMode)
    this[kState] |= kObjectMode;
  if (isDuplex && options?.writableObjectMode)
    this[kState] |= kObjectMode;
  this.highWaterMark = options ? getHighWaterMark(this, options, "writableHighWaterMark", isDuplex) : getDefaultHighWaterMark(false);
  if (!options || options.decodeStrings !== false)
    this[kState] |= kDecodeStrings;
  if (options && options.emitClose === false)
    this[kState] &= ~kEmitClose;
  if (options && options.autoDestroy === false)
    this[kState] &= ~kAutoDestroy;
  const defaultEncoding = options ? options.defaultEncoding : null;
  if (defaultEncoding == null || defaultEncoding === "utf8" || defaultEncoding === "utf-8") {
    this[kState] |= kDefaultUTF8Encoding;
  } else if (__intrinsic__Buffer.isEncoding(defaultEncoding)) {
    this[kState] &= ~kDefaultUTF8Encoding;
    this[kDefaultEncodingValue] = defaultEncoding;
  } else {
    throw __intrinsic__makeErrorWithCode(254, defaultEncoding);
  }
  this.length = 0;
  this.corked = 0;
  this.onwrite = onwrite.bind(__intrinsic__undefined, stream);
  this.writelen = 0;
  resetBuffer(this);
  this.pendingcb = 0;
}
function resetBuffer(state) {
  state[kBufferedValue] = null;
  state.bufferedIndex = 0;
  state[kState] |= kAllBuffers | kAllNoop;
  state[kState] &= ~kBuffered;
}
WritableState.prototype.getBuffer = function getBuffer() {
  return (this[kState] & kBuffered) === 0 ? [] : ArrayPrototypeSlice.__intrinsic__call(this.buffered, this.bufferedIndex);
};
ObjectDefineProperty(WritableState.prototype, "bufferedRequestCount", {
  __proto__: null,
  get() {
    return (this[kState] & kBuffered) === 0 ? 0 : this[kBufferedValue].length - this.bufferedIndex;
  }
});
WritableState.prototype[kOnConstructed] = function onConstructed(stream) {
  if ((this[kState] & kWriting) === 0) {
    clearBuffer(stream, this);
  }
  if ((this[kState] & kEnding) !== 0) {
    finishMaybe(stream, this);
  }
};
function Writable(options) {
  if (!(this instanceof Writable))
    return new Writable(options);
  this._events ??= {
    close: __intrinsic__undefined,
    error: __intrinsic__undefined,
    prefinish: __intrinsic__undefined,
    finish: __intrinsic__undefined,
    drain: __intrinsic__undefined
  };
  this._writableState = new WritableState(options, this, false);
  if (options) {
    if (typeof options.write === "function")
      this._write = options.write;
    if (typeof options.writev === "function")
      this._writev = options.writev;
    if (typeof options.destroy === "function")
      this._destroy = options.destroy;
    if (typeof options.final === "function")
      this._final = options.final;
    if (typeof options.construct === "function")
      this._construct = options.construct;
    if (options.signal)
      addAbortSignal(options.signal, this);
  }
  Stream.__intrinsic__call(this, options);
  if (this._construct != null) {
    destroyImpl.construct(this, () => {
      this._writableState[kOnConstructed](this);
    });
  }
}
__intrinsic__toClass(Writable, "Writable", Stream);
Writable.WritableState = WritableState;
ObjectDefineProperty(Writable, SymbolHasInstance, {
  __proto__: null,
  value: function(object) {
    if (FunctionPrototypeSymbolHasInstance.__intrinsic__call(this, object))
      return true;
    if (this !== Writable)
      return false;
    return object && object._writableState instanceof WritableState;
  }
});
Writable.prototype.pipe = function() {
  errorOrDestroy(this, __intrinsic__makeErrorWithCode(227));
};
function _write(stream, chunk, encoding, cb) {
  const state = stream._writableState;
  if (cb == null || typeof cb !== "function") {
    cb = nop;
  }
  if (chunk === null) {
    throw __intrinsic__makeErrorWithCode(229);
  }
  if ((state[kState] & kObjectMode) === 0) {
    if (!encoding) {
      encoding = (state[kState] & kDefaultUTF8Encoding) !== 0 ? "utf8" : state.defaultEncoding;
    } else if (encoding !== "buffer" && !__intrinsic__Buffer.isEncoding(encoding)) {
      throw __intrinsic__makeErrorWithCode(254, encoding);
    }
    if (typeof chunk === "string") {
      if ((state[kState] & kDecodeStrings) !== 0) {
        chunk = __intrinsic__Buffer.from(chunk, encoding);
        encoding = "buffer";
      }
    } else if (chunk instanceof __intrinsic__Buffer) {
      encoding = "buffer";
    } else if (Stream._isArrayBufferView(chunk)) {
      chunk = Stream._uint8ArrayToBuffer(chunk);
      encoding = "buffer";
    } else {
      throw __intrinsic__makeErrorWithCode(118, "chunk", ["string", "Buffer", "TypedArray", "DataView"], chunk);
    }
  }
  let err;
  if ((state[kState] & kEnding) !== 0) {
    err = __intrinsic__makeErrorWithCode(236);
  } else if ((state[kState] & kDestroyed) !== 0) {
    err = __intrinsic__makeErrorWithCode(228, "write");
  }
  if (err) {
    process.nextTick(cb, err);
    errorOrDestroy(stream, err, true);
    return err;
  }
  state.pendingcb++;
  return writeOrBuffer(stream, state, chunk, encoding, cb);
}
Writable.prototype.write = function(chunk, encoding, cb) {
  if (encoding != null && typeof encoding === "function") {
    cb = encoding;
    encoding = null;
  }
  return _write(this, chunk, encoding, cb) === true;
};
Writable.prototype.cork = function() {
  const state = this._writableState;
  state[kState] |= kCorked;
  state.corked++;
};
Writable.prototype.uncork = function() {
  const state = this._writableState;
  if (state.corked) {
    state.corked--;
    if (!state.corked) {
      state[kState] &= ~kCorked;
    }
    if ((state[kState] & kWriting) === 0)
      clearBuffer(this, state);
  }
};
Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
  if (typeof encoding === "string")
    encoding = StringPrototypeToLowerCase.__intrinsic__call(encoding);
  if (!__intrinsic__Buffer.isEncoding(encoding))
    throw __intrinsic__makeErrorWithCode(254, encoding);
  this._writableState.defaultEncoding = encoding;
  return this;
};
function writeOrBuffer(stream, state, chunk, encoding, callback) {
  const len = (state[kState] & kObjectMode) !== 0 ? 1 : chunk.length;
  state.length += len;
  if ((state[kState] & (kWriting | kErrored | kCorked | kConstructed)) !== kConstructed) {
    if ((state[kState] & kBuffered) === 0) {
      state[kState] |= kBuffered;
      state[kBufferedValue] = [];
    }
    state[kBufferedValue].push({ chunk, encoding, callback });
    if ((state[kState] & kAllBuffers) !== 0 && encoding !== "buffer") {
      state[kState] &= ~kAllBuffers;
    }
    if ((state[kState] & kAllNoop) !== 0 && callback !== nop) {
      state[kState] &= ~kAllNoop;
    }
  } else {
    state.writelen = len;
    if (callback !== nop) {
      state.writecb = callback;
    }
    state[kState] |= kWriting | kSync | kExpectWriteCb;
    stream._write(chunk, encoding, state.onwrite);
    state[kState] &= ~kSync;
  }
  const ret = state.length < state.highWaterMark || state.length === 0;
  if (!ret) {
    state[kState] |= kNeedDrain;
  }
  return ret && (state[kState] & (kDestroyed | kErrored)) === 0;
}
function doWrite(stream, state, writev, len, chunk, encoding, cb) {
  state.writelen = len;
  if (cb !== nop) {
    state.writecb = cb;
  }
  state[kState] |= kWriting | kSync | kExpectWriteCb;
  if ((state[kState] & kDestroyed) !== 0)
    state.onwrite(__intrinsic__makeErrorWithCode(228, "write"));
  else if (writev)
    stream._writev(chunk, state.onwrite);
  else
    stream._write(chunk, encoding, state.onwrite);
  state[kState] &= ~kSync;
}
function onwriteError(stream, state, er, cb) {
  --state.pendingcb;
  cb(er);
  errorBuffer(state);
  errorOrDestroy(stream, er);
}
function onwrite(stream, er) {
  const state = stream._writableState;
  if ((state[kState] & kExpectWriteCb) === 0) {
    errorOrDestroy(stream, __intrinsic__makeErrorWithCode(154));
    return;
  }
  const sync = (state[kState] & kSync) !== 0;
  const cb = (state[kState] & kWriteCb) !== 0 ? state[kWriteCbValue] : nop;
  state.writecb = null;
  state[kState] &= ~(kWriting | kExpectWriteCb);
  state.length -= state.writelen;
  state.writelen = 0;
  if (er) {
    er.stack;
    if ((state[kState] & kErrored) === 0) {
      state[kErroredValue] = er;
      state[kState] |= kErrored;
    }
    if (stream._readableState && !stream._readableState.errored) {
      stream._readableState.errored = er;
    }
    if (sync) {
      process.nextTick(onwriteError, stream, state, er, cb);
    } else {
      onwriteError(stream, state, er, cb);
    }
  } else {
    if ((state[kState] & kBuffered) !== 0) {
      clearBuffer(stream, state);
    }
    if (sync) {
      const needDrain = (state[kState] & kNeedDrain) !== 0 && state.length === 0;
      const needTick = needDrain || state[kState] & Number(kDestroyed !== 0) || cb !== nop;
      if (cb === nop) {
        if ((state[kState] & kAfterWritePending) === 0 && needTick) {
          process.nextTick(afterWrite, stream, state, 1, cb);
          state[kState] |= kAfterWritePending;
        } else {
          state.pendingcb--;
          if ((state[kState] & kEnding) !== 0) {
            finishMaybe(stream, state, true);
          }
        }
      } else if ((state[kState] & kAfterWriteTickInfo) !== 0 && state[kAfterWriteTickInfoValue].cb === cb) {
        state[kAfterWriteTickInfoValue].count++;
      } else if (needTick) {
        state[kAfterWriteTickInfoValue] = { count: 1, cb, stream, state };
        process.nextTick(afterWriteTick, state[kAfterWriteTickInfoValue]);
        state[kState] |= kAfterWritePending | kAfterWriteTickInfo;
      } else {
        state.pendingcb--;
        if ((state[kState] & kEnding) !== 0) {
          finishMaybe(stream, state, true);
        }
      }
    } else {
      afterWrite(stream, state, 1, cb);
    }
  }
}
function afterWriteTick({ stream, state, count, cb }) {
  state[kState] &= ~kAfterWriteTickInfo;
  state[kAfterWriteTickInfoValue] = null;
  return afterWrite(stream, state, count, cb);
}
function afterWrite(stream, state, count, cb) {
  state[kState] &= ~kAfterWritePending;
  const needDrain = (state[kState] & (kEnding | kNeedDrain | kDestroyed)) === kNeedDrain && state.length === 0;
  if (needDrain) {
    state[kState] &= ~kNeedDrain;
    stream.emit("drain");
  }
  while (count-- > 0) {
    state.pendingcb--;
    cb(null);
  }
  if ((state[kState] & kDestroyed) !== 0) {
    errorBuffer(state);
  }
  if ((state[kState] & kEnding) !== 0) {
    finishMaybe(stream, state, true);
  }
}
function errorBuffer(state) {
  if ((state[kState] & kWriting) !== 0) {
    return;
  }
  if ((state[kState] & kBuffered) !== 0) {
    for (let n = state.bufferedIndex;n < state.buffered.length; ++n) {
      const { chunk, callback } = state[kBufferedValue][n];
      const len = (state[kState] & kObjectMode) !== 0 ? 1 : chunk.length;
      state.length -= len;
      callback(state.errored ?? __intrinsic__makeErrorWithCode(228, "write"));
    }
  }
  callFinishedCallbacks(state, state.errored ?? __intrinsic__makeErrorWithCode(228, "end"));
  resetBuffer(state);
}
function clearBuffer(stream, state) {
  if ((state[kState] & (kDestroyed | kBufferProcessing | kCorked | kBuffered | kConstructed)) !== (kBuffered | kConstructed)) {
    return;
  }
  const objectMode = (state[kState] & kObjectMode) !== 0;
  const { [kBufferedValue]: buffered, bufferedIndex } = state;
  const bufferedLength = buffered.length - bufferedIndex;
  if (!bufferedLength) {
    return;
  }
  let i = bufferedIndex;
  state[kState] |= kBufferProcessing;
  if (bufferedLength > 1 && stream._writev) {
    state.pendingcb -= bufferedLength - 1;
    const callback = (state[kState] & kAllNoop) !== 0 ? nop : (err) => {
      for (let n = i;n < buffered.length; ++n) {
        buffered[n].callback(err);
      }
    };
    const chunks = (state[kState] & kAllNoop) !== 0 && i === 0 ? buffered : ArrayPrototypeSlice.__intrinsic__call(buffered, i);
    chunks.allBuffers = (state[kState] & kAllBuffers) !== 0;
    doWrite(stream, state, true, state.length, chunks, "", callback);
    resetBuffer(state);
  } else {
    do {
      const { chunk, encoding, callback } = buffered[i];
      buffered[i++] = null;
      const len = objectMode ? 1 : chunk.length;
      doWrite(stream, state, false, len, chunk, encoding, callback);
    } while (i < buffered.length && (state[kState] & kWriting) === 0);
    if (i === buffered.length) {
      resetBuffer(state);
    } else if (i > 256) {
      buffered.splice(0, i);
      state.bufferedIndex = 0;
    } else {
      state.bufferedIndex = i;
    }
  }
  state[kState] &= ~kBufferProcessing;
}
Writable.prototype._write = function(chunk, encoding, cb) {
  if (this._writev) {
    this._writev([{ chunk, encoding }], cb);
  } else {
    throw __intrinsic__makeErrorWithCode(149, "_write()");
  }
};
Writable.prototype._writev = null;
Writable.prototype.end = function(chunk, encoding, cb) {
  const state = this._writableState;
  if (typeof chunk === "function") {
    cb = chunk;
    chunk = null;
    encoding = null;
  } else if (typeof encoding === "function") {
    cb = encoding;
    encoding = null;
  }
  let err;
  if (chunk != null) {
    const ret = _write(this, chunk, encoding);
    if (Error.isError(ret)) {
      err = ret;
    }
  }
  if ((state[kState] & kCorked) !== 0) {
    state.corked = 1;
    this.uncork();
  }
  if (err) {} else if ((state[kState] & (kEnding | kErrored)) === 0) {
    state[kState] |= kEnding;
    finishMaybe(this, state, true);
    state[kState] |= kEnded;
  } else if ((state[kState] & kFinished) !== 0) {
    err = __intrinsic__makeErrorWithCode(226, "end");
  } else if ((state[kState] & kDestroyed) !== 0) {
    err = __intrinsic__makeErrorWithCode(228, "end");
  }
  if (typeof cb === "function") {
    if (err) {
      process.nextTick(cb, err);
    } else if ((state[kState] & kErrored) !== 0) {
      process.nextTick(cb, state[kErroredValue]);
    } else if ((state[kState] & kFinished) !== 0) {
      process.nextTick(cb, null);
    } else {
      state[kState] |= kOnFinished;
      state[kOnFinishedValue] ??= [];
      state[kOnFinishedValue].push(cb);
    }
  }
  return this;
};
function needFinish(state) {
  return (state[kState] & (kEnding | kDestroyed | kConstructed | kFinished | kWriting | kErrorEmitted | kCloseEmitted | kErrored | kBuffered)) === (kEnding | kConstructed) && state.length === 0;
}
function onFinish(stream, state, err) {
  if ((state[kState] & kPrefinished) !== 0) {
    errorOrDestroy(stream, err ?? __intrinsic__makeErrorWithCode(154));
    return;
  }
  state.pendingcb--;
  if (err) {
    callFinishedCallbacks(state, err);
    errorOrDestroy(stream, err, (state[kState] & kSync) !== 0);
  } else if (needFinish(state)) {
    state[kState] |= kPrefinished;
    stream.emit("prefinish");
    state.pendingcb++;
    process.nextTick(finish, stream, state);
  }
}
function prefinish(stream, state) {
  if ((state[kState] & (kPrefinished | kFinalCalled)) !== 0) {
    return;
  }
  if (typeof stream._final === "function" && (state[kState] & kDestroyed) === 0) {
    state[kState] |= kFinalCalled | kSync;
    state.pendingcb++;
    try {
      stream._final((err) => onFinish(stream, state, err));
    } catch (err) {
      onFinish(stream, state, err);
    }
    state[kState] &= ~kSync;
  } else {
    state[kState] |= kFinalCalled | kPrefinished;
    stream.emit("prefinish");
  }
}
function finishMaybe(stream, state, sync) {
  if (needFinish(state)) {
    prefinish(stream, state);
    if (state.pendingcb === 0) {
      if (sync) {
        state.pendingcb++;
        process.nextTick((stream2, state2) => {
          if (needFinish(state2)) {
            finish(stream2, state2);
          } else {
            state2.pendingcb--;
          }
        }, stream, state);
      } else if (needFinish(state)) {
        state.pendingcb++;
        finish(stream, state);
      }
    }
  }
}
function finish(stream, state) {
  state.pendingcb--;
  state[kState] |= kFinished;
  callFinishedCallbacks(state, null);
  stream.emit("finish");
  if ((state[kState] & kAutoDestroy) !== 0) {
    const rState = stream._readableState;
    const autoDestroy = !rState || rState.autoDestroy && (rState.endEmitted || rState.readable === false);
    if (autoDestroy) {
      stream.destroy();
    }
  }
}
function callFinishedCallbacks(state, err) {
  if ((state[kState] & kOnFinished) === 0) {
    return;
  }
  const onfinishCallbacks = state[kOnFinishedValue];
  state[kOnFinishedValue] = null;
  state[kState] &= ~kOnFinished;
  for (let i = 0;i < onfinishCallbacks.length; i++) {
    onfinishCallbacks[i](err);
  }
}
ObjectDefineProperties(Writable.prototype, {
  closed: {
    __proto__: null,
    get() {
      return this._writableState ? (this._writableState[kState] & kClosed) !== 0 : false;
    }
  },
  destroyed: {
    __proto__: null,
    get() {
      return this._writableState ? (this._writableState[kState] & kDestroyed) !== 0 : false;
    },
    set(value) {
      if (!this._writableState)
        return;
      if (value)
        this._writableState[kState] |= kDestroyed;
      else
        this._writableState[kState] &= ~kDestroyed;
    }
  },
  writable: {
    __proto__: null,
    get() {
      const w = this._writableState;
      return !!w && w.writable !== false && (w[kState] & (kEnding | kEnded | kDestroyed | kErrored)) === 0;
    },
    set(val) {
      if (this._writableState) {
        this._writableState.writable = !!val;
      }
    }
  },
  writableFinished: {
    __proto__: null,
    get() {
      const state = this._writableState;
      return state ? (state[kState] & kFinished) !== 0 : false;
    }
  },
  writableObjectMode: {
    __proto__: null,
    get() {
      const state = this._writableState;
      return state ? (state[kState] & kObjectMode) !== 0 : false;
    }
  },
  writableBuffer: {
    __proto__: null,
    get() {
      const state = this._writableState;
      return state && state.getBuffer();
    }
  },
  writableEnded: {
    __proto__: null,
    get() {
      const state = this._writableState;
      return state ? (state[kState] & kEnding) !== 0 : false;
    }
  },
  writableNeedDrain: {
    __proto__: null,
    get() {
      const state = this._writableState;
      return state ? (state[kState] & (kDestroyed | kEnding | kNeedDrain)) === kNeedDrain : false;
    }
  },
  writableHighWaterMark: {
    __proto__: null,
    get() {
      const state = this._writableState;
      return state?.highWaterMark;
    }
  },
  writableCorked: {
    __proto__: null,
    get() {
      const state = this._writableState;
      return state ? state.corked : 0;
    }
  },
  writableLength: {
    __proto__: null,
    get() {
      const state = this._writableState;
      return state?.length;
    }
  },
  errored: {
    __proto__: null,
    enumerable: false,
    get() {
      const state = this._writableState;
      return state ? state.errored : null;
    }
  },
  writableAborted: {
    __proto__: null,
    get: function() {
      const state = this._writableState;
      return (state[kState] & (kHasWritable | kWritable)) !== kHasWritable && (state[kState] & (kDestroyed | kErrored)) !== 0 && (state[kState] & kFinished) === 0;
    }
  }
});
var destroy = destroyImpl.destroy;
Writable.prototype.destroy = function(err, cb) {
  const state = this._writableState;
  if ((state[kState] & (kBuffered | kOnFinished)) !== 0 && (state[kState] & kDestroyed) === 0) {
    process.nextTick(errorBuffer, state);
  }
  destroy.__intrinsic__call(this, err, cb);
  return this;
};
Writable.prototype._undestroy = destroyImpl.undestroy;
Writable.prototype._destroy = function(err, cb) {
  cb(err);
};
Writable.prototype[EE.captureRejectionSymbol] = function(err) {
  this.destroy(err);
};
var webStreamsAdapters;
function lazyWebStreams() {
  if (webStreamsAdapters === __intrinsic__undefined)
    webStreamsAdapters = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 69) || __intrinsic__createInternalModuleById(69);
  return webStreamsAdapters;
}
Writable.fromWeb = function(writableStream, options) {
  return lazyWebStreams().newStreamWritableFromWritableStream(writableStream, options);
};
Writable.toWeb = function(streamWritable) {
  return lazyWebStreams().newWritableStreamFromStreamWritable(streamWritable);
};
Writable.prototype[SymbolAsyncDispose] = function() {
  let error;
  if (!this.destroyed) {
    error = this.writableFinished ? null : __intrinsic__makeAbortError();
    this.destroy(error);
  }
  return new __intrinsic__Promise((resolve, reject) => eos(this, (err) => err && err.name !== "AbortError" ? reject(err) : resolve(null)));
};
$ = Writable;
$$EXPORT$$($).$$EXPORT_END$$;
