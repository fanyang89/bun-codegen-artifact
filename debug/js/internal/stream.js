(function (){"use strict";// build/debug/tmp_modules/internal/stream.ts
var $;
var ObjectKeys = Object.keys;
var ObjectDefineProperty = Object.defineProperty;
var customPromisify = Symbol.for("nodejs.util.promisify.custom");
var { streamReturningOperators, promiseReturningOperators } = @getInternalField(@internalModuleRegistry, 52) || @createInternalModuleById(52);
var compose = @getInternalField(@internalModuleRegistry, 42) || @createInternalModuleById(42);
var { setDefaultHighWaterMark, getDefaultHighWaterMark } = @getInternalField(@internalModuleRegistry, 56) || @createInternalModuleById(56);
var { pipeline } = @getInternalField(@internalModuleRegistry, 54) || @createInternalModuleById(54);
var { destroyer } = @getInternalField(@internalModuleRegistry, 43) || @createInternalModuleById(43);
var eos = @getInternalField(@internalModuleRegistry, 47) || @createInternalModuleById(47);
var promises = @getInternalField(@internalModuleRegistry, 39) || @createInternalModuleById(39);
var utils = @getInternalField(@internalModuleRegistry, 58) || @createInternalModuleById(58);
var { isArrayBufferView, isUint8Array } = @getInternalField(@internalModuleRegistry, 144) || @createInternalModuleById(144);
var Stream = (@getInternalField(@internalModuleRegistry, 50) || @createInternalModuleById(50)).Stream;
Stream.isDestroyed = utils.isDestroyed;
Stream.isDisturbed = utils.isDisturbed;
Stream.isErrored = utils.isErrored;
Stream.isReadable = utils.isReadable;
Stream.isWritable = utils.isWritable;
Stream.Readable = @getInternalField(@internalModuleRegistry, 55) || @createInternalModuleById(55);
var streamKeys = ObjectKeys(streamReturningOperators);
for (let i = 0;i < streamKeys.length; i++) {
  let fn2 = function(...args) {
    if (new.target) {
      throw @makeErrorWithCode(114);
    }
    return Stream.Readable.from(op.@apply(this, args));
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
      throw @makeErrorWithCode(114);
    }
    return @Promise.@resolve().then(() => op.@apply(this, args));
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
Stream.Writable = @getInternalField(@internalModuleRegistry, 59) || @createInternalModuleById(59);
Stream.Duplex = @getInternalField(@internalModuleRegistry, 44) || @createInternalModuleById(44);
Stream.Transform = @getInternalField(@internalModuleRegistry, 57) || @createInternalModuleById(57);
Stream.PassThrough = @getInternalField(@internalModuleRegistry, 53) || @createInternalModuleById(53);
Stream.duplexPair = @getInternalField(@internalModuleRegistry, 46) || @createInternalModuleById(46);
Stream.pipeline = pipeline;
var { addAbortSignal } = @getInternalField(@internalModuleRegistry, 41) || @createInternalModuleById(41);
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
  return new @Buffer(chunk.buffer, chunk.byteOffset, chunk.byteLength);
};
$ = Stream;
return $})
