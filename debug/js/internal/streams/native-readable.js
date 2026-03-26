(function (){"use strict";
let $debug_trace = Bun.env.TRACE && Bun.env.TRACE === '1';
let $debug_log_enabled = ((env) => (
  // The rationale for checking all these variables is just so you don't have to exactly remember which one you set.
  (env.BUN_DEBUG_ALL && env.BUN_DEBUG_ALL !== '0')
  || (env.BUN_DEBUG_JS && env.BUN_DEBUG_JS !== '0')
  || (env.BUN_DEBUG_STREAMS_NATIVE_READABLE === '1')
  || (env.DEBUG_INTERNAL_STREAMS_NATIVE_READABLE === '1')
))(Bun.env);
let $debug_pid_prefix = Bun.env.SHOW_PID === '1';
let $debug_log = $debug_log_enabled ? (...args) => {
  // warn goes to stderr without colorizing
  console[$debug_trace ? 'trace' : 'warn'](($debug_pid_prefix ? `[${process.pid}] ` : '') + (Bun.enableANSIColors ? '\x1b[90m[internal:streams/native-readable]\x1b[0m' : '[internal:streams/native-readable]'), ...args);
} : () => {};

let $assert = function(check, sourceString, ...message) {
  if (!check) {
    const prevPrepareStackTrace = Error.prepareStackTrace;
    Error.prepareStackTrace = (e, stack) => {
      return e.name + ': ' + e.message + '\n' + stack.slice(1).map(x => '  at ' + x.toString()).join('\n');
    };
    const e = new Error(sourceString);
    e.stack; // materialize stack
    e.name = 'AssertionError';
    Error.prepareStackTrace = prevPrepareStackTrace;
    console.error('[internal:streams/native-readable] ASSERTION FAILED: ' + sourceString);
    if (message.length) console.warn(...message);
    console.warn(e.stack.split('\n')[1] + '\n');
    if (Bun.env.ASSERT === 'CRASH') process.exit(0xAA);
    throw e;
  }
}
// build/debug/tmp_modules/internal/streams/native-readable.ts
var $;
var Readable = @getInternalField(@internalModuleRegistry, 55) || @createInternalModuleById(55);
var transferToNativeReadable = @lazy(18);
var { errorOrDestroy } = @getInternalField(@internalModuleRegistry, 43) || @createInternalModuleById(43);
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
  $assert(typeof readableStream === "object" && readableStream instanceof @ReadableStream, 'typeof readableStream === "object" && readableStream instanceof ReadableStream', "Invalid readable stream");
  const bunNativePtr = readableStream.@bunNativePtr;
  $assert(typeof bunNativePtr === "object", 'typeof bunNativePtr === "object"', "Invalid native ptr");
  const stream = new Readable(options);
  stream._read = read;
  stream._destroy = destroy;
  if (!!$debug_log_enabled) {
    stream.debugId = ++debugId;
  }
  stream.@bunNativePtr = bunNativePtr;
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
    stream[kRemainingChunk] = chunk = @Buffer.alloc(size);
  }
  $debug_log(`[${stream.debugId}] getRemainingChunk, ${chunk?.byteLength} bytes`);
  return chunk;
}
function read(maxToRead) {
  $debug_log(`[${this.debugId}] read${this[kPendingRead] ? ", is already pending" : ""}`);
  if (this[kPendingRead]) {
    return;
  }
  var ptr = this.@bunNativePtr;
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
    if (@isTypedArrayView(result2) && result2.byteLength > 0) {
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
  $assert(result !== @undefined, "result !== undefined");
  $debug_log(`[${this.debugId}] pull ${chunk?.byteLength} bytes, result: ${result instanceof @Promise ? "<pending>" : result}, closeState: ${this[kCloseState][0]}`);
  if (@isPromise(result)) {
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
    return (chunk?.byteLength ?? 0) > 0 ? chunk : @undefined;
  } else if (@isTypedArrayView(result)) {
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
    chunk = slice.byteLength < chunk.byteLength ? chunk.subarray(result) : @undefined;
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
  stream[kHighWaterMark] = @min(stream[kHighWaterMark] * 2, 1024 * 1024 * 2);
  stream[kHasResized] = true;
}
function destroy(error, cb) {
  const ptr = this.@bunNativePtr;
  if (ptr) {
    ptr.cancel(error);
  }
  if (cb) {
    process.nextTick(cb);
  }
}
function ref() {
  const ptr = this.@bunNativePtr;
  if (ptr === @undefined)
    return;
  if (this[kRefCount]++ === 0) {
    ptr.updateRef(true);
  }
}
function unref() {
  const ptr = this.@bunNativePtr;
  if (ptr === @undefined)
    return;
  if (this[kRefCount]-- === 1) {
    ptr.updateRef(false);
  }
}
$ = { constructNativeReadable };
return $})
