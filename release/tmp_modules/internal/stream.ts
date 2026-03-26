// @ts-nocheck
var $;// GENERATED TEMP FILE - DO NOT EDIT
// Sourced from src/js/internal/stream.ts


"use strict";

const ObjectKeys = Object.keys;
const ObjectDefineProperty = Object.defineProperty;

const customPromisify = Symbol.for("nodejs.util.promisify.custom");
const { streamReturningOperators, promiseReturningOperators } = (__intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 52/*internal/streams/operators*/) || __intrinsic__createInternalModuleById(52/*internal/streams/operators*/));
const compose = (__intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 42/*internal/streams/compose*/) || __intrinsic__createInternalModuleById(42/*internal/streams/compose*/));
const { setDefaultHighWaterMark, getDefaultHighWaterMark } = (__intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 56/*internal/streams/state*/) || __intrinsic__createInternalModuleById(56/*internal/streams/state*/));
const { pipeline } = (__intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 54/*internal/streams/pipeline*/) || __intrinsic__createInternalModuleById(54/*internal/streams/pipeline*/));
const { destroyer } = (__intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 43/*internal/streams/destroy*/) || __intrinsic__createInternalModuleById(43/*internal/streams/destroy*/));
const eos = (__intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 47/*internal/streams/end-of-stream*/) || __intrinsic__createInternalModuleById(47/*internal/streams/end-of-stream*/));
const promises = (__intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 39/*internal/stream.promises.ts*/) || __intrinsic__createInternalModuleById(39/*internal/stream.promises.ts*/));
const utils = (__intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 58/*internal/streams/utils*/) || __intrinsic__createInternalModuleById(58/*internal/streams/utils*/));
const { isArrayBufferView, isUint8Array } = (__intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 144/*node:util/types*/) || __intrinsic__createInternalModuleById(144/*node:util/types*/));
const Stream = (__intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 50/*internal/streams/legacy*/) || __intrinsic__createInternalModuleById(50/*internal/streams/legacy*/)).Stream;

Stream.isDestroyed = utils.isDestroyed;
Stream.isDisturbed = utils.isDisturbed;
Stream.isErrored = utils.isErrored;
Stream.isReadable = utils.isReadable;
Stream.isWritable = utils.isWritable;

Stream.Readable = (__intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 55/*internal/streams/readable*/) || __intrinsic__createInternalModuleById(55/*internal/streams/readable*/));
const streamKeys = ObjectKeys(streamReturningOperators);
for (let i = 0; i < streamKeys.length; i++) {
  const key = streamKeys[i];
  const op = streamReturningOperators[key];
  function fn(...args) {
    if (new.target) {
      throw __intrinsic__makeErrorWithCode(114, );
    }
    return Stream.Readable.from(op.__intrinsic__apply(this, args));
  }
  ObjectDefineProperty(fn, "name", { __proto__: null, value: op.name });
  ObjectDefineProperty(fn, "length", { __proto__: null, value: op.length });
  ObjectDefineProperty(Stream.Readable.prototype, key, {
    __proto__: null,
    value: fn,
    enumerable: false,
    configurable: true,
    writable: true,
  });
}
const promiseKeys = ObjectKeys(promiseReturningOperators);
for (let i = 0; i < promiseKeys.length; i++) {
  const key = promiseKeys[i];
  const op = promiseReturningOperators[key];
  function fn(...args) {
    if (new.target) {
      throw __intrinsic__makeErrorWithCode(114, );
    }
    return Promise.__intrinsic__resolve().then(() => op.__intrinsic__apply(this, args));
  }
  ObjectDefineProperty(fn, "name", { __proto__: null, value: op.name });
  ObjectDefineProperty(fn, "length", { __proto__: null, value: op.length });
  ObjectDefineProperty(Stream.Readable.prototype, key, {
    __proto__: null,
    value: fn,
    enumerable: false,
    configurable: true,
    writable: true,
  });
}
Stream.Writable = (__intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 59/*internal/streams/writable*/) || __intrinsic__createInternalModuleById(59/*internal/streams/writable*/));
Stream.Duplex = (__intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 44/*internal/streams/duplex*/) || __intrinsic__createInternalModuleById(44/*internal/streams/duplex*/));
Stream.Transform = (__intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 57/*internal/streams/transform*/) || __intrinsic__createInternalModuleById(57/*internal/streams/transform*/));
Stream.PassThrough = (__intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 53/*internal/streams/passthrough*/) || __intrinsic__createInternalModuleById(53/*internal/streams/passthrough*/));
Stream.duplexPair = (__intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 46/*internal/streams/duplexpair*/) || __intrinsic__createInternalModuleById(46/*internal/streams/duplexpair*/));
Stream.pipeline = pipeline;
const { addAbortSignal } = (__intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 41/*internal/streams/add-abort-signal*/) || __intrinsic__createInternalModuleById(41/*internal/streams/add-abort-signal*/));
Stream.addAbortSignal = addAbortSignal;
Stream.finished = eos;
Stream.destroy = destroyer;
Stream.compose = compose;
Stream.setDefaultHighWaterMark = setDefaultHighWaterMark;
Stream.getDefaultHighWaterMark = getDefaultHighWaterMark;

ObjectDefineProperty(Stream, "promises", {
  __proto__: null,
  configurable: true,
  enumerable: true,
  get() {
    return promises;
  },
});

ObjectDefineProperty(pipeline, customPromisify, {
  __proto__: null,
  enumerable: true,
  get() {
    return promises.pipeline;
  },
});

ObjectDefineProperty(eos, customPromisify, {
  __proto__: null,
  enumerable: true,
  get() {
    return promises.finished;
  },
});

// Backwards-compat with node 0.4.x
Stream.Stream = Stream;

Stream._isArrayBufferView = isArrayBufferView;
Stream._isUint8Array = isUint8Array;
Stream._uint8ArrayToBuffer = function _uint8ArrayToBuffer(chunk) {
  return new __intrinsic__Buffer(chunk.buffer, chunk.byteOffset, chunk.byteLength);
};

$ = Stream;
;$$EXPORT$$($).$$EXPORT_END$$;
