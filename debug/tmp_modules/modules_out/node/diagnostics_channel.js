// @bun
// build/debug/tmp_modules/node/diagnostics_channel.ts
var $;
var { validateFunction } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 68) || __intrinsic__createInternalModuleById(68);
var SafeMap = Map;
var SafeFinalizationRegistry = FinalizationRegistry;
var ArrayPrototypeAt = __intrinsic__Array.prototype.at;
var ArrayPrototypeIndexOf = __intrinsic__Array.prototype.indexOf;
var ArrayPrototypeSplice = __intrinsic__Array.prototype.splice;
var ObjectGetPrototypeOf = Object.getPrototypeOf;
var ObjectSetPrototypeOf = Object.setPrototypeOf;
var SymbolHasInstance = Symbol.hasInstance;
var PromiseResolve = __intrinsic__Promise.__intrinsic__resolve.bind(__intrinsic__Promise);
var PromiseReject = __intrinsic__Promise.__intrinsic__reject.bind(__intrinsic__Promise);
var PromisePrototypeThen = (promise, onFulfilled, onRejected) => promise.then(onFulfilled, onRejected);

class WeakReference extends WeakRef {
  #refs = 0;
  get() {
    return this.deref();
  }
  incRef() {
    return ++this.#refs;
  }
  decRef() {
    return --this.#refs;
  }
}

class WeakRefMap extends SafeMap {
  #finalizers = new SafeFinalizationRegistry((key) => {
    this.delete(key);
  });
  set(key, value) {
    this.#finalizers.register(value, key);
    return super.set(key, new WeakReference(value));
  }
  get(key) {
    return super.get(key)?.get();
  }
  incRef(key) {
    return super.get(key)?.incRef();
  }
  decRef(key) {
    return super.get(key)?.decRef();
  }
}
function markActive(channel) {
  ObjectSetPrototypeOf.__intrinsic__call(null, channel, ActiveChannel.prototype);
  channel._subscribers = [];
  channel._stores = new SafeMap;
}
function maybeMarkInactive(channel) {
  if (!channel._subscribers.length && !channel._stores.size) {
    ObjectSetPrototypeOf.__intrinsic__call(null, channel, Channel.prototype);
    channel._subscribers = __intrinsic__undefined;
    channel._stores = __intrinsic__undefined;
  }
}
function defaultTransform(data) {
  return data;
}
function wrapStoreRun(store, data, next, transform = defaultTransform) {
  return () => {
    let context;
    try {
      context = transform(data);
    } catch (err) {
      process.nextTick(() => reportError(err));
      return next();
    }
    return store.run(context, next);
  };
}

class ActiveChannel {
  _subscribers;
  name;
  _stores;
  subscribe(subscription) {
    validateFunction(subscription, "subscription");
    __intrinsic__arrayPush(this._subscribers, subscription);
    channels.incRef(this.name);
  }
  unsubscribe(subscription) {
    const index = ArrayPrototypeIndexOf.__intrinsic__call(this._subscribers, subscription);
    if (index === -1)
      return false;
    ArrayPrototypeSplice.__intrinsic__call(this._subscribers, index, 1);
    channels.decRef(this.name);
    maybeMarkInactive(this);
    return true;
  }
  bindStore(store, transform) {
    const replacing = this._stores.has(store);
    if (!replacing)
      channels.incRef(this.name);
    this._stores.set(store, transform);
  }
  unbindStore(store) {
    if (!this._stores.has(store)) {
      return false;
    }
    this._stores.delete(store);
    channels.decRef(this.name);
    maybeMarkInactive(this);
    return true;
  }
  get hasSubscribers() {
    return true;
  }
  publish(data) {
    for (let i = 0;i < (this._subscribers?.length || 0); i++) {
      try {
        const onMessage = this._subscribers[i];
        onMessage(data, this.name);
      } catch (err) {
        process.nextTick(() => reportError(err));
      }
    }
  }
  runStores(data, fn, thisArg, ...args) {
    let run = () => {
      this.publish(data);
      return fn.__intrinsic__apply(thisArg, args);
    };
    for (const entry of this._stores.entries()) {
      const store = entry[0];
      const transform = entry[1];
      run = wrapStoreRun(store, data, run, transform);
    }
    return run();
  }
}

