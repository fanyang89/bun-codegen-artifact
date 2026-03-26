// @bun
// build/release/tmp_modules/node/assert.ts
var $, { SafeMap, SafeSet, SafeWeakSet } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 30) || __intrinsic__createInternalModuleById(30), {
  isKeyObject,
  isPromise,
  isRegExp,
  isMap,
  isSet,
  isDate,
  isWeakSet,
  isWeakMap,
  isAnyArrayBuffer
} = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 144) || __intrinsic__createInternalModuleById(144), { innerOk } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 7) || __intrinsic__createInternalModuleById(7), { validateFunction } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 68) || __intrinsic__createInternalModuleById(68), ArrayFrom = __intrinsic__Array.from, ArrayPrototypeIndexOf = __intrinsic__Array.prototype.indexOf, ArrayPrototypeJoin = __intrinsic__Array.prototype.join, ArrayPrototypePush = __intrinsic__Array.prototype.push, ArrayPrototypeSlice = __intrinsic__Array.prototype.slice, ArrayBufferIsView = __intrinsic__ArrayBuffer.isView, NumberIsNaN = Number.isNaN, ObjectAssign = Object.assign, ObjectIs = Object.is, ObjectKeys = Object.keys, ObjectPrototypeIsPrototypeOf = Object.prototype.isPrototypeOf, ReflectHas = Reflect.has, ReflectOwnKeys = Reflect.ownKeys, RegExpPrototypeExec = __intrinsic__RegExp.prototype.exec, StringPrototypeIndexOf = __intrinsic__String.prototype.indexOf, StringPrototypeSlice = __intrinsic__String.prototype.slice, StringPrototypeSplit = __intrinsic__String.prototype.split, SymbolIterator = Symbol.iterator;
function isDeepEqual(a, b) {
  return Bun.deepEquals(a, b, !1);
}
function isDeepStrictEqual(a, b) {
  return Bun.deepEquals(a, b, !0);
}
var _inspect;
function lazyInspect() {
  if (_inspect === __intrinsic__undefined)
    _inspect = (__intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 66) || __intrinsic__createInternalModuleById(66)).inspect;
  return _inspect;
}
var AssertionError;
function loadAssertionError() {
  if (AssertionError === __intrinsic__undefined)
    AssertionError = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 4) || __intrinsic__createInternalModuleById(4);
}
var warned = !1, assert = ok;
$ = assert;
var NO_EXCEPTION_SENTINEL = {};
function innerFail(obj) {
  if (obj.message instanceof Error)
    throw obj.message;
  throw new AssertionError(obj);
}
function fail(actual, expected, message, operator, stackStartFn) {
  let argsLen = arguments.length, internalMessage = !1;
  if (actual == null && argsLen <= 1)
    internalMessage = !0, message = "Failed";
  else if (argsLen === 1)
    message = actual, actual = __intrinsic__undefined;
  else {
    if (warned === !1)
      warned = !0, process.emitWarning("assert.fail() with more than one argument is deprecated. Please use assert.strictEqual() instead or only pass a message.", "DeprecationWarning", "DEP0094");
    if (argsLen === 2)
      operator = "!=";
  }
  if (message instanceof Error)
    throw message;
  let errArgs = {
    actual,
    expected,
    operator: operator === __intrinsic__undefined ? "fail" : operator,
    stackStartFn: stackStartFn || fail,
    message
  };
  if (AssertionError === __intrinsic__undefined)
    loadAssertionError();
  let err = new AssertionError(errArgs);
  if (internalMessage)
    err.generatedMessage = !0;
  throw err;
}
assert.fail = fail;
assert.AssertionError = AssertionError;
Object.defineProperty(assert, "AssertionError", {
  get() {
    return loadAssertionError(), AssertionError;
  },
  set(value) {
    AssertionError = value;
  },
  configurable: !0,
  enumerable: !0
});
function ok(...args) {
  innerOk(ok, args.length, ...args);
}
assert.ok = ok;
assert.equal = function equal(actual, expected, message) {
  if (arguments.length < 2)
    throw __intrinsic__makeErrorWithCode(150, "actual", "expected");
  if (actual != expected && (!NumberIsNaN(actual) || !NumberIsNaN(expected)))
    innerFail({
      actual,
      expected,
      message,
      operator: "==",
      stackStartFn: equal
    });
};
assert.notEqual = function notEqual(actual, expected, message) {
  if (arguments.length < 2)
    throw __intrinsic__makeErrorWithCode(150, "actual", "expected");
  if (actual == expected || NumberIsNaN(actual) && NumberIsNaN(expected))
    innerFail({
      actual,
      expected,
      message,
      operator: "!=",
      stackStartFn: notEqual
    });
};
assert.deepEqual = function deepEqual(actual, expected, message) {
  if (arguments.length < 2)
    throw __intrinsic__makeErrorWithCode(150, "actual", "expected");
  if (!isDeepEqual(actual, expected))
    innerFail({
      actual,
      expected,
      message,
      operator: "deepEqual",
      stackStartFn: deepEqual
    });
};
assert.notDeepEqual = function notDeepEqual(actual, expected, message) {
  if (arguments.length < 2)
    throw __intrinsic__makeErrorWithCode(150, "actual", "expected");
  if (isDeepEqual(actual, expected))
    innerFail({
      actual,
      expected,
      message,
      operator: "notDeepEqual",
      stackStartFn: notDeepEqual
    });
};
assert.deepStrictEqual = function deepStrictEqual(actual, expected, message) {
  if (arguments.length < 2)
    throw __intrinsic__makeErrorWithCode(150, "actual", "expected");
  if (!isDeepStrictEqual(actual, expected))
    innerFail({
      actual,
      expected,
      message,
      operator: "deepStrictEqual",
      stackStartFn: deepStrictEqual
    });
};
assert.notDeepStrictEqual = notDeepStrictEqual;
function notDeepStrictEqual(actual, expected, message) {
  if (arguments.length < 2)
    throw __intrinsic__makeErrorWithCode(150, "actual", "expected");
  if (isDeepStrictEqual(actual, expected))
    innerFail({
      actual,
      expected,
      message,
      operator: "notDeepStrictEqual",
      stackStartFn: notDeepStrictEqual
    });
}
assert.strictEqual = function strictEqual(actual, expected, message) {
  if (arguments.length < 2)
    throw __intrinsic__makeErrorWithCode(150, "actual", "expected");
  if (!ObjectIs(actual, expected))
    innerFail({
      actual,
      expected,
      message,
      operator: "strictEqual",
      stackStartFn: strictEqual
    });
};
assert.notStrictEqual = function notStrictEqual(actual, expected, message) {
  if (arguments.length < 2)
    throw __intrinsic__makeErrorWithCode(150, "actual", "expected");
  if (ObjectIs(actual, expected))
    innerFail({
      actual,
      expected,
      message,
      operator: "notStrictEqual",
      stackStartFn: notStrictEqual
    });
};
function isSpecial(obj) {
  return obj == null || typeof obj !== "object" || Error.isError(obj) || isRegExp(obj) || isDate(obj);
}
var typesToCallDeepStrictEqualWith = [isKeyObject, isWeakSet, isWeakMap, __intrinsic__Buffer.isBuffer], SafeSetPrototypeIterator = SafeSet.prototype[SymbolIterator], SafeMapPrototypeIterator = SafeMap.prototype[SymbolIterator], SafeMapPrototypeHas = SafeMap.prototype.has, SafeMapPrototypeGet = SafeMap.prototype.get, SafeMapPrototypeSet = SafeMap.prototype.set, SafeMapPrototypeDelete = SafeMap.prototype.delete;
function compareBranch(actual, expected, comparedObjects) {
  if (isMap(actual) && isMap(expected)) {
    if (expected.size > actual.size)
      return !1;
    if (comparedObjects ??= new SafeWeakSet, comparedObjects.has(actual))
      return !0;
    comparedObjects.add(actual);
    let expectedIterator = SafeMapPrototypeIterator.__intrinsic__call(expected);
    for (let { 0: key, 1: expectedValue } of expectedIterator) {
      if (!SafeMapPrototypeHas.__intrinsic__call(actual, key))
        return !1;
      let actualValue = SafeMapPrototypeGet.__intrinsic__call(actual, key);
      if (!compareBranch(actualValue, expectedValue, comparedObjects))
        return !1;
    }
    return !0;
  }
  if (ArrayBufferIsView(actual) || isAnyArrayBuffer(actual) || ArrayBufferIsView(expected) || isAnyArrayBuffer(expected))
    return Bun.deepEquals(actual, expected, !0);
  for (let type of typesToCallDeepStrictEqualWith)
    if (type(actual) || type(expected))
      return isDeepStrictEqual(actual, expected);
  if (isSet(actual) && isSet(expected)) {
    if (expected.size > actual.size)
      return !1;
    let actualArray = ArrayFrom(SafeSetPrototypeIterator.__intrinsic__call(actual)), expectedIterator = SafeSetPrototypeIterator.__intrinsic__call(expected), usedIndices = new SafeSet;
    expectedIteration:
      for (let expectedItem of expectedIterator) {
        for (let actualIdx = 0;actualIdx < actualArray.length; actualIdx++)
          if (!usedIndices.has(actualIdx) && isDeepStrictEqual(actualArray[actualIdx], expectedItem)) {
            usedIndices.add(actualIdx);
            continue expectedIteration;
          }
        return !1;
      }
    return !0;
  }
  if (__intrinsic__isArray(actual) && __intrinsic__isArray(expected)) {
    if (expected.length > actual.length)
      return !1;
    let expectedCounts = new SafeMap;
    for (let expectedItem of expected) {
      let found = !1;
      for (let { 0: key, 1: count } of expectedCounts)
        if (isDeepStrictEqual(key, expectedItem)) {
          SafeMapPrototypeSet.__intrinsic__call(expectedCounts, key, count + 1), found = !0;
          break;
        }
      if (!found)
        SafeMapPrototypeSet.__intrinsic__call(expectedCounts, expectedItem, 1);
    }
    for (let actualItem of actual)
      for (let { 0: key, 1: count } of expectedCounts)
        if (isDeepStrictEqual(key, actualItem)) {
          if (count === 1)
            SafeMapPrototypeDelete.__intrinsic__call(expectedCounts, key);
          else
            SafeMapPrototypeSet.__intrinsic__call(expectedCounts, key, count - 1);
          break;
        }
    return !expectedCounts.size;
  }
  if (isSpecial(actual) || isSpecial(expected))
    return isDeepStrictEqual(actual, expected);
  let keysExpected = ReflectOwnKeys(expected);
  if (comparedObjects ??= new SafeWeakSet, comparedObjects.has(actual))
    return !0;
  if (comparedObjects.add(actual), AssertionError === __intrinsic__undefined)
    loadAssertionError();
  for (let i = 0;i < keysExpected.length; i++) {
    let key = keysExpected[i];
    if (assert(ReflectHas(actual, key), new AssertionError({ message: `Expected key ${__intrinsic__String(key)} not found in actual object` })), !compareBranch(actual[key], expected[key], comparedObjects))
      return !1;
  }
  return !0;
}
assert.partialDeepStrictEqual = function partialDeepStrictEqual(actual, expected, message) {
  if (arguments.length < 2)
    throw __intrinsic__makeErrorWithCode(150, "actual", "expected");
  if (!compareBranch(actual, expected))
    innerFail({
      actual,
      expected,
      message,
      operator: "partialDeepStrictEqual",
      stackStartFn: partialDeepStrictEqual
    });
};

