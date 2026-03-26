(function (){"use strict";// build/debug/tmp_modules/internal/timers.ts
var $;
var { validateNumber } = @getInternalField(@internalModuleRegistry, 68) || @createInternalModuleById(68);
var NumberIsFinite = Number.isFinite;
var TIMEOUT_MAX = 2 ** 31 - 1;
function getTimerDuration(msecs, name) {
  validateNumber(msecs, name);
  if (msecs < 0 || !NumberIsFinite(msecs)) {
    throw @makeErrorWithCode(156, name, "a non-negative finite number", msecs);
  }
  if (msecs > TIMEOUT_MAX) {
    process.emitWarning(`${msecs} does not fit into a 32-bit signed integer.` + `
Timer duration was truncated to ${TIMEOUT_MAX}.`, "TimeoutOverflowWarning");
    return TIMEOUT_MAX;
  }
  return msecs;
}
$ = {
  kTimeout: Symbol("timeout"),
  getTimerDuration
};
return $})
