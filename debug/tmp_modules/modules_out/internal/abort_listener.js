// @bun
// build/debug/tmp_modules/internal/abort_listener.ts
var $;
var { validateAbortSignal, validateFunction } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 68) || __intrinsic__createInternalModuleById(68);
var { kResistStopPropagation } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 32) || __intrinsic__createInternalModuleById(32);
function addAbortListener(signal, listener) {
  if (signal === __intrinsic__undefined) {
    throw __intrinsic__makeErrorWithCode(118, "signal", "AbortSignal", signal);
  }
  validateAbortSignal(signal, "signal");
  validateFunction(listener, "listener");
  let removeEventListener;
  if (signal.aborted) {
    queueMicrotask(() => listener());
  } else {
    signal.addEventListener("abort", listener, { once: true, [kResistStopPropagation]: true });
    removeEventListener = () => {
      signal.removeEventListener("abort", listener);
    };
  }
  return {
    [Symbol.dispose]() {
      removeEventListener?.();
    }
  };
}
$ = {
  addAbortListener
};
$$EXPORT$$($).$$EXPORT_END$$;
