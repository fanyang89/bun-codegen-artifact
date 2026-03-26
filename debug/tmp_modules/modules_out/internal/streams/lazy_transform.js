// @bun
// build/debug/tmp_modules/internal/streams/lazy_transform.ts
var $;
var Transform = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 57) || __intrinsic__createInternalModuleById(57);
var ObjectDefineProperty = Object.defineProperty;
var ObjectDefineProperties = Object.defineProperties;
function LazyTransform(options) {
  this._options = options;
}
__intrinsic__toClass(LazyTransform, "LazyTransform", Transform);
function makeGetter(name) {
  return function() {
    Transform.__intrinsic__call(this, this._options);
    this._writableState.decodeStrings = false;
    return this[name];
  };
}
function makeSetter(name) {
  return function(val) {
    ObjectDefineProperty(this, name, {
      __proto__: null,
      value: val,
      enumerable: true,
      configurable: true,
      writable: true
    });
  };
}
ObjectDefineProperties(LazyTransform.prototype, {
  _readableState: {
    __proto__: null,
    get: makeGetter("_readableState"),
    set: makeSetter("_readableState"),
    configurable: true,
    enumerable: true
  },
  _writableState: {
    __proto__: null,
    get: makeGetter("_writableState"),
    set: makeSetter("_writableState"),
    configurable: true,
    enumerable: true
  }
});
$ = LazyTransform;
$$EXPORT$$($).$$EXPORT_END$$;
