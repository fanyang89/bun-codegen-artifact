(function (){"use strict";// build/debug/tmp_modules/internal/primordials.ts
var $;
var ObjectSetPrototypeOf = Object.setPrototypeOf;
var ObjectFreeze = Object.freeze;
var createSafeIterator = (factory, next_) => {

  class SafeIterator {
    constructor(iterable) {
      this._iterator = factory(iterable);
    }
    next() {
      return next_(this._iterator);
    }
    [Symbol.iterator]() {
      return this;
    }
  }
  ObjectSetPrototypeOf(SafeIterator.prototype, null);
  ObjectFreeze(SafeIterator.prototype);
  ObjectFreeze(SafeIterator);
  return SafeIterator;
};
var FunctionPrototypeCall = @getByIdDirect(Function.prototype, "call");
function getGetter(cls, getter) {
  return FunctionPrototypeCall.bind(cls.prototype.__lookupGetter__(getter));
}
function uncurryThis(func) {
  return FunctionPrototypeCall.bind(func);
}
var copyProps = (src, dest) => {
  ArrayPrototypeForEach(Reflect.ownKeys(src), (key) => {
    if (!Reflect.getOwnPropertyDescriptor(dest, key)) {
      Reflect.defineProperty(dest, key, Reflect.getOwnPropertyDescriptor(src, key));
    }
  });
};
var makeSafe = (unsafe, safe) => {
  if (Symbol.iterator in unsafe.prototype) {
    const dummy = new unsafe;
    let next;
    ArrayPrototypeForEach(Reflect.ownKeys(unsafe.prototype), (key) => {
      if (!Reflect.getOwnPropertyDescriptor(safe.prototype, key)) {
        const desc = Reflect.getOwnPropertyDescriptor(unsafe.prototype, key);
        if (typeof desc.value === "function" && desc.value.length === 0) {
          const called = desc.value.@call(dummy) || {};
          if (Symbol.iterator in (typeof called === "object" ? called : {})) {
            const createIterator = uncurryThis(desc.value);
            next ??= uncurryThis(createIterator(dummy).next);
            const SafeIterator = createSafeIterator(createIterator, next);
            desc.value = function() {
              return new SafeIterator(this);
            };
          }
        }
        Reflect.defineProperty(safe.prototype, key, desc);
      }
    });
  } else
    copyProps(unsafe.prototype, safe.prototype);
  copyProps(unsafe, safe);
  Object.setPrototypeOf(safe.prototype, null);
  Object.freeze(safe.prototype);
  Object.freeze(safe);
  return safe;
};
var StringIterator = uncurryThis(@String.prototype[Symbol.iterator]);
var StringIteratorPrototype = Reflect.getPrototypeOf(StringIterator(""));
var ArrayPrototypeForEach = uncurryThis(@Array.prototype.forEach);
var ArrayPrototypeSymbolIterator = uncurryThis(@Array.prototype[Symbol.iterator]);
var ArrayIteratorPrototypeNext = uncurryThis(@Array.prototype[Symbol.iterator]().next);
var SafeArrayIterator = createSafeIterator(ArrayPrototypeSymbolIterator, ArrayIteratorPrototypeNext);
var ArrayPrototypeMap = @Array.prototype.map;
var PromisePrototypeThen = @Promise.prototype.@then;
var arrayToSafePromiseIterable = (promises, mapFn) => new SafeArrayIterator(ArrayPrototypeMap.@call(promises, (promise, i) => new @Promise((a, b) => PromisePrototypeThen.@call(mapFn == null ? promise : mapFn(promise, i), a, b))));
var PromiseAll = @Promise.all;
var PromiseResolve = @Promise.@resolve.bind(@Promise);
var SafePromiseAll = (promises, mapFn) => PromiseAll(arrayToSafePromiseIterable(promises, mapFn));
var SafePromiseAllReturnArrayLike = (promises, mapFn) => new @Promise((resolve, reject) => {
  const { length } = promises;
  const returnVal = @Array(length);
  ObjectSetPrototypeOf(returnVal, null);
  if (length === 0)
    resolve(returnVal);
  let pendingPromises = length;
  for (let i = 0;i < length; i++) {
    const promise = mapFn != null ? mapFn(promises[i], i) : promises[i];
    PromisePrototypeThen.@call(PromiseResolve(promise), (result) => {
      returnVal[i] = result;
      if (--pendingPromises === 0)
        resolve(returnVal);
    }, reject);
  }
});
$ = {
  Array: @Array,
  SafeArrayIterator,
  MapPrototypeGetSize: getGetter(Map, "size"),
  Number,
  Object,
  RegExp: @RegExp,
  SafeStringIterator: createSafeIterator(StringIterator, uncurryThis(StringIteratorPrototype.next)),
  SafeMap: makeSafe(Map, class SafeMap extends Map {
    constructor(i) {
      super(i);
    }
  }),
  SafePromiseAll,
  SafePromiseAllReturnArrayLike,
  SafeSet: makeSafe(Set, class SafeSet extends Set {
    constructor(i) {
      super(i);
    }
  }),
  SafeWeakSet: makeSafe(WeakSet, class SafeWeakSet extends WeakSet {
    constructor(i) {
      super(i);
    }
  }),
  SafeWeakMap: makeSafe(WeakMap, class SafeWeakMap extends WeakMap {
    constructor(i) {
      super(i);
    }
  }),
  SetPrototypeGetSize: getGetter(Set, "size"),
  String: @String,
  TypedArrayPrototypeGetLength: getGetter(@Uint8Array, "length"),
  TypedArrayPrototypeGetSymbolToStringTag: getGetter(@Uint8Array, Symbol.toStringTag),
  Uint8ClampedArray,
  Uint8Array: @Uint8Array,
  Uint16Array,
  Uint32Array,
  Int8Array,
  Int16Array,
  Int32Array,
  Float16Array,
  Float32Array,
  Float64Array,
  BigUint64Array,
  BigInt64Array,
  uncurryThis
};
return $})
