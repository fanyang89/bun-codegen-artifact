// @bun
// build/release/tmp_modules/internal/streams/operators.ts
var $, { validateAbortSignal, validateInteger, validateObject } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 68) || __intrinsic__createInternalModuleById(68), { kWeakHandler, kResistStopPropagation } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 32) || __intrinsic__createInternalModuleById(32), { finished } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 47) || __intrinsic__createInternalModuleById(47), staticCompose = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 42) || __intrinsic__createInternalModuleById(42), { addAbortSignalNoValidate } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 41) || __intrinsic__createInternalModuleById(41), { isWritable, isNodeStream } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 58) || __intrinsic__createInternalModuleById(58), MathFloor = Math.floor, PromiseResolve = __intrinsic__Promise.__intrinsic__resolve.bind(__intrinsic__Promise), PromiseReject = __intrinsic__Promise.__intrinsic__reject.bind(__intrinsic__Promise), PromisePrototypeThen = __intrinsic__Promise.prototype.__intrinsic__then, ArrayPrototypePush = __intrinsic__Array.prototype.push, NumberIsNaN = Number.isNaN, ObjectDefineProperty = Object.defineProperty, kEmpty = Symbol("kEmpty"), kEof = Symbol("kEof");
function compose(stream, options) {
  if (options != null)
    validateObject(options, "options");
  if (options?.signal != null)
    validateAbortSignal(options.signal, "options.signal");
  if (isNodeStream(stream) && !isWritable(stream))
    throw __intrinsic__makeErrorWithCode(119, "stream", stream, "must be writable");
  let composedStream = staticCompose(this, stream);
  if (options?.signal)
    addAbortSignalNoValidate(options.signal, composedStream);
  return composedStream;
}
function map(fn, options) {
  if (typeof fn !== "function")
    throw __intrinsic__makeErrorWithCode(118, "fn", ["Function", "AsyncFunction"], fn);
  if (options != null)
    validateObject(options, "options");
  if (options?.signal != null)
    validateAbortSignal(options.signal, "options.signal");
  let concurrency = 1;
  if (options?.concurrency != null)
    concurrency = MathFloor(options.concurrency);
  let highWaterMark = concurrency - 1;
  if (options?.highWaterMark != null)
    highWaterMark = MathFloor(options.highWaterMark);
  return validateInteger(concurrency, "options.concurrency", 1), validateInteger(highWaterMark, "options.highWaterMark", 0), highWaterMark += concurrency, async function* map2() {
    let signal = __intrinsic__AbortSignal.any([options?.signal].filter(Boolean)), stream = this, queue = [], signalOpt = { signal }, next, resume, done = !1, cnt = 0;
    function onCatch() {
      done = !0, afterItemProcessed();
    }
    function afterItemProcessed() {
      cnt -= 1, maybeResume();
    }
    function maybeResume() {
      if (resume && !done && cnt < concurrency && queue.length < highWaterMark)
        resume(), resume = null;
    }
    async function pump() {
      try {
        for await (let val of stream) {
          if (done)
            return;
          if (signal.aborted)
            throw __intrinsic__makeAbortError();
          try {
            if (val = fn(val, signalOpt), val === kEmpty)
              continue;
            val = PromiseResolve(val);
          } catch (err) {
            val = PromiseReject(err);
          }
          if (cnt += 1, PromisePrototypeThen.__intrinsic__call(val, afterItemProcessed, onCatch), queue.push(val), next)
            next(), next = null;
          if (!done && (queue.length >= highWaterMark || cnt >= concurrency))
            await new __intrinsic__Promise((resolve) => {
              resume = resolve;
            });
        }
        queue.push(kEof);
      } catch (err) {
        let val = PromiseReject(err);
        PromisePrototypeThen.__intrinsic__call(val, afterItemProcessed, onCatch), queue.push(val);
      } finally {
        if (done = !0, next)
          next(), next = null;
      }
    }
    pump();
    try {
      while (!0) {
        while (queue.length > 0) {
          let val = await queue[0];
          if (val === kEof)
            return;
          if (signal.aborted)
            throw __intrinsic__makeAbortError();
          if (val !== kEmpty)
            yield val;
          queue.shift(), maybeResume();
        }
        await new __intrinsic__Promise((resolve) => {
          next = resolve;
        });
      }
    } finally {
      if (done = !0, resume)
        resume(), resume = null;
    }
  }.__intrinsic__call(this);
}
async function some(fn, options = __intrinsic__undefined) {
  for await (let unused of filter.__intrinsic__call(this, fn, options))
    return !0;
  return !1;
}
async function every(fn, options = __intrinsic__undefined) {
  if (typeof fn !== "function")
    throw __intrinsic__makeErrorWithCode(118, "fn", ["Function", "AsyncFunction"], fn);
  return !await some.__intrinsic__call(this, async (...args) => {
    return !await fn(...args);
  }, options);
}
async function find(fn, options) {
  for await (let result of filter.__intrinsic__call(this, fn, options))
    return result;
  return __intrinsic__undefined;
}
async function forEach(fn, options) {
  if (typeof fn !== "function")
    throw __intrinsic__makeErrorWithCode(118, "fn", ["Function", "AsyncFunction"], fn);
  async function forEachFn(value, options2) {
    return await fn(value, options2), kEmpty;
  }
  for await (let unused of map.__intrinsic__call(this, forEachFn, options))
    ;
}
function filter(fn, options) {
  if (typeof fn !== "function")
    throw __intrinsic__makeErrorWithCode(118, "fn", ["Function", "AsyncFunction"], fn);
  async function filterFn(value, options2) {
    if (await fn(value, options2))
      return value;
    return kEmpty;
  }
  return map.__intrinsic__call(this, filterFn, options);
}

