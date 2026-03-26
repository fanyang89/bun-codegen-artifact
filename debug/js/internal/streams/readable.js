(function (){"use strict";
let $debug_trace = Bun.env.TRACE && Bun.env.TRACE === '1';
let $debug_log_enabled = ((env) => (
  // The rationale for checking all these variables is just so you don't have to exactly remember which one you set.
  (env.BUN_DEBUG_ALL && env.BUN_DEBUG_ALL !== '0')
  || (env.BUN_DEBUG_JS && env.BUN_DEBUG_JS !== '0')
  || (env.BUN_DEBUG_STREAMS_READABLE === '1')
  || (env.DEBUG_INTERNAL_STREAMS_READABLE === '1')
))(Bun.env);
let $debug_pid_prefix = Bun.env.SHOW_PID === '1';
let $debug_log = $debug_log_enabled ? (...args) => {
  // warn goes to stderr without colorizing
  console[$debug_trace ? 'trace' : 'warn'](($debug_pid_prefix ? `[${process.pid}] ` : '') + (Bun.enableANSIColors ? '\x1b[90m[internal:streams/readable]\x1b[0m' : '[internal:streams/readable]'), ...args);
} : () => {};
// build/debug/tmp_modules/internal/streams/readable.ts
var $;
var EE = @getInternalField(@internalModuleRegistry, 96) || @createInternalModuleById(96);
var { Stream, prependListener } = @getInternalField(@internalModuleRegistry, 50) || @createInternalModuleById(50);
var { addAbortSignal } = @getInternalField(@internalModuleRegistry, 41) || @createInternalModuleById(41);
var eos = @getInternalField(@internalModuleRegistry, 47) || @createInternalModuleById(47);
var destroyImpl = @getInternalField(@internalModuleRegistry, 43) || @createInternalModuleById(43);
var { getHighWaterMark, getDefaultHighWaterMark } = @getInternalField(@internalModuleRegistry, 56) || @createInternalModuleById(56);
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
} = @getInternalField(@internalModuleRegistry, 58) || @createInternalModuleById(58);
var { aggregateTwoErrors } = @getInternalField(@internalModuleRegistry, 16) || @createInternalModuleById(16);
var { validateObject } = @getInternalField(@internalModuleRegistry, 68) || @createInternalModuleById(68);
var { StringDecoder } = @getInternalField(@internalModuleRegistry, 143) || @createInternalModuleById(143);
var from = @getInternalField(@internalModuleRegistry, 48) || @createInternalModuleById(48);
var { SafeSet } = @getInternalField(@internalModuleRegistry, 30) || @createInternalModuleById(30);
var { kAutoDestroyed } = @getInternalField(@internalModuleRegistry, 32) || @createInternalModuleById(32);
var ObjectDefineProperties = Object.defineProperties;
var SymbolAsyncDispose = Symbol.asyncDispose;
var NumberIsNaN = Number.isNaN;
var NumberIsInteger = Number.isInteger;
var NumberParseInt = Number.parseInt;
var ArrayPrototypeIndexOf = @Array.prototype.indexOf;
var ObjectKeys = Object.keys;
var SymbolAsyncIterator = Symbol.asyncIterator;
var TypedArrayPrototypeSet = @Uint8Array.prototype.set;
var { errorOrDestroy } = destroyImpl;
var nop = () => {};
var kErroredValue = Symbol("kErroredValue");
var kDefaultEncodingValue = Symbol("kDefaultEncodingValue");
var kDecoderValue = Symbol("kDecoderValue");
var kEncodingValue = Symbol("kEncodingValue");
var kEnded = 1 << 9;
var kEndEmitted = 1 << 10;
var kReading = 1 << 11;
var kSync = 1 << 12;
var kNeedReadable = 1 << 13;
var kEmittedReadable = 1 << 14;
var kReadableListening = 1 << 15;
var kResumeScheduled = 1 << 16;
var kMultiAwaitDrain = 1 << 17;
var kReadingMore = 1 << 18;
var kDataEmitted = 1 << 19;
var kDefaultUTF8Encoding = 1 << 20;
var kDecoder = 1 << 21;
var kEncoding = 1 << 22;
var kHasFlowing = 1 << 23;
var kFlowing = 1 << 24;
var kHasPaused = 1 << 25;
var kPaused = 1 << 26;
var kDataListening = 1 << 27;
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
function ReadableState(options, stream, isDuplex) {
  this[kState] = kEmitClose | kAutoDestroy | kConstructed | kSync;
  if (options?.objectMode)
    this[kState] |= kObjectMode;
  if (isDuplex && options?.readableObjectMode)
    this[kState] |= kObjectMode;
  this.highWaterMark = options ? getHighWaterMark(this, options, "readableHighWaterMark", isDuplex) : getDefaultHighWaterMark(false);
  this.buffer = [];
  this.bufferIndex = 0;
  this.length = 0;
  this.pipes = [];
  if (options && options.emitClose === false)
    this[kState] &= ~kEmitClose;
  if (options && options.autoDestroy === false)
    this[kState] &= ~kAutoDestroy;
  const defaultEncoding = options?.defaultEncoding;
  if (defaultEncoding == null || defaultEncoding === "utf8" || defaultEncoding === "utf-8") {
    this[kState] |= kDefaultUTF8Encoding;
  } else if (@Buffer.isEncoding(defaultEncoding)) {
    this.defaultEncoding = defaultEncoding;
  } else {
    throw @makeErrorWithCode(254, defaultEncoding);
  }
  this.awaitDrainWriters = null;
  if (options?.encoding) {
    this.decoder = new StringDecoder(options.encoding);
    this.encoding = options.encoding;
  }
}
ReadableState.prototype = {};
ObjectDefineProperties(ReadableState.prototype, {
  objectMode: makeBitMapDescriptor(kObjectMode),
  ended: makeBitMapDescriptor(kEnded),
  endEmitted: makeBitMapDescriptor(kEndEmitted),
  reading: makeBitMapDescriptor(kReading),
  constructed: makeBitMapDescriptor(kConstructed),
  sync: makeBitMapDescriptor(kSync),
  needReadable: makeBitMapDescriptor(kNeedReadable),
  emittedReadable: makeBitMapDescriptor(kEmittedReadable),
  readableListening: makeBitMapDescriptor(kReadableListening),
  resumeScheduled: makeBitMapDescriptor(kResumeScheduled),
  errorEmitted: makeBitMapDescriptor(kErrorEmitted),
  emitClose: makeBitMapDescriptor(kEmitClose),
  autoDestroy: makeBitMapDescriptor(kAutoDestroy),
  destroyed: makeBitMapDescriptor(kDestroyed),
  closed: makeBitMapDescriptor(kClosed),
  closeEmitted: makeBitMapDescriptor(kCloseEmitted),
  multiAwaitDrain: makeBitMapDescriptor(kMultiAwaitDrain),
  readingMore: makeBitMapDescriptor(kReadingMore),
  dataEmitted: makeBitMapDescriptor(kDataEmitted),
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
  decoder: {
    __proto__: null,
    enumerable: false,
    get() {
      return (this[kState] & kDecoder) !== 0 ? this[kDecoderValue] : null;
    },
    set(value) {
      if (value) {
        this[kDecoderValue] = value;
        this[kState] |= kDecoder;
      } else {
        this[kState] &= ~kDecoder;
      }
    }
  },
  encoding: {
    __proto__: null,
    enumerable: false,
    get() {
      return (this[kState] & kEncoding) !== 0 ? this[kEncodingValue] : null;
    },
    set(value) {
      if (value) {
        this[kEncodingValue] = value;
        this[kState] |= kEncoding;
      } else {
        this[kState] &= ~kEncoding;
      }
    }
  },
  flowing: {
    __proto__: null,
    enumerable: false,
    get() {
      return (this[kState] & kHasFlowing) !== 0 ? (this[kState] & kFlowing) !== 0 : null;
    },
    set(value) {
      if (value == null) {
        this[kState] &= ~(kHasFlowing | kFlowing);
      } else if (value) {
        this[kState] |= kHasFlowing | kFlowing;
      } else {
        this[kState] |= kHasFlowing;
        this[kState] &= ~kFlowing;
      }
    }
  }
});
ReadableState.prototype[kOnConstructed] = function onConstructed(stream) {
  if ((this[kState] & kNeedReadable) !== 0) {
    maybeReadMore(stream, this);
  }
};
function Readable(options) {
  if (!(this instanceof Readable))
    return new Readable(options);
  this._events ??= {
    close: @undefined,
    error: @undefined,
    data: @undefined,
    end: @undefined,
    readable: @undefined
  };
  this._readableState = new ReadableState(options, this, false);
  if (options) {
    if (typeof options.read === "function")
      this._read = options.read;
    if (typeof options.destroy === "function")
      this._destroy = options.destroy;
    if (typeof options.construct === "function")
      this._construct = options.construct;
    if (options.signal)
      addAbortSignal(options.signal, this);
  }
  Stream.@call(this, options);
  if (this._construct != null) {
    destroyImpl.construct(this, () => {
      this._readableState[kOnConstructed](this);
    });
  }
}
@toClass(Readable, "Readable", Stream);
Readable.ReadableState = ReadableState;
Readable.prototype.destroy = destroyImpl.destroy;
Readable.prototype._undestroy = destroyImpl.undestroy;
Readable.prototype._destroy = function(err, cb) {
  cb(err);
};
Readable.prototype[EE.captureRejectionSymbol] = function(err) {
  this.destroy(err);
};
Readable.prototype[SymbolAsyncDispose] = function() {
  let error;
  if (!this.destroyed) {
    error = this.readableEnded ? null : @makeAbortError();
    this.destroy(error);
  }
  return new @Promise((resolve, reject) => eos(this, (err) => err && err !== error ? reject(err) : resolve(null)));
};
Readable.prototype.push = function(chunk, encoding) {
  $debug_log("push", chunk);
  const state = this._readableState;
  return (state[kState] & kObjectMode) === 0 ? readableAddChunkPushByteMode(this, state, chunk, encoding) : readableAddChunkPushObjectMode(this, state, chunk, encoding);
};
Readable.prototype.unshift = function(chunk, encoding) {
  $debug_log("unshift", chunk);
  const state = this._readableState;
  return (state[kState] & kObjectMode) === 0 ? readableAddChunkUnshiftByteMode(this, state, chunk, encoding) : readableAddChunkUnshiftObjectMode(this, state, chunk);
};
function readableAddChunkUnshiftByteMode(stream, state, chunk, encoding) {
  if (chunk === null) {
    state[kState] &= ~kReading;
    onEofChunk(stream, state);
    return false;
  }
  if (typeof chunk === "string") {
    encoding ||= state.defaultEncoding;
    if (state.encoding !== encoding) {
      if (state.encoding) {
        chunk = @Buffer.from(chunk, encoding).toString(state.encoding);
      } else {
        chunk = @Buffer.from(chunk, encoding);
      }
    }
  } else if (Stream._isArrayBufferView(chunk)) {
    chunk = Stream._uint8ArrayToBuffer(chunk);
  } else if (chunk !== @undefined && !(chunk instanceof @Buffer)) {
    errorOrDestroy(stream, @makeErrorWithCode(118, "chunk", ["string", "Buffer", "TypedArray", "DataView"], chunk));
    return false;
  }
  if (!(chunk && chunk.length > 0)) {
    return canPushMore(state);
  }
  return readableAddChunkUnshiftValue(stream, state, chunk);
}
function readableAddChunkUnshiftObjectMode(stream, state, chunk) {
  if (chunk === null) {
    state[kState] &= ~kReading;
    onEofChunk(stream, state);
    return false;
  }
  return readableAddChunkUnshiftValue(stream, state, chunk);
}
function readableAddChunkUnshiftValue(stream, state, chunk) {
  if ((state[kState] & kEndEmitted) !== 0)
    errorOrDestroy(stream, @makeErrorWithCode(234));
  else if ((state[kState] & (kDestroyed | kErrored)) !== 0)
    return false;
  else
    addChunk(stream, state, chunk, true);
  return canPushMore(state);
}
function readableAddChunkPushByteMode(stream, state, chunk, encoding) {
  if (chunk === null) {
    state[kState] &= ~kReading;
    onEofChunk(stream, state);
    return false;
  }
  if (typeof chunk === "string") {
    encoding ||= state.defaultEncoding;
    if (state.encoding !== encoding) {
      chunk = @Buffer.from(chunk, encoding);
      encoding = "";
    }
  } else if (chunk instanceof @Buffer) {
    encoding = "";
  } else if (Stream._isArrayBufferView(chunk)) {
    chunk = Stream._uint8ArrayToBuffer(chunk);
    encoding = "";
  } else if (chunk !== @undefined) {
    errorOrDestroy(stream, @makeErrorWithCode(118, "chunk", ["string", "Buffer", "TypedArray", "DataView"], chunk));
    return false;
  }
  if (!chunk || chunk.length <= 0) {
    state[kState] &= ~kReading;
    maybeReadMore(stream, state);
    return canPushMore(state);
  }
  if ((state[kState] & kEnded) !== 0) {
    errorOrDestroy(stream, @makeErrorWithCode(231));
    return false;
  }
  if ((state[kState] & (kDestroyed | kErrored)) !== 0) {
    return false;
  }
  state[kState] &= ~kReading;
  if ((state[kState] & kDecoder) !== 0 && !encoding) {
    chunk = state[kDecoderValue].write(chunk);
    if (chunk.length === 0) {
      maybeReadMore(stream, state);
      return canPushMore(state);
    }
  }
  addChunk(stream, state, chunk, false);
  return canPushMore(state);
}
function readableAddChunkPushObjectMode(stream, state, chunk, encoding) {
  if (chunk === null) {
    state[kState] &= ~kReading;
    onEofChunk(stream, state);
    return false;
  }
  if ((state[kState] & kEnded) !== 0) {
    errorOrDestroy(stream, @makeErrorWithCode(231));
    return false;
  }
  if ((state[kState] & (kDestroyed | kErrored)) !== 0) {
    return false;
  }
  state[kState] &= ~kReading;
  if ((state[kState] & kDecoder) !== 0 && !encoding) {
    chunk = state[kDecoderValue].write(chunk);
  }
  addChunk(stream, state, chunk, false);
  return canPushMore(state);
}
function canPushMore(state) {
  return (state[kState] & kEnded) === 0 && (state.length < state.highWaterMark || state.length === 0);
}
function addChunk(stream, state, chunk, addToFront) {
  if ((state[kState] & (kFlowing | kSync | kDataListening)) === (kFlowing | kDataListening) && state.length === 0) {
    if ((state[kState] & kMultiAwaitDrain) !== 0) {
      state.awaitDrainWriters.clear();
    } else {
      state.awaitDrainWriters = null;
    }
    state[kState] |= kDataEmitted;
    stream.emit("data", chunk);
  } else {
    state.length += (state[kState] & kObjectMode) !== 0 ? 1 : chunk.length;
    if (addToFront) {
      if (state.bufferIndex > 0) {
        state.buffer[--state.bufferIndex] = chunk;
      } else {
        state.buffer.unshift(chunk);
      }
    } else {
      state.buffer.push(chunk);
    }
    if ((state[kState] & kNeedReadable) !== 0)
      emitReadable(stream);
  }
  maybeReadMore(stream, state);
}
Readable.prototype.isPaused = function() {
  const state = this._readableState;
  return (state[kState] & kPaused) !== 0 || (state[kState] & (kHasFlowing | kFlowing)) === kHasFlowing;
};
Readable.prototype.setEncoding = function(enc) {
  const state = this._readableState;
  const decoder = new StringDecoder(enc);
  state.decoder = decoder;
  state.encoding = state.decoder.encoding;
  let content = "";
  for (const data of state.buffer.slice(state.bufferIndex)) {
    content += decoder.write(data);
  }
  state.buffer.length = 0;
  state.bufferIndex = 0;
  if (content !== "")
    state.buffer.push(content);
  state.length = content.length;
  return this;
};
var MAX_HWM = 1073741824;
function computeNewHighWaterMark(n) {
  if (n > MAX_HWM) {
    throw @makeErrorWithCode(156, "size", "<= 1GiB", n);
  } else {
    n--;
    n |= n >>> 1;
    n |= n >>> 2;
    n |= n >>> 4;
    n |= n >>> 8;
    n |= n >>> 16;
    n++;
  }
  return n;
}
function howMuchToRead(n, state) {
  if (n <= 0 || state.length === 0 && (state[kState] & kEnded) !== 0)
    return 0;
  if ((state[kState] & kObjectMode) !== 0)
    return 1;
  if (NumberIsNaN(n)) {
    if ((state[kState] & kFlowing) !== 0 && state.length)
      return state.buffer[state.bufferIndex].length;
    return state.length;
  }
  if (n <= state.length)
    return n;
  return (state[kState] & kEnded) !== 0 ? state.length : 0;
}
Readable.prototype.read = function(n) {
  $debug_log("read", n);
  if (n === @undefined) {
    n = NaN;
  } else if (!NumberIsInteger(n)) {
    n = NumberParseInt(n, 10);
  }
  const state = this._readableState;
  const nOrig = n;
  if (n > state.highWaterMark)
    state.highWaterMark = computeNewHighWaterMark(n);
  if (n !== 0)
    state[kState] &= ~kEmittedReadable;
  if (n === 0 && (state[kState] & kNeedReadable) !== 0 && ((state.highWaterMark !== 0 ? state.length >= state.highWaterMark : state.length > 0) || (state[kState] & kEnded) !== 0)) {
    $debug_log("read: emitReadable");
    if (state.length === 0 && (state[kState] & kEnded) !== 0)
      endReadable(this);
    else
      emitReadable(this);
    return null;
  }
  n = howMuchToRead(n, state);
  if (n === 0 && (state[kState] & kEnded) !== 0) {
    if (state.length === 0)
      endReadable(this);
    return null;
  }
  let doRead = (state[kState] & kNeedReadable) !== 0;
  $debug_log("need readable", doRead);
  if (state.length === 0 || state.length - n < state.highWaterMark) {
    doRead = true;
    $debug_log("length less than watermark", doRead);
  }
  if ((state[kState] & (kReading | kEnded | kDestroyed | kErrored | kConstructed)) !== kConstructed) {
    doRead = false;
    $debug_log("reading, ended or constructing", doRead);
  } else if (doRead) {
    $debug_log("do read");
    state[kState] |= kReading | kSync;
    if (state.length === 0)
      state[kState] |= kNeedReadable;
    try {
      this._read(state.highWaterMark);
    } catch (err) {
      errorOrDestroy(this, err);
    }
    state[kState] &= ~kSync;
    if ((state[kState] & kReading) === 0)
      n = howMuchToRead(nOrig, state);
  }
  let ret;
  if (n > 0)
    ret = fromList(n, state);
  else
    ret = null;
  if (ret === null) {
    state[kState] |= state.length <= state.highWaterMark ? kNeedReadable : 0;
    n = 0;
  } else {
    state.length -= n;
    if ((state[kState] & kMultiAwaitDrain) !== 0) {
      state.awaitDrainWriters.clear();
    } else {
      state.awaitDrainWriters = null;
    }
  }
  if (state.length === 0) {
    if ((state[kState] & kEnded) === 0)
      state[kState] |= kNeedReadable;
    if (nOrig !== n && (state[kState] & kEnded) !== 0)
      endReadable(this);
  }
  if (ret !== null && (state[kState] & (kErrorEmitted | kCloseEmitted)) === 0) {
    state[kState] |= kDataEmitted;
    this.emit("data", ret);
  }
  return ret;
};
function onEofChunk(stream, state) {
  $debug_log("onEofChunk");
  if ((state[kState] & kEnded) !== 0)
    return;
  const decoder = (state[kState] & kDecoder) !== 0 ? state[kDecoderValue] : null;
  if (decoder) {
    const chunk = decoder.end();
    if (chunk?.length) {
      state.buffer.push(chunk);
      state.length += (state[kState] & kObjectMode) !== 0 ? 1 : chunk.length;
    }
  }
  state[kState] |= kEnded;
  if ((state[kState] & kSync) !== 0) {
    emitReadable(stream);
  } else {
    state[kState] &= ~kNeedReadable;
    state[kState] |= kEmittedReadable;
    emitReadable_(stream);
  }
}
function emitReadable(stream) {
  const state = stream._readableState;
  $debug_log("emitReadable");
  state[kState] &= ~kNeedReadable;
  if ((state[kState] & kEmittedReadable) === 0) {
    $debug_log("emitReadable", (state[kState] & kFlowing) !== 0);
    state[kState] |= kEmittedReadable;
    process.nextTick(emitReadable_, stream);
  }
}
function emitReadable_(stream) {
  const state = stream._readableState;
  $debug_log("emitReadable_");
  if ((state[kState] & (kDestroyed | kErrored)) === 0 && (state.length || (state[kState] & kEnded) !== 0)) {
    stream.emit("readable");
    state[kState] &= ~kEmittedReadable;
  }
  state[kState] |= (state[kState] & (kFlowing | kEnded)) === 0 && state.length <= state.highWaterMark ? kNeedReadable : 0;
  flow(stream);
}
function maybeReadMore(stream, state) {
  if ((state[kState] & (kReadingMore | kConstructed)) === kConstructed) {
    state[kState] |= kReadingMore;
    process.nextTick(maybeReadMore_, stream, state);
  }
}
function maybeReadMore_(stream, state) {
  while ((state[kState] & (kReading | kEnded)) === 0 && (state.length < state.highWaterMark || (state[kState] & kFlowing) !== 0 && state.length === 0)) {
    const len = state.length;
    $debug_log("maybeReadMore read 0");
    stream.read(0);
    if (len === state.length)
      break;
  }
  state[kState] &= ~kReadingMore;
}
Readable.prototype._read = function(_n) {
  throw @makeErrorWithCode(149, "_read()");
};
Readable.prototype.pipe = function(dest, pipeOpts) {
  const src = this;
  const state = this._readableState;
  if (state.pipes.length === 1) {
    if ((state[kState] & kMultiAwaitDrain) === 0) {
      state[kState] |= kMultiAwaitDrain;
      state.awaitDrainWriters = new SafeSet(state.awaitDrainWriters ? [state.awaitDrainWriters] : []);
    }
  }
  state.pipes.push(dest);
  $debug_log("pipe count=%d opts=%j", state.pipes.length, pipeOpts);
  const doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== process.stdout && dest !== process.stderr;
  const endFn = doEnd ? onend : unpipe;
  if ((state[kState] & kEndEmitted) !== 0)
    process.nextTick(endFn);
  else
    src.once("end", endFn);
  dest.on("unpipe", onunpipe);
  function onunpipe(readable, unpipeInfo) {
    $debug_log("onunpipe");
    if (readable === src) {
      if (unpipeInfo && unpipeInfo.hasUnpiped === false) {
        unpipeInfo.hasUnpiped = true;
        cleanup();
      }
    }
  }
  function onend() {
    $debug_log("onend");
    dest.end();
  }
  let ondrain;
  let cleanedUp = false;
  function cleanup() {
    $debug_log("cleanup");
    dest.removeListener("close", onclose);
    dest.removeListener("finish", onfinish);
    if (ondrain) {
      dest.removeListener("drain", ondrain);
    }
    dest.removeListener("error", onerror);
    dest.removeListener("unpipe", onunpipe);
    src.removeListener("end", onend);
    src.removeListener("end", unpipe);
    src.removeListener("data", ondata);
    cleanedUp = true;
    if (ondrain && state.awaitDrainWriters && (!dest._writableState || dest._writableState.needDrain))
      ondrain();
  }
  function pause() {
    if (!cleanedUp) {
      if (state.pipes.length === 1 && state.pipes[0] === dest) {
        $debug_log("false write response, pause", 0);
        state.awaitDrainWriters = dest;
        state[kState] &= ~kMultiAwaitDrain;
      } else if (state.pipes.length > 1 && state.pipes.includes(dest)) {
        $debug_log("false write response, pause", state.awaitDrainWriters.size);
        state.awaitDrainWriters.add(dest);
      }
      src.pause();
    }
    if (!ondrain) {
      ondrain = pipeOnDrain(src, dest);
      dest.on("drain", ondrain);
    }
  }
  src.on("data", ondata);
  function ondata(chunk) {
    $debug_log("ondata");
    try {
      const ret = dest.write(chunk);
      $debug_log("dest.write", ret);
      if (ret === false) {
        pause();
      }
    } catch (err) {
      dest.destroy(err);
    }
  }
  function onerror(er) {
    $debug_log("onerror", er);
    unpipe();
    dest.removeListener("error", onerror);
    if (dest.listenerCount("error") === 0) {
      const s = dest._writableState || dest._readableState;
      if (s && !s.errorEmitted) {
        errorOrDestroy(dest, er);
      } else {
        dest.emit("error", er);
      }
    }
  }
  prependListener(dest, "error", onerror);
  function onclose() {
    dest.removeListener("finish", onfinish);
    unpipe();
  }
  dest.once("close", onclose);
  function onfinish() {
    $debug_log("onfinish");
    dest.removeListener("close", onclose);
    unpipe();
  }
  dest.once("finish", onfinish);
  function unpipe() {
    $debug_log("unpipe");
    src.unpipe(dest);
  }
  dest.emit("pipe", src);
  if (dest.writableNeedDrain === true) {
    pause();
  } else if ((state[kState] & kFlowing) === 0) {
    $debug_log("pipe resume");
    src.resume();
  }
  return dest;
};
function pipeOnDrain(src, dest) {
  return function pipeOnDrainFunctionResult() {
    const state = src._readableState;
    if (state.awaitDrainWriters === dest) {
      $debug_log("pipeOnDrain", 1);
      state.awaitDrainWriters = null;
    } else if ((state[kState] & kMultiAwaitDrain) !== 0) {
      $debug_log("pipeOnDrain", state.awaitDrainWriters.size);
      state.awaitDrainWriters.delete(dest);
    }
    if ((!state.awaitDrainWriters || state.awaitDrainWriters.size === 0) && (state[kState] & kDataListening) !== 0) {
      src.resume();
    }
  };
}
Readable.prototype.unpipe = function(dest) {
  const state = this._readableState;
  const unpipeInfo = { hasUnpiped: false };
  if (state.pipes.length === 0)
    return this;
  if (!dest) {
    const dests = state.pipes;
    state.pipes = [];
    this.pause();
    for (let i = 0;i < dests.length; i++)
      dests[i].emit("unpipe", this, { hasUnpiped: false });
    return this;
  }
  const index = ArrayPrototypeIndexOf.@call(state.pipes, dest);
  if (index === -1)
    return this;
  state.pipes.splice(index, 1);
  if (state.pipes.length === 0)
    this.pause();
  dest.emit("unpipe", this, unpipeInfo);
  return this;
};
Readable.prototype.on = function(ev, fn) {
  const res = Stream.prototype.on.@call(this, ev, fn);
  const state = this._readableState;
  if (ev === "data") {
    state[kState] |= kDataListening;
    state[kState] |= this.listenerCount("readable") > 0 ? kReadableListening : 0;
    if ((state[kState] & (kHasFlowing | kFlowing)) !== kHasFlowing) {
      this.resume();
    }
  } else if (ev === "readable") {
    if ((state[kState] & (kEndEmitted | kReadableListening)) === 0) {
      state[kState] |= kReadableListening | kNeedReadable | kHasFlowing;
      state[kState] &= ~(kFlowing | kEmittedReadable);
      $debug_log("on readable");
      if (state.length) {
        emitReadable(this);
      } else if ((state[kState] & kReading) === 0) {
        process.nextTick(nReadingNextTick, this);
      }
    }
  }
  return res;
};
Readable.prototype.addListener = Readable.prototype.on;
Readable.prototype.removeListener = function(ev, fn) {
  const state = this._readableState;
  const res = Stream.prototype.removeListener.@call(this, ev, fn);
  if (ev === "readable") {
    process.nextTick(updateReadableListening, this);
  } else if (ev === "data" && this.listenerCount("data") === 0) {
    state[kState] &= ~kDataListening;
  }
  return res;
};
Readable.prototype.off = Readable.prototype.removeListener;
Readable.prototype.removeAllListeners = function(ev) {
  const res = Stream.prototype.removeAllListeners.@apply(this, arguments);
  if (ev === "readable" || ev === @undefined) {
    process.nextTick(updateReadableListening, this);
  }
  return res;
};
function updateReadableListening(self) {
  const state = self._readableState;
  if (self.listenerCount("readable") > 0) {
    state[kState] |= kReadableListening;
  } else {
    state[kState] &= ~kReadableListening;
  }
  if ((state[kState] & (kHasPaused | kPaused | kResumeScheduled)) === (kHasPaused | kResumeScheduled)) {
    state[kState] |= kHasFlowing | kFlowing;
  } else if ((state[kState] & kDataListening) !== 0) {
    self.resume();
  } else if ((state[kState] & kReadableListening) === 0) {
    state[kState] &= ~(kHasFlowing | kFlowing);
  }
}
function nReadingNextTick(self) {
  $debug_log("readable nexttick read 0");
  self.read(0);
}
Readable.prototype.resume = function() {
  const state = this._readableState;
  if ((state[kState] & kFlowing) === 0) {
    $debug_log("resume");
    state[kState] |= kHasFlowing;
    if ((state[kState] & kReadableListening) === 0) {
      state[kState] |= kFlowing;
    } else {
      state[kState] &= ~kFlowing;
    }
    resume(this, state);
  }
  state[kState] |= kHasPaused;
  state[kState] &= ~kPaused;
  return this;
};
function resume(stream, state) {
  if ((state[kState] & kResumeScheduled) === 0) {
    state[kState] |= kResumeScheduled;
    process.nextTick(resume_, stream, state);
  }
}
function resume_(stream, state) {
  $debug_log("resume", (state[kState] & kReading) !== 0);
  if ((state[kState] & kReading) === 0) {
    stream.read(0);
  }
  state[kState] &= ~kResumeScheduled;
  stream.emit("resume");
  flow(stream);
  if ((state[kState] & (kFlowing | kReading)) === kFlowing)
    stream.read(0);
}
Readable.prototype.pause = function() {
  const state = this._readableState;
  $debug_log("call pause");
  if ((state[kState] & (kHasFlowing | kFlowing)) !== kHasFlowing) {
    $debug_log("pause");
    state[kState] |= kHasFlowing;
    state[kState] &= ~kFlowing;
    this.emit("pause");
  }
  state[kState] |= kHasPaused | kPaused;
  return this;
};
function flow(stream) {
  const state = stream._readableState;
  $debug_log("flow");
  while ((state[kState] & kFlowing) !== 0 && stream.read() !== null)
    ;
}
Readable.prototype.wrap = function(stream) {
  let paused = false;
  stream.on("data", (chunk) => {
    if (!this.push(chunk) && stream.pause) {
      paused = true;
      stream.pause();
    }
  });
  stream.on("end", () => {
    this.push(null);
  });
  stream.on("error", (err) => {
    errorOrDestroy(this, err);
  });
  stream.on("close", () => {
    this.destroy();
  });
  stream.on("destroy", () => {
    this.destroy();
  });
  this._read = () => {
    if (paused && stream.resume) {
      paused = false;
      stream.resume();
    }
  };
  const streamKeys = ObjectKeys(stream);
  for (let j = 1;j < streamKeys.length; j++) {
    const i = streamKeys[j];
    if (this[i] === @undefined && typeof stream[i] === "function") {
      this[i] = stream[i].bind(stream);
    }
  }
  return this;
};
Readable.prototype[SymbolAsyncIterator] = function() {
  return streamToAsyncIterator(this);
};
Readable.prototype.iterator = function(options) {
  if (options !== @undefined) {
    validateObject(options, "options");
  }
  return streamToAsyncIterator(this, options);
};
function streamToAsyncIterator(stream, options) {
  if (typeof stream.read !== "function") {
    stream = Readable.wrap(stream, { objectMode: true });
  }
  const iter = createAsyncIterator(stream, options);
  iter.stream = stream;
  return iter;
}
async function* createAsyncIterator(stream, options) {
  let callback = nop;
  function next(resolve) {
    if (this === stream) {
      callback();
      callback = nop;
    } else {
      callback = resolve;
    }
  }
  stream.on("readable", next);
  let error;
  const cleanup = eos(stream, { writable: false }, (err) => {
    error = err ? aggregateTwoErrors(error, err) : null;
    callback();
    callback = nop;
  });
  try {
    while (true) {
      const chunk = stream.destroyed ? null : stream.read();
      if (chunk !== null) {
        yield chunk;
      } else if (error) {
        throw error;
      } else if (error === null) {
        return;
      } else {
        await new @Promise(next);
      }
    }
  } catch (err) {
    error = aggregateTwoErrors(error, err);
    throw error;
  } finally {
    if ((error || options?.destroyOnReturn !== false) && (error === @undefined || stream._readableState.autoDestroy)) {
      destroyImpl.destroyer(stream, null);
    } else {
      stream.off("readable", next);
      cleanup();
    }
  }
}
ObjectDefineProperties(Readable.prototype, {
  readable: {
    __proto__: null,
    get() {
      const r = this._readableState;
      return !!r && r.readable !== false && !r.destroyed && !r.errorEmitted && !r.endEmitted;
    },
    set(val) {
      if (this._readableState) {
        this._readableState.readable = !!val;
      }
    }
  },
  readableDidRead: {
    __proto__: null,
    enumerable: false,
    get: function() {
      return this._readableState.dataEmitted;
    }
  },
  readableAborted: {
    __proto__: null,
    enumerable: false,
    get: function() {
      return !!(this._readableState.readable !== false && (this._readableState.destroyed || this._readableState.errored) && !this._readableState.endEmitted);
    }
  },
  readableHighWaterMark: {
    __proto__: null,
    enumerable: false,
    get: function() {
      return this._readableState.highWaterMark;
    }
  },
  readableBuffer: {
    __proto__: null,
    enumerable: false,
    get: function() {
      return this._readableState?.buffer;
    }
  },
  readableFlowing: {
    __proto__: null,
    enumerable: false,
    get: function() {
      return this._readableState.flowing;
    },
    set: function(state) {
      if (this._readableState) {
        this._readableState.flowing = state;
      }
    }
  },
  readableLength: {
    __proto__: null,
    enumerable: false,
    get() {
      return this._readableState.length;
    }
  },
  readableObjectMode: {
    __proto__: null,
    enumerable: false,
    get() {
      return this._readableState ? this._readableState.objectMode : false;
    }
  },
  readableEncoding: {
    __proto__: null,
    enumerable: false,
    get() {
      return this._readableState ? this._readableState.encoding : null;
    }
  },
  errored: {
    __proto__: null,
    enumerable: false,
    get() {
      return this._readableState ? this._readableState.errored : null;
    }
  },
  closed: {
    __proto__: null,
    get() {
      return this._readableState ? this._readableState.closed : false;
    }
  },
  destroyed: {
    __proto__: null,
    enumerable: false,
    get() {
      return this._readableState ? this._readableState.destroyed : false;
    },
    set(value) {
      if (!this._readableState) {
        return;
      }
      this._readableState.destroyed = value;
    }
  },
  readableEnded: {
    __proto__: null,
    enumerable: false,
    get() {
      return this._readableState ? this._readableState.endEmitted : false;
    }
  }
});
ObjectDefineProperties(ReadableState.prototype, {
  pipesCount: {
    __proto__: null,
    get() {
      return this.pipes.length;
    }
  },
  paused: {
    __proto__: null,
    get() {
      return (this[kState] & kPaused) !== 0;
    },
    set(value) {
      this[kState] |= kHasPaused;
      if (value) {
        this[kState] |= kPaused;
      } else {
        this[kState] &= ~kPaused;
      }
    }
  }
});
Readable._fromList = fromList;
function fromList(n, state) {
  if (state.length === 0)
    return null;
  let idx = state.bufferIndex;
  let ret;
  const buf = state.buffer;
  const len = buf.length;
  if ((state[kState] & kObjectMode) !== 0) {
    ret = buf[idx];
    buf[idx++] = null;
  } else if (!n || n >= state.length) {
    if ((state[kState] & kDecoder) !== 0) {
      ret = "";
      while (idx < len) {
        ret += buf[idx];
        buf[idx++] = null;
      }
    } else if (len - idx === 0) {
      ret = @Buffer.alloc(0);
    } else if (len - idx === 1) {
      ret = buf[idx];
      buf[idx++] = null;
    } else {
      ret = @Buffer.allocUnsafe(state.length);
      let i = 0;
      while (idx < len) {
        TypedArrayPrototypeSet.@call(ret, buf[idx], i);
        i += buf[idx].length;
        buf[idx++] = null;
      }
    }
  } else if (n < buf[idx].length) {
    ret = buf[idx].slice(0, n);
    buf[idx] = buf[idx].slice(n);
  } else if (n === buf[idx].length) {
    ret = buf[idx];
    buf[idx++] = null;
  } else if ((state[kState] & kDecoder) !== 0) {
    ret = "";
    while (idx < len) {
      const str = buf[idx];
      if (n > str.length) {
        ret += str;
        n -= str.length;
        buf[idx++] = null;
      } else {
        if (n === buf.length) {
          ret += str;
          buf[idx++] = null;
        } else {
          ret += str.slice(0, n);
          buf[idx] = str.slice(n);
        }
        break;
      }
    }
  } else {
    ret = @Buffer.allocUnsafe(n);
    const retLen = n;
    while (idx < len) {
      const data = buf[idx];
      if (n > data.length) {
        TypedArrayPrototypeSet.@call(ret, data, retLen - n);
        n -= data.length;
        buf[idx++] = null;
      } else {
        if (n === data.length) {
          TypedArrayPrototypeSet.@call(ret, data, retLen - n);
          buf[idx++] = null;
        } else {
          TypedArrayPrototypeSet.@call(ret, new @Buffer(data.buffer, data.byteOffset, n), retLen - n);
          buf[idx] = new @Buffer(data.buffer, data.byteOffset + n, data.length - n);
        }
        break;
      }
    }
  }
  if (idx === len) {
    state.buffer.length = 0;
    state.bufferIndex = 0;
  } else if (idx > 1024) {
    state.buffer.splice(0, idx);
    state.bufferIndex = 0;
  } else {
    state.bufferIndex = idx;
  }
  return ret;
}
function endReadable(stream) {
  const state = stream._readableState;
  $debug_log("endReadable");
  if ((state[kState] & kEndEmitted) === 0) {
    state[kState] |= kEnded;
    process.nextTick(endReadableNT, state, stream);
  }
}
function endReadableNT(state, stream) {
  $debug_log("endReadableNT");
  if ((state[kState] & (kErrored | kCloseEmitted | kEndEmitted)) === 0 && state.length === 0) {
    state[kState] |= kEndEmitted;
    stream.emit("end");
    if (stream.writable && stream.allowHalfOpen === false) {
      process.nextTick(endWritableNT, stream);
    } else if (state.autoDestroy) {
      const wState = stream._writableState;
      const autoDestroy = !wState || wState.autoDestroy && (wState.finished || wState.writable === false);
      if (autoDestroy) {
        stream[kAutoDestroyed] = true;
        stream.destroy();
      }
    }
  }
}
function endWritableNT(stream) {
  const writable = stream.writable && !stream.writableEnded && !stream.destroyed;
  if (writable) {
    stream.end();
  }
}
Readable.from = function(iterable, opts) {
  return from(Readable, iterable, opts);
};
var webStreamsAdapters;
function lazyWebStreams() {
  if (webStreamsAdapters === @undefined)
    webStreamsAdapters = @getInternalField(@internalModuleRegistry, 69) || @createInternalModuleById(69);
  return webStreamsAdapters;
}
Readable.fromWeb = function(readableStream, options) {
  return lazyWebStreams().newStreamReadableFromReadableStream(readableStream, options);
};
Readable.toWeb = function(streamReadable, options) {
  return lazyWebStreams().newReadableStreamFromStreamReadable(streamReadable, options);
};
Readable.wrap = function(src, options) {
  return new Readable({
    objectMode: src.readableObjectMode ?? src.objectMode ?? true,
    ...options,
    destroy(err, callback) {
      destroyImpl.destroyer(src, err);
      callback(err);
    }
  }).wrap(src);
};
$ = Readable;
return $})
