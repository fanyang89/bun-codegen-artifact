// @bun
// build/debug/tmp_modules/internal/assert/calltracker.ts
var $;
var { SafeSet, SafeWeakMap } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 30) || __intrinsic__createInternalModuleById(30);
var AssertionError = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 4) || __intrinsic__createInternalModuleById(4);
var { validateUint32 } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 68) || __intrinsic__createInternalModuleById(68);
var ObjectFreeze = Object.freeze;
var ArrayPrototypePush = __intrinsic__Array.prototype.push;
var ArrayPrototypeSlice = __intrinsic__Array.prototype.slice;
var noop = () => {};

class CallTrackerContext {
  #expected;
  #calls;
  #name;
  #stackTrace;
  constructor({ expected, stackTrace, name }) {
    this.#calls = [];
    this.#expected = expected;
    this.#stackTrace = stackTrace;
    this.#name = name;
  }
  track(thisArg, args) {
    const argsClone = ObjectFreeze(ArrayPrototypeSlice.__intrinsic__call(args));
    ArrayPrototypePush.__intrinsic__call(this.#calls, ObjectFreeze({ thisArg, arguments: argsClone }));
  }
  get delta() {
    return this.#calls.length - this.#expected;
  }
  reset() {
    this.#calls = [];
  }
  getCalls() {
    return ObjectFreeze(ArrayPrototypeSlice.__intrinsic__call(this.#calls));
  }
  report() {
    if (this.delta !== 0) {
      const message = `Expected the ${this.#name} function to be ` + `executed ${this.#expected} time(s) but was ` + `executed ${this.#calls.length} time(s).`;
      return {
        message,
        actual: this.#calls.length,
        expected: this.#expected,
        operator: this.#name,
        stack: this.#stackTrace
      };
    }
  }
}

class CallTracker {
  #callChecks = new SafeSet;
  #trackedFunctions = new SafeWeakMap;
  #getTrackedFunction(tracked) {
    if (!this.#trackedFunctions.has(tracked)) {
      throw __intrinsic__makeErrorWithCode(119, "tracked", tracked, "is not a tracked function");
    }
    return this.#trackedFunctions.get(tracked);
  }
  reset(tracked) {
    if (tracked === __intrinsic__undefined) {
      this.#callChecks.forEach((check) => check.reset());
      return;
    }
    this.#getTrackedFunction(tracked).reset();
  }
  getCalls(tracked) {
    return this.#getTrackedFunction(tracked).getCalls();
  }
  calls(fn, expected = 1) {
    if (process._exiting)
      throw __intrinsic__makeErrorWithCode(249);
    if (typeof fn === "number") {
      expected = fn;
      fn = noop;
    } else if (fn === __intrinsic__undefined) {
      fn = noop;
    }
    validateUint32(expected, "expected", true);
    const context = new CallTrackerContext({
      expected,
      stackTrace: new Error,
      name: fn.name || "calls"
    });
    const tracked = new Proxy(fn, {
      __proto__: null,
      apply(fn2, thisArg, argList) {
        context.track(thisArg, argList);
        return fn2.__intrinsic__apply(thisArg, argList);
      }
    });
    this.#callChecks.add(context);
    this.#trackedFunctions.set(tracked, context);
    return tracked;
  }
  report() {
    const errors = [];
    for (const context of this.#callChecks) {
      const message = context.report();
      if (message !== __intrinsic__undefined) {
        ArrayPrototypePush.__intrinsic__call(errors, message);
      }
    }
    return errors;
  }
  verify() {
    const errors = this.report();
    if (errors.length === 0) {
      return;
    }
    const message = errors.length === 1 ? errors[0].message : "Functions were not called the expected number of times";
    throw new AssertionError({
      message,
      details: errors
    });
  }
}
$ = CallTracker;
$$EXPORT$$($).$$EXPORT_END$$;
