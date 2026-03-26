// @bun
// build/debug/tmp_modules/internal/stream.ts
var $;
var ObjectKeys = Object.keys;
var ObjectDefineProperty = Object.defineProperty;
var customPromisify = Symbol.for("nodejs.util.promisify.custom");
var { streamReturningOperators, promiseReturningOperators } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 52) || __intrinsic__createInternalModuleById(52);
var compose = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 42) || __intrinsic__createInternalModuleById(42);
var { setDefaultHighWaterMark, getDefaultHighWaterMark } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 56) || __intrinsic__createInternalModuleById(56);
var { pipeline } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 54) || __intrinsic__createInternalModuleById(54);
var { destroyer } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 43) || __intrinsic__createInternalModuleById(43);
var eos = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 47) || __intrinsic__createInternalModuleById(47);
var promises = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 39) || __intrinsic__createInternalModuleById(39);
var utils = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 58) || __intrinsic__createInternalModuleById(58);
var { isArrayBufferView, isUint8Array } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 144) || __intrinsic__createInternalModuleById(144);
var Stream = (__intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 50) || __intrinsic__createInternalModuleById(50)).Stream;
Stream.isDestroyed = utils.isDestroyed;
Stream.isDisturbed = utils.isDisturbed;
Stream.isErrored = utils.isErrored;
Stream.isReadable = utils.isReadable;
Stream.isWritable = utils.isWritable;
Stream.Readable = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 55) || __intrinsic__createInternalModuleById(55);
var streamKeys = ObjectKeys(streamReturningOperators);
for (let i = 0;i < streamKeys.length; i++) {
  let fn2 = function(...args) {
    if (new.target) {
      throw __intrinsic__makeErrorWithCode(114);
    }
    return Stream.Readable.from(op.__intrinsic__apply(this, args));
  };
  fn = fn2;
  const key = streamKeys[i];
  const op = streamReturningOperators[key];
  ObjectDefineProperty(fn2, "name", { __proto__: null, value: op.name });
  ObjectDefineProperty(fn2, "length", { __proto__: null, value: op.length });
  ObjectDefineProperty(Stream.Readable.prototype, key, {
    __proto__: null,
    value: fn2,
    enumerable: false,
    configurable: true,
    writable: true
  });
}
var fn;
var promiseKeys = ObjectKeys(promiseReturningOperators);
for (let i = 0;i < promiseKeys.length; i++) {
  let fn2 = function(...args) {
    if (new.target) {
      throw __intrinsic__makeErrorWithCode(114);
    }
    return __intrinsic__Promise.__intrinsic__resolve().then(() => op.__intrinsic__apply(this, args));
  };
  fn = fn2;
  const key = promiseKeys[i];
  const op = promiseReturningOperators[key];
  ObjectDefineProperty(fn2, "name", { __proto__: null, value: op.name });
  ObjectDefineProperty(fn2, "length", { __proto__: null, value: op.length });
  ObjectDefineProperty(Stream.Readable.prototype, key, {
    __proto__: null,
    value: fn2,
    enumerable: false,
    configurable: true,
    writable: true
  });
}
var fn;
Stream.Writable = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 59) || __intrinsic__createInternalModuleById(59);
Stream.Duplex = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 44) || __intrinsic__createInternalModuleById(44);
Stream.Transform = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 57) || __intrinsic__createInternalModuleById(57);
Stream.PassThrough = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 53) || __intrinsic__createInternalModuleById(53);
Stream.duplexPair = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 46) || __intrinsic__createInternalModuleById(46);
Stream.pipeline = pipeline;
var { addAbortSignal } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 41) || __intrinsic__createInternalModuleById(41);
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
  }
});
ObjectDefineProperty(pipeline, customPromisify, {
  __proto__: null,
  enumerable: true,
  get() {
    return promises.pipeline;
  }
});
ObjectDefineProperty(eos, customPromisify, {
  __proto__: null,
  enumerable: true,
  get() {
    return promises.finished;
  }
});
Stream.Stream = Stream;
Stream._isArrayBufferView = isArrayBufferView;
Stream._isUint8Array = isUint8Array;
Stream._uint8ArrayToBuffer = function _uint8ArrayToBuffer(chunk) {
  return new __intrinsic__Buffer(chunk.buffer, chunk.byteOffset, chunk.byteLength);
};
$ = Stream;
$$EXPORT$$($).$$EXPORT_END$$;
