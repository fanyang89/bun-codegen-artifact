(function (){"use strict";// build/debug/tmp_modules/internal/perf_hooks/monitorEventLoopDelay.ts
var $;
var { validateObject, validateInteger } = @getInternalField(@internalModuleRegistry, 68) || @createInternalModuleById(68);
var cppMonitorEventLoopDelay = @lazy(13);
var cppEnableEventLoopDelay = @lazy(14);
var cppDisableEventLoopDelay = @lazy(15);
var eventLoopDelayHistogram;
var enabled = false;
var resolution = 10;
function enable() {
  if (enabled) {
    return false;
  }
  enabled = true;
  cppEnableEventLoopDelay(eventLoopDelayHistogram, resolution);
  return true;
}
function disable() {
  if (!enabled) {
    return false;
  }
  enabled = false;
  cppDisableEventLoopDelay(eventLoopDelayHistogram);
  return true;
}
function monitorEventLoopDelay(options) {
  if (options !== @undefined) {
    validateObject(options, "options");
  }
  resolution = 10;
  let resolutionOption = options?.resolution;
  if (typeof resolutionOption !== "undefined") {
    validateInteger(resolutionOption, "options.resolution", 1);
    resolution = resolutionOption;
  }
  if (!eventLoopDelayHistogram) {
    eventLoopDelayHistogram = cppMonitorEventLoopDelay(resolution);
    @putByValDirect(eventLoopDelayHistogram, "enable", enable);
    @putByValDirect(eventLoopDelayHistogram, "disable", disable);
    @putByValDirect(eventLoopDelayHistogram, Symbol.dispose, disable);
  }
  return eventLoopDelayHistogram;
}
$ = monitorEventLoopDelay;
return $})
