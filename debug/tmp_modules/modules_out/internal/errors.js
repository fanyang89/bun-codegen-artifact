// @bun
// build/debug/tmp_modules/internal/errors.ts
var $;
var { SafeArrayIterator } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 30) || __intrinsic__createInternalModuleById(30);
var ArrayIsArray = __intrinsic__Array.isArray;
var ArrayPrototypePush = __intrinsic__Array.prototype.push;
function aggregateTwoErrors(innerError, outerError) {
  if (innerError && outerError && innerError !== outerError) {
    if (ArrayIsArray(outerError.errors)) {
      ArrayPrototypePush.__intrinsic__call(outerError.errors, innerError);
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
$$EXPORT$$($).$$EXPORT_END$$;
