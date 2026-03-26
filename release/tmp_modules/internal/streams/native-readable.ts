// @ts-nocheck
var $;// GENERATED TEMP FILE - DO NOT EDIT
// Sourced from src/js/internal/streams/native-readable.ts


// NativeReadable is an implementation of ReadableStream which contains
// a pointer to a native handle. This is used, for example, to make
// child_process' stderr/out streams go through less hoops.
//
// Normally, Readable.fromWeb will wrap the ReadableStream in JavaScript. In
// Bun, `fromWeb` is able to check if the stream is backed by a native handle,
// to which it will take this path.
const Readable = (__intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 55/*internal/streams/readable*/) || __intrinsic__createInternalModuleById(55/*internal/streams/readable*/));
const transferToNativeReadable = __intrinsic__lazy(18);
const { errorOrDestroy } = (__intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 43/*internal/streams/destroy*/) || __intrinsic__createInternalModuleById(43/*internal/streams/destroy*/));

const kRefCount = Symbol("refCount");
const kCloseState = Symbol("closeState");
const kConstructed = Symbol("constructed");
const kHighWaterMark = Symbol("highWaterMark");
const kPendingRead = Symbol("pendingRead");
const kHasResized = Symbol("hasResized");
const kRemainingChunk = Symbol("remainingChunk");

const MIN_BUFFER_SIZE = 512;
let dynamicallyAdjustChunkSize = (_?) => (
  (_ = process.env.BUN_DISABLE_DYNAMIC_CHUNK_SIZE !== "1"),
  (dynamicallyAdjustChunkSize = () => _)
);

type NativeReadable = typeof import("node:stream").Readable &
  typeof import("node:stream").Stream & {
    push: (chunk: any) => void;
    __intrinsic__bunNativePtr?: NativePtr;
    [kRefCount]: number;
    [kCloseState]: [boolean];
    [kPendingRead]: boolean;
    [kHighWaterMark]: number;
    [kHasResized]: boolean;
    [kRemainingChunk]: Buffer;
    debugId: number;
  };

interface NativePtr {
  onClose: () => void;
  onDrain: (chunk: any) => void;
  start: (highWaterMark: number) => number;
  drain: () => any;
  pull: (view: any, closer: any) => any;
  updateRef: (ref: boolean) => void;
  cancel: (error: any) => void;
}

let debugId = 0;

