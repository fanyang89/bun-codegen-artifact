(function (){"use strict";// build/debug/tmp_modules/internal/streams/add-abort-signal.ts
var $;
var { isNodeStream, isWebStream, kControllerErrorFunction } = @getInternalField(@internalModuleRegistry, 58) || @createInternalModuleById(58);
var eos = @getInternalField(@internalModuleRegistry, 47) || @createInternalModuleById(47);
var SymbolDispose = Symbol.dispose;
var addAbortListener;
var validateAbortSignal = (signal, name) => {
  if (typeof signal !== "object" || !("aborted" in signal)) {
    throw @makeErrorWithCode(118, name, "AbortSignal", signal);
  }
};
function addAbortSignal(signal, stream) {
  validateAbortSignal(signal, "signal");
  if (!isNodeStream(stream) && !isWebStream(stream)) {
    throw @makeErrorWithCode(118, "stream", ["ReadableStream", "WritableStream", "Stream"], stream);
  }
  return addAbortSignalNoValidate(signal, stream);
}
function addAbortSignalNoValidate(signal, stream) {
  if (typeof signal !== "object" || !("aborted" in signal)) {
    return stream;
  }
  const onAbort = isNodeStream(stream) ? () => {
    stream.destroy(@makeAbortError(@undefined, { cause: signal.reason }));
  } : () => {
    stream[kControllerErrorFunction](@makeAbortError(@undefined, { cause: signal.reason }));
  };
  if (signal.aborted) {
    onAbort();
  } else {
    addAbortListener ??= (@getInternalField(@internalModuleRegistry, 3) || @createInternalModuleById(3)).addAbortListener;
    const disposable = addAbortListener(signal, onAbort);
    eos(stream, disposable[SymbolDispose]);
  }
  return stream;
}
$ = {
  addAbortSignal,
  addAbortSignalNoValidate
};
return $})
