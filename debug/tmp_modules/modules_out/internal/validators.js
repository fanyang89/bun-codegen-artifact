// @bun
// build/debug/tmp_modules/internal/validators.ts
var $;
var { hideFromStack } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 32) || __intrinsic__createInternalModuleById(32);
var RegExpPrototypeExec = __intrinsic__RegExp.prototype.exec;
var ArrayIsArray = __intrinsic__Array.isArray;
var ObjectPrototypeHasOwnProperty = Object.prototype.hasOwnProperty;
var tokenRegExp = /^[\^_`a-zA-Z\-0-9!#$%&'*+.|~]+$/;
function checkIsHttpToken(val) {
  return RegExpPrototypeExec.__intrinsic__call(tokenRegExp, val) !== null;
}
var linkValueRegExp = /^(?:<[^>]*>)(?:\s*;\s*[^;"\s]+(?:=(")?[^;"\s]*\1)?)*$/;
function validateLinkHeaderFormat(value, name) {
  if (typeof value === "undefined" || !RegExpPrototypeExec.__intrinsic__call(linkValueRegExp, value)) {
    throw __intrinsic__makeErrorWithCode(119, name, value, `must be an array or string of format "</styles.css>; rel=preload; as=style"`);
  }
}
function validateLinkHeaderValue(hints) {
  if (typeof hints === "string") {
    validateLinkHeaderFormat(hints, "hints");
    return hints;
  } else if (ArrayIsArray(hints)) {
    const hintsLength = hints.length;
    let result = "";
    if (hintsLength === 0) {
      return result;
    }
    for (let i = 0;i < hintsLength; i++) {
      const link = hints[i];
      validateLinkHeaderFormat(link, "hints");
      result += link;
      if (i !== hintsLength - 1) {
        result += ", ";
      }
    }
    return result;
  }
  throw __intrinsic__makeErrorWithCode(119, "hints", hints, `must be an array or string of format "</styles.css>; rel=preload; as=style"`);
}
function validateString(value, name) {
  if (typeof value !== "string")
    throw __intrinsic__makeErrorWithCode(118, name, "string", value);
}
function validateFunction(value, name) {
  if (typeof value !== "function")
    throw __intrinsic__makeErrorWithCode(118, name, "function", value);
}
function validateBoolean(value, name) {
  if (typeof value !== "boolean")
    throw __intrinsic__makeErrorWithCode(118, name, "boolean", value);
}
function validateUndefined(value, name) {
  if (value !== __intrinsic__undefined)
    throw __intrinsic__makeErrorWithCode(118, name, "undefined", value);
}
function validateInternalField(object, fieldKey, className) {
  if (typeof object !== "object" || object === null || !ObjectPrototypeHasOwnProperty.__intrinsic__call(object, fieldKey)) {
    throw __intrinsic__makeErrorWithCode(118, "this", className, object);
  }
}
hideFromStack(validateLinkHeaderValue, validateInternalField);
hideFromStack(validateString, validateFunction, validateBoolean, validateUndefined);
$ = {
  validateObject: __intrinsic__lazy(22),
  validateLinkHeaderValue,
  checkIsHttpToken,
  validateInteger: __intrinsic__lazy(23),
  validateNumber: __intrinsic__lazy(24),
  validateString,
  validateFiniteNumber: __intrinsic__lazy(25),
  checkRangesOrGetDefault: __intrinsic__lazy(26),
  validateFunction,
  validateBoolean,
  validatePort: __intrinsic__lazy(27),
  validateAbortSignal: __intrinsic__lazy(28),
  validateArray: __intrinsic__lazy(29),
  validateInt32: __intrinsic__lazy(30),
  validateUint32: __intrinsic__lazy(31),
  validateSignalName: __intrinsic__lazy(32),
  validateEncoding: __intrinsic__lazy(33),
  validatePlainFunction: __intrinsic__lazy(34),
  validateUndefined,
  validateBuffer: __intrinsic__lazy(35),
  validateOneOf: __intrinsic__lazy(36),
  isUint8Array: (value) => value instanceof __intrinsic__Uint8Array,
  validateInternalField
};
$$EXPORT$$($).$$EXPORT_END$$;
