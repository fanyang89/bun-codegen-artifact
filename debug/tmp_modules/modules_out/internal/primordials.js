// @bun
// build/debug/tmp_modules/internal/primordials.ts
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
var FunctionPrototypeCall = __intrinsic__getByIdDirect(Function.prototype, "call");
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
          const called = desc.value.__intrinsic__call(dummy) || {};
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
var StringIterator = uncurryThis(__intrinsic__String.prototype[Symbol.iterator]);
var StringIteratorPrototype = Reflect.getPrototypeOf(StringIterator(""));
var ArrayPrototypeForEach = uncurryThis(__intrinsic__Array.prototype.forEach);
var ArrayPrototypeSymbolIterator = uncurryThis(__intrinsic__Array.prototype[Symbol.iterator]);
var ArrayIteratorPrototypeNext = uncurryThis(__intrinsic__Array.prototype[Symbol.iterator]().next);
var SafeArrayIterator = createSafeIterator(ArrayPrototypeSymbolIterator, ArrayIteratorPrototypeNext);
var ArrayPrototypeMap = __intrinsic__Array.prototype.map;
var PromisePrototypeThen = __intrinsic__Promise.prototype.__intrinsic__then;
var arrayToSafePromiseIterable = (promises, mapFn) => new SafeArrayIterator(ArrayPrototypeMap.__intrinsic__call(promises, (promise, i) => new __intrinsic__Promise((a, b) => PromisePrototypeThen.__intrinsic__call(mapFn == null ? promise : mapFn(promise, i), a, b))));
var PromiseAll = __intrinsic__Promise.all;
var PromiseResolve = __intrinsic__Promise.__intrinsic__resolve.bind(__intrinsic__Promise);
var SafePromiseAll = (promises, mapFn) => PromiseAll(arrayToSafePromiseIterable(promises, mapFn));
var SafePromiseAllReturnArrayLike = (promises, mapFn) => new __intrinsic__Promise((resolve, reject) => {
  const { length } = promises;
  const returnVal = __intrinsic__Array(length);
  ObjectSetPrototypeOf(returnVal, null);
  if (length === 0)
    resolve(returnVal);
  let pendingPromises = length;
  for (let i = 0;i < length; i++) {
    const promise = mapFn != null ? mapFn(promises[i], i) : promises[i];
    PromisePrototypeThen.__intrinsic__call(PromiseResolve(promise), (result) => {
      returnVal[i] = result;
      if (--pendingPromises === 0)
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
