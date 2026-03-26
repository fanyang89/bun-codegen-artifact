// @bun
// build/release/tmp_modules/internal/errors.ts
var $, { SafeArrayIterator } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 30) || __intrinsic__createInternalModuleById(30), ArrayIsArray = __intrinsic__Array.isArray, ArrayPrototypePush = __intrinsic__Array.prototype.push;
function aggregateTwoErrors(innerError, outerError) {
  if (innerError && outerError && innerError !== outerError) {
    if (ArrayIsArray(outerError.errors))
      return ArrayPrototypePush.__intrinsic__call(outerError.errors, innerError), outerError;
    let err = AggregateError(new SafeArrayIterator([outerError, innerError]), outerError.message);
    return err.code = outerError.code, err;
  }
  return innerError || outerError;
}
$ = {
  aggregateTwoErrors
};
$$EXPORT$$($).$$EXPORT_END$$;
