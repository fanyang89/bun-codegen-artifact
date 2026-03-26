// @bun
// build/debug/tmp_modules/node/zlib.ts
var $;
var BufferModule = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 141) || __intrinsic__createInternalModuleById(141);
var crc32 = __intrinsic__lazy(91);
var NativeZlib = __intrinsic__lazy(92);
var NativeBrotli = __intrinsic__lazy(93);
var NativeZstd = __intrinsic__lazy(94);
var ObjectKeys = Object.keys;
var ArrayPrototypePush = __intrinsic__Array.prototype.push;
var ObjectDefineProperty = Object.defineProperty;
var ObjectDefineProperties = Object.defineProperties;
var ObjectFreeze = Object.freeze;
var TypedArrayPrototypeFill = __intrinsic__Uint8Array.prototype.fill;
var ArrayPrototypeForEach = __intrinsic__Array.prototype.forEach;
var NumberIsNaN = Number.isNaN;
var MathMax = Math.max;
var ArrayBufferIsView = __intrinsic__ArrayBuffer.isView;
var isArrayBufferView = ArrayBufferIsView;
var isAnyArrayBuffer = (b) => b instanceof __intrinsic__ArrayBuffer || b instanceof SharedArrayBuffer;
var kMaxLength = __intrinsic__requireMap.__intrinsic__get("buffer")?.exports.kMaxLength ?? BufferModule.kMaxLength;
var { Transform, finished } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 117) || __intrinsic__createInternalModuleById(117);
var owner_symbol = Symbol("owner_symbol");
var { checkRangesOrGetDefault, validateFunction, validateFiniteNumber } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 68) || __intrinsic__createInternalModuleById(68);
var kFlushFlag = Symbol("kFlushFlag");
var kError = Symbol("kError");
var { zlib: constants } = process.binding("constants");
var {
  Z_NO_FLUSH,
  Z_BLOCK,
  Z_PARTIAL_FLUSH,
  Z_SYNC_FLUSH,
  Z_FULL_FLUSH,
  Z_FINISH,
  Z_MIN_CHUNK,
  Z_MIN_WINDOWBITS,
  Z_MAX_WINDOWBITS,
  Z_MIN_LEVEL,
  Z_MAX_LEVEL,
  Z_MIN_MEMLEVEL,
  Z_MAX_MEMLEVEL,
  Z_DEFAULT_CHUNK,
  Z_DEFAULT_COMPRESSION,
  Z_DEFAULT_STRATEGY,
  Z_DEFAULT_WINDOWBITS,
  Z_DEFAULT_MEMLEVEL,
  Z_FIXED,
  DEFLATE,
  DEFLATERAW,
  INFLATE,
  INFLATERAW,
  GZIP,
  GUNZIP,
  UNZIP,
  BROTLI_DECODE,
  BROTLI_ENCODE,
  ZSTD_COMPRESS,
  ZSTD_DECOMPRESS,
  BROTLI_OPERATION_PROCESS,
  BROTLI_OPERATION_FLUSH,
  BROTLI_OPERATION_FINISH,
  BROTLI_OPERATION_EMIT_METADATA,
  ZSTD_e_continue,
  ZSTD_e_flush,
  ZSTD_e_end
} = constants;
var codes = {
  Z_OK: constants.Z_OK,
  Z_STREAM_END: constants.Z_STREAM_END,
  Z_NEED_DICT: constants.Z_NEED_DICT,
  Z_ERRNO: constants.Z_ERRNO,
  Z_STREAM_ERROR: constants.Z_STREAM_ERROR,
  Z_DATA_ERROR: constants.Z_DATA_ERROR,
  Z_MEM_ERROR: constants.Z_MEM_ERROR,
  Z_BUF_ERROR: constants.Z_BUF_ERROR,
  Z_VERSION_ERROR: constants.Z_VERSION_ERROR
};
for (const ckey of ObjectKeys(codes)) {
  codes[codes[ckey]] = ckey;
}
function zlibBuffer(engine, buffer, callback) {
  validateFunction(callback, "callback");
  if (isArrayBufferView(buffer)) {
    buffer = __intrinsic__Buffer.from(buffer.buffer, buffer.byteOffset, buffer.byteLength);
  } else if (isAnyArrayBuffer(buffer)) {
    buffer = __intrinsic__Buffer.from(buffer);
  }
  engine.buffers = null;
  engine.nread = 0;
  engine.cb = callback;
  engine.on("data", zlibBufferOnData);
  engine.on("error", zlibBufferOnError);
  engine.on("end", zlibBufferOnEnd);
  engine.end(buffer);
}
function zlibBufferOnData(chunk) {
  if (!this.buffers)
    this.buffers = [chunk];
  else
    ArrayPrototypePush.__intrinsic__call(this.buffers, chunk);
  this.nread += chunk.length;
  if (this.nread > this._maxOutputLength) {
    this.close();
    this.removeAllListeners("end");
    this.cb(__intrinsic__makeErrorWithCode(13, this._maxOutputLength));
  }
}
function zlibBufferOnError(err) {
  this.removeAllListeners("end");
  this.cb(err);
}
function zlibBufferOnEnd() {
  let buf;
  if (this.nread === 0) {
    buf = __intrinsic__Buffer.alloc(0);
  } else {
    const bufs = this.buffers;
    buf = bufs.length === 1 ? bufs[0] : __intrinsic__Buffer.concat(bufs, this.nread);
  }
  this.close();
  if (this._info)
    this.cb(null, { buffer: buf, engine: this });
  else
    this.cb(null, buf);
}
function zlibBufferSync(engine, buffer) {
  if (typeof buffer === "string") {
    buffer = __intrinsic__Buffer.from(buffer);
  } else if (!isArrayBufferView(buffer)) {
    if (isAnyArrayBuffer(buffer)) {
      buffer = __intrinsic__Buffer.from(buffer);
    } else {
      throw __intrinsic__makeErrorWithCode(118, "buffer", "string, Buffer, TypedArray, DataView, or ArrayBuffer", buffer);
    }
  }
  buffer = processChunkSync(engine, buffer, engine._finishFlushFlag);
  if (engine._info)
    return { buffer, engine };
  return buffer;
}
function zlibOnError(message, errno, code) {
  const self = this[owner_symbol];
  const error = new Error(message);
  error.errno = errno;
  error.code = code;
  self.destroy(error);
  self[kError] = error;
}
var FLUSH_BOUND = [
  [Z_NO_FLUSH, Z_BLOCK],
  [BROTLI_OPERATION_PROCESS, BROTLI_OPERATION_EMIT_METADATA],
  [ZSTD_e_continue, ZSTD_e_end]
];
var FLUSH_BOUND_IDX_NORMAL = 0;
var FLUSH_BOUND_IDX_BROTLI = 1;
var FLUSH_BOUND_IDX_ZSTD = 2;
function ZlibBase(opts, mode, handle, { flush, finishFlush, fullFlush }) {
  let chunkSize = Z_DEFAULT_CHUNK;
  let maxOutputLength = kMaxLength;
  $assert(typeof mode === "number", 'typeof mode === "number"');
  $assert(mode >= DEFLATE && mode <= ZSTD_DECOMPRESS, "mode >= DEFLATE && mode <= ZSTD_DECOMPRESS");
  let flushBoundIdx;
  if (mode === BROTLI_ENCODE || mode === BROTLI_DECODE) {
    flushBoundIdx = FLUSH_BOUND_IDX_BROTLI;
  } else if (mode === ZSTD_COMPRESS || mode === ZSTD_DECOMPRESS) {
    flushBoundIdx = FLUSH_BOUND_IDX_ZSTD;
  } else {
    flushBoundIdx = FLUSH_BOUND_IDX_NORMAL;
  }
  if (opts) {
    chunkSize = opts.chunkSize;
    if (!validateFiniteNumber(chunkSize, "options.chunkSize")) {
      chunkSize = Z_DEFAULT_CHUNK;
    } else if (chunkSize < Z_MIN_CHUNK) {
      throw __intrinsic__makeErrorWithCode(156, "options.chunkSize", `>= ${Z_MIN_CHUNK}`, chunkSize);
    }
    flush = checkRangesOrGetDefault(opts.flush, "options.flush", FLUSH_BOUND[flushBoundIdx][0], FLUSH_BOUND[flushBoundIdx][1], flush);
    finishFlush = checkRangesOrGetDefault(opts.finishFlush, "options.finishFlush", FLUSH_BOUND[flushBoundIdx][0], FLUSH_BOUND[flushBoundIdx][1], finishFlush);
    maxOutputLength = checkRangesOrGetDefault(opts.maxOutputLength, "options.maxOutputLength", 1, kMaxLength, kMaxLength);
    if (opts.encoding || opts.objectMode || opts.writableObjectMode) {
      opts = { ...opts };
      opts.encoding = null;
      opts.objectMode = false;
      opts.writableObjectMode = false;
    }
  }
  Transform.__intrinsic__apply(this, [{ autoDestroy: true, ...opts }]);
  this[kError] = null;
  this.bytesWritten = 0;
  this._handle = handle;
  handle[owner_symbol] = this;
  handle.onerror = zlibOnError;
  this._outBuffer = __intrinsic__Buffer.allocUnsafe(chunkSize);
  this._outOffset = 0;
  this._chunkSize = chunkSize;
  this._defaultFlushFlag = flush;
  this._finishFlushFlag = finishFlush;
  this._defaultFullFlushFlag = fullFlush;
  this._info = opts && opts.info;
  this._maxOutputLength = maxOutputLength;
}
__intrinsic__toClass(ZlibBase, "ZlibBase", Transform);
ObjectDefineProperty(ZlibBase.prototype, "_closed", {
  configurable: true,
  enumerable: true,
  get() {
    return !this._handle;
  }
});
ObjectDefineProperty(ZlibBase.prototype, "bytesRead", {
  configurable: true,
  get: function() {
    return this.bytesWritten;
  },
  set: function(value) {
    this.bytesWritten = value;
  }
});
ZlibBase.prototype.reset = function() {
  $assert(this._handle, "this._handle", "zlib binding closed");
  return this._handle.reset();
};
ZlibBase.prototype._flush = function(callback) {
  this._transform(__intrinsic__Buffer.alloc(0), "", callback);
};
ZlibBase.prototype._final = function(callback) {
  callback();
};
var flushiness = [];
var kFlushFlagList = [Z_NO_FLUSH, Z_BLOCK, Z_PARTIAL_FLUSH, Z_SYNC_FLUSH, Z_FULL_FLUSH, Z_FINISH];
for (let i = 0;i < kFlushFlagList.length; i++) {
  flushiness[kFlushFlagList[i]] = i;
}
function maxFlush(a, b) {
  return flushiness[a] > flushiness[b] ? a : b;
}
var kFlushBuffers = [];
{
  const dummyArrayBuffer = new __intrinsic__ArrayBuffer;
  for (const flushFlag of kFlushFlagList) {
    kFlushBuffers[flushFlag] = __intrinsic__Buffer.from(dummyArrayBuffer);
    kFlushBuffers[flushFlag][kFlushFlag] = flushFlag;
  }
}
ZlibBase.prototype.flush = function(kind, callback) {
  if (typeof kind === "function" || kind === __intrinsic__undefined && !callback) {
    callback = kind;
    kind = this._defaultFullFlushFlag;
  }
  if (this.writableFinished) {
    if (callback)
      process.nextTick(callback);
  } else if (this.writableEnded) {
    if (callback)
      this.once("end", callback);
  } else {
    this.write(kFlushBuffers[kind], "", callback);
  }
};
ZlibBase.prototype.close = function(callback) {
  if (callback)
    finished(this, callback);
  this.destroy();
};
ZlibBase.prototype._destroy = function(err, callback) {
  _close(this);
  callback(err);
};
ZlibBase.prototype._transform = function(chunk, encoding, cb) {
  let flushFlag = this._defaultFlushFlag;
  if (typeof chunk[kFlushFlag] === "number") {
    flushFlag = chunk[kFlushFlag];
  }
  if (this.writableEnded && this.writableLength === chunk.byteLength) {
    flushFlag = maxFlush(flushFlag, this._finishFlushFlag);
  }
  processChunk(this, chunk, flushFlag, cb);
};
ZlibBase.prototype._processChunk = function(chunk, flushFlag, cb) {
  if (typeof cb === "function")
    processChunk(this, chunk, flushFlag, cb);
  else
    return processChunkSync(this, chunk, flushFlag);
};
function processChunkSync(self, chunk, flushFlag) {
  let availInBefore = chunk.byteLength;
  let availOutBefore = self._chunkSize - self._outOffset;
  let inOff = 0;
  let availOutAfter;
  let availInAfter;
  const buffers = [];
  let nread = 0;
  let inputRead = 0;
  const state = self._writeState;
  const handle = self._handle;
  let buffer = self._outBuffer;
  let offset = self._outOffset;
  const chunkSize = self._chunkSize;
  let error;
  self.on("error", function onError(er) {
    error = er;
  });
  while (true) {
    handle.writeSync(flushFlag, chunk, inOff, availInBefore, buffer, offset, availOutBefore);
    if (error) {
      if (typeof error === "string") {
        error = new Error(error);
      } else if (!Error.isError(error)) {
        error = new Error(__intrinsic__String(error));
      }
      throw error;
    } else if (self[kError])
      throw self[kError];
    availOutAfter = state[0];
    availInAfter = state[1];
    const inDelta = availInBefore - availInAfter;
    inputRead += inDelta;
    const have = availOutBefore - availOutAfter;
    if (have > 0) {
      const out = buffer.slice(offset, offset + have);
      offset += have;
      ArrayPrototypePush.__intrinsic__call(buffers, out);
      nread += out.byteLength;
      if (nread > self._maxOutputLength) {
        _close(self);
        throw __intrinsic__makeErrorWithCode(13, self._maxOutputLength);
      }
    } else {
      $assert(have === 0, "have === 0", "have should not go down");
    }
    if (availOutAfter === 0 || offset >= chunkSize) {
      availOutBefore = chunkSize;
      offset = 0;
      buffer = __intrinsic__Buffer.allocUnsafe(chunkSize);
    }
    if (availOutAfter === 0) {
      inOff += inDelta;
      availInBefore = availInAfter;
    } else {
      break;
    }
  }
  self.bytesWritten = inputRead;
  _close(self);
  if (nread === 0)
    return __intrinsic__Buffer.alloc(0);
  return buffers.length === 1 ? buffers[0] : __intrinsic__Buffer.concat(buffers, nread);
}
function processChunk(self, chunk, flushFlag, cb) {
  const handle = self._handle;
  if (!handle)
    return process.nextTick(cb);
  handle.buffer = chunk;
  handle.cb = cb;
  handle.availOutBefore = self._chunkSize - self._outOffset;
  handle.availInBefore = chunk.byteLength;
  handle.inOff = 0;
  handle.flushFlag = flushFlag;
  handle.write(flushFlag, chunk, 0, handle.availInBefore, self._outBuffer, self._outOffset, handle.availOutBefore);
}
function processCallback() {
  const handle = this;
  const self = this[owner_symbol];
  const state = self._writeState;
  if (self.destroyed) {
    this.buffer = null;
    this.cb();
    return;
  }
  const availOutAfter = state[0];
  const availInAfter = state[1];
  const inDelta = handle.availInBefore - availInAfter;
  self.bytesWritten += inDelta;
  const have = handle.availOutBefore - availOutAfter;
  let streamBufferIsFull = false;
  if (have > 0) {
    const out = self._outBuffer.slice(self._outOffset, self._outOffset + have);
    self._outOffset += have;
    streamBufferIsFull = !self.push(out);
  } else {
    $assert(have === 0, "have === 0", "have should not go down");
  }
  if (self.destroyed) {
    this.cb();
    return;
  }
  if (availOutAfter === 0 || self._outOffset >= self._chunkSize) {
    handle.availOutBefore = self._chunkSize;
    self._outOffset = 0;
    self._outBuffer = __intrinsic__Buffer.allocUnsafe(self._chunkSize);
  }
  if (availOutAfter === 0) {
    handle.inOff += inDelta;
    handle.availInBefore = availInAfter;
    if (!streamBufferIsFull) {
      this.write(handle.flushFlag, this.buffer, handle.inOff, handle.availInBefore, self._outBuffer, self._outOffset, self._chunkSize);
    } else {
      const oldRead = self._read;
      self._read = (n) => {
        self._read = oldRead;
        this.write(handle.flushFlag, this.buffer, handle.inOff, handle.availInBefore, self._outBuffer, self._outOffset, self._chunkSize);
        self._read(n);
      };
    }
    return;
  }
  if (availInAfter > 0) {
    self.push(null);
  }
  this.buffer = null;
  this.cb();
}
function _close(engine) {
  engine._handle?.close();
  engine._handle = null;
}
var zlibDefaultOpts = {
  flush: Z_NO_FLUSH,
  finishFlush: Z_FINISH,
  fullFlush: Z_FULL_FLUSH
};
function Zlib(opts, mode) {
  let windowBits = Z_DEFAULT_WINDOWBITS;
  let level = Z_DEFAULT_COMPRESSION;
  let memLevel = Z_DEFAULT_MEMLEVEL;
  let strategy = Z_DEFAULT_STRATEGY;
  let dictionary;
  if (opts) {
    if ((opts.windowBits == null || opts.windowBits === 0) && (mode === INFLATE || mode === GUNZIP || mode === UNZIP)) {
      windowBits = 0;
    } else {
      const min = Z_MIN_WINDOWBITS + (mode === GZIP ? 1 : 0);
      windowBits = checkRangesOrGetDefault(opts.windowBits, "options.windowBits", min, Z_MAX_WINDOWBITS, Z_DEFAULT_WINDOWBITS);
    }
    level = checkRangesOrGetDefault(opts.level, "options.level", Z_MIN_LEVEL, Z_MAX_LEVEL, Z_DEFAULT_COMPRESSION);
    memLevel = checkRangesOrGetDefault(opts.memLevel, "options.memLevel", Z_MIN_MEMLEVEL, Z_MAX_MEMLEVEL, Z_DEFAULT_MEMLEVEL);
    strategy = checkRangesOrGetDefault(opts.strategy, "options.strategy", Z_DEFAULT_STRATEGY, Z_FIXED, Z_DEFAULT_STRATEGY);
    dictionary = opts.dictionary;
    if (dictionary !== __intrinsic__undefined && !isArrayBufferView(dictionary)) {
      if (isAnyArrayBuffer(dictionary)) {
        dictionary = __intrinsic__Buffer.from(dictionary);
      } else {
        throw __intrinsic__makeErrorWithCode(118, "options.dictionary", "Buffer, TypedArray, DataView, or ArrayBuffer", dictionary);
      }
    }
  }
  const handle = new NativeZlib(mode);
  this._writeState = new Uint32Array(2);
  handle.init(windowBits, level, memLevel, strategy, this._writeState, processCallback, dictionary);
  ZlibBase.__intrinsic__apply(this, [opts, mode, handle, zlibDefaultOpts]);
  this._level = level;
  this._strategy = strategy;
}
__intrinsic__toClass(Zlib, "Zlib", ZlibBase);
function paramsAfterFlushCallback(level, strategy, callback) {
  $assert(this._handle, "this._handle", "zlib binding closed");
  this._handle.params(level, strategy);
  if (!this.destroyed) {
    this._level = level;
    this._strategy = strategy;
    if (callback)
      callback();
  }
}
Zlib.prototype.params = function params(level, strategy, callback) {
  checkRangesOrGetDefault(level, "level", Z_MIN_LEVEL, Z_MAX_LEVEL);
  checkRangesOrGetDefault(strategy, "strategy", Z_DEFAULT_STRATEGY, Z_FIXED);
  if (this._level !== level || this._strategy !== strategy) {
    this.flush(Z_SYNC_FLUSH, paramsAfterFlushCallback.bind(this, level, strategy, callback));
  } else {
    process.nextTick(callback);
  }
};
function Deflate(opts) {
  if (!(this instanceof Deflate))
    return new Deflate(opts);
  Zlib.__intrinsic__apply(this, [opts, DEFLATE]);
}
__intrinsic__toClass(Deflate, "Deflate", Zlib);
function Inflate(opts) {
  if (!(this instanceof Inflate))
    return new Inflate(opts);
  Zlib.__intrinsic__apply(this, [opts, INFLATE]);
}
__intrinsic__toClass(Inflate, "Inflate", Zlib);
function Gzip(opts) {
  if (!(this instanceof Gzip))
    return new Gzip(opts);
  Zlib.__intrinsic__apply(this, [opts, GZIP]);
}
__intrinsic__toClass(Gzip, "Gzip", Zlib);
function Gunzip(opts) {
  if (!(this instanceof Gunzip))
    return new Gunzip(opts);
  Zlib.__intrinsic__apply(this, [opts, GUNZIP]);
}
__intrinsic__toClass(Gunzip, "Gunzip", Zlib);
function DeflateRaw(opts) {
  if (opts && opts.windowBits === 8)
    opts.windowBits = 9;
  if (!(this instanceof DeflateRaw))
    return new DeflateRaw(opts);
  Zlib.__intrinsic__apply(this, [opts, DEFLATERAW]);
}
__intrinsic__toClass(DeflateRaw, "DeflateRaw", Zlib);
function InflateRaw(opts) {
  if (!(this instanceof InflateRaw))
    return new InflateRaw(opts);
  Zlib.__intrinsic__apply(this, [opts, INFLATERAW]);
}
__intrinsic__toClass(InflateRaw, "InflateRaw", Zlib);
function Unzip(opts) {
  if (!(this instanceof Unzip))
    return new Unzip(opts);
  Zlib.__intrinsic__apply(this, [opts, UNZIP]);
}
__intrinsic__toClass(Unzip, "Unzip", Zlib);
function createConvenienceMethod(ctor, sync, methodName, isZstd) {
  if (sync) {
    const fn = function(buffer, opts) {
      return zlibBufferSync(new ctor(opts), buffer);
    };
    ObjectDefineProperty(fn, "name", { value: methodName });
    return fn;
  } else {
    const fn = function(buffer, opts, callback) {
      if (typeof opts === "function") {
        callback = opts;
        opts = {};
      }
      if (isZstd) {
        let bufferSize;
        if (typeof buffer === "string") {
          bufferSize = __intrinsic__Buffer.byteLength(buffer);
        } else if (isArrayBufferView(buffer)) {
          bufferSize = buffer.byteLength;
        } else if (isAnyArrayBuffer(buffer)) {
          bufferSize = buffer.byteLength;
        } else {
          bufferSize = 0;
        }
        if (!opts.pledgedSrcSize && bufferSize > 0) {
          opts = { ...opts, pledgedSrcSize: bufferSize };
        }
      }
      return zlibBuffer(new ctor(opts), buffer, callback);
    };
    ObjectDefineProperty(fn, "name", { value: methodName });
    return fn;
  }
}
var kMaxBrotliParam = 9;
var brotliInitParamsArray = new Uint32Array(kMaxBrotliParam + 1);
var brotliDefaultOpts = {
  flush: BROTLI_OPERATION_PROCESS,
  finishFlush: BROTLI_OPERATION_FINISH,
  fullFlush: BROTLI_OPERATION_FLUSH
};
function Brotli(opts, mode) {
  $assert(mode === BROTLI_DECODE || mode === BROTLI_ENCODE, "mode === BROTLI_DECODE || mode === BROTLI_ENCODE");
  TypedArrayPrototypeFill.__intrinsic__call(brotliInitParamsArray, -1);
  if (opts?.params) {
    ArrayPrototypeForEach.__intrinsic__call(ObjectKeys(opts.params), (origKey) => {
      const key = +origKey;
      if (NumberIsNaN(key) || key < 0 || key > kMaxBrotliParam || (brotliInitParamsArray[key] | 0) !== -1) {
        throw __intrinsic__makeErrorWithCode(10, origKey);
      }
      const value = opts.params[origKey];
      if (typeof value !== "number" && typeof value !== "boolean") {
        throw __intrinsic__makeErrorWithCode(118, "options.params[key]", "number", opts.params[origKey]);
      }
      brotliInitParamsArray[key] = value;
    });
  }
  const handle = new NativeBrotli(mode);
  this._writeState = new Uint32Array(2);
  if (!handle.init(brotliInitParamsArray, this._writeState, processCallback)) {
    throw __intrinsic__makeErrorWithCode(262);
  }
  ZlibBase.__intrinsic__apply(this, [opts, mode, handle, brotliDefaultOpts]);
}
__intrinsic__toClass(Brotli, "Brotli", Zlib);
function BrotliCompress(opts) {
  if (!(this instanceof BrotliCompress))
    return new BrotliCompress(opts);
  Brotli.__intrinsic__apply(this, [opts, BROTLI_ENCODE]);
}
__intrinsic__toClass(BrotliCompress, "BrotliCompress", Brotli);
function BrotliDecompress(opts) {
  if (!(this instanceof BrotliDecompress))
    return new BrotliDecompress(opts);
  Brotli.__intrinsic__apply(this, [opts, BROTLI_DECODE]);
}
__intrinsic__toClass(BrotliDecompress, "BrotliDecompress", Brotli);
var zstdDefaultOpts = {
  flush: ZSTD_e_continue,
  finishFlush: ZSTD_e_end,
  fullFlush: ZSTD_e_flush
};

