// @bun
// build/release/tmp_modules/internal/primordials.ts
var $, ObjectSetPrototypeOf = Object.setPrototypeOf, ObjectFreeze = Object.freeze, createSafeIterator = (factory, next_) => {
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
  return ObjectSetPrototypeOf(SafeIterator.prototype, null), ObjectFreeze(SafeIterator.prototype), ObjectFreeze(SafeIterator), SafeIterator;
}, FunctionPrototypeCall = __intrinsic__getByIdDirect(Function.prototype, "call");
function getGetter(cls, getter) {
  return FunctionPrototypeCall.bind(cls.prototype.__lookupGetter__(getter));
}
function uncurryThis(func) {
  return FunctionPrototypeCall.bind(func);
}
var copyProps = (src, dest) => {
  ArrayPrototypeForEach(Reflect.ownKeys(src), (key) => {
    if (!Reflect.getOwnPropertyDescriptor(dest, key))
      Reflect.defineProperty(dest, key, Reflect.getOwnPropertyDescriptor(src, key));
  });
}, makeSafe = (unsafe, safe) => {
  if (Symbol.iterator in unsafe.prototype) {
    let dummy = new unsafe, next;
    ArrayPrototypeForEach(Reflect.ownKeys(unsafe.prototype), (key) => {
      if (!Reflect.getOwnPropertyDescriptor(safe.prototype, key)) {
        let desc = Reflect.getOwnPropertyDescriptor(unsafe.prototype, key);
        if (typeof desc.value === "function" && desc.value.length === 0) {
          let called = desc.value.__intrinsic__call(dummy) || {};
          if (Symbol.iterator in (typeof called === "object" ? called : {})) {
            let createIterator = uncurryThis(desc.value);
            next ??= uncurryThis(createIterator(dummy).next);
            let SafeIterator = createSafeIterator(createIterator, next);
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
  return copyProps(unsafe, safe), Object.setPrototypeOf(safe.prototype, null), Object.freeze(safe.prototype), Object.freeze(safe), safe;
}, StringIterator = uncurryThis(__intrinsic__String.prototype[Symbol.iterator]), StringIteratorPrototype = Reflect.getPrototypeOf(StringIterator("")), ArrayPrototypeForEach = uncurryThis(__intrinsic__Array.prototype.forEach), ArrayPrototypeSymbolIterator = uncurryThis(__intrinsic__Array.prototype[Symbol.iterator]), ArrayIteratorPrototypeNext = uncurryThis(__intrinsic__Array.prototype[Symbol.iterator]().next), SafeArrayIterator = createSafeIterator(ArrayPrototypeSymbolIterator, ArrayIteratorPrototypeNext), ArrayPrototypeMap = __intrinsic__Array.prototype.map, PromisePrototypeThen = __intrinsic__Promise.prototype.__intrinsic__then, arrayToSafePromiseIterable = (promises, mapFn) => new SafeArrayIterator(ArrayPrototypeMap.__intrinsic__call(promises, (promise, i) => new __intrinsic__Promise((a, b) => PromisePrototypeThen.__intrinsic__call(mapFn == null ? promise : mapFn(promise, i), a, b)))), PromiseAll = __intrinsic__Promise.all, PromiseResolve = __intrinsic__Promise.__intrinsic__resolve.bind(__intrinsic__Promise), SafePromiseAll = (promises, mapFn) => PromiseAll(arrayToSafePromiseIterable(promises, mapFn)), SafePromiseAllReturnArrayLike = (promises, mapFn) => new __intrinsic__Promise((resolve, reject) => {
  let { length } = promises, returnVal = __intrinsic__Array(length);
  if (ObjectSetPrototypeOf(returnVal, null), length === 0)
    resolve(returnVal);
  let pendingPromises = length;
  for (let i = 0;i < length; i++) {
    let promise = mapFn != null ? mapFn(promises[i], i) : promises[i];
    PromisePrototypeThen.__intrinsic__call(PromiseResolve(promise), (result) => {
      if (returnVal[i] = result, --pendingPromises === 0)
        resolve(returnVal);
    }, reject);
  }
});
$ = {
  Array: __intrinsic__Array,
  SafeArrayIterator,
  MapPrototypeGetSize: getGetter(Map, "size"),
  Number,
  Object,
  RegExp: __intrinsic__RegExp,
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
  String: __intrinsic__String,
  TypedArrayPrototypeGetLength: getGetter(__intrinsic__Uint8Array, "length"),
  TypedArrayPrototypeGetSymbolToStringTag: getGetter(__intrinsic__Uint8Array, Symbol.toStringTag),
  Uint8ClampedArray,
  Uint8Array: __intrinsic__Uint8Array,
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
$$EXPORT$$($).$$EXPORT_END$$;
