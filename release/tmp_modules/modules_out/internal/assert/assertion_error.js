// @bun
// build/release/tmp_modules/internal/assert/assertion_error.ts
var $, { inspect } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 66) || __intrinsic__createInternalModuleById(66), colors = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 64) || __intrinsic__createInternalModuleById(64), { validateObject } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 68) || __intrinsic__createInternalModuleById(68), { myersDiff, printMyersDiff, printSimpleMyersDiff } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 6) || __intrinsic__createInternalModuleById(6), ErrorCaptureStackTrace = Error.captureStackTrace, ObjectAssign = Object.assign, ObjectDefineProperty = Object.defineProperty, ObjectGetPrototypeOf = Object.getPrototypeOf, ObjectPrototypeHasOwnProperty = Object.prototype.hasOwnProperty, ArrayPrototypeJoin = __intrinsic__Array.prototype.join, ArrayPrototypePop = __intrinsic__Array.prototype.pop, ArrayPrototypeSlice = __intrinsic__Array.prototype.slice, StringPrototypeRepeat = __intrinsic__String.prototype.repeat, StringPrototypeSlice = __intrinsic__String.prototype.slice, StringPrototypeSplit = __intrinsic__String.prototype.split, kReadableOperator = {
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
}, kMaxShortStringLength = 12, kMaxLongStringLength = 512;
function copyError(source) {
  let target = ObjectAssign({ __proto__: ObjectGetPrototypeOf(source) }, source);
  if (ObjectDefineProperty(target, "message", {
    __proto__: null,
    value: source.message
  }), ObjectPrototypeHasOwnProperty.__intrinsic__call(source, "cause")) {
    let { cause } = source;
    if (Error.isError(cause))
      cause = copyError(cause);
    ObjectDefineProperty(target, "cause", { __proto__: null, value: cause });
  }
  return target;
}
function inspectValue(val) {
  return inspect(val, {
    compact: !1,
    customInspect: !1,
    depth: 1000,
    maxArrayLength: __intrinsic__Infinity,
    showHidden: !1,
    showProxy: !1,
    sorted: !0,
    getters: !0
  });
}
function getErrorMessage(operator, message) {
  return message || kReadableOperator[operator];
}
function checkOperator(actual, expected, operator) {
  if (operator === "strictEqual" && (typeof actual === "object" && actual !== null && typeof expected === "object" && expected !== null || typeof actual === "function" && typeof expected === "function"))
    operator = "strictEqualObject";
  return operator;
}
function getColoredMyersDiff(actual, expected) {
  let header = `${colors.green}actual${colors.white} ${colors.red}expected${colors.white}`, skipped = !1, diff = myersDiff(actual, expected, !1, !1);
  return { message: printSimpleMyersDiff(diff), header, skipped: !1 };
}
function getStackedDiff(actual, expected) {
  let isStringComparison = typeof actual === "string" && typeof expected === "string", message = `
${colors.green}+${colors.white} ${actual}
${colors.red}- ${colors.white}${expected}`, stringsLen = actual.length + expected.length, maxTerminalLength = process.stderr.isTTY ? process.stderr.columns : 80;
  if (isStringComparison && stringsLen <= maxTerminalLength) {
    let indicatorIdx = -1;
    for (let i = 0;i < actual.length; i++)
      if (actual[i] !== expected[i]) {
        if (i >= 3)
          indicatorIdx = i;
        break;
      }
    if (indicatorIdx !== -1)
      message += `
${StringPrototypeRepeat.__intrinsic__call(" ", indicatorIdx + 2)}^`;
  }
  return { message };
}
function getSimpleDiff(originalActual, actual, originalExpected, expected) {
  let stringsLen = actual.length + expected.length;
  if (typeof originalActual === "string")
    stringsLen -= 2;
  if (typeof originalExpected === "string")
    stringsLen -= 2;
  if (stringsLen <= kMaxShortStringLength && (originalActual !== 0 || originalExpected !== 0))
    return { message: `${actual} !== ${expected}`, header: "" };
  if (typeof originalActual === "string" && typeof originalExpected === "string" && colors.hasColors)
    return getColoredMyersDiff(actual, expected);
  return getStackedDiff(actual, expected);
}
function isSimpleDiff(actual, inspectedActual, expected, inspectedExpected) {
  if (inspectedActual.length > 1 || inspectedExpected.length > 1)
    return !1;
  return typeof actual !== "object" || actual === null || typeof expected !== "object" || expected === null;
}
function createErrDiff(actual, expected, operator, customMessage) {
  operator = checkOperator(actual, expected, operator);
  let skipped = !1, message = "", inspectedActual = inspectValue(actual), inspectedExpected = inspectValue(expected), inspectedSplitActual = StringPrototypeSplit.__intrinsic__call(inspectedActual, `
`), inspectedSplitExpected = StringPrototypeSplit.__intrinsic__call(inspectedExpected, `
`), showSimpleDiff = isSimpleDiff(actual, inspectedSplitActual, expected, inspectedSplitExpected), header = `${colors.green}+ actual${colors.white} ${colors.red}- expected${colors.white}`;
  if (showSimpleDiff) {
    let simpleDiff = getSimpleDiff(actual, inspectedSplitActual[0], expected, inspectedSplitExpected[0]);
    if (message = simpleDiff.message, typeof simpleDiff.header < "u")
      header = simpleDiff.header;
    if (simpleDiff.skipped)
      skipped = !0;
  } else if (inspectedActual === inspectedExpected) {
    if (operator = "notIdentical", inspectedSplitActual.length > 50)
      message = `${ArrayPrototypeJoin.__intrinsic__call(ArrayPrototypeSlice.__intrinsic__call(inspectedSplitActual, 0, 50), `
`)}
...}`, skipped = !0;
    else
      message = ArrayPrototypeJoin.__intrinsic__call(inspectedSplitActual, `
`);
    header = "";
  } else {
    let checkCommaDisparity = actual != null && typeof actual === "object", diff = myersDiff(inspectedActual, inspectedExpected, checkCommaDisparity, !0), myersDiffMessage = printMyersDiff(diff);
    if (message = myersDiffMessage.message, myersDiffMessage.skipped)
      skipped = !0;
  }
  return `${`${getErrorMessage(operator, customMessage)}
${header}`}${skipped ? `
... Skipped lines` : ""}
${message}
`;
}
function addEllipsis(string) {
  let lines = StringPrototypeSplit.__intrinsic__call(string, `
`, 11);
  if (lines.length > 10)
    return lines.length = 10, `${ArrayPrototypeJoin.__intrinsic__call(lines, `
`)}
...`;
  else if (string.length > kMaxLongStringLength)
    return `${StringPrototypeSlice.__intrinsic__call(string, kMaxLongStringLength)}...`;
  return string;
}