class Comparison {
  constructor(obj, keys, actual) {
    for (let key of keys)
      if (key in obj)
        if (actual !== __intrinsic__undefined && typeof actual[key] === "string" && isRegExp(obj[key]) && RegExpPrototypeExec.__intrinsic__call(obj[key], actual[key]) !== null)
          this[key] = actual[key];
        else
          this[key] = obj[key];
  }
}
function compareExceptionKey(actual, expected, key, message, keys, fn) {
  if (!(key in actual) || !isDeepStrictEqual(actual[key], expected[key])) {
    if (!message) {
      let a = new Comparison(actual, keys), b = new Comparison(expected, keys, actual);
      if (AssertionError === __intrinsic__undefined)
        loadAssertionError();
      let err = new AssertionError({
        actual: a,
        expected: b,
        operator: "deepStrictEqual",
        stackStartFn: fn
      });
      throw err.actual = actual, err.expected = expected, err.operator = fn.name, err;
    }
    innerFail({
      actual,
      expected,
      message,
      operator: fn.name,
      stackStartFn: fn
    });
  }
}
function expectedException(actual, expected, message, fn) {
  let generatedMessage = !1, throwError = !1;
  if (typeof expected !== "function")
    if (isRegExp(expected)) {
      let str = __intrinsic__String(actual);
      if (RegExpPrototypeExec.__intrinsic__call(expected, str) !== null)
        return;
      let inspect = lazyInspect();
      if (!message)
        generatedMessage = !0, message = `The input did not match the regular expression ${inspect(expected)}. Input:

${inspect(str)}
`;
      throwError = !0;
    } else if (typeof actual !== "object" || actual === null) {
      if (AssertionError === __intrinsic__undefined)
        loadAssertionError();
      let err = new AssertionError({
        actual,
        expected,
        message,
        operator: "deepStrictEqual",
        stackStartFn: fn
      });
      throw err.operator = fn.name, err;
    } else {
      let keys = ObjectKeys(expected);
      if (expected instanceof Error)
        ArrayPrototypePush.__intrinsic__call(keys, "name", "message");
      else if (keys.length === 0)
        throw __intrinsic__makeErrorWithCode(119, "error", expected, "may not be an empty object");
      for (let key of keys) {
        if (typeof actual[key] === "string" && isRegExp(expected[key]) && RegExpPrototypeExec.__intrinsic__call(expected[key], actual[key]) !== null)
          continue;
        compareExceptionKey(actual, expected, key, message, keys, fn);
      }
      return;
    }
  else if (expected.prototype !== __intrinsic__undefined && actual instanceof expected)
    return;
  else if (ObjectPrototypeIsPrototypeOf.__intrinsic__call(Error, expected)) {
    if (!message)
      if (generatedMessage = !0, message = `The error is expected to be an instance of "${expected.name}". Received `, Error.isError(actual)) {
        let name = actual.constructor?.name || actual.name;
        if (expected.name === name)
          message += "an error with identical name but a different prototype.";
        else
          message += `"${name}"`;
        if (actual.message)
          message += `

Error message:

${actual.message}`;
      } else
        message += `"${lazyInspect()(actual, { depth: -1 })}"`;
    throwError = !0;
  } else {
    let res = expected.__intrinsic__apply({}, [actual]);
    if (res !== !0) {
      if (!message) {
        generatedMessage = !0;
        let name = expected.name ? `"${expected.name}" ` : "", inspect = lazyInspect();
        if (message = `The ${name}validation function is expected to return "true". Received ${inspect(res)}`, Error.isError(actual))
          message += `

Caught error:

${actual}`;
      }
      throwError = !0;
    }
  }
  if (throwError) {
    if (AssertionError === __intrinsic__undefined)
      loadAssertionError();
    let err = new AssertionError({
      actual,
      expected,
      message,
      operator: fn.name,
      stackStartFn: fn
    });
    throw err.generatedMessage = generatedMessage, err;
  }
}
function getActual(fn) {
  validateFunction(fn, "fn");
  try {
    fn();
  } catch (e) {
    return e;
  }
  return NO_EXCEPTION_SENTINEL;
}
function checkIsPromise(obj) {
  return isPromise(obj) || obj !== null && typeof obj === "object" && typeof obj.then === "function" && typeof obj.catch === "function";
}
async function waitForActual(promiseFn) {
  let resultPromise;
  if (typeof promiseFn === "function") {
    if (resultPromise = promiseFn(), !checkIsPromise(resultPromise))
      throw __intrinsic__makeErrorWithCode(134, "instance of Promise", "promiseFn", resultPromise);
  } else if (checkIsPromise(promiseFn))
    resultPromise = promiseFn;
  else
    throw __intrinsic__makeErrorWithCode(118, "promiseFn", ["function", "an instance of Promise"], promiseFn);
  try {
    await resultPromise;
  } catch (e) {
    return e;
  }
  return NO_EXCEPTION_SENTINEL;
}
function expectsError(stackStartFn, actual, error, message) {
  if (typeof error === "string") {
    if (arguments.length === 4)
      throw __intrinsic__makeErrorWithCode(118, "error", ["Object", "Error", "Function", "RegExp"], error);
    if (typeof actual === "object" && actual !== null) {
      if (actual.message === error)
        throw __intrinsic__makeErrorWithCode(2, "error/message", `The error message "${actual.message}" is identical to the message.`);
      if (Object.keys(error).length === 0)
        throw __intrinsic__makeErrorWithCode(119, "error", error, "may not be an empty object");
    } else if (actual === error)
      throw __intrinsic__makeErrorWithCode(2, "error/message", `The error "${actual}" is identical to the message.`);
    message = error, error = __intrinsic__undefined;
  } else if (error != null && typeof error !== "object" && typeof error !== "function")
    throw __intrinsic__makeErrorWithCode(118, "error", ["Object", "Error", "Function", "RegExp"], error);
  if (actual === NO_EXCEPTION_SENTINEL) {
    let details = "";
    if (error?.name)
      details += ` (${error.name})`;
    details += message ? `: ${message}` : ".";
    let fnType = stackStartFn === assert.rejects ? "rejection" : "exception";
    innerFail({
      actual: __intrinsic__undefined,
      expected: error,
      operator: stackStartFn.name,
      message: `Missing expected ${fnType}${details}`,
      stackStartFn
    });
  }
  if (!error)
    return;
  expectedException(actual, error, message, stackStartFn);
}
function hasMatchingError(actual, expected) {
  if (typeof expected !== "function") {
    if (isRegExp(expected)) {
      let str = __intrinsic__String(actual);
      return RegExpPrototypeExec.__intrinsic__call(expected, str) !== null;
    }
    throw __intrinsic__makeErrorWithCode(118, "expected", ["Function", "RegExp"], expected);
  }
  if (expected.prototype !== __intrinsic__undefined && actual instanceof expected)
    return !0;
  if (ObjectPrototypeIsPrototypeOf.__intrinsic__call(Error, expected))
    return !1;
  return expected.__intrinsic__apply({}, [actual]) === !0;
}
function expectsNoError(stackStartFn, actual, error, message) {
  if (actual === NO_EXCEPTION_SENTINEL)
    return;
  if (typeof error === "string")
    message = error, error = __intrinsic__undefined;
  if (!error || hasMatchingError(actual, error)) {
    let details = message ? `: ${message}` : ".", fnType = stackStartFn === assert.doesNotReject ? "rejection" : "exception";
    innerFail({
      actual,
      expected: error,
      operator: stackStartFn.name,
      message: `Got unwanted ${fnType}${details}
Actual message: "${actual?.message}"`,
      stackStartFn
    });
  }
  throw actual;
}
assert.throws = function throws(promiseFn, ...args) {
  expectsError(throws, getActual(promiseFn), ...args);
};
async function rejects(block, ...args) {
  expectsError(rejects, await waitForActual(block), ...args);
}
assert.rejects = rejects;
assert.doesNotThrow = function doesNotThrow(fn, ...args) {
  expectsNoError(doesNotThrow, getActual(fn), ...args);
};
assert.doesNotReject = async function doesNotReject(fn, ...args) {
  expectsNoError(doesNotReject, await waitForActual(fn), ...args);
};
assert.ifError = function ifError(err) {
  if (err !== null && err !== __intrinsic__undefined) {
    let message = "ifError got unwanted exception: ";
    if (typeof err === "object" && typeof err.message === "string")
      if (err.message.length === 0 && err.constructor)
        message += err.constructor.name;
      else
        message += err.message;
    else {
      let inspect = lazyInspect();
      message += inspect(err);
    }
    if (AssertionError === __intrinsic__undefined)
      loadAssertionError();
    let newErr = new AssertionError({
      actual: err,
      expected: null,
      operator: "ifError",
      message,
      stackStartFn: ifError
    }), origStack = err.stack;
    if (typeof origStack === "string") {
      let origStackStart = StringPrototypeIndexOf.__intrinsic__call(origStack, `
    at`);
      if (origStackStart !== -1) {
        let originalFrames = StringPrototypeSplit.__intrinsic__call(StringPrototypeSlice.__intrinsic__call(origStack, origStackStart + 1), `
`), newFrames = StringPrototypeSplit.__intrinsic__call(newErr.stack, `
`);
        for (let errFrame of originalFrames) {
          let pos = ArrayPrototypeIndexOf.__intrinsic__call(newFrames, errFrame);
          if (pos !== -1) {
            newFrames = ArrayPrototypeSlice.__intrinsic__call(newFrames, 0, pos);
            break;
          }
        }
        let stackStart = ArrayPrototypeJoin.__intrinsic__call(newFrames, `
`), stackEnd = ArrayPrototypeJoin.__intrinsic__call(originalFrames, `
`);
        newErr.stack = `${stackStart}
${stackEnd}`;
      }
    }
    throw newErr;
  }
};
function internalMatch(string, regexp, message, fn) {
  if (!isRegExp(regexp))
    throw __intrinsic__makeErrorWithCode(118, "regexp", "RegExp", regexp);
  let match = fn === assert.match;
  if (typeof string !== "string" || RegExpPrototypeExec.__intrinsic__call(regexp, string) !== null !== match) {
    if (message instanceof Error)
      throw message;
    let generatedMessage = !message, inspect = lazyInspect();
    if (message ||= typeof string !== "string" ? `The "string" argument must be of type string. Received type ${typeof string} (${inspect(string)})` : (match ? "The input did not match the regular expression " : "The input was expected to not match the regular expression ") + `${inspect(regexp)}. Input:

${inspect(string)}
`, AssertionError === __intrinsic__undefined)
      loadAssertionError();
    let err = new AssertionError({
      actual: string,
      expected: regexp,
      message,
      operator: fn.name,
      stackStartFn: fn
    });
    throw err.generatedMessage = generatedMessage, err;
  }
}
assert.match = function match(string, regexp, message) {
  internalMatch(string, regexp, message, match);
};
assert.doesNotMatch = function doesNotMatch(string, regexp, message) {
  internalMatch(string, regexp, message, doesNotMatch);
};
var CallTracker;
Object.defineProperty(assert, "CallTracker", {
  get() {
    if (CallTracker === __intrinsic__undefined) {
      let { deprecate } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 65) || __intrinsic__createInternalModuleById(65);
      CallTracker = deprecate(__intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 5) || __intrinsic__createInternalModuleById(5), "assert.CallTracker is deprecated.", "DEP0173");
    }
    return CallTracker;
  },
  set(value) {
    CallTracker = value;
  },
  configurable: !0,
  enumerable: !0
});
function strict(...args) {
  innerOk(strict, args.length, ...args);
}
assert.strict = ObjectAssign(strict, assert, {
  equal: assert.strictEqual,
  deepEqual: assert.deepStrictEqual,
  notEqual: assert.notStrictEqual,
  notDeepEqual: assert.notDeepStrictEqual
});
assert.strict.strict = assert.strict;
$$EXPORT$$($).$$EXPORT_END$$;