class Zstd extends ZlibBase {
  constructor(opts, mode, initParamsArray, maxParam) {
    $assert(mode === ZSTD_COMPRESS || mode === ZSTD_DECOMPRESS, "mode === ZSTD_COMPRESS || mode === ZSTD_DECOMPRESS");
    initParamsArray.fill(-1);
    if (opts?.params) {
      ObjectKeys(opts.params).forEach((origKey) => {
        const key = +origKey;
        if (NumberIsNaN(key) || key < 0 || key > maxParam || (initParamsArray[key] | 0) !== -1) {
          throw __intrinsic__makeErrorWithCode(256, origKey);
        }
        const value = opts.params[origKey];
        if (typeof value !== "number" && typeof value !== "boolean") {
          throw __intrinsic__makeErrorWithCode(118, "options.params[key]", "number", opts.params[origKey]);
        }
        initParamsArray[key] = value;
      });
    }
    const handle = new NativeZstd(mode);
    const pledgedSrcSize = opts?.pledgedSrcSize ?? __intrinsic__undefined;
    const writeState = new Uint32Array(2);
    handle.init(initParamsArray, pledgedSrcSize, writeState, processCallback);
    super(opts, mode, handle, zstdDefaultOpts);
    this._writeState = writeState;
  }
}
var kMaxZstdCParam = MathMax(...ObjectKeys(constants).map((key) => key.startsWith("ZSTD_c_") ? constants[key] : 0));
var zstdInitCParamsArray = new Uint32Array(kMaxZstdCParam + 1);

