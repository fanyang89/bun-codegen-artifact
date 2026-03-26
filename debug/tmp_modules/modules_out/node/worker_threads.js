// @bun
// build/debug/tmp_modules/node/worker_threads.ts
var $;
var EventEmitter = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 96) || __intrinsic__createInternalModuleById(96);
var Readable = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 55) || __intrinsic__createInternalModuleById(55);
var { throwNotImplemented, warnNotImplementedOnce } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 32) || __intrinsic__createInternalModuleById(32);
var {
  MessageChannel,
  BroadcastChannel,
  Worker: WebWorker
} = globalThis;
var SHARE_ENV = Symbol("nodejs.worker_threads.SHARE_ENV");
var isMainThread = Bun.isMainThread;
var {
  0: _workerData,
  1: _threadId,
  2: _receiveMessageOnPort,
  3: environmentData
} = __intrinsic__lazy(89);
var urlRevokeRegistry = __intrinsic__undefined;
function injectFakeEmitter(Class) {
  function messageEventHandler(event) {
    return event.data;
  }
  function errorEventHandler(event) {
    return event.error;
  }
  const wrappedListener = Symbol("wrappedListener");
  function wrapped(run, listener) {
    const callback = function(event) {
      return listener(run(event));
    };
    listener[wrappedListener] = callback;
    return callback;
  }
  function functionForEventType(event, listener) {
    switch (event) {
      case "error":
      case "messageerror": {
        return wrapped(errorEventHandler, listener);
      }
      default: {
        return wrapped(messageEventHandler, listener);
      }
    }
  }
  Class.prototype.on = function(event, listener) {
    this.addEventListener(event, functionForEventType(event, listener));
    return this;
  };
  Class.prototype.off = function(event, listener) {
    if (listener) {
      this.removeEventListener(event, listener[wrappedListener] || listener);
    } else {
      this.removeEventListener(event);
    }
    return this;
  };
  Class.prototype.once = function(event, listener) {
    this.addEventListener(event, functionForEventType(event, listener), { once: true });
    return this;
  };
  function EventClass(eventName) {
    if (eventName === "error" || eventName === "messageerror") {
      return ErrorEvent;
    }
    return MessageEvent;
  }
  Class.prototype.emit = function(event, ...args) {
    this.dispatchEvent(new (EventClass(event))(event, ...args));
    return this;
  };
  Class.prototype.prependListener = Class.prototype.on;
  Class.prototype.prependOnceListener = Class.prototype.once;
}
var _MessagePort = globalThis.MessagePort;
injectFakeEmitter(_MessagePort);
var MessagePort = _MessagePort;
var resourceLimits = {};
var workerData = _workerData;
var threadId = _threadId;
function receiveMessageOnPort(port) {
  let res = _receiveMessageOnPort(port);
  if (!res)
    return __intrinsic__undefined;
  return {
    message: res
  };
}
function fakeParentPort() {
  const fake = Object.create(MessagePort.prototype);
  Object.defineProperty(fake, "onmessage", {
    get() {
      return self.onmessage;
    },
    set(value) {
      self.onmessage = value;
    }
  });
  Object.defineProperty(fake, "onmessageerror", {
    get() {
      return self.onmessageerror;
    },
    set(value) {
      self.onmessageerror = value;
    }
  });
  const postMessage = __intrinsic__lazy(90);
  Object.defineProperty(fake, "postMessage", {
    value(...args) {
      return postMessage.__intrinsic__apply(null, args);
    }
  });
  Object.defineProperty(fake, "close", {
    value() {}
  });
  Object.defineProperty(fake, "start", {
    value() {}
  });
  Object.defineProperty(fake, "unref", {
    value() {}
  });
  Object.defineProperty(fake, "ref", {
    value() {}
  });
  Object.defineProperty(fake, "hasRef", {
    value() {
      return false;
    }
  });
  Object.defineProperty(fake, "setEncoding", {
    value() {}
  });
  Object.defineProperty(fake, "addEventListener", {
    value: self.addEventListener.bind(self)
  });
  Object.defineProperty(fake, "removeEventListener", {
    value: self.removeEventListener.bind(self)
  });
  Object.defineProperty(fake, "removeListener", {
    value: self.removeEventListener.bind(self),
    enumerable: false
  });
  Object.defineProperty(fake, "addListener", {
    value: self.addEventListener.bind(self),
    enumerable: false
  });
  return fake;
}
var parentPort = isMainThread ? null : fakeParentPort();
function getEnvironmentData(key) {
  return environmentData.get(key);
}
function setEnvironmentData(key, value) {
  if (value === __intrinsic__undefined) {
    environmentData.delete(key);
  } else {
    environmentData.set(key, value);
  }
}
function markAsUntransferable() {
  throwNotImplemented("worker_threads.markAsUntransferable");
}
function moveMessagePortToContext() {
  throwNotImplemented("worker_threads.moveMessagePortToContext");
}

