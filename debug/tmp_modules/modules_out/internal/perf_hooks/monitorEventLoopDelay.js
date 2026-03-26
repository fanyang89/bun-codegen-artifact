// @bun
// build/debug/tmp_modules/internal/perf_hooks/monitorEventLoopDelay.ts
var $;
var { validateObject, validateInteger } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 68) || __intrinsic__createInternalModuleById(68);
var cppMonitorEventLoopDelay = __intrinsic__lazy(13);
var cppEnableEventLoopDelay = __intrinsic__lazy(14);
var cppDisableEventLoopDelay = __intrinsic__lazy(15);
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
  if (options !== __intrinsic__undefined) {
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
    __intrinsic__putByValDirect(eventLoopDelayHistogram, "enable", enable);
    __intrinsic__putByValDirect(eventLoopDelayHistogram, "disable", disable);
    __intrinsic__putByValDirect(eventLoopDelayHistogram, Symbol.dispose, disable);
  }
  return eventLoopDelayHistogram;
}
$ = monitorEventLoopDelay;
$$EXPORT$$($).$$EXPORT_END$$;
