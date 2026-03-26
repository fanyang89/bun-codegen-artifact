(function (){"use strict";// build/debug/tmp_modules/internal/streams/from.ts
var $;
var SymbolIterator = Symbol.iterator;
var SymbolAsyncIterator = Symbol.asyncIterator;
var PromisePrototypeThen = @Promise.prototype.@then;
function from(Readable, iterable, opts) {
  let iterator;
  if (typeof iterable === "string" || iterable instanceof @Buffer) {
    return new Readable({
      objectMode: true,
      ...opts,
      read() {
        this.push(iterable);
        this.push(null);
      }
    });
  }
  let isAsync;
  if (iterable?.[SymbolAsyncIterator]) {
    isAsync = true;
    iterator = iterable[SymbolAsyncIterator]();
  } else if (iterable?.[SymbolIterator]) {
    isAsync = false;
    iterator = iterable[SymbolIterator]();
  } else {
    throw @makeErrorWithCode(118, "iterable", ["Iterable"], iterable);
  }
  const readable = new Readable({
    objectMode: true,
    highWaterMark: 1,
    ...opts
  });
  let reading = false;
  let isAsyncValues = false;
  readable._read = function() {
    if (!reading) {
      reading = true;
      if (isAsync) {
        nextAsync();
      } else if (isAsyncValues) {
        nextSyncWithAsyncValues();
      } else {
        nextSyncWithSyncValues();
      }
    }
  };
  readable._destroy = function(error, cb) {
    PromisePrototypeThen.@call(close(error), @isCallable(cb) ? () => process.nextTick(cb, error) : () => {}, @isCallable(cb) ? (e) => process.nextTick(cb, e || error) : () => {});
  };
  async function close(error) {
    const hadError = error !== @undefined && error !== null;
    const hasThrow = typeof iterator.throw === "function";
    if (hadError && hasThrow) {
      const { value, done } = await iterator.throw(error);
      await value;
      if (done) {
        return;
      }
    }
    if (typeof iterator.return === "function") {
      const { value } = await iterator.return();
      await value;
    }
  }
  function nextSyncWithSyncValues() {
    for (;; ) {
      try {
        const { value, done } = iterator.next();
        if (done) {
          readable.push(null);
          return;
        }
        if (value && typeof value.then === "function") {
          return changeToAsyncValues(value);
        }
        if (value === null) {
          reading = false;
          throw @makeErrorWithCode(229);
        }
        if (readable.push(value)) {
          continue;
        }
        reading = false;
      } catch (err) {
        readable.destroy(err);
      }
      break;
    }
  }
  async function changeToAsyncValues(value) {
    isAsyncValues = true;
    try {
      const res = await value;
      if (res === null) {
        reading = false;
        throw @makeErrorWithCode(229);
      }
      if (readable.push(res)) {
        nextSyncWithAsyncValues();
        return;
      }
      reading = false;
    } catch (err) {
      readable.destroy(err);
    }
  }
  async function nextSyncWithAsyncValues() {
    for (;; ) {
      try {
        const { value, done } = iterator.next();
        if (done) {
          readable.push(null);
          return;
        }
        const res = value && typeof value.then === "function" ? await value : value;
        if (res === null) {
          reading = false;
          throw @makeErrorWithCode(229);
        }
        if (readable.push(res)) {
          continue;
        }
        reading = false;
      } catch (err) {
        readable.destroy(err);
      }
      break;
    }
  }
  async function nextAsync() {
    for (;; ) {
      try {
        const { value, done } = await iterator.next();
        if (done) {
          readable.push(null);
          return;
        }
        if (value === null) {
          reading = false;
          throw @makeErrorWithCode(229);
        }
        if (readable.push(value)) {
          continue;
        }
        reading = false;
      } catch (err) {
        readable.destroy(err);
      }
      break;
    }
  }
  return readable;
}
$ = from;
return $})
