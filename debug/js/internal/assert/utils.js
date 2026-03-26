(function (){"use strict";// build/debug/tmp_modules/internal/assert/utils.ts
var $;
var AssertionError;
function loadAssertionError() {
  if (AssertionError === @undefined) {
    AssertionError = @getInternalField(@internalModuleRegistry, 4) || @createInternalModuleById(4);
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
    if (AssertionError === @undefined)
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
return{
  innerOk
};})
