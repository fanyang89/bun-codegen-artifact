(function (){"use strict";
let $debug_trace = Bun.env.TRACE && Bun.env.TRACE === '1';
let $debug_log_enabled = ((env) => (
  // The rationale for checking all these variables is just so you don't have to exactly remember which one you set.
  (env.BUN_DEBUG_ALL && env.BUN_DEBUG_ALL !== '0')
  || (env.BUN_DEBUG_JS && env.BUN_DEBUG_JS !== '0')
  || (env.BUN_DEBUG_EVENTS === '1')
  || (env.DEBUG_NODE_EVENTS === '1')
))(Bun.env);
let $debug_pid_prefix = Bun.env.SHOW_PID === '1';
let $debug_log = $debug_log_enabled ? (...args) => {
  // warn goes to stderr without colorizing
  console[$debug_trace ? 'trace' : 'warn'](($debug_pid_prefix ? `[${process.pid}] ` : '') + (Bun.enableANSIColors ? '\x1b[90m[events]\x1b[0m' : '[events]'), ...args);
} : () => {};
// build/debug/tmp_modules/node/events.ts
var $;
var {
  validateObject,
  validateInteger,
  validateAbortSignal,
  validateNumber,
  validateBoolean,
  validateFunction
} = @getInternalField(@internalModuleRegistry, 68) || @createInternalModuleById(68);
var types = @getInternalField(@internalModuleRegistry, 144) || @createInternalModuleById(144);
var inspect;
var SymbolFor = Symbol.for;
var ArrayPrototypeSlice = @Array.prototype.slice;
var ArrayPrototypeSplice = @Array.prototype.splice;
var ReflectOwnKeys = Reflect.ownKeys;
var kCapture = Symbol("kCapture");
var kErrorMonitor = SymbolFor("events.errorMonitor");
var kMaxEventTargetListeners = Symbol("events.maxEventTargetListeners");
var kMaxEventTargetListenersWarned = Symbol("events.maxEventTargetListenersWarned");
var kWatermarkData = SymbolFor("nodejs.watermarkData");
var kRejection = SymbolFor("nodejs.rejection");
var kFirstEventParam = SymbolFor("nodejs.kFirstEventParam");
var captureRejectionSymbol = SymbolFor("nodejs.rejection");
var FixedQueue;
var kEmptyObject = Object.freeze(Object.create(null));
var defaultMaxListeners = 10;
function EventEmitter(opts) {
  if (this._events === @undefined || this._events === this.__proto__._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }
  this._maxListeners ??= @undefined;
  if (opts?.captureRejections) {
    validateBoolean(opts.captureRejections, "options.captureRejections");
    this[kCapture] = !!opts.captureRejections;
    this.emit = emitWithRejectionCapture;
  } else {
    this[kCapture] = EventEmitterPrototype[kCapture];
    const capture = EventEmitterPrototype[kCapture];
    this[kCapture] = capture;
    if (capture) {
      this.emit = emitWithRejectionCapture;
    }
  }
}
Object.defineProperty(EventEmitter, "name", { value: "EventEmitter", configurable: true });
var EventEmitterPrototype = EventEmitter.prototype = {};
EventEmitterPrototype.setMaxListeners = function setMaxListeners(n) {
  validateNumber(n, "setMaxListeners", 0);
  this._maxListeners = n;
  return this;
};
Object.defineProperty(EventEmitterPrototype.setMaxListeners, "name", { value: "setMaxListeners" });
EventEmitterPrototype.constructor = EventEmitter;
EventEmitterPrototype.getMaxListeners = function getMaxListeners() {
  return _getMaxListeners(this);
};
Object.defineProperty(EventEmitterPrototype.getMaxListeners, "name", { value: "getMaxListeners" });
function emitError(emitter, args) {
  var { _events: events } = emitter;
  if (events !== @undefined) {
    const errorMonitor = events[kErrorMonitor];
    if (errorMonitor) {
      for (const handler2 of ArrayPrototypeSlice.@call(errorMonitor)) {
        handler2.@apply(emitter, args);
      }
    }
    const handlers = events.error;
    if (handlers) {
      for (var handler of ArrayPrototypeSlice.@call(handlers)) {
        handler.@apply(emitter, args);
      }
      return true;
    }
  }
  let er;
  if (args.length > 0)
    er = args[0];
  if (Error.isError(er)) {
    throw er;
  }
  let stringifiedEr;
  try {
    if (!inspect)
      inspect = (@getInternalField(@internalModuleRegistry, 66) || @createInternalModuleById(66)).inspect;
    stringifiedEr = inspect(er);
  } catch {
    stringifiedEr = er;
  }
  const err = @makeErrorWithCode(252, stringifiedEr);
  err.context = er;
  throw err;
}
function addCatch(emitter, promise, type, args) {
  promise.then(@undefined, function(err) {
    process.nextTick(emitUnhandledRejectionOrErr, emitter, err, type, args);
  });
}
function emitUnhandledRejectionOrErr(emitter, err, type, args) {
  if (typeof emitter[kRejection] === "function") {
    emitter[kRejection](err, type, ...args);
  } else {
    try {
      emitter[kCapture] = false;
      emitter.emit("error", err);
    } finally {
      emitter[kCapture] = true;
    }
  }
}
var emitWithoutRejectionCapture = function emit(type, ...args) {
  $debug_log(`${this.constructor?.name || "EventEmitter"}.emit`, type);
  if (type === "error") {
    return emitError(this, args);
  }
  var { _events: events } = this;
  if (events === @undefined)
    return false;
  var handlers = events[type];
  if (handlers === @undefined)
    return false;
  const maybeClonedHandlers = handlers.length > 1 ? handlers.slice() : handlers;
  for (let i = 0, { length } = maybeClonedHandlers;i < length; i++) {
    const handler = maybeClonedHandlers[i];
    switch (args.length) {
      case 0:
        handler.@call(this);
        break;
      case 1:
        handler.@call(this, args[0]);
        break;
      case 2:
        handler.@call(this, args[0], args[1]);
        break;
      case 3:
        handler.@call(this, args[0], args[1], args[2]);
        break;
      default:
        handler.@apply(this, args);
        break;
    }
  }
  return true;
};
var emitWithRejectionCapture = function emit2(type, ...args) {
  $debug_log(`${this.constructor?.name || "EventEmitter"}.emit`, type);
  if (type === "error") {
    return emitError(this, args);
  }
  var { _events: events } = this;
  if (events === @undefined)
    return false;
  var handlers = events[type];
  if (handlers === @undefined)
    return false;
  const maybeClonedHandlers = handlers.length > 1 ? handlers.slice() : handlers;
  for (let i = 0, { length } = maybeClonedHandlers;i < length; i++) {
    const handler = maybeClonedHandlers[i];
    let result;
    switch (args.length) {
      case 0:
        result = handler.@call(this);
        break;
      case 1:
        result = handler.@call(this, args[0]);
        break;
      case 2:
        result = handler.@call(this, args[0], args[1]);
        break;
      case 3:
        result = handler.@call(this, args[0], args[1], args[2]);
        break;
      default:
        result = handler.@apply(this, args);
        break;
    }
    if (result !== @undefined && @isPromise(result)) {
      addCatch(this, result, type, args);
    }
  }
  return true;
};
EventEmitterPrototype.emit = emitWithoutRejectionCapture;
EventEmitterPrototype.addListener = function addListener(type, fn) {
  checkListener(fn);
  var events = this._events;
  if (!events) {
    events = this._events = Object.create(null);
    this._eventsCount = 0;
  } else if (events.newListener) {
    this.emit("newListener", type, fn.listener ?? fn);
  }
  var handlers = events[type];
  if (!handlers) {
    events[type] = [fn];
    this._eventsCount++;
  } else {
    handlers.push(fn);
    var m = _getMaxListeners(this);
    if (m > 0 && handlers.length > m && !handlers.warned) {
      overflowWarning(this, type, handlers);
    }
  }
  return this;
};
EventEmitterPrototype.on = EventEmitterPrototype.addListener;
EventEmitterPrototype.prependListener = function prependListener(type, fn) {
  checkListener(fn);
  var events = this._events;
  if (!events) {
    events = this._events = Object.create(null);
    this._eventsCount = 0;
  } else if (events.newListener) {
    this.emit("newListener", type, fn.listener ?? fn);
  }
  var handlers = events[type];
  if (!handlers) {
    events[type] = [fn];
    this._eventsCount++;
  } else {
    handlers.unshift(fn);
    var m = _getMaxListeners(this);
    if (m > 0 && handlers.length > m && !handlers.warned) {
      overflowWarning(this, type, handlers);
    }
  }
  return this;
};
function overflowWarning(emitter, type, handlers) {
  if (!inspect)
    inspect = (@getInternalField(@internalModuleRegistry, 66) || @createInternalModuleById(66)).inspect;
  handlers.warned = true;
  const warn = new Error(`Possible EventTarget memory leak detected. ${handlers.length} ${@String(type)} listeners added to ${inspect(emitter, { depth: -1 })}. MaxListeners is ${emitter._maxListeners}. Use events.setMaxListeners() to increase limit`);
  warn.name = "MaxListenersExceededWarning";
  warn.emitter = emitter;
  warn.type = type;
  warn.count = handlers.length;
  process.emitWarning(warn);
}
function _onceWrap(target, type, listener) {
  const state = { fired: false, wrapFn: @undefined, target, type, listener };
  const wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}
function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    if (arguments.length === 0)
      return this.listener.@call(this.target);
    return this.listener.@apply(this.target, arguments);
  }
}
EventEmitterPrototype.once = function once(type, fn) {
  checkListener(fn);
  this.on(type, _onceWrap(this, type, fn));
  return this;
};
Object.defineProperty(EventEmitterPrototype.once, "name", { value: "once" });
EventEmitterPrototype.prependOnceListener = function prependOnceListener(type, fn) {
  checkListener(fn);
  this.prependListener(type, _onceWrap(this, type, fn));
  return this;
};
EventEmitterPrototype.removeListener = function removeListener(type, listener) {
  checkListener(listener);
  const events = this._events;
  if (events === @undefined)
    return this;
  const list = events[type];
  if (list === @undefined)
    return this;
  let position = -1;
  for (let i = list.length - 1;i >= 0; i--) {
    if (list[i] === listener || list[i].listener === listener) {
      position = i;
      break;
    }
  }
  if (position < 0)
    return this;
  if (position === 0)
    list.shift();
  else
    ArrayPrototypeSplice.@call(list, position, 1);
  if (list.length === 0) {
    delete events[type];
    this._eventsCount--;
  }
  if (events.removeListener !== @undefined)
    this.emit("removeListener", type, listener.listener || listener);
  return this;
};
EventEmitterPrototype.off = EventEmitterPrototype.removeListener;
EventEmitterPrototype.removeAllListeners = function removeAllListeners(type) {
  const events = this._events;
  if (events === @undefined)
    return this;
  if (events.removeListener === @undefined) {
    if (type) {
      if (events[type]) {
        delete events[type];
        this._eventsCount--;
      }
    } else {
      this._events = Object.create(null);
    }
    return this;
  }
  if (!type) {
    for (const key of ReflectOwnKeys(events)) {
      if (key === "removeListener")
        continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners("removeListener");
    this._events = Object.create(null);
    this._eventsCount = 0;
    return this;
  }
  const listeners = events[type];
  if (listeners !== @undefined) {
    for (let i = listeners.length - 1;i >= 0; i--)
      this.removeListener(type, listeners[i]);
  }
  return this;
};
EventEmitterPrototype.listeners = function listeners(type) {
  var { _events: events } = this;
  if (!events)
    return [];
  var handlers = events[type];
  if (!handlers)
    return [];
  return handlers.map((x) => x.listener ?? x);
};
EventEmitterPrototype.rawListeners = function rawListeners(type) {
  var { _events } = this;
  if (!_events)
    return [];
  var handlers = _events[type];
  if (!handlers)
    return [];
  return handlers.slice();
};
EventEmitterPrototype.listenerCount = function listenerCount(type, method) {
  var { _events: events } = this;
  if (!events)
    return 0;
  if (method != null) {
    var length = 0;
    for (const handler of events[type] ?? []) {
      if (handler === method || handler.listener === method) {
        length++;
      }
    }
    return length;
  }
  return events[type]?.length ?? 0;
};
Object.defineProperty(EventEmitterPrototype.listenerCount, "name", { value: "listenerCount" });
EventEmitterPrototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? Reflect.ownKeys(this._events) : [];
};
EventEmitterPrototype[kCapture] = false;
function once2(emitter, type, options = kEmptyObject) {
  validateObject(options, "options");
  var signal = options?.signal;
  validateAbortSignal(signal, "options.signal");
  if (signal?.aborted) {
    throw @makeAbortError(@undefined, { cause: signal?.reason });
  }
  const { resolve, reject, promise } = @newPromiseCapability(@Promise);
  const errorListener = (err) => {
    emitter.removeListener(type, resolver);
    if (signal != null) {
      eventTargetAgnosticRemoveListener(signal, "abort", abortListener);
    }
    reject(err);
  };
  const resolver = (...args) => {
    if (typeof emitter.removeListener === "function") {
      emitter.removeListener("error", errorListener);
    }
    if (signal != null) {
      eventTargetAgnosticRemoveListener(signal, "abort", abortListener);
    }
    resolve(args);
  };
  eventTargetAgnosticAddListener(emitter, type, resolver, { once: true });
  if (type !== "error" && typeof emitter.once === "function") {
    emitter.once("error", errorListener);
  }
  function abortListener() {
    eventTargetAgnosticRemoveListener(emitter, type, resolver);
    eventTargetAgnosticRemoveListener(emitter, "error", errorListener);
    reject(@makeAbortError(@undefined, { cause: signal?.reason }));
  }
  if (signal != null) {
    eventTargetAgnosticAddListener(signal, "abort", abortListener, { once: true });
  }
  return promise;
}
Object.defineProperty(once2, "name", { value: "once" });
var AsyncIteratorPrototype = Object.getPrototypeOf(Object.getPrototypeOf(async function* () {}).prototype);
function createIterResult(value, done) {
  return { value, done };
}
function on(emitter, event, options = kEmptyObject) {
  validateObject(options, "options");
  const signal = options.signal;
  validateAbortSignal(signal, "options.signal");
  if (signal?.aborted)
    throw @makeAbortError(@undefined, { cause: signal?.reason });
  const highWatermark = options.highWaterMark ?? options.highWatermark ?? Number.MAX_SAFE_INTEGER;
  validateInteger(highWatermark, "options.highWaterMark", 1);
  const lowWatermark = options.lowWaterMark ?? options.lowWatermark ?? 1;
  validateInteger(lowWatermark, "options.lowWaterMark", 1);
  FixedQueue ??= (@getInternalField(@internalModuleRegistry, 18) || @createInternalModuleById(18)).FixedQueue;
  const unconsumedEvents = new FixedQueue;
  const unconsumedPromises = new FixedQueue;
  let paused = false;
  let error = null;
  let finished = false;
  let size = 0;
  const iterator = Object.setPrototypeOf({
    next() {
      if (size) {
        const value = unconsumedEvents.shift();
        size--;
        if (paused && size < lowWatermark) {
          emitter.resume();
          paused = false;
        }
        return @Promise.@resolve(createIterResult(value, false));
      }
      if (error) {
        const p = @Promise.@reject(error);
        error = null;
        return p;
      }
      if (finished)
        return closeHandler();
      return new @Promise(function(resolve, reject) {
        unconsumedPromises.push({ resolve, reject });
      });
    },
    return() {
      return closeHandler();
    },
    throw(err) {
      if (!err || !(err instanceof Error)) {
        throw @makeErrorWithCode(118, "EventEmitter.AsyncIterator", "Error", err);
      }
      errorHandler(err);
    },
    [Symbol.asyncIterator]() {
      return this;
    },
    [kWatermarkData]: {
      get size() {
        return size;
      },
      get low() {
        return lowWatermark;
      },
      get high() {
        return highWatermark;
      },
      get isPaused() {
        return paused;
      }
    }
  }, AsyncIteratorPrototype);
  const { addEventListener, removeAll } = listenersController();
  addEventListener(emitter, event, options[kFirstEventParam] ? eventHandler : function(...args) {
    return eventHandler(args);
  });
  if (event !== "error" && typeof emitter.on === "function") {
    addEventListener(emitter, "error", errorHandler);
  }
  const closeEvents = options?.close;
  if (closeEvents?.length) {
    for (let i = 0;i < closeEvents.length; i++) {
      addEventListener(emitter, closeEvents[i], closeHandler);
    }
  }
  const abortListenerDisposable = signal ? addAbortListener(signal, abortListener) : null;
  return iterator;
  function abortListener() {
    errorHandler(@makeAbortError(@undefined, { cause: signal?.reason }));
  }
  function eventHandler(value) {
    if (unconsumedPromises.isEmpty()) {
      size++;
      if (!paused && size > highWatermark) {
        paused = true;
        emitter.pause();
      }
      unconsumedEvents.push(value);
    } else
      unconsumedPromises.shift().resolve(createIterResult(value, false));
  }
  function errorHandler(err) {
    if (unconsumedPromises.isEmpty())
      error = err;
    else
      unconsumedPromises.shift().reject(err);
    closeHandler();
  }
  function closeHandler() {
    abortListenerDisposable?.[Symbol.dispose]();
    removeAll();
    finished = true;
    const doneResult = createIterResult(@undefined, true);
    while (!unconsumedPromises.isEmpty()) {
      unconsumedPromises.shift().resolve(doneResult);
    }
    return @Promise.@resolve(doneResult);
  }
}
Object.defineProperty(on, "name", { value: "on" });
function listenersController() {
  const listeners2 = [];
  return {
    addEventListener(emitter, event, handler, flags) {
      eventTargetAgnosticAddListener(emitter, event, handler, flags);
      listeners2.push([emitter, event, handler, flags]);
    },
    removeAll() {
      while (listeners2.length > 0) {
        const [emitter, event, handler, flags] = listeners2.pop();
        eventTargetAgnosticRemoveListener(emitter, event, handler, flags);
      }
    }
  };
}
var getEventListenersForEventTarget = @lazy(51);
function getEventListeners(emitter, type) {
  if (@isCallable(emitter?.listeners)) {
    return emitter.listeners(type);
  }
  return getEventListenersForEventTarget(emitter, type);
}
function setMaxListeners2(n = defaultMaxListeners, ...eventTargets) {
  validateNumber(n, "setMaxListeners", 0);
  if (eventTargets.length === 0) {
    defaultMaxListeners = n;
  } else {
    for (let i = 0;i < eventTargets.length; i++) {
      const target = eventTargets[i];
      if (types.isEventTarget(target)) {
        target[kMaxEventTargetListeners] = n;
        target[kMaxEventTargetListenersWarned] = false;
      } else if (typeof target.setMaxListeners === "function") {
        target.setMaxListeners(n);
      } else {
        throw @makeErrorWithCode(118, "eventTargets", ["EventEmitter", "EventTarget"], target);
      }
    }
  }
}
Object.defineProperty(setMaxListeners2, "name", { value: "setMaxListeners" });
var jsEventTargetGetEventListenersCount = @lazy(52);
function listenerCount2(emitter, type) {
  if (@isCallable(emitter.listenerCount)) {
    return emitter.listenerCount(type);
  }
  const evt_count = jsEventTargetGetEventListenersCount(emitter, type);
  if (evt_count !== @undefined)
    return evt_count;
  return listenerCountSlow(emitter, type);
}
Object.defineProperty(listenerCount2, "name", { value: "listenerCount" });
function listenerCountSlow(emitter, type) {
  const events = emitter._events;
  if (events !== @undefined) {
    const evlistener = events[type];
    if (typeof evlistener === "function") {
      return 1;
    } else if (evlistener !== @undefined) {
      return evlistener.length;
    }
  }
  return 0;
}
function eventTargetAgnosticRemoveListener(emitter, name, listener, flags) {
  if (typeof emitter.removeListener === "function") {
    emitter.removeListener(name, listener);
  } else if (typeof emitter.removeEventListener === "function") {
    emitter.removeEventListener(name, listener, flags);
  } else {
    throw @makeErrorWithCode(118, "emitter", "EventEmitter", emitter);
  }
}
function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
  if (typeof emitter.on === "function") {
    if (flags?.once) {
      emitter.once(name, listener);
    } else {
      emitter.on(name, listener);
    }
  } else if (typeof emitter.addEventListener === "function") {
    emitter.addEventListener(name, listener, flags);
  } else {
    throw @makeErrorWithCode(118, "emitter", "EventEmitter", emitter);
  }
}
function checkListener(listener) {
  validateFunction(listener, "listener");
}
function _getMaxListeners(emitter) {
  return emitter?._maxListeners ?? defaultMaxListeners;
}
var AsyncResource = null;
function getMaxListeners2(emitterOrTarget) {
  if (typeof emitterOrTarget?.getMaxListeners === "function") {
    return _getMaxListeners(emitterOrTarget);
  } else if (types.isEventTarget(emitterOrTarget)) {
    emitterOrTarget[kMaxEventTargetListeners] ??= defaultMaxListeners;
    return emitterOrTarget[kMaxEventTargetListeners];
  }
  throw @makeErrorWithCode(118, "emitter", ["EventEmitter", "EventTarget"], emitterOrTarget);
}
Object.defineProperty(getMaxListeners2, "name", { value: "getMaxListeners" });
function addAbortListener(signal, listener) {
  if (signal === @undefined) {
    throw @makeErrorWithCode(118, "signal", "AbortSignal", signal);
  }
  validateAbortSignal(signal, "signal");
  if (typeof listener !== "function") {
    throw @makeErrorWithCode(118, "listener", "function", listener);
  }
  let removeEventListener;
  if (signal.aborted) {
    queueMicrotask(() => listener());
  } else {
    signal.addEventListener("abort", listener, { __proto__: null, once: true });
    removeEventListener = () => {
      signal.removeEventListener("abort", listener);
    };
  }
  return {
    __proto__: null,
    [Symbol.dispose]() {
      removeEventListener?.();
    }
  };
}

