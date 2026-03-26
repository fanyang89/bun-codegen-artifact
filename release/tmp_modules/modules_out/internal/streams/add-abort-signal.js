// @bun
// build/release/tmp_modules/internal/streams/add-abort-signal.ts
var $, { isNodeStream, isWebStream, kControllerErrorFunction } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 58) || __intrinsic__createInternalModuleById(58), eos = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 47) || __intrinsic__createInternalModuleById(47), SymbolDispose = Symbol.dispose, addAbortListener, validateAbortSignal = (signal, name) => {
  if (typeof signal !== "object" || !("aborted" in signal))
    throw __intrinsic__makeErrorWithCode(118, name, "AbortSignal", signal);
};
function addAbortSignal(signal, stream) {
  if (validateAbortSignal(signal, "signal"), !isNodeStream(stream) && !isWebStream(stream))
    throw __intrinsic__makeErrorWithCode(118, "stream", ["ReadableStream", "WritableStream", "Stream"], stream);
  return addAbortSignalNoValidate(signal, stream);
}
function addAbortSignalNoValidate(signal, stream) {
  if (typeof signal !== "object" || !("aborted" in signal))
    return stream;
  let onAbort = isNodeStream(stream) ? () => {
    stream.destroy(__intrinsic__makeAbortError(__intrinsic__undefined, { cause: signal.reason }));
  } : () => {
    stream[kControllerErrorFunction](__intrinsic__makeAbortError(__intrinsic__undefined, { cause: signal.reason }));
  };
  if (signal.aborted)
    onAbort();
  else {
    addAbortListener ??= (__intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 3) || __intrinsic__createInternalModuleById(3)).addAbortListener;
    let disposable = addAbortListener(signal, onAbort);
    eos(stream, disposable[SymbolDispose]);
  }
  return stream;
}
$ = {
  addAbortSignal,
  addAbortSignalNoValidate
};
$$EXPORT$$($).$$EXPORT_END$$;