function constructNativeReadable(readableStream: ReadableStream, options): NativeReadable {
  !(IS_BUN_DEVELOPMENT?$assert(typeof readableStream === "object" && readableStream instanceof ReadableStream,"typeof readableStream === \"object\" && readableStream instanceof ReadableStream", "Invalid readable stream"):void 0);
  const bunNativePtr = (readableStream as any).__intrinsic__bunNativePtr;
  !(IS_BUN_DEVELOPMENT?$assert(typeof bunNativePtr === "object","typeof bunNativePtr === \"object\"", "Invalid native ptr"):void 0);

  const stream = new Readable(options);
  stream._read = read;
  stream._destroy = destroy;

  if (!!__intrinsic__debug) {
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
  if (process.platform === "win32") {
    // Only used by node:tty on Windows
    stream.__intrinsic__start = ensureConstructed;
  }

  // https://github.com/oven-sh/bun/pull/12801
  // https://github.com/oven-sh/bun/issues/9555
  // There may be a ReadableStream.Strong handle to the ReadableStream.
  // We can't update those handles to point to the NativeReadable from JS
  // So we instead mark it as no longer usable, and create a new NativeReadable
  transferToNativeReadable(readableStream);

  (IS_BUN_DEVELOPMENT?$debug_log(`[${stream.debugId}] constructed!`):void 0);

  return stream;
}

function ensureConstructed(this: NativeReadable, cb: null | (() => void)) {
  (IS_BUN_DEVELOPMENT?$debug_log(`[${this.debugId}] ensureConstructed`):void 0);
  if (this[kConstructed]) return;
  this[kConstructed] = true;
  const ptr = this.__intrinsic__bunNativePtr;
  if (!ptr) return;
  !(IS_BUN_DEVELOPMENT?$assert(typeof ptr.start === "function","typeof ptr.start === \"function\"", "NativeReadable.start is not a function"):void 0);
  ptr.start(this[kHighWaterMark]);
  if (cb) cb();
}

// maxToRead can be the highWaterMark (by default) or the remaining amount of the stream to read
// This is so the consumer of the stream can terminate the stream early if they know
// how many bytes they want to read (ie. when reading only part of a file)
// ObjectDefinePrivateProperty(NativeReadable.prototype, "_getRemainingChunk", );
function getRemainingChunk(stream: NativeReadable, maxToRead?: number) {
  maxToRead ??= stream[kHighWaterMark] as number;
  var chunk = stream[kRemainingChunk];
  if ((chunk?.byteLength ?? 0) < MIN_BUFFER_SIZE) {
    var size = maxToRead > MIN_BUFFER_SIZE ? maxToRead : MIN_BUFFER_SIZE;
    stream[kRemainingChunk] = chunk = Buffer.alloc(size);
  }
  (IS_BUN_DEVELOPMENT?$debug_log(`[${stream.debugId}] getRemainingChunk, ${chunk?.byteLength} bytes`):void 0);
  return chunk;
}

function read(this: NativeReadable, maxToRead: number) {
  (IS_BUN_DEVELOPMENT?$debug_log(`[${this.debugId}] read${this[kPendingRead] ? ", is already pending" : ""}`):void 0);
  if (this[kPendingRead]) {
    return;
  }
  var ptr = this.__intrinsic__bunNativePtr;
  if (!ptr) {
    (IS_BUN_DEVELOPMENT?$debug_log(`[${this.debugId}] read, no ptr`):void 0);
    this.push(null);
    return;
  }
  if (!this[kConstructed]) {
    const result: any = ptr.start(this[kHighWaterMark]);
    (IS_BUN_DEVELOPMENT?$debug_log(`[${this.debugId}] start, initial hwm:`, result):void 0);
    if (typeof result === "number" && result > 1) {
      this[kHasResized] = true;
      this[kHighWaterMark] = Math.min(this[kHighWaterMark], result);
    }
    if (__intrinsic__isTypedArrayView(result) && result.byteLength > 0) {
      this.push(result);
    }
    const drainResult = ptr.drain();
    this[kConstructed] = true;
    (IS_BUN_DEVELOPMENT?$debug_log(`[${this.debugId}] drain result: ${drainResult?.byteLength ?? "null"}`):void 0);
    if ((drainResult?.byteLength ?? 0) > 0) {
      this.push(drainResult);
    }
  }
  const chunk = getRemainingChunk(this, maxToRead);
  var result = ptr.pull(chunk, this[kCloseState]);
  !(IS_BUN_DEVELOPMENT?$assert(result !== undefined,"result !== undefined"):void 0);
  (IS_BUN_DEVELOPMENT?$debug_log(
    `[${this.debugId}] pull ${chunk?.byteLength} bytes, result: ${result instanceof Promise ? "<pending>" : result}, closeState: ${this[kCloseState][0]}`,
  ):void 0);
  if (__intrinsic__isPromise(result)) {
    this[kPendingRead] = true;
    return result.then(
      result => {
        (IS_BUN_DEVELOPMENT?$debug_log(`[${this.debugId}] pull, resolved: ${result}, closeState: ${this[kCloseState][0]}`):void 0);
        this[kPendingRead] = false;
        this[kRemainingChunk] = handleResult(this, result, chunk, this[kCloseState][0]);
      },
      reason => {
        errorOrDestroy(this, reason);
      },
    );
  } else {
    this[kRemainingChunk] = handleResult(this, result, chunk, this[kCloseState][0]);
  }
}

function handleResult(stream: NativeReadable, result: any, chunk: Buffer, isClosed: boolean) {
  if (typeof result === "number") {
    (IS_BUN_DEVELOPMENT?$debug_log(`[${stream.debugId}] handleResult(${result})`):void 0);
    if (result >= stream[kHighWaterMark] && !stream[kHasResized] && !isClosed) {
      adjustHighWaterMark(stream);
    }
    return handleNumberResult(stream, result, chunk, isClosed);
  } else if (typeof result === "boolean") {
    (IS_BUN_DEVELOPMENT?$debug_log(`[${stream.debugId}] handleResult(${result})`, chunk, isClosed):void 0);
    process.nextTick(() => {
      stream.push(null);
    });
    return (chunk?.byteLength ?? 0) > 0 ? chunk : undefined;
  } else if (__intrinsic__isTypedArrayView(result)) {
    if (result.byteLength >= stream[kHighWaterMark] && !stream[kHasResized] && !isClosed) {
      adjustHighWaterMark(stream);
    }
    return handleArrayBufferViewResult(stream, result, chunk, isClosed);
  } else {
    !(IS_BUN_DEVELOPMENT?$assert(false,"false", "Invalid result from pull"):void 0);
  }
}

function handleNumberResult(stream: NativeReadable, result: number, chunk: any, isClosed: boolean) {
  if (result > 0) {
    const slice = chunk.subarray(0, result);
    chunk = slice.byteLength < chunk.byteLength ? chunk.subarray(result) : undefined;
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

function handleArrayBufferViewResult(stream: NativeReadable, result: any, chunk: any, isClosed: boolean) {
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

function adjustHighWaterMark(stream: NativeReadable) {
  stream[kHighWaterMark] = __intrinsic__min(stream[kHighWaterMark] * 2, 1024 * 1024 * 2);
  stream[kHasResized] = true;
}

function destroy(this: NativeReadable, error: any, cb: () => void) {
  const ptr = this.__intrinsic__bunNativePtr;
  if (ptr) {
    ptr.cancel(error);
  }
  if (cb) {
    process.nextTick(cb);
  }
}

function ref(this: NativeReadable) {
  const ptr = this.__intrinsic__bunNativePtr;
  if (ptr === undefined) return;
  if (this[kRefCount]++ === 0) {
    ptr.updateRef(true);
  }
}

function unref(this: NativeReadable) {
  const ptr = this.__intrinsic__bunNativePtr;
  if (ptr === undefined) return;
  if (this[kRefCount]-- === 1) {
    ptr.updateRef(false);
  }
}

$ = { constructNativeReadable };
;$$EXPORT$$($).$$EXPORT_END$$;
