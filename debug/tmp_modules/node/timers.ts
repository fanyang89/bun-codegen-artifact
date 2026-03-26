// @ts-nocheck
var $;// GENERATED TEMP FILE - DO NOT EDIT
// Sourced from src/js/node/timers.ts


const { throwNotImplemented } = (__intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 32/*internal/shared*/) || __intrinsic__createInternalModuleById(32/*internal/shared*/));

var timersPromisesValue;

$ = {
  setTimeout,
  clearTimeout,
  setInterval,
  setImmediate,
  clearInterval,
  clearImmediate,
  get promises() {
    return (timersPromisesValue ??= (__intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 120/*node:timers/promises*/) || __intrinsic__createInternalModuleById(120/*node:timers/promises*/)));
  },
  set promises(value) {
    timersPromisesValue = value;
  },
  active(timer) {
    if (__intrinsic__isCallable(timer?.refresh)) {
      timer.refresh();
    } else {
      throwNotImplemented("'timers.active'");
    }
  },
  unenroll(timer) {
    if (__intrinsic__isCallable(timer?.refresh)) {
      clearTimeout(timer);
      return;
    }

    throwNotImplemented("'timers.unenroll'");
  },
  enroll(timer, _msecs) {
    if (__intrinsic__isCallable(timer?.refresh)) {
      timer.refresh();
      return;
    }

    throwNotImplemented("'timers.enroll'");
  },
};
;$$EXPORT$$($).$$EXPORT_END$$;
