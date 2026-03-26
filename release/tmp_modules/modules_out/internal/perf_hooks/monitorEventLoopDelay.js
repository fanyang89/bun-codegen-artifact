// @bun
// build/release/tmp_modules/internal/perf_hooks/monitorEventLoopDelay.ts
var $, { validateObject, validateInteger } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 68) || __intrinsic__createInternalModuleById(68), cppMonitorEventLoopDelay = __intrinsic__lazy(13), cppEnableEventLoopDelay = __intrinsic__lazy(14), cppDisableEventLoopDelay = __intrinsic__lazy(15), eventLoopDelayHistogram, enabled = !1, resolution = 10;
function enable() {
  if (enabled)
    return !1;
  return enabled = !0, cppEnableEventLoopDelay(eventLoopDelayHistogram, resolution), !0;
}
function disable() {
  if (!enabled)
    return !1;
  return enabled = !1, cppDisableEventLoopDelay(eventLoopDelayHistogram), !0;
}
function monitorEventLoopDelay(options) {
  if (options !== __intrinsic__undefined)
    validateObject(options, "options");
  resolution = 10;
  let resolutionOption = options?.resolution;
  if (typeof resolutionOption < "u")
    validateInteger(resolutionOption, "options.resolution", 1), resolution = resolutionOption;
  if (!eventLoopDelayHistogram)
    eventLoopDelayHistogram = cppMonitorEventLoopDelay(resolution), __intrinsic__putByValDirect(eventLoopDelayHistogram, "enable", enable), __intrinsic__putByValDirect(eventLoopDelayHistogram, "disable", disable), __intrinsic__putByValDirect(eventLoopDelayHistogram, Symbol.dispose, disable);
  return eventLoopDelayHistogram;
}
$ = monitorEventLoopDelay;
$$EXPORT$$($).$$EXPORT_END$$;