class ZstdCompress extends Zstd {
  constructor(opts) {
    super(opts, ZSTD_COMPRESS, zstdInitCParamsArray, kMaxZstdCParam);
  }
}
var kMaxZstdDParam = MathMax(...ObjectKeys(constants).map((key) => key.startsWith("ZSTD_d_") ? constants[key] : 0));
var zstdInitDParamsArray = new Uint32Array(kMaxZstdDParam + 1);

class ZstdDecompress extends Zstd {
  constructor(opts) {
    super(opts, ZSTD_DECOMPRESS, zstdInitDParamsArray, kMaxZstdDParam);
  }
}
ObjectDefineProperty(NativeZlib.prototype, "jsref", {
  __proto__: null,
  get() {
    return this[owner_symbol];
  },
  set(v) {
    return this[owner_symbol] = v;
  }
});
var zlib = {
  crc32,
  Deflate,
  Inflate,
  Gzip,
  Gunzip,
  DeflateRaw,
  InflateRaw,
  Unzip,
  BrotliCompress,
  BrotliDecompress,
  ZstdCompress,
  ZstdDecompress,
  deflate: createConvenienceMethod(Deflate, false, "deflate"),
  deflateSync: createConvenienceMethod(Deflate, true, "deflateSync"),
  gzip: createConvenienceMethod(Gzip, false, "gzip"),
  gzipSync: createConvenienceMethod(Gzip, true, "gzipSync"),
  deflateRaw: createConvenienceMethod(DeflateRaw, false, "deflateRaw"),
  deflateRawSync: createConvenienceMethod(DeflateRaw, true, "deflateRawSync"),
  unzip: createConvenienceMethod(Unzip, false, "unzip"),
  unzipSync: createConvenienceMethod(Unzip, true, "unzipSync"),
  inflate: createConvenienceMethod(Inflate, false, "inflate"),
  inflateSync: createConvenienceMethod(Inflate, true, "inflateSync"),
  gunzip: createConvenienceMethod(Gunzip, false, "gunzip"),
  gunzipSync: createConvenienceMethod(Gunzip, true, "gunzipSync"),
  inflateRaw: createConvenienceMethod(InflateRaw, false, "inflateRaw"),
  inflateRawSync: createConvenienceMethod(InflateRaw, true, "inflateRawSync"),
  brotliCompress: createConvenienceMethod(BrotliCompress, false, "brotliCompress"),
  brotliCompressSync: createConvenienceMethod(BrotliCompress, true, "brotliCompressSync"),
  brotliDecompress: createConvenienceMethod(BrotliDecompress, false, "brotliDecompress"),
  brotliDecompressSync: createConvenienceMethod(BrotliDecompress, true, "brotliDecompressSync"),
  zstdCompress: createConvenienceMethod(ZstdCompress, false, "zstdCompress", true),
  zstdCompressSync: createConvenienceMethod(ZstdCompress, true, "zstdCompressSync"),
  zstdDecompress: createConvenienceMethod(ZstdDecompress, false, "zstdDecompress"),
  zstdDecompressSync: createConvenienceMethod(ZstdDecompress, true, "zstdDecompressSync"),
  createDeflate: function(options) {
    return new Deflate(options);
  },
  createInflate: function(options) {
    return new Inflate(options);
  },
  createDeflateRaw: function(options) {
    return new DeflateRaw(options);
  },
  createInflateRaw: function(options) {
    return new InflateRaw(options);
  },
  createGzip: function(options) {
    return new Gzip(options);
  },
  createGunzip: function(options) {
    return new Gunzip(options);
  },
  createUnzip: function(options) {
    return new Unzip(options);
  },
  createBrotliCompress: function(options) {
    return new BrotliCompress(options);
  },
  createBrotliDecompress: function(options) {
    return new BrotliDecompress(options);
  },
  createZstdCompress: function(options) {
    return new ZstdCompress(options);
  },
  createZstdDecompress: function(options) {
    return new ZstdDecompress(options);
  }
};
ObjectDefineProperties(zlib, {
  constants: {
    enumerable: true,
    value: ObjectFreeze(constants)
  },
  codes: {
    enumerable: true,
    value: ObjectFreeze(codes)
  }
});
{
  const { Z_OK, Z_STREAM_END, Z_NEED_DICT, Z_ERRNO, Z_STREAM_ERROR, Z_DATA_ERROR, Z_MEM_ERROR, Z_BUF_ERROR, Z_VERSION_ERROR, Z_NO_COMPRESSION, Z_BEST_SPEED, Z_BEST_COMPRESSION, Z_DEFAULT_COMPRESSION: Z_DEFAULT_COMPRESSION2, Z_FILTERED, Z_HUFFMAN_ONLY, Z_RLE, ZLIB_VERNUM, Z_MAX_CHUNK, Z_DEFAULT_LEVEL } = constants;
  ObjectDefineProperty(zlib, "Z_NO_FLUSH", { value: Z_NO_FLUSH });
  ObjectDefineProperty(zlib, "Z_PARTIAL_FLUSH", { value: Z_PARTIAL_FLUSH });
  ObjectDefineProperty(zlib, "Z_SYNC_FLUSH", { value: Z_SYNC_FLUSH });
  ObjectDefineProperty(zlib, "Z_FULL_FLUSH", { value: Z_FULL_FLUSH });
  ObjectDefineProperty(zlib, "Z_FINISH", { value: Z_FINISH });
  ObjectDefineProperty(zlib, "Z_BLOCK", { value: Z_BLOCK });
  ObjectDefineProperty(zlib, "Z_OK", { value: Z_OK });
  ObjectDefineProperty(zlib, "Z_STREAM_END", { value: Z_STREAM_END });
  ObjectDefineProperty(zlib, "Z_NEED_DICT", { value: Z_NEED_DICT });
  ObjectDefineProperty(zlib, "Z_ERRNO", { value: Z_ERRNO });
  ObjectDefineProperty(zlib, "Z_STREAM_ERROR", { value: Z_STREAM_ERROR });
  ObjectDefineProperty(zlib, "Z_DATA_ERROR", { value: Z_DATA_ERROR });
  ObjectDefineProperty(zlib, "Z_MEM_ERROR", { value: Z_MEM_ERROR });
  ObjectDefineProperty(zlib, "Z_BUF_ERROR", { value: Z_BUF_ERROR });
  ObjectDefineProperty(zlib, "Z_VERSION_ERROR", { value: Z_VERSION_ERROR });
  ObjectDefineProperty(zlib, "Z_NO_COMPRESSION", { value: Z_NO_COMPRESSION });
  ObjectDefineProperty(zlib, "Z_BEST_SPEED", { value: Z_BEST_SPEED });
  ObjectDefineProperty(zlib, "Z_BEST_COMPRESSION", { value: Z_BEST_COMPRESSION });
  ObjectDefineProperty(zlib, "Z_DEFAULT_COMPRESSION", { value: Z_DEFAULT_COMPRESSION2 });
  ObjectDefineProperty(zlib, "Z_FILTERED", { value: Z_FILTERED });
  ObjectDefineProperty(zlib, "Z_HUFFMAN_ONLY", { value: Z_HUFFMAN_ONLY });
  ObjectDefineProperty(zlib, "Z_RLE", { value: Z_RLE });
  ObjectDefineProperty(zlib, "Z_FIXED", { value: Z_FIXED });
  ObjectDefineProperty(zlib, "Z_DEFAULT_STRATEGY", { value: Z_DEFAULT_STRATEGY });
  ObjectDefineProperty(zlib, "ZLIB_VERNUM", { value: ZLIB_VERNUM });
  ObjectDefineProperty(zlib, "DEFLATE", { value: DEFLATE });
  ObjectDefineProperty(zlib, "INFLATE", { value: INFLATE });
  ObjectDefineProperty(zlib, "GZIP", { value: GZIP });
  ObjectDefineProperty(zlib, "GUNZIP", { value: GUNZIP });
  ObjectDefineProperty(zlib, "DEFLATERAW", { value: DEFLATERAW });
  ObjectDefineProperty(zlib, "INFLATERAW", { value: INFLATERAW });
  ObjectDefineProperty(zlib, "UNZIP", { value: UNZIP });
  ObjectDefineProperty(zlib, "Z_MIN_WINDOWBITS", { value: Z_MIN_WINDOWBITS });
  ObjectDefineProperty(zlib, "Z_MAX_WINDOWBITS", { value: Z_MAX_WINDOWBITS });
  ObjectDefineProperty(zlib, "Z_DEFAULT_WINDOWBITS", { value: Z_DEFAULT_WINDOWBITS });
  ObjectDefineProperty(zlib, "Z_MIN_CHUNK", { value: Z_MIN_CHUNK });
  ObjectDefineProperty(zlib, "Z_MAX_CHUNK", { value: Z_MAX_CHUNK });
  ObjectDefineProperty(zlib, "Z_DEFAULT_CHUNK", { value: Z_DEFAULT_CHUNK });
  ObjectDefineProperty(zlib, "Z_MIN_MEMLEVEL", { value: Z_MIN_MEMLEVEL });
  ObjectDefineProperty(zlib, "Z_MAX_MEMLEVEL", { value: Z_MAX_MEMLEVEL });
  ObjectDefineProperty(zlib, "Z_DEFAULT_MEMLEVEL", { value: Z_DEFAULT_MEMLEVEL });
  ObjectDefineProperty(zlib, "Z_MIN_LEVEL", { value: Z_MIN_LEVEL });
  ObjectDefineProperty(zlib, "Z_MAX_LEVEL", { value: Z_MAX_LEVEL });
  ObjectDefineProperty(zlib, "Z_DEFAULT_LEVEL", { value: Z_DEFAULT_LEVEL });
}
$ = zlib;
$$EXPORT$$($).$$EXPORT_END$$;