class Channel {
  _subscribers;
  _stores;
  name;
  constructor(name) {
    this._subscribers = __intrinsic__undefined;
    this._stores = __intrinsic__undefined;
    this.name = name;
    channels.set(name, this);
  }
  static [SymbolHasInstance](instance) {
    const prototype = ObjectGetPrototypeOf.__intrinsic__call(null, instance);
    return prototype === Channel.prototype || prototype === ActiveChannel.prototype;
  }
  subscribe(subscription) {
    markActive(this);
    this.subscribe(subscription);
  }
  unsubscribe() {
    return false;
  }
  bindStore(store, transform) {
    markActive(this);
    this.bindStore(store, transform);
  }
  unbindStore() {
    return false;
  }
  get hasSubscribers() {
    return false;
  }
  publish() {}
  runStores(data, fn, thisArg, ...args) {
    return fn.__intrinsic__apply(thisArg, args);
  }
}
var channels = new WeakRefMap;
function channel(name) {
  const channel2 = channels.get(name);
  if (channel2)
    return channel2;
  if (typeof name !== "string" && typeof name !== "symbol") {
    throw __intrinsic__makeErrorWithCode(118, "channel", "string or symbol", name);
  }
  return new Channel(name);
}
function subscribe(name, subscription) {
  return channel(name).subscribe(subscription);
}
function unsubscribe(name, subscription) {
  return channel(name).unsubscribe(subscription);
}
function hasSubscribers(name) {
  const channel2 = channels.get(name);
  if (!channel2)
    return false;
  return channel2.hasSubscribers;
}
var traceEvents = ["start", "end", "asyncStart", "asyncEnd", "error"];
function assertChannel(value, name) {
  if (!(value instanceof Channel)) {
    throw __intrinsic__makeErrorWithCode(118, name, ["Channel"], value);
  }
}

class TracingChannel {
  start;
  end;
  asyncStart;
  asyncEnd;
  error;
  constructor(nameOrChannels) {
    if (typeof nameOrChannels === "string") {
      this.start = channel(`tracing:${nameOrChannels}:start`);
      this.end = channel(`tracing:${nameOrChannels}:end`);
      this.asyncStart = channel(`tracing:${nameOrChannels}:asyncStart`);
      this.asyncEnd = channel(`tracing:${nameOrChannels}:asyncEnd`);
      this.error = channel(`tracing:${nameOrChannels}:error`);
    } else if (typeof nameOrChannels === "object") {
      const { start, end, asyncStart, asyncEnd, error } = nameOrChannels;
      assertChannel(start, "nameOrChannels.start");
      assertChannel(end, "nameOrChannels.end");
      assertChannel(asyncStart, "nameOrChannels.asyncStart");
      assertChannel(asyncEnd, "nameOrChannels.asyncEnd");
      assertChannel(error, "nameOrChannels.error");
      this.start = start;
      this.end = end;
      this.asyncStart = asyncStart;
      this.asyncEnd = asyncEnd;
      this.error = error;
    } else {
      throw __intrinsic__makeErrorWithCode(118, "nameOrChannels", ["string, object, or Channel"], nameOrChannels);
    }
  }
  subscribe(handlers) {
    for (const name of traceEvents) {
      if (!handlers[name])
        continue;
      this[name]?.subscribe(handlers[name]);
    }
  }
  unsubscribe(handlers) {
    let done = true;
    for (const name of traceEvents) {
      if (!handlers[name])
        continue;
      if (!this[name]?.unsubscribe(handlers[name])) {
        done = false;
      }
    }
    return done;
  }
  traceSync(fn, context = {}, thisArg, ...args) {
    const { start, end, error } = this;
    return start.runStores(context, () => {
      try {
        const result = fn.__intrinsic__apply(thisArg, args);
        context.result = result;
        return result;
      } catch (err) {
        context.error = err;
        error.publish(context);
        throw err;
      } finally {
        end.publish(context);
      }
    });
  }
  tracePromise(fn, context = {}, thisArg, ...args) {
    const { start, end, asyncStart, asyncEnd, error } = this;
    function reject(err) {
      context.error = err;
      error.publish(context);
      asyncStart.publish(context);
      asyncEnd.publish(context);
      return PromiseReject(err);
    }
    function resolve(result) {
      context.result = result;
      asyncStart.publish(context);
      asyncEnd.publish(context);
      return result;
    }
    return start.runStores(context, () => {
      try {
        let promise = fn.__intrinsic__apply(thisArg, args);
        if (!(promise instanceof __intrinsic__Promise)) {
          promise = PromiseResolve(promise);
        }
        return PromisePrototypeThen(promise, resolve, reject);
      } catch (err) {
        context.error = err;
        error.publish(context);
        throw err;
      } finally {
        end.publish(context);
      }
    });
  }
  traceCallback(fn, position = -1, context = {}, thisArg, ...args) {
    const { start, end, asyncStart, asyncEnd, error } = this;
    function wrappedCallback(err, res) {
      if (err) {
        context.error = err;
        error.publish(context);
      } else {
        context.result = res;
      }
      asyncStart.runStores(context, () => {
        try {
          if (callback) {
            return callback.__intrinsic__apply(this, arguments);
          }
        } finally {
          asyncEnd.publish(context);
        }
      });
    }
    const callback = ArrayPrototypeAt.__intrinsic__call(args, position);
    validateFunction(callback, "callback");
    ArrayPrototypeSplice.__intrinsic__call(args, position, 1, wrappedCallback);
    return start.runStores(context, () => {
      try {
        return fn.__intrinsic__apply(thisArg, args);
      } catch (err) {
        context.error = err;
        error.publish(context);
        throw err;
      } finally {
        end.publish(context);
      }
    });
  }
}
function tracingChannel(nameOrChannels) {
  return new TracingChannel(nameOrChannels);
}
$ = {
  channel,
  hasSubscribers,
  subscribe,
  tracingChannel,
  unsubscribe,
  Channel
};
$$EXPORT$$($).$$EXPORT_END$$;
