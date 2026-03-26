(function (){"use strict";// build/debug/tmp_modules/node/assert.ts
var $;
var { SafeMap, SafeSet, SafeWeakSet } = @getInternalField(@internalModuleRegistry, 30) || @createInternalModuleById(30);
var {
  isKeyObject,
  isPromise,
  isRegExp,
  isMap,
  isSet,
  isDate,
  isWeakSet,
  isWeakMap,
  isAnyArrayBuffer
} = @getInternalField(@internalModuleRegistry, 144) || @createInternalModuleById(144);
var { innerOk } = @getInternalField(@internalModuleRegistry, 7) || @createInternalModuleById(7);
var { validateFunction } = @getInternalField(@internalModuleRegistry, 68) || @createInternalModuleById(68);
var ArrayFrom = @Array.from;
var ArrayPrototypeIndexOf = @Array.prototype.indexOf;
var ArrayPrototypeJoin = @Array.prototype.join;
var ArrayPrototypePush = @Array.prototype.push;
var ArrayPrototypeSlice = @Array.prototype.slice;
var ArrayBufferIsView = @ArrayBuffer.isView;
var NumberIsNaN = Number.isNaN;
var ObjectAssign = Object.assign;
var ObjectIs = Object.is;
var ObjectKeys = Object.keys;
var ObjectPrototypeIsPrototypeOf = Object.prototype.isPrototypeOf;
var ReflectHas = Reflect.has;
var ReflectOwnKeys = Reflect.ownKeys;
var RegExpPrototypeExec = @RegExp.prototype.exec;
var StringPrototypeIndexOf = @String.prototype.indexOf;
var StringPrototypeSlice = @String.prototype.slice;
var StringPrototypeSplit = @String.prototype.split;
var SymbolIterator = Symbol.iterator;
function isDeepEqual(a, b) {
  return Bun.deepEquals(a, b, false);
}
function isDeepStrictEqual(a, b) {
  return Bun.deepEquals(a, b, true);
}
var _inspect;
function lazyInspect() {
  if (_inspect === @undefined) {
    _inspect = (@getInternalField(@internalModuleRegistry, 66) || @createInternalModuleById(66)).inspect;
  }
  return _inspect;
}
var AssertionError;
function loadAssertionError() {
  if (AssertionError === @undefined) {
    AssertionError = @getInternalField(@internalModuleRegistry, 4) || @createInternalModuleById(4);
  }
}
var warned = false;
var assert = ok;
$ = assert;
var NO_EXCEPTION_SENTINEL = {};
function innerFail(obj) {
  if (obj.message instanceof Error)
    throw obj.message;
  throw new AssertionError(obj);
}
function fail(actual, expected, message, operator, stackStartFn) {
  const argsLen = arguments.length;
  let internalMessage = false;
  if (actual == null && argsLen <= 1) {
    internalMessage = true;
    message = "Failed";
  } else if (argsLen === 1) {
    message = actual;
    actual = @undefined;
  } else {
    if (warned === false) {
      warned = true;
      process.emitWarning("assert.fail() with more than one argument is deprecated. " + "Please use assert.strictEqual() instead or only pass a message.", "DeprecationWarning", "DEP0094");
    }
    if (argsLen === 2)
      operator = "!=";
  }
  if (message instanceof Error)
    throw message;
  const errArgs = {
    actual,
    expected,
    operator: operator === @undefined ? "fail" : operator,
    stackStartFn: stackStartFn || fail,
    message
  };
  if (AssertionError === @undefined)
    loadAssertionError();
  const err = new AssertionError(errArgs);
  if (internalMessage) {
    err.generatedMessage = true;
  }
  throw err;
}
assert.fail = fail;
assert.AssertionError = AssertionError;
Object.defineProperty(assert, "AssertionError", {
  get() {
    loadAssertionError();
    return AssertionError;
  },
  set(value) {
    AssertionError = value;
  },
  configurable: true,
  enumerable: true
});
function ok(...args) {
  innerOk(ok, args.length, ...args);
}
assert.ok = ok;
assert.equal = function equal(actual, expected, message) {
  if (arguments.length < 2) {
    throw @makeErrorWithCode(150, "actual", "expected");
  }
  if (actual != expected && (!NumberIsNaN(actual) || !NumberIsNaN(expected))) {
    innerFail({
      actual,
      expected,
      message,
      operator: "==",
      stackStartFn: equal
    });
  }
};
assert.notEqual = function notEqual(actual, expected, message) {
  if (arguments.length < 2) {
    throw @makeErrorWithCode(150, "actual", "expected");
  }
  if (actual == expected || NumberIsNaN(actual) && NumberIsNaN(expected)) {
    innerFail({
      actual,
      expected,
      message,
      operator: "!=",
      stackStartFn: notEqual
    });
  }
};
assert.deepEqual = function deepEqual(actual, expected, message) {
  if (arguments.length < 2) {
    throw @makeErrorWithCode(150, "actual", "expected");
  }
  if (!isDeepEqual(actual, expected)) {
    innerFail({
      actual,
      expected,
      message,
      operator: "deepEqual",
      stackStartFn: deepEqual
    });
  }
};
assert.notDeepEqual = function notDeepEqual(actual, expected, message) {
  if (arguments.length < 2) {
    throw @makeErrorWithCode(150, "actual", "expected");
  }
  if (isDeepEqual(actual, expected)) {
    innerFail({
      actual,
      expected,
      message,
      operator: "notDeepEqual",
      stackStartFn: notDeepEqual
    });
  }
};
assert.deepStrictEqual = function deepStrictEqual(actual, expected, message) {
  if (arguments.length < 2) {
    throw @makeErrorWithCode(150, "actual", "expected");
  }
  if (!isDeepStrictEqual(actual, expected)) {
    innerFail({
      actual,
      expected,
      message,
      operator: "deepStrictEqual",
      stackStartFn: deepStrictEqual
    });
  }
};
assert.notDeepStrictEqual = notDeepStrictEqual;
function notDeepStrictEqual(actual, expected, message) {
  if (arguments.length < 2) {
    throw @makeErrorWithCode(150, "actual", "expected");
  }
  if (isDeepStrictEqual(actual, expected)) {
    innerFail({
      actual,
      expected,
      message,
      operator: "notDeepStrictEqual",
      stackStartFn: notDeepStrictEqual
    });
  }
}
assert.strictEqual = function strictEqual(actual, expected, message) {
  if (arguments.length < 2) {
    throw @makeErrorWithCode(150, "actual", "expected");
  }
  if (!ObjectIs(actual, expected)) {
    innerFail({
      actual,
      expected,
      message,
      operator: "strictEqual",
      stackStartFn: strictEqual
    });
  }
};
assert.notStrictEqual = function notStrictEqual(actual, expected, message) {
  if (arguments.length < 2) {
    throw @makeErrorWithCode(150, "actual", "expected");
  }
  if (ObjectIs(actual, expected)) {
    innerFail({
      actual,
      expected,
      message,
      operator: "notStrictEqual",
      stackStartFn: notStrictEqual
    });
  }
};
function isSpecial(obj) {
  return obj == null || typeof obj !== "object" || Error.isError(obj) || isRegExp(obj) || isDate(obj);
}
var typesToCallDeepStrictEqualWith = [isKeyObject, isWeakSet, isWeakMap, @Buffer.isBuffer];
var SafeSetPrototypeIterator = SafeSet.prototype[SymbolIterator];
var SafeMapPrototypeIterator = SafeMap.prototype[SymbolIterator];
var SafeMapPrototypeHas = SafeMap.prototype.has;
var SafeMapPrototypeGet = SafeMap.prototype.get;
var SafeMapPrototypeSet = SafeMap.prototype.set;
var SafeMapPrototypeDelete = SafeMap.prototype.delete;
function compareBranch(actual, expected, comparedObjects) {
  if (isMap(actual) && isMap(expected)) {
    if (expected.size > actual.size) {
      return false;
    }
    comparedObjects ??= new SafeWeakSet;
    if (comparedObjects.has(actual)) {
      return true;
    }
    comparedObjects.add(actual);
    const expectedIterator = SafeMapPrototypeIterator.@call(expected);
    for (const { 0: key, 1: expectedValue } of expectedIterator) {
      if (!SafeMapPrototypeHas.@call(actual, key)) {
        return false;
      }
      const actualValue = SafeMapPrototypeGet.@call(actual, key);
      if (!compareBranch(actualValue, expectedValue, comparedObjects)) {
        return false;
      }
    }
    return true;
  }
  if (ArrayBufferIsView(actual) || isAnyArrayBuffer(actual) || ArrayBufferIsView(expected) || isAnyArrayBuffer(expected)) {
    return Bun.deepEquals(actual, expected, true);
  }
  for (const type of typesToCallDeepStrictEqualWith) {
    if (type(actual) || type(expected)) {
      return isDeepStrictEqual(actual, expected);
    }
  }
  if (isSet(actual) && isSet(expected)) {
    if (expected.size > actual.size) {
      return false;
    }
    const actualArray = ArrayFrom(SafeSetPrototypeIterator.@call(actual));
    const expectedIterator = SafeSetPrototypeIterator.@call(expected);
    const usedIndices = new SafeSet;
    expectedIteration:
      for (const expectedItem of expectedIterator) {
        for (let actualIdx = 0;actualIdx < actualArray.length; actualIdx++) {
          if (!usedIndices.has(actualIdx) && isDeepStrictEqual(actualArray[actualIdx], expectedItem)) {
            usedIndices.add(actualIdx);
            continue expectedIteration;
          }
        }
        return false;
      }
    return true;
  }
  if (@isArray(actual) && @isArray(expected)) {
    if (expected.length > actual.length) {
      return false;
    }
    const expectedCounts = new SafeMap;
    for (const expectedItem of expected) {
      let found = false;
      for (const { 0: key, 1: count } of expectedCounts) {
        if (isDeepStrictEqual(key, expectedItem)) {
          SafeMapPrototypeSet.@call(expectedCounts, key, count + 1);
          found = true;
          break;
        }
      }
      if (!found) {
        SafeMapPrototypeSet.@call(expectedCounts, expectedItem, 1);
      }
    }
    for (const actualItem of actual) {
      for (const { 0: key, 1: count } of expectedCounts) {
        if (isDeepStrictEqual(key, actualItem)) {
          if (count === 1) {
            SafeMapPrototypeDelete.@call(expectedCounts, key);
          } else {
            SafeMapPrototypeSet.@call(expectedCounts, key, count - 1);
          }
          break;
        }
      }
    }
    return !expectedCounts.size;
  }
  if (isSpecial(actual) || isSpecial(expected)) {
    return isDeepStrictEqual(actual, expected);
  }
  const keysExpected = ReflectOwnKeys(expected);
  comparedObjects ??= new SafeWeakSet;
  if (comparedObjects.has(actual)) {
    return true;
  }
  comparedObjects.add(actual);
  if (AssertionError === @undefined)
    loadAssertionError();
  for (let i = 0;i < keysExpected.length; i++) {
    const key = keysExpected[i];
    assert(ReflectHas(actual, key), new AssertionError({ message: `Expected key ${@String(key)} not found in actual object` }));
    if (!compareBranch(actual[key], expected[key], comparedObjects)) {
      return false;
    }
  }
  return true;
}
assert.partialDeepStrictEqual = function partialDeepStrictEqual(actual, expected, message) {
  if (arguments.length < 2) {
    throw @makeErrorWithCode(150, "actual", "expected");
  }
  if (!compareBranch(actual, expected)) {
    innerFail({
      actual,
      expected,
      message,
      operator: "partialDeepStrictEqual",
      stackStartFn: partialDeepStrictEqual
    });
  }
};

class Comparison {
  constructor(obj, keys, actual) {
    for (const key of keys) {
      if (key in obj) {
        if (actual !== @undefined && typeof actual[key] === "string" && isRegExp(obj[key]) && RegExpPrototypeExec.@call(obj[key], actual[key]) !== null) {
          this[key] = actual[key];
        } else {
          this[key] = obj[key];
        }
      }
    }
  }
}
function compareExceptionKey(actual, expected, key, message, keys, fn) {
  if (!(key in actual) || !isDeepStrictEqual(actual[key], expected[key])) {
    if (!message) {
      const a = new Comparison(actual, keys);
      const b = new Comparison(expected, keys, actual);
      if (AssertionError === @undefined)
        loadAssertionError();
      const err = new AssertionError({
        actual: a,
        expected: b,
        operator: "deepStrictEqual",
        stackStartFn: fn
      });
      err.actual = actual;
      err.expected = expected;
      err.operator = fn.name;
      throw err;
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
  let generatedMessage = false;
  let throwError = false;
  if (typeof expected !== "function") {
    if (isRegExp(expected)) {
      const str = @String(actual);
      if (RegExpPrototypeExec.@call(expected, str) !== null)
        return;
      const inspect = lazyInspect();
      if (!message) {
        generatedMessage = true;
        message = "The input did not match the regular expression " + `${inspect(expected)}. Input:

${inspect(str)}
`;
      }
      throwError = true;
    } else if (typeof actual !== "object" || actual === null) {
      if (AssertionError === @undefined)
        loadAssertionError();
      const err = new AssertionError({
        actual,
        expected,
        message,
        operator: "deepStrictEqual",
        stackStartFn: fn
      });
      err.operator = fn.name;
      throw err;
    } else {
      const keys = ObjectKeys(expected);
      if (expected instanceof Error) {
        ArrayPrototypePush.@call(keys, "name", "message");
      } else if (keys.length === 0) {
        throw @makeErrorWithCode(119, "error", expected, "may not be an empty object");
      }
      for (const key of keys) {
        if (typeof actual[key] === "string" && isRegExp(expected[key]) && RegExpPrototypeExec.@call(expected[key], actual[key]) !== null) {
          continue;
        }
        compareExceptionKey(actual, expected, key, message, keys, fn);
      }
      return;
    }
  } else if (expected.prototype !== @undefined && actual instanceof expected) {
    return;
  } else if (ObjectPrototypeIsPrototypeOf.@call(Error, expected)) {
    if (!message) {
      generatedMessage = true;
      message = "The error is expected to be an instance of " + `"${expected.name}". Received `;
      if (Error.isError(actual)) {
        const name = actual.constructor?.name || actual.name;
        if (expected.name === name) {
          message += "an error with identical name but a different prototype.";
        } else {
          message += `"${name}"`;
        }
        if (actual.message) {
          message += `

Error message:

${actual.message}`;
        }
      } else {
        message += `"${lazyInspect()(actual, { depth: -1 })}"`;
      }
    }
    throwError = true;
  } else {
    const res = expected.@apply({}, [actual]);
    if (res !== true) {
      if (!message) {
        generatedMessage = true;
        const name = expected.name ? `"${expected.name}" ` : "";
        const inspect = lazyInspect();
        message = `The ${name}validation function is expected to return` + ` "true". Received ${inspect(res)}`;
        if (Error.isError(actual)) {
          message += `

Caught error:

${actual}`;
        }
      }
      throwError = true;
    }
  }
  if (throwError) {
    if (AssertionError === @undefined)
      loadAssertionError();
    const err = new AssertionError({
      actual,
      expected,
      message,
      operator: fn.name,
      stackStartFn: fn
    });
    err.generatedMessage = generatedMessage;
    throw err;
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
    resultPromise = promiseFn();
    if (!checkIsPromise(resultPromise)) {
      throw @makeErrorWithCode(134, "instance of Promise", "promiseFn", resultPromise);
    }
  } else if (checkIsPromise(promiseFn)) {
    resultPromise = promiseFn;
  } else {
    throw @makeErrorWithCode(118, "promiseFn", ["function", "an instance of Promise"], promiseFn);
  }
  try {
    await resultPromise;
  } catch (e) {
    return e;
  }
  return NO_EXCEPTION_SENTINEL;
}
function expectsError(stackStartFn, actual, error, message) {
  if (typeof error === "string") {
    if (arguments.length === 4) {
      throw @makeErrorWithCode(118, "error", ["Object", "Error", "Function", "RegExp"], error);
    }
    if (typeof actual === "object" && actual !== null) {
      if (actual.message === error) {
        throw @makeErrorWithCode(2, "error/message", `The error message "${actual.message}" is identical to the message.`);
      }
      if (Object.keys(error).length === 0) {
        throw @makeErrorWithCode(119, "error", error, "may not be an empty object");
      }
    } else if (actual === error) {
      throw @makeErrorWithCode(2, "error/message", `The error "${actual}" is identical to the message.`);
    }
    message = error;
    error = @undefined;
  } else if (error != null && typeof error !== "object" && typeof error !== "function") {
    throw @makeErrorWithCode(118, "error", ["Object", "Error", "Function", "RegExp"], error);
  }
  if (actual === NO_EXCEPTION_SENTINEL) {
    let details = "";
    if (error?.name) {
      details += ` (${error.name})`;
    }
    details += message ? `: ${message}` : ".";
    const fnType = stackStartFn === assert.rejects ? "rejection" : "exception";
    innerFail({
      actual: @undefined,
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
      const str = @String(actual);
      return RegExpPrototypeExec.@call(expected, str) !== null;
    }
    throw @makeErrorWithCode(118, "expected", ["Function", "RegExp"], expected);
  }
  if (expected.prototype !== @undefined && actual instanceof expected) {
    return true;
  }
  if (ObjectPrototypeIsPrototypeOf.@call(Error, expected)) {
    return false;
  }
  return expected.@apply({}, [actual]) === true;
}
function expectsNoError(stackStartFn, actual, error, message) {
  if (actual === NO_EXCEPTION_SENTINEL)
    return;
  if (typeof error === "string") {
    message = error;
    error = @undefined;
  }
  if (!error || hasMatchingError(actual, error)) {
    const details = message ? `: ${message}` : ".";
    const fnType = stackStartFn === assert.doesNotReject ? "rejection" : "exception";
    innerFail({
      actual,
      expected: error,
      operator: stackStartFn.name,
      message: `Got unwanted ${fnType}${details}
` + `Actual message: "${actual?.message}"`,
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
  if (err !== null && err !== @undefined) {
    let message = "ifError got unwanted exception: ";
    if (typeof err === "object" && typeof err.message === "string") {
      if (err.message.length === 0 && err.constructor) {
        message += err.constructor.name;
      } else {
        message += err.message;
      }
    } else {
      const inspect = lazyInspect();
      message += inspect(err);
    }
    if (AssertionError === @undefined)
      loadAssertionError();
    const newErr = new AssertionError({
      actual: err,
      expected: null,
      operator: "ifError",
      message,
      stackStartFn: ifError
    });
    const origStack = err.stack;
    if (typeof origStack === "string") {
      const origStackStart = StringPrototypeIndexOf.@call(origStack, `
    at`);
      if (origStackStart !== -1) {
        const originalFrames = StringPrototypeSplit.@call(StringPrototypeSlice.@call(origStack, origStackStart + 1), `
`);
        let newFrames = StringPrototypeSplit.@call(newErr.stack, `
`);
        for (const errFrame of originalFrames) {
          const pos = ArrayPrototypeIndexOf.@call(newFrames, errFrame);
          if (pos !== -1) {
            newFrames = ArrayPrototypeSlice.@call(newFrames, 0, pos);
            break;
          }
        }
        const stackStart = ArrayPrototypeJoin.@call(newFrames, `
`);
        const stackEnd = ArrayPrototypeJoin.@call(originalFrames, `
`);
        newErr.stack = `${stackStart}
${stackEnd}`;
      }
    }
    throw newErr;
  }
};
function internalMatch(string, regexp, message, fn) {
  if (!isRegExp(regexp)) {
    throw @makeErrorWithCode(118, "regexp", "RegExp", regexp);
  }
  const match = fn === assert.match;
  if (typeof string !== "string" || RegExpPrototypeExec.@call(regexp, string) !== null !== match) {
    if (message instanceof Error) {
      throw message;
    }
    const generatedMessage = !message;
    const inspect = lazyInspect();
    message ||= typeof string !== "string" ? 'The "string" argument must be of type string. Received type ' + `${typeof string} (${inspect(string)})` : (match ? "The input did not match the regular expression " : "The input was expected to not match the regular expression ") + `${inspect(regexp)}. Input:

${inspect(string)}
`;
    if (AssertionError === @undefined)
      loadAssertionError();
    const err = new AssertionError({
      actual: string,
      expected: regexp,
      message,
      operator: fn.name,
      stackStartFn: fn
    });
    err.generatedMessage = generatedMessage;
    throw err;
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
    if (CallTracker === @undefined) {
      const { deprecate } = @getInternalField(@internalModuleRegistry, 65) || @createInternalModuleById(65);
      CallTracker = deprecate(@getInternalField(@internalModuleRegistry, 5) || @createInternalModuleById(5), "assert.CallTracker is deprecated.", "DEP0173");
    }
    return CallTracker;
  },
  set(value) {
    CallTracker = value;
  },
  configurable: true,
  enumerable: true
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
return $})
