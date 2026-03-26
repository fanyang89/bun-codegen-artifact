(function (){"use strict";// build/debug/tmp_modules/internal/errors.ts
var $;
var { SafeArrayIterator } = @getInternalField(@internalModuleRegistry, 30) || @createInternalModuleById(30);
var ArrayIsArray = @Array.isArray;
var ArrayPrototypePush = @Array.prototype.push;
function aggregateTwoErrors(innerError, outerError) {
  if (innerError && outerError && innerError !== outerError) {
    if (ArrayIsArray(outerError.errors)) {
      ArrayPrototypePush.@call(outerError.errors, innerError);
      return outerError;
    }
    const err = new AggregateError(new SafeArrayIterator([outerError, innerError]), outerError.message);
    err.code = outerError.code;
    return err;
  }
  return innerError || outerError;
}
$ = {
  aggregateTwoErrors
};
return $})
