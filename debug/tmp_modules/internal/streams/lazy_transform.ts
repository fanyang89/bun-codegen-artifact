// @ts-nocheck
var $;// GENERATED TEMP FILE - DO NOT EDIT
// Sourced from src/js/internal/streams/lazy_transform.ts


// LazyTransform is a special type of Transform stream that is lazily loaded.
// This is used for performance with bi-API-ship: when two APIs are available
// for the stream, one conventional and one non-conventional.
"use strict";

const Transform = (__intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 57/*internal/streams/transform*/) || __intrinsic__createInternalModuleById(57/*internal/streams/transform*/));

const ObjectDefineProperty = Object.defineProperty;
const ObjectDefineProperties = Object.defineProperties;

function LazyTransform(options) {
  this._options = options;
}
__intrinsic__toClass(LazyTransform, "LazyTransform", Transform);

function makeGetter(name) {
  return function () {
    Transform.__intrinsic__call(this, this._options);
    this._writableState.decodeStrings = false;
    return this[name];
  };
}

function makeSetter(name) {
  return function (val) {
    ObjectDefineProperty(this, name, {
      __proto__: null,
      value: val,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  };
}

ObjectDefineProperties(LazyTransform.prototype, {
  _readableState: {
    __proto__: null,
    get: makeGetter("_readableState"),
    set: makeSetter("_readableState"),
    configurable: true,
    enumerable: true,
  },
  _writableState: {
    __proto__: null,
    get: makeGetter("_writableState"),
    set: makeSetter("_writableState"),
    configurable: true,
    enumerable: true,
  },
});

$ = LazyTransform;
;$$EXPORT$$($).$$EXPORT_END$$;
