// @ts-nocheck
var $;// GENERATED TEMP FILE - DO NOT EDIT
// Sourced from src/js/internal/errors.ts


const { SafeArrayIterator } = (__intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 30/*internal/primordials*/) || __intrinsic__createInternalModuleById(30/*internal/primordials*/));

const ArrayIsArray = Array.isArray;
const ArrayPrototypePush = Array.prototype.push;

function aggregateTwoErrors(innerError: Error | undefined, outerError: Error & { errors?: Error[] }) {
  if (innerError && outerError && innerError !== outerError) {
    if (ArrayIsArray(outerError.errors)) {
      // If `outerError` is already an `AggregateError`.
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
  aggregateTwoErrors,
};
;$$EXPORT$$($).$$EXPORT_END$$;
