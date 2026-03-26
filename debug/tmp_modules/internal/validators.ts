// @ts-nocheck
var $;// GENERATED TEMP FILE - DO NOT EDIT
// Sourced from src/js/internal/validators.ts


const { hideFromStack } = (__intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 32/*internal/shared*/) || __intrinsic__createInternalModuleById(32/*internal/shared*/));

const RegExpPrototypeExec = RegExp.prototype.exec;
const ArrayIsArray = Array.isArray;
const ObjectPrototypeHasOwnProperty = Object.prototype.hasOwnProperty;

const tokenRegExp = /^[\^_`a-zA-Z\-0-9!#$%&'*+.|~]+$/;
/**
 * Verifies that the given val is a valid HTTP token
 * per the rules defined in RFC 7230
 * See https://tools.ietf.org/html/rfc7230#section-3.2.6
 */
function checkIsHttpToken(val) {
  return RegExpPrototypeExec.__intrinsic__call(tokenRegExp, val) !== null;
}

/*
  The rules for the Link header field are described here:
  https://www.rfc-editor.org/rfc/rfc8288.html#section-3

  This regex validates any string surrounded by angle brackets
  (not necessarily a valid URI reference) followed by zero or more
  link-params separated by semicolons.
*/
const linkValueRegExp = /^(?:<[^>]*>)(?:\s*;\s*[^;"\s]+(?:=(")?[^;"\s]*\1)?)*$/;
function validateLinkHeaderFormat(value, name) {
  if (typeof value === "undefined" || !RegExpPrototypeExec.__intrinsic__call(linkValueRegExp, value)) {
    throw __intrinsic__makeErrorWithCode(119, 
      name,
      value,
      `must be an array or string of format "</styles.css>; rel=preload; as=style"`,
    );
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

    for (let i = 0; i < hintsLength; i++) {
      const link = hints[i];
      validateLinkHeaderFormat(link, "hints");
      result += link;

      if (i !== hintsLength - 1) {
        result += ", ";
      }
    }

    return result;
  }

  throw __intrinsic__makeErrorWithCode(119, 
    "hints",
    hints,
    `must be an array or string of format "</styles.css>; rel=preload; as=style"`,
  );
}

function validateString(value, name) {
  if (typeof value !== "string") throw __intrinsic__makeErrorWithCode(118, name, "string", value);
}

function validateFunction(value, name) {
  if (typeof value !== "function") throw __intrinsic__makeErrorWithCode(118, name, "function", value);
}

function validateBoolean(value, name) {
  if (typeof value !== "boolean") throw __intrinsic__makeErrorWithCode(118, name, "boolean", value);
}

function validateUndefined(value, name) {
  if (value !== undefined) throw __intrinsic__makeErrorWithCode(118, name, "undefined", value);
}

function validateInternalField(object, fieldKey, className) {
  if (typeof object !== "object" || object === null || !ObjectPrototypeHasOwnProperty.__intrinsic__call(object, fieldKey)) {
    throw __intrinsic__makeErrorWithCode(118, "this", className, object);
  }
}

hideFromStack(validateLinkHeaderValue, validateInternalField);
hideFromStack(validateString, validateFunction, validateBoolean, validateUndefined);

$ = {
  /** (value, name) */
  validateObject: __intrinsic__lazy(22),
  validateLinkHeaderValue: validateLinkHeaderValue,
  checkIsHttpToken: checkIsHttpToken,
  /** `(value, name, min, max)` */
  validateInteger: __intrinsic__lazy(23),
  /** `(value, name, min, max)` */
  validateNumber: __intrinsic__lazy(24),
  /** `(value, name)` */
  validateString,
  /** `(number, name)` */
  validateFiniteNumber: __intrinsic__lazy(25),
  /** `(number, name, lower, upper, def)` */
  checkRangesOrGetDefault: __intrinsic__lazy(26),
  /** `(value, name)` */
  validateFunction,
  /** `(value, name)` */
  validateBoolean,
  /** `(port, name = 'Port', allowZero = true)` */
  validatePort: __intrinsic__lazy(27),
  /** `(signal, name)` */
  validateAbortSignal: __intrinsic__lazy(28),
  /** `(value, name, minLength = 0)` */
  validateArray: __intrinsic__lazy(29),
  /** `(value, name, min = -2147483648, max = 2147483647)` */
  validateInt32: __intrinsic__lazy(30),
  /** `(value, name, positive = false)` */
  validateUint32: __intrinsic__lazy(31),
  /** `(signal, name = 'signal')` */
  validateSignalName: __intrinsic__lazy(32),
  /** `(data, encoding)` */
  validateEncoding: __intrinsic__lazy(33),
  /** `(value, name)` */
  validatePlainFunction: __intrinsic__lazy(34),
  /** `(value, name)` */
  validateUndefined,
  /** `(buffer, name = 'buffer')` */
  validateBuffer: __intrinsic__lazy(35),
  /** `(value, name, oneOf)` */
  validateOneOf: __intrinsic__lazy(36),
  isUint8Array: value => value instanceof Uint8Array,
  /** `(object, fieldKey, className)` */
  validateInternalField,
};
;$$EXPORT$$($).$$EXPORT_END$$;
