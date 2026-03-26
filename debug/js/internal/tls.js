(function (){"use strict";// build/debug/tmp_modules/internal/tls.ts
var $;
var { isTypedArray, isArrayBuffer } = @getInternalField(@internalModuleRegistry, 144) || @createInternalModuleById(144);
function isPemObject(obj) {
  return @isObject(obj) && "pem" in obj;
}
function isPemArray(obj) {
  return @isArray(obj) && obj.every(isPemObject);
}
function isValidTLSItem(obj) {
  if (typeof obj === "string" || isTypedArray(obj) || isArrayBuffer(obj) || @inherits(0, obj) || isPemArray(obj)) {
    return true;
  }
  return false;
}
function findInvalidTLSItem(obj) {
  if (@isArray(obj)) {
    for (var i = 0, length = obj.length;i < length; i++) {
      const item = obj[i];
      if (!isValidTLSItem(item))
        return item;
    }
  }
  return obj;
}
function throwOnInvalidTLSArray(name, value) {
  if (!isValidTLSArray(value)) {
    throw @makeErrorWithCode(118, name, VALID_TLS_ERROR_MESSAGE_TYPES, findInvalidTLSItem(value));
  }
}
function isValidTLSArray(obj) {
  if (isValidTLSItem(obj))
    return true;
  if (@isArray(obj)) {
    for (var i = 0, length = obj.length;i < length; i++) {
      const item = obj[i];
      if (!isValidTLSItem(item))
        return false;
    }
    return true;
  }
  return false;
}
var VALID_TLS_ERROR_MESSAGE_TYPES = "string or an instance of Buffer, TypedArray, DataView, or BunFile";
return{
  throwOnInvalidTLSArray,
  isValidTLSItem,
  isValidTLSArray,
  VALID_TLS_ERROR_MESSAGE_TYPES
};})