class Worker extends EventEmitter {
  #worker;
  #performance;
  #onExitPromise = __intrinsic__undefined;
  #urlToRevoke = "";
  constructor(filename, options = {}) {
    super();
    const builtinsGeneratorHatesEval = "ev" + "a" + "l"[0];
    if (options && builtinsGeneratorHatesEval in options) {
      if (options[builtinsGeneratorHatesEval]) {
        const blob = new Blob([filename], { type: "" });
        this.#urlToRevoke = filename = URL.createObjectURL(blob);
      } else {
        this.#urlToRevoke = filename;
      }
    }
    try {
      this.#worker = new WebWorker(filename, options, this);
    } catch (e) {
      if (this.#urlToRevoke) {
        URL.revokeObjectURL(this.#urlToRevoke);
      }
      throw e;
    }
    this.#worker.addEventListener("close", this.#onClose.bind(this), { once: true });
    this.#worker.addEventListener("error", this.#onError.bind(this));
    this.#worker.addEventListener("message", this.#onMessage.bind(this));
    this.#worker.addEventListener("messageerror", this.#onMessageError.bind(this));
    this.#worker.addEventListener("open", this.#onOpen.bind(this), { once: true });
    if (this.#urlToRevoke) {
      if (!urlRevokeRegistry) {
        urlRevokeRegistry = new FinalizationRegistry((url) => {
          URL.revokeObjectURL(url);
        });
      }
      urlRevokeRegistry.register(this.#worker, this.#urlToRevoke);
    }
  }
  get threadId() {
    return this.#worker.threadId;
  }
  ref() {
    this.#worker.ref();
  }
  unref() {
    this.#worker.unref();
  }
  get stdin() {
    return null;
  }
  get stdout() {
    return null;
  }
  get stderr() {
    return null;
  }
  get performance() {
    return this.#performance ??= {
      eventLoopUtilization() {
        warnNotImplementedOnce("worker_threads.Worker.performance");
        return {
          idle: 0,
          active: 0,
          utilization: 0
        };
      }
    };
  }
  terminate(callback) {
    if (typeof callback === "function") {
      process.emitWarning("Passing a callback to worker.terminate() is deprecated. It returns a Promise instead.", "DeprecationWarning", "DEP0132");
      this.#worker.addEventListener("close", (event) => callback(null, event.code), { once: true });
    }
    const onExitPromise = this.#onExitPromise;
    if (onExitPromise) {
      return __intrinsic__isPromise(onExitPromise) ? onExitPromise : __intrinsic__Promise.__intrinsic__resolve(onExitPromise);
    }
    const { resolve, promise } = __intrinsic__Promise.withResolvers();
    this.#worker.addEventListener("close", (event) => {
      resolve(event.code);
    }, { once: true });
    this.#worker.terminate();
    return this.#onExitPromise = promise;
  }
  postMessage(...args) {
    return this.#worker.postMessage.__intrinsic__apply(this.#worker, args);
  }
  getHeapSnapshot(options) {
    const stringPromise = this.#worker.getHeapSnapshot(options);
    return stringPromise.then((s) => new HeapSnapshotStream(s));
  }
  #onClose(e) {
    this.#onExitPromise = e.code;
    this.emit("exit", e.code);
  }
  #onError(event) {
    let error = event?.error;
    if (event.message !== "") {
      error = new Error(event.message, { cause: event });
      const stack = event?.stack;
      if (stack) {
        error.stack = stack;
      }
    }
    this.emit("error", error);
  }
  #onMessage(event) {
    this.emit("message", event.data);
  }
  #onMessageError(event) {
    this.emit("messageerror", event.error ?? event.data ?? event);
  }
  #onOpen() {
    this.emit("online");
  }
  async[Symbol.asyncDispose]() {
    await this.terminate();
  }
}

class HeapSnapshotStream extends Readable {
  #json;
  constructor(json) {
    super();
    this.#json = json;
  }
  _read() {
    if (this.#json !== __intrinsic__undefined) {
      this.push(this.#json);
      this.push(null);
      this.#json = __intrinsic__undefined;
    }
  }
}
$ = {
  Worker,
  workerData,
  parentPort,
  resourceLimits,
  isMainThread,
  MessageChannel,
  BroadcastChannel,
  MessagePort,
  getEnvironmentData,
  setEnvironmentData,
  getHeapSnapshot() {
    return {};
  },
  markAsUntransferable,
  moveMessagePortToContext,
  receiveMessageOnPort,
  SHARE_ENV,
  threadId
};
$$EXPORT$$($).$$EXPORT_END$$;