class ReduceAwareErrMissingArgs extends TypeError {
  constructor() {
    super("reduce");
    this.code = "ERR_MISSING_ARGS", this.message = "Reduce of an empty stream requires an initial value";
  }
}
async function reduce(reducer, initialValue, options) {
  if (typeof reducer !== "function")
    throw __intrinsic__makeErrorWithCode(118, "reducer", ["Function", "AsyncFunction"], reducer);
  if (options != null)
    validateObject(options, "options");
  if (options?.signal != null)
    validateAbortSignal(options.signal, "options.signal");
  let hasInitialValue = arguments.length > 1;
  if (options?.signal?.aborted) {
    let err = __intrinsic__makeAbortError(__intrinsic__undefined, { cause: options.signal.reason });
    throw this.once("error", () => {}), await finished(this.destroy(err)), err;
  }
  let ac = new AbortController, signal = ac.signal;
  if (options?.signal) {
    let opts = { once: !0, [kWeakHandler]: this, [kResistStopPropagation]: !0 };
    options.signal.addEventListener("abort", () => ac.abort(), opts);
  }
  let gotAnyItemFromStream = !1;
  try {
    for await (let value of this) {
      if (gotAnyItemFromStream = !0, options?.signal?.aborted)
        throw __intrinsic__makeAbortError();
      if (!hasInitialValue)
        initialValue = value, hasInitialValue = !0;
      else
        initialValue = await reducer(initialValue, value, { signal });
    }
    if (!gotAnyItemFromStream && !hasInitialValue)
      throw new ReduceAwareErrMissingArgs;
  } finally {
    ac.abort();
  }
  return initialValue;
}
async function toArray(options) {
  if (options != null)
    validateObject(options, "options");
  if (options?.signal != null)
    validateAbortSignal(options.signal, "options.signal");
  let result = [];
  for await (let val of this) {
    if (options?.signal?.aborted)
      throw __intrinsic__makeAbortError(__intrinsic__undefined, { cause: options.signal.reason });
    ArrayPrototypePush.__intrinsic__call(result, val);
  }
  return result;
}
function flatMap(fn, options) {
  let values = map.__intrinsic__call(this, fn, options);
  async function* flatMapInner() {
    for await (let val of values)
      yield* val;
  }
  return flatMapInner.__intrinsic__call(this);
}
function toIntegerOrInfinity(number) {
  if (number = Number(number), NumberIsNaN(number))
    return 0;
  if (number < 0)
    throw __intrinsic__makeErrorWithCode(156, "number", ">= 0", number);
  return number;
}
function drop(number, options) {
  if (options != null)
    validateObject(options, "options");
  if (options?.signal != null)
    validateAbortSignal(options.signal, "options.signal");
  return number = toIntegerOrInfinity(number), async function* drop2() {
    if (options?.signal?.aborted)
      throw __intrinsic__makeAbortError();
    for await (let val of this) {
      if (options?.signal?.aborted)
        throw __intrinsic__makeAbortError();
      if (number-- <= 0)
        yield val;
    }
  }.__intrinsic__call(this);
}
ObjectDefineProperty(drop, "length", { value: 1 });
function take(number, options) {
  if (options != null)
    validateObject(options, "options");
  if (options?.signal != null)
    validateAbortSignal(options.signal, "options.signal");
  return number = toIntegerOrInfinity(number), async function* take2() {
    if (options?.signal?.aborted)
      throw __intrinsic__makeAbortError();
    for await (let val of this) {
      if (options?.signal?.aborted)
        throw __intrinsic__makeAbortError();
      if (number-- > 0)
        yield val;
      if (number <= 0)
        return;
    }
  }.__intrinsic__call(this);
}
ObjectDefineProperty(take, "length", { value: 1 });
$ = {
  streamReturningOperators: {
    drop,
    filter,
    flatMap,
    map,
    take,
    compose
  },
  promiseReturningOperators: {
    every,
    forEach,
    reduce,
    toArray,
    some,
    find
  }
};
$$EXPORT$$($).$$EXPORT_END$$;
