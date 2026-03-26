// @bun
// build/debug/tmp_modules/internal/assert/utils.ts
var $;
var AssertionError;
function loadAssertionError() {
  if (AssertionError === __intrinsic__undefined) {
    AssertionError = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 4) || __intrinsic__createInternalModuleById(4);
  }
}
function getErrMessage(_message, _value, _fn) {}
function innerOk(fn, argLen, value, message) {
  if (!value) {
    let generatedMessage = false;
    if (argLen === 0) {
      generatedMessage = true;
      message = "No value argument passed to `assert.ok()`";
    } else if (message == null) {
      generatedMessage = true;
      message = getErrMessage(message, value, fn);
    } else if (Error.isError(message)) {
      throw message;
    }
    if (AssertionError === __intrinsic__undefined)
      loadAssertionError();
    const err = new AssertionError({
      actual: value,
      expected: true,
      message,
      operator: "==",
      stackStartFn: fn
    });
    err.generatedMessage = generatedMessage;
    throw err;
  }
}
$$EXPORT$$($).$$EXPORT_END$$;
export {
  innerOk
};
