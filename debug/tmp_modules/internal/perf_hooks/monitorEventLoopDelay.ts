// @ts-nocheck
var $;// GENERATED TEMP FILE - DO NOT EDIT
// Sourced from src/js/internal/perf_hooks/monitorEventLoopDelay.ts


// Internal module for monitorEventLoopDelay implementation
const { validateObject, validateInteger } = (__intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 68/*internal/validators*/) || __intrinsic__createInternalModuleById(68/*internal/validators*/));

// Private C++ bindings for event loop delay monitoring
const cppMonitorEventLoopDelay = __intrinsic__lazy(13) as (resolution: number) => import("node:perf_hooks").RecordableHistogram;

const cppEnableEventLoopDelay = __intrinsic__lazy(14) as (histogram: import("node:perf_hooks").RecordableHistogram, resolution: number) => void;

const cppDisableEventLoopDelay = __intrinsic__lazy(15) as (histogram: import("node:perf_hooks").RecordableHistogram) => void;

// IntervalHistogram wrapper class for event loop delay monitoring

let eventLoopDelayHistogram: import("node:perf_hooks").RecordableHistogram | undefined;
let enabled = false;
let resolution = 10;

function enable() {
  if (enabled) {
    return false;
  }

  enabled = true;
  cppEnableEventLoopDelay(eventLoopDelayHistogram!, resolution);
  return true;
}

function disable() {
  if (!enabled) {
    return false;
  }

  enabled = false;
  cppDisableEventLoopDelay(eventLoopDelayHistogram!);
  return true;
}

function monitorEventLoopDelay(options?: { resolution?: number }) {
  if (options !== undefined) {
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
;$$EXPORT$$($).$$EXPORT_END$$;
