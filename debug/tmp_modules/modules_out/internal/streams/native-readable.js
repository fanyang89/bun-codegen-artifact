// @bun
// build/debug/tmp_modules/internal/streams/native-readable.ts
var $;
var Readable = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 55) || __intrinsic__createInternalModuleById(55);
var transferToNativeReadable = __intrinsic__lazy(18);
var { errorOrDestroy } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 43) || __intrinsic__createInternalModuleById(43);
var kRefCount = Symbol("refCount");
var kCloseState = Symbol("closeState");
var kConstructed = Symbol("constructed");
var kHighWaterMark = Symbol("highWaterMark");
var kPendingRead = Symbol("pendingRead");
var kHasResized = Symbol("hasResized");
var kRemainingChunk = Symbol("remainingChunk");
var MIN_BUFFER_SIZE = 512;
var dynamicallyAdjustChunkSize = (_) => (_ = process.env.BUN_DISABLE_DYNAMIC_CHUNK_SIZE !== "1", dynamicallyAdjustChunkSize = () => _);
var debugId = 0;
function constructNativeReadable(readableStream, options) {
  $assert(typeof readableStream === "object" && readableStream instanceof __intrinsic__ReadableStream, 'typeof readableStream === "object" && readableStream instanceof ReadableStream', "Invalid readable stream");
  const bunNativePtr = readableStream.__intrinsic__bunNativePtr;
  $assert(typeof bunNativePtr === "object", 'typeof bunNativePtr === "object"', "Invalid native ptr");
  const stream = new Readable(options);
  stream._read = read;
  stream._destroy = destroy;
  if (!!$debug_log_enabled) {
    stream.debugId = ++debugId;
  }
  stream.__intrinsic__bunNativePtr = bunNativePtr;
  stream[kRefCount] = 0;
  stream[kConstructed] = false;
  stream[kPendingRead] = false;
  stream[kHasResized] = !dynamicallyAdjustChunkSize();
  stream[kCloseState] = [false];
  if (typeof options.highWaterMark === "number") {
    stream[kHighWaterMark] = options.highWaterMark;
  } else {
    stream[kHighWaterMark] = 256 * 1024;
  }
  stream.ref = ref;
  stream.unref = unref;
  if (false) {}
  transferToNativeReadable(readableStream);
  $debug_log(`[${stream.debugId}] constructed!`);
  return stream;
}
function getRemainingChunk(stream, maxToRead) {
  maxToRead ??= stream[kHighWaterMark];
  var chunk = stream[kRemainingChunk];
  if ((chunk?.byteLength ?? 0) < MIN_BUFFER_SIZE) {
    var size = maxToRead > MIN_BUFFER_SIZE ? maxToRead : MIN_BUFFER_SIZE;
    stream[kRemainingChunk] = chunk = __intrinsic__Buffer.alloc(size);
  }
  $debug_log(`[${stream.debugId}] getRemainingChunk, ${chunk?.byteLength} bytes`);
  return chunk;
}
function read(maxToRead) {
  $debug_log(`[${this.debugId}] read${this[kPendingRead] ? ", is already pending" : ""}`);
  if (this[kPendingRead]) {
    return;
  }
  var ptr = this.__intrinsic__bunNativePtr;
  if (!ptr) {
    $debug_log(`[${this.debugId}] read, no ptr`);
    this.push(null);
    return;
  }
  if (!this[kConstructed]) {
    const result2 = ptr.start(this[kHighWaterMark]);
    $debug_log(`[${this.debugId}] start, initial hwm:`, result2);
    if (typeof result2 === "number" && result2 > 1) {
      this[kHasResized] = true;
      this[kHighWaterMark] = Math.min(this[kHighWaterMark], result2);
    }
    if (__intrinsic__isTypedArrayView(result2) && result2.byteLength > 0) {
      this.push(result2);
    }
    const drainResult = ptr.drain();
    this[kConstructed] = true;
    $debug_log(`[${this.debugId}] drain result: ${drainResult?.byteLength ?? "null"}`);
    if ((drainResult?.byteLength ?? 0) > 0) {
      this.push(drainResult);
    }
  }
  const chunk = getRemainingChunk(this, maxToRead);
  var result = ptr.pull(chunk, this[kCloseState]);
  $assert(result !== __intrinsic__undefined, "result !== undefined");
  $debug_log(`[${this.debugId}] pull ${chunk?.byteLength} bytes, result: ${result instanceof __intrinsic__Promise ? "<pending>" : result}, closeState: ${this[kCloseState][0]}`);
  if (__intrinsic__isPromise(result)) {
    this[kPendingRead] = true;
    return result.then((result2) => {
      $debug_log(`[${this.debugId}] pull, resolved: ${result2}, closeState: ${this[kCloseState][0]}`);
      this[kPendingRead] = false;
      this[kRemainingChunk] = handleResult(this, result2, chunk, this[kCloseState][0]);
    }, (reason) => {
      errorOrDestroy(this, reason);
    });
  } else {
    this[kRemainingChunk] = handleResult(this, result, chunk, this[kCloseState][0]);
  }
}
function handleResult(stream, result, chunk, isClosed) {
  if (typeof result === "number") {
    $debug_log(`[${stream.debugId}] handleResult(${result})`);
    if (result >= stream[kHighWaterMark] && !stream[kHasResized] && !isClosed) {
      adjustHighWaterMark(stream);
    }
    return handleNumberResult(stream, result, chunk, isClosed);
  } else if (typeof result === "boolean") {
    $debug_log(`[${stream.debugId}] handleResult(${result})`, chunk, isClosed);
    process.nextTick(() => {
      stream.push(null);
    });
    return (chunk?.byteLength ?? 0) > 0 ? chunk : __intrinsic__undefined;
  } else if (__intrinsic__isTypedArrayView(result)) {
    if (result.byteLength >= stream[kHighWaterMark] && !stream[kHasResized] && !isClosed) {
      adjustHighWaterMark(stream);
    }
    return handleArrayBufferViewResult(stream, result, chunk, isClosed);
  } else {
    $assert(false, "false", "Invalid result from pull");
  }
}
function handleNumberResult(stream, result, chunk, isClosed) {
  if (result > 0) {
    const slice = chunk.subarray(0, result);
    chunk = slice.byteLength < chunk.byteLength ? chunk.subarray(result) : __intrinsic__undefined;
    if (slice.byteLength > 0) {
      stream.push(slice);
    }
  }
  if (isClosed) {
    process.nextTick(() => {
      stream.push(null);
    });
  }
  return chunk;
}
function handleArrayBufferViewResult(stream, result, chunk, isClosed) {
  if (result.byteLength > 0) {
    stream.push(result);
  }
  if (isClosed) {
    process.nextTick(() => {
      stream.push(null);
    });
  }
  return chunk;
}
function adjustHighWaterMark(stream) {
  stream[kHighWaterMark] = __intrinsic__min(stream[kHighWaterMark] * 2, 1024 * 1024 * 2);
  stream[kHasResized] = true;
}
function destroy(error, cb) {
  const ptr = this.__intrinsic__bunNativePtr;
  if (ptr) {
    ptr.cancel(error);
  }
  if (cb) {
    process.nextTick(cb);
  }
}
function ref() {
  const ptr = this.__intrinsic__bunNativePtr;
  if (ptr === __intrinsic__undefined)
    return;
  if (this[kRefCount]++ === 0) {
    ptr.updateRef(true);
  }
}
function unref() {
  const ptr = this.__intrinsic__bunNativePtr;
  if (ptr === __intrinsic__undefined)
    return;
  if (this[kRefCount]-- === 1) {
    ptr.updateRef(false);
  }
}
$ = { constructNativeReadable };
$$EXPORT$$($).$$EXPORT_END$$;