class EventEmitterAsyncResource extends EventEmitter {
  triggerAsyncId;
  asyncResource;
  constructor(options) {
    if (!AsyncResource) {
      AsyncResource = (@getInternalField(@internalModuleRegistry, 86) || @createInternalModuleById(86)).AsyncResource;
    }
    var { captureRejections = false, triggerAsyncId, name = new.target.name, requireManualDestroy } = options || {};
    super({ captureRejections });
    this.triggerAsyncId = triggerAsyncId ?? 0;
    this.asyncResource = new AsyncResource(name, { triggerAsyncId, requireManualDestroy });
  }
  emit(...args) {
    this.asyncResource.runInAsyncScope(() => super.emit(...args));
  }
  emitDestroy() {
    this.asyncResource.emitDestroy();
  }
}
Object.defineProperties(EventEmitter, {
  captureRejections: {
    get() {
      return EventEmitterPrototype[kCapture];
    },
    set(value) {
      validateBoolean(value, "EventEmitter.captureRejections");
      EventEmitterPrototype[kCapture] = value;
    },
    enumerable: true
  },
  defaultMaxListeners: {
    enumerable: true,
    get: () => {
      return defaultMaxListeners;
    },
    set: (arg) => {
      validateNumber(arg, "defaultMaxListeners", 0);
      defaultMaxListeners = arg;
    }
  },
  kMaxEventTargetListeners: {
    value: kMaxEventTargetListeners,
    enumerable: false,
    configurable: false,
    writable: false
  },
  kMaxEventTargetListenersWarned: {
    value: kMaxEventTargetListenersWarned,
    enumerable: false,
    configurable: false,
    writable: false
  }
});
Object.assign(EventEmitter, {
  once: once2,
  on,
  getEventListeners,
  getMaxListeners: getMaxListeners2,
  setMaxListeners: setMaxListeners2,
  EventEmitter,
  usingDomains: false,
  captureRejectionSymbol,
  EventEmitterAsyncResource,
  errorMonitor: kErrorMonitor,
  addAbortListener,
  init: EventEmitter,
  listenerCount: listenerCount2
});
$ = EventEmitter;
return $})
