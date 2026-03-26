// @bun
// build/release/tmp_modules/internal/streams/lazy_transform.ts
var $, Transform = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 57) || __intrinsic__createInternalModuleById(57), ObjectDefineProperty = Object.defineProperty, ObjectDefineProperties = Object.defineProperties;
function LazyTransform(options) {
  this._options = options;
}
__intrinsic__toClass(LazyTransform, "LazyTransform", Transform);
function makeGetter(name) {
  return function() {
    return Transform.__intrinsic__call(this, this._options), this._writableState.decodeStrings = !1, this[name];
  };
}
function makeSetter(name) {
  return function(val) {
    ObjectDefineProperty(this, name, {
      __proto__: null,
      value: val,
      enumerable: !0,
      configurable: !0,
      writable: !0
    });
  };
}
ObjectDefineProperties(LazyTransform.prototype, {
  _readableState: {
    __proto__: null,
    get: makeGetter("_readableState"),
    set: makeSetter("_readableState"),
    configurable: !0,
    enumerable: !0
  },
  _writableState: {
    __proto__: null,
    get: makeGetter("_writableState"),
    set: makeSetter("_writableState"),
    configurable: !0,
    enumerable: !0
  }
});
$ = LazyTransform;
$$EXPORT$$($).$$EXPORT_END$$;