class AssertionError extends Error {
  generatedMessage;
  actual;
  expected;
  operator;
  constructor(options) {
    validateObject(options, "options");
    let {
      message,
      operator,
      stackStartFn,
      details,
      stackStartFunction
    } = options, { actual, expected } = options, limit = Error.stackTraceLimit;
    if (Error.stackTraceLimit = 0, message != null)
      if (operator === "deepStrictEqual" || operator === "strictEqual")
        super(createErrDiff(actual, expected, operator, message));
      else
        super(__intrinsic__String(message));
    else {
      if (colors.refresh(), typeof actual === "object" && actual !== null && typeof expected === "object" && expected !== null && "stack" in actual && actual instanceof Error && "stack" in expected && expected instanceof Error)
        actual = copyError(actual), expected = copyError(expected);
      if (operator === "deepStrictEqual" || operator === "strictEqual")
        super(createErrDiff(actual, expected, operator, message));
      else if (operator === "notDeepStrictEqual" || operator === "notStrictEqual") {
        let base = kReadableOperator[operator], res = StringPrototypeSplit.__intrinsic__call(inspectValue(actual), `
`);
        if (operator === "notStrictEqual" && (typeof actual === "object" && actual !== null || typeof actual === "function"))
          base = kReadableOperator.notStrictEqualObject;
        if (res.length > 50) {
          res[46] = `${colors.blue}...${colors.white}`;
          while (res.length > 47)
            ArrayPrototypePop.__intrinsic__call(res);
        }
        if (res.length === 1)
          super(`${base}${res[0].length > 5 ? `

` : " "}${res[0]}`);
        else
          super(`${base}

${ArrayPrototypeJoin.__intrinsic__call(res, `
`)}
`);
      } else {
        let res = inspectValue(actual), other = inspectValue(expected), knownOperator = kReadableOperator[operator];
        if (operator === "notDeepEqual" && res === other) {
          if (res = `${knownOperator}

${res}`, res.length > 1024)
            res = `${StringPrototypeSlice.__intrinsic__call(res, 0, 1021)}...`;
          super(res);
        } else {
          if (res.length > kMaxLongStringLength)
            res = `${StringPrototypeSlice.__intrinsic__call(res, 0, 509)}...`;
          if (other.length > kMaxLongStringLength)
            other = `${StringPrototypeSlice.__intrinsic__call(other, 0, 509)}...`;
          if (operator === "deepEqual")
            res = `${knownOperator}

${res}

should loosely deep-equal

`;
          else {
            let newOp = kReadableOperator[`${operator}Unequal`];
            if (newOp)
              res = `${newOp}

${res}

should not loosely deep-equal

`;
            else
              other = ` ${operator} ${other}`;
          }
          super(`${res}${other}`);
        }
      }
    }
    if (Error.stackTraceLimit = limit, this.generatedMessage = !message, ObjectDefineProperty(this, "name", {
      __proto__: null,
      value: "AssertionError [ERR_ASSERTION]",
      enumerable: !1,
      writable: !0,
      configurable: !0
    }), this.code = "ERR_ASSERTION", details)
      for (let i = 0;i < details.length; i++)
        this["message " + i] = details[i].message, this["actual " + i] = details[i].actual, this["expected " + i] = details[i].expected, this["operator " + i] = details[i].operator, this["stack trace " + i] = details[i].stack;
    else
      this.actual = actual, this.expected = expected, this.operator = operator;
    ErrorCaptureStackTrace(this, stackStartFn || stackStartFunction);
    {
      let s = this.stack;
      if (__intrinsic__isUndefinedOrNull(s) || typeof s === "string" && s.indexOf(`
    at `) === -1)
        ErrorCaptureStackTrace(this, AssertionError);
    }
    this.stack, this.name = "AssertionError";
  }
  toString() {
    return `${this.name} [${this.code}]: ${this.message}`;
  }
  [inspect.custom](recurseTimes, ctx) {
    let tmpActual = this.actual, tmpExpected = this.expected;
    if (typeof this.actual === "string")
      this.actual = addEllipsis(this.actual);
    if (typeof this.expected === "string")
      this.expected = addEllipsis(this.expected);
    let result = inspect(this, {
      ...ctx,
      customInspect: !1,
      depth: 0
    });
    return this.actual = tmpActual, this.expected = tmpExpected, result;
  }
}
$ = AssertionError;
$$EXPORT$$($).$$EXPORT_END$$;
