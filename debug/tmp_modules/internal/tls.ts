// @ts-nocheck
var $;// GENERATED TEMP FILE - DO NOT EDIT
// Sourced from src/js/internal/tls.ts


const { isTypedArray, isArrayBuffer } = (__intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 144/*node:util/types*/) || __intrinsic__createInternalModuleById(144/*node:util/types*/));

function isPemObject(obj: unknown): obj is { pem: unknown } {
  return __intrinsic__isObject(obj) && "pem" in obj;
}

function isPemArray(obj: unknown): obj is [{ pem: unknown }] {
  // if (obj instanceof Object && "pem" in obj) return isValidTLSArray(obj.pem);
  return __intrinsic__isArray(obj) && obj.every(isPemObject);
}

function isValidTLSItem(obj: unknown) {
  if (typeof obj === "string" || isTypedArray(obj) || isArrayBuffer(obj) || __intrinsic__inherits(0, obj) || isPemArray(obj)) {
    return true;
  }

  return false;
}

function findInvalidTLSItem(obj: unknown) {
  if (__intrinsic__isArray(obj)) {
    for (var i = 0, length = obj.length; i < length; i++) {
      const item = obj[i];
      if (!isValidTLSItem(item)) return item;
    }
  }
  return obj;
}

function throwOnInvalidTLSArray(name: string, value: unknown) {
  if (!isValidTLSArray(value)) {
    throw __intrinsic__makeErrorWithCode(118, name, VALID_TLS_ERROR_MESSAGE_TYPES, findInvalidTLSItem(value));
  }
}

function isValidTLSArray(obj: unknown) {
  if (isValidTLSItem(obj)) return true;

  if (__intrinsic__isArray(obj)) {
    for (var i = 0, length = obj.length; i < length; i++) {
      const item = obj[i];
      if (!isValidTLSItem(item)) return false;
    }

    return true;
  }

  return false;
}

const VALID_TLS_ERROR_MESSAGE_TYPES = "string or an instance of Buffer, TypedArray, DataView, or BunFile";

export { VALID_TLS_ERROR_MESSAGE_TYPES, isValidTLSArray, isValidTLSItem, throwOnInvalidTLSArray };
;$$EXPORT$$($).$$EXPORT_END$$;
