// @bun
// build/debug/tmp_modules/internal/streams/duplex.ts
var $;
var Stream = (__intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 50) || __intrinsic__createInternalModuleById(50)).Stream;
var Readable = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 55) || __intrinsic__createInternalModuleById(55);
var Writable = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 59) || __intrinsic__createInternalModuleById(59);
var { addAbortSignal } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 41) || __intrinsic__createInternalModuleById(41);
var destroyImpl = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 43) || __intrinsic__createInternalModuleById(43);
var { kOnConstructed } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 58) || __intrinsic__createInternalModuleById(58);
var ObjectKeys = Object.keys;
var ObjectDefineProperties = Object.defineProperties;
var ObjectGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
function Duplex(options) {
  if (!(this instanceof Duplex))
    return new Duplex(options);
  this._events ??= {
    close: __intrinsic__undefined,
    error: __intrinsic__undefined,
    prefinish: __intrinsic__undefined,
    finish: __intrinsic__undefined,
    drain: __intrinsic__undefined,
    data: __intrinsic__undefined,
    end: __intrinsic__undefined,
    readable: __intrinsic__undefined
  };
  this._readableState = new Readable.ReadableState(options, this, true);
  this._writableState = new Writable.WritableState(options, this, true);
  if (options) {
    this.allowHalfOpen = options.allowHalfOpen !== false;
    if (options.readable === false) {
      this._readableState.readable = false;
      this._readableState.ended = true;
      this._readableState.endEmitted = true;
    }
    if (options.writable === false) {
      this._writableState.writable = false;
      this._writableState.ending = true;
      this._writableState.ended = true;
      this._writableState.finished = true;
    }
    if (typeof options.read === "function")
      this._read = options.read;
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
  } else {
    this.allowHalfOpen = true;
  }
  Stream.__intrinsic__call(this, options);
  if (this._construct != null) {
    destroyImpl.construct(this, () => {
      this._readableState[kOnConstructed](this);
      this._writableState[kOnConstructed](this);
    });
  }
}
__intrinsic__toClass(Duplex, "Duplex", Readable);
Duplex.prototype.destroy = Writable.prototype.destroy;
{
  const keys = ObjectKeys(Writable.prototype);
  for (let i = 0;i < keys.length; i++) {
    const method = keys[i];
    Duplex.prototype[method] ||= Writable.prototype[method];
  }
}
ObjectDefineProperties(Duplex.prototype, {
  writable: { __proto__: null, ...ObjectGetOwnPropertyDescriptor(Writable.prototype, "writable") },
  writableHighWaterMark: {
    __proto__: null,
    ...ObjectGetOwnPropertyDescriptor(Writable.prototype, "writableHighWaterMark")
  },
  writableObjectMode: { __proto__: null, ...ObjectGetOwnPropertyDescriptor(Writable.prototype, "writableObjectMode") },
  writableBuffer: { __proto__: null, ...ObjectGetOwnPropertyDescriptor(Writable.prototype, "writableBuffer") },
  writableLength: { __proto__: null, ...ObjectGetOwnPropertyDescriptor(Writable.prototype, "writableLength") },
  writableFinished: { __proto__: null, ...ObjectGetOwnPropertyDescriptor(Writable.prototype, "writableFinished") },
  writableCorked: { __proto__: null, ...ObjectGetOwnPropertyDescriptor(Writable.prototype, "writableCorked") },
  writableEnded: { __proto__: null, ...ObjectGetOwnPropertyDescriptor(Writable.prototype, "writableEnded") },
  writableNeedDrain: { __proto__: null, ...ObjectGetOwnPropertyDescriptor(Writable.prototype, "writableNeedDrain") },
  destroyed: {
    __proto__: null,
    get() {
      if (this._readableState === __intrinsic__undefined || this._writableState === __intrinsic__undefined) {
        return false;
      }
      return this._readableState.destroyed && this._writableState.destroyed;
    },
    set(value) {
      if (this._readableState && this._writableState) {
        this._readableState.destroyed = value;
        this._writableState.destroyed = value;
      }
    }
  }
});
var webStreamsAdapters;
function lazyWebStreams() {
  if (webStreamsAdapters === __intrinsic__undefined)
    webStreamsAdapters = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 69) || __intrinsic__createInternalModuleById(69);
  return webStreamsAdapters;
}
Duplex.fromWeb = function(pair, options) {
  return lazyWebStreams().newStreamDuplexFromReadableWritablePair(pair, options);
};
Duplex.toWeb = function(duplex) {
  return lazyWebStreams().newReadableWritablePairFromDuplex(duplex);
};
var duplexify;
Duplex.from = function(body) {
  duplexify ??= __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 45) || __intrinsic__createInternalModuleById(45);
  return duplexify(body, "body");
};
$ = Duplex;
$$EXPORT$$($).$$EXPORT_END$$;
