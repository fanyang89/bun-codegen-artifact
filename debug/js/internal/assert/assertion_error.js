(function (){"use strict";// build/debug/tmp_modules/internal/assert/assertion_error.ts
var $;
var { inspect } = @getInternalField(@internalModuleRegistry, 66) || @createInternalModuleById(66);
var colors = @getInternalField(@internalModuleRegistry, 64) || @createInternalModuleById(64);
var { validateObject } = @getInternalField(@internalModuleRegistry, 68) || @createInternalModuleById(68);
var { myersDiff, printMyersDiff, printSimpleMyersDiff } = @getInternalField(@internalModuleRegistry, 6) || @createInternalModuleById(6);
var ErrorCaptureStackTrace = Error.captureStackTrace;
var ObjectAssign = Object.assign;
var ObjectDefineProperty = Object.defineProperty;
var ObjectGetPrototypeOf = Object.getPrototypeOf;
var ObjectPrototypeHasOwnProperty = Object.prototype.hasOwnProperty;
var ArrayPrototypeJoin = @Array.prototype.join;
var ArrayPrototypePop = @Array.prototype.pop;
var ArrayPrototypeSlice = @Array.prototype.slice;
var StringPrototypeRepeat = @String.prototype.repeat;
var StringPrototypeSlice = @String.prototype.slice;
var StringPrototypeSplit = @String.prototype.split;
var kReadableOperator = {
  deepStrictEqual: "Expected values to be strictly deep-equal:",
  strictEqual: "Expected values to be strictly equal:",
  strictEqualObject: 'Expected "actual" to be reference-equal to "expected":',
  deepEqual: "Expected values to be loosely deep-equal:",
  notDeepStrictEqual: 'Expected "actual" not to be strictly deep-equal to:',
  notStrictEqual: 'Expected "actual" to be strictly unequal to:',
  notStrictEqualObject: 'Expected "actual" not to be reference-equal to "expected":',
  notDeepEqual: 'Expected "actual" not to be loosely deep-equal to:',
  notIdentical: "Values have same structure but are not reference-equal:",
  notDeepEqualUnequal: "Expected values not to be loosely deep-equal:"
};
var kMaxShortStringLength = 12;
var kMaxLongStringLength = 512;
function copyError(source) {
  const target = ObjectAssign({ __proto__: ObjectGetPrototypeOf(source) }, source);
  ObjectDefineProperty(target, "message", {
    __proto__: null,
    value: source.message
  });
  if (ObjectPrototypeHasOwnProperty.@call(source, "cause")) {
    let { cause } = source;
    if (Error.isError(cause)) {
      cause = copyError(cause);
    }
    ObjectDefineProperty(target, "cause", { __proto__: null, value: cause });
  }
  return target;
}
function inspectValue(val) {
  return inspect(val, {
    compact: false,
    customInspect: false,
    depth: 1000,
    maxArrayLength: @Infinity,
    showHidden: false,
    showProxy: false,
    sorted: true,
    getters: true
  });
}
function getErrorMessage(operator, message) {
  return message || kReadableOperator[operator];
}
function checkOperator(actual, expected, operator) {
  if (operator === "strictEqual" && (typeof actual === "object" && actual !== null && typeof expected === "object" && expected !== null || typeof actual === "function" && typeof expected === "function")) {
    operator = "strictEqualObject";
  }
  return operator;
}
function getColoredMyersDiff(actual, expected) {
  const header = `${colors.green}actual${colors.white} ${colors.red}expected${colors.white}`;
  const skipped = false;
  const diff = myersDiff(actual, expected, false, false);
  let message = printSimpleMyersDiff(diff);
  if (skipped) {
    message += "...";
  }
  return { message, header, skipped };
}
function getStackedDiff(actual, expected) {
  const isStringComparison = typeof actual === "string" && typeof expected === "string";
  let message = `
${colors.green}+${colors.white} ${actual}
${colors.red}- ${colors.white}${expected}`;
  const stringsLen = actual.length + expected.length;
  const maxTerminalLength = process.stderr.isTTY ? process.stderr.columns : 80;
  const showIndicator = isStringComparison && stringsLen <= maxTerminalLength;
  if (showIndicator) {
    let indicatorIdx = -1;
    for (let i = 0;i < actual.length; i++) {
      if (actual[i] !== expected[i]) {
        if (i >= 3) {
          indicatorIdx = i;
        }
        break;
      }
    }
    if (indicatorIdx !== -1) {
      message += `
${StringPrototypeRepeat.@call(" ", indicatorIdx + 2)}^`;
    }
  }
  return { message };
}
function getSimpleDiff(originalActual, actual, originalExpected, expected) {
  let stringsLen = actual.length + expected.length;
  if (typeof originalActual === "string") {
    stringsLen -= 2;
  }
  if (typeof originalExpected === "string") {
    stringsLen -= 2;
  }
  if (stringsLen <= kMaxShortStringLength && (originalActual !== 0 || originalExpected !== 0)) {
    return { message: `${actual} !== ${expected}`, header: "" };
  }
  const isStringComparison = typeof originalActual === "string" && typeof originalExpected === "string";
  if (isStringComparison && colors.hasColors) {
    return getColoredMyersDiff(actual, expected);
  }
  return getStackedDiff(actual, expected);
}
function isSimpleDiff(actual, inspectedActual, expected, inspectedExpected) {
  if (inspectedActual.length > 1 || inspectedExpected.length > 1) {
    return false;
  }
  return typeof actual !== "object" || actual === null || typeof expected !== "object" || expected === null;
}
function createErrDiff(actual, expected, operator, customMessage) {
  operator = checkOperator(actual, expected, operator);
  let skipped = false;
  let message = "";
  const inspectedActual = inspectValue(actual);
  const inspectedExpected = inspectValue(expected);
  const inspectedSplitActual = StringPrototypeSplit.@call(inspectedActual, `
`);
  const inspectedSplitExpected = StringPrototypeSplit.@call(inspectedExpected, `
`);
  const showSimpleDiff = isSimpleDiff(actual, inspectedSplitActual, expected, inspectedSplitExpected);
  let header = `${colors.green}+ actual${colors.white} ${colors.red}- expected${colors.white}`;
  if (showSimpleDiff) {
    const simpleDiff = getSimpleDiff(actual, inspectedSplitActual[0], expected, inspectedSplitExpected[0]);
    message = simpleDiff.message;
    if (typeof simpleDiff.header !== "undefined") {
      header = simpleDiff.header;
    }
    if (simpleDiff.skipped) {
      skipped = true;
    }
  } else if (inspectedActual === inspectedExpected) {
    operator = "notIdentical";
    if (inspectedSplitActual.length > 50) {
      message = `${ArrayPrototypeJoin.@call(ArrayPrototypeSlice.@call(inspectedSplitActual, 0, 50), `
`)}
...}`;
      skipped = true;
    } else {
      message = ArrayPrototypeJoin.@call(inspectedSplitActual, `
`);
    }
    header = "";
  } else {
    const checkCommaDisparity = actual != null && typeof actual === "object";
    const diff = myersDiff(inspectedActual, inspectedExpected, checkCommaDisparity, true);
    const myersDiffMessage = printMyersDiff(diff);
    message = myersDiffMessage.message;
    if (myersDiffMessage.skipped) {
      skipped = true;
    }
  }
  const headerMessage = `${getErrorMessage(operator, customMessage)}
${header}`;
  const skippedMessage = skipped ? `
... Skipped lines` : "";
  return `${headerMessage}${skippedMessage}
${message}
`;
}
function addEllipsis(string) {
  const lines = StringPrototypeSplit.@call(string, `
`, 11);
  if (lines.length > 10) {
    lines.length = 10;
    return `${ArrayPrototypeJoin.@call(lines, `
`)}
...`;
  } else if (string.length > kMaxLongStringLength) {
    return `${StringPrototypeSlice.@call(string, kMaxLongStringLength)}...`;
  }
  return string;
}

class AssertionError extends Error {
  generatedMessage;
  actual;
  expected;
  operator;
  constructor(options) {
    validateObject(options, "options");
    const {
      message,
      operator,
      stackStartFn,
      details,
      stackStartFunction
    } = options;
    let { actual, expected } = options;
    const limit = Error.stackTraceLimit;
    Error.stackTraceLimit = 0;
    if (message != null) {
      if (operator === "deepStrictEqual" || operator === "strictEqual") {
        super(createErrDiff(actual, expected, operator, message));
      } else {
        super(@String(message));
      }
    } else {
      colors.refresh();
      if (typeof actual === "object" && actual !== null && typeof expected === "object" && expected !== null && "stack" in actual && actual instanceof Error && "stack" in expected && expected instanceof Error) {
        actual = copyError(actual);
        expected = copyError(expected);
      }
      if (operator === "deepStrictEqual" || operator === "strictEqual") {
        super(createErrDiff(actual, expected, operator, message));
      } else if (operator === "notDeepStrictEqual" || operator === "notStrictEqual") {
        let base = kReadableOperator[operator];
        const res = StringPrototypeSplit.@call(inspectValue(actual), `
`);
        if (operator === "notStrictEqual" && (typeof actual === "object" && actual !== null || typeof actual === "function")) {
          base = kReadableOperator.notStrictEqualObject;
        }
        if (res.length > 50) {
          res[46] = `${colors.blue}...${colors.white}`;
          while (res.length > 47) {
            ArrayPrototypePop.@call(res);
          }
        }
        if (res.length === 1) {
          super(`${base}${res[0].length > 5 ? `

` : " "}${res[0]}`);
        } else {
          super(`${base}

${ArrayPrototypeJoin.@call(res, `
`)}
`);
        }
      } else {
        let res = inspectValue(actual);
        let other = inspectValue(expected);
        const knownOperator = kReadableOperator[operator];
        if (operator === "notDeepEqual" && res === other) {
          res = `${knownOperator}

${res}`;
          if (res.length > 1024) {
            res = `${StringPrototypeSlice.@call(res, 0, 1021)}...`;
          }
          super(res);
        } else {
          if (res.length > kMaxLongStringLength) {
            res = `${StringPrototypeSlice.@call(res, 0, 509)}...`;
          }
          if (other.length > kMaxLongStringLength) {
            other = `${StringPrototypeSlice.@call(other, 0, 509)}...`;
          }
          if (operator === "deepEqual") {
            res = `${knownOperator}

${res}

should loosely deep-equal

`;
          } else {
            const newOp = kReadableOperator[`${operator}Unequal`];
            if (newOp) {
              res = `${newOp}

${res}

should not loosely deep-equal

`;
            } else {
              other = ` ${operator} ${other}`;
            }
          }
          super(`${res}${other}`);
        }
      }
    }
    Error.stackTraceLimit = limit;
    this.generatedMessage = !message;
    ObjectDefineProperty(this, "name", {
      __proto__: null,
      value: "AssertionError [ERR_ASSERTION]",
      enumerable: false,
      writable: true,
      configurable: true
    });
    this.code = "ERR_ASSERTION";
    if (details) {
      for (let i = 0;i < details.length; i++) {
        this["message " + i] = details[i].message;
        this["actual " + i] = details[i].actual;
        this["expected " + i] = details[i].expected;
        this["operator " + i] = details[i].operator;
        this["stack trace " + i] = details[i].stack;
      }
    } else {
      this.actual = actual;
      this.expected = expected;
      this.operator = operator;
    }
    ErrorCaptureStackTrace(this, stackStartFn || stackStartFunction);
    {
      const s = this.stack;
      if (@isUndefinedOrNull(s) || typeof s === "string" && s.indexOf(`
    at `) === -1) {
        ErrorCaptureStackTrace(this, AssertionError);
      }
    }
    this.stack;
    this.name = "AssertionError";
  }
  toString() {
    return `${this.name} [${this.code}]: ${this.message}`;
  }
  [inspect.custom](recurseTimes, ctx) {
    const tmpActual = this.actual;
    const tmpExpected = this.expected;
    if (typeof this.actual === "string") {
      this.actual = addEllipsis(this.actual);
    }
    if (typeof this.expected === "string") {
      this.expected = addEllipsis(this.expected);
    }
    const result = inspect(this, {
      ...ctx,
      customInspect: false,
      depth: 0
    });
    this.actual = tmpActual;
    this.expected = tmpExpected;
    return result;
  }
}
$ = AssertionError;
return $})
