(function (){"use strict";// build/debug/tmp_modules/node/inspector.ts
var $;
var { hideFromStack, throwNotImplemented } = @getInternalField(@internalModuleRegistry, 32) || @createInternalModuleById(32);
var EventEmitter = @getInternalField(@internalModuleRegistry, 96) || @createInternalModuleById(96);
var startCPUProfiler = @lazy(57);
var stopCPUProfiler = @lazy(58);
var setCPUSamplingInterval = @lazy(59);
var isCPUProfilerRunning = @lazy(60);
function open() {
  throwNotImplemented("node:inspector", 2445);
}
function close() {
  throwNotImplemented("node:inspector", 2445);
}
function url() {
  return @undefined;
}
function waitForDebugger() {
  throwNotImplemented("node:inspector", 2445);
}

class Session extends EventEmitter {
  #connected = false;
  #profilerEnabled = false;
  connect() {
    if (this.#connected) {
      throw new Error("Session is already connected");
    }
    this.#connected = true;
  }
  connectToMainThread() {
    this.connect();
  }
  disconnect() {
    if (!this.#connected)
      return;
    if (isCPUProfilerRunning())
      stopCPUProfiler();
    this.#profilerEnabled = false;
    this.#connected = false;
  }
  post(method, params, callback) {
    if (typeof params === "function") {
      callback = params;
      params = @undefined;
    }
    if (!this.#connected) {
      const error = new Error("Session is not connected");
      if (callback) {
        queueMicrotask(() => callback(error));
        return;
      }
      throw error;
    }
    const result = this.#handleMethod(method, params);
    if (callback) {
      queueMicrotask(() => {
        if (result instanceof Error) {
          callback(result, @undefined);
        } else {
          callback(null, result);
        }
      });
    } else {
      if (result instanceof Error) {
        throw result;
      }
      return result;
    }
  }
  #handleMethod(method, params) {
    switch (method) {
      case "Profiler.enable":
        this.#profilerEnabled = true;
        return {};
      case "Profiler.disable":
        if (isCPUProfilerRunning()) {
          stopCPUProfiler();
        }
        this.#profilerEnabled = false;
        return {};
      case "Profiler.start":
        if (!this.#profilerEnabled)
          return new Error("Profiler is not enabled. Call Profiler.enable first.");
        if (!isCPUProfilerRunning())
          startCPUProfiler();
        return {};
      case "Profiler.stop":
        if (!isCPUProfilerRunning())
          return new Error("Profiler is not started. Call Profiler.start first.");
        try {
          return { profile: JSON.parse(stopCPUProfiler()) };
        } catch (e) {
          return new Error(`Failed to parse profile JSON: ${e}`);
        }
      case "Profiler.setSamplingInterval": {
        if (isCPUProfilerRunning())
          return new Error("Cannot change sampling interval while profiler is running");
        const interval = params?.interval;
        if (typeof interval !== "number" || interval <= 0)
          return new Error("interval must be a positive number");
        setCPUSamplingInterval(interval);
        return {};
      }
      case "Profiler.getBestEffortCoverage":
      case "Profiler.startPreciseCoverage":
      case "Profiler.stopPreciseCoverage":
      case "Profiler.takePreciseCoverage":
        return new Error("Coverage APIs are not supported");
      default:
        return new Error(`Inspector method "${method}" is not supported`);
    }
  }
}
var console = {
  ...globalThis.console,
  context: {
    console: globalThis.console
  }
};
$ = {
  console,
  open,
  close,
  url,
  waitForDebugger,
  Session
};
hideFromStack(open, close, url, waitForDebugger, Session.prototype.constructor);
return $})
