// @ts-nocheck
var $;// GENERATED TEMP FILE - DO NOT EDIT
// Sourced from src/js/internal/streams/add-abort-signal.ts


"use strict";

const { isNodeStream, isWebStream, kControllerErrorFunction } = (__intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 58/*internal/streams/utils*/) || __intrinsic__createInternalModuleById(58/*internal/streams/utils*/));
const eos = (__intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 47/*internal/streams/end-of-stream*/) || __intrinsic__createInternalModuleById(47/*internal/streams/end-of-stream*/));

const SymbolDispose = Symbol.dispose;

let addAbortListener;

// This method is inlined here for readable-stream
// It also does not allow for signal to not exist on the stream
// https://github.com/nodejs/node/pull/36061#discussion_r533718029
const validateAbortSignal = (signal, name) => {
  if (typeof signal !== "object" || !("aborted" in signal)) {
    throw __intrinsic__makeErrorWithCode(118, name, "AbortSignal", signal);
  }
};

function addAbortSignal(signal, stream) {
  validateAbortSignal(signal, "signal");
  if (!isNodeStream(stream) && !isWebStream(stream)) {
    throw __intrinsic__makeErrorWithCode(118, "stream", ["ReadableStream", "WritableStream", "Stream"], stream);
  }
  return addAbortSignalNoValidate(signal, stream);
}

function addAbortSignalNoValidate(signal, stream) {
  if (typeof signal !== "object" || !("aborted" in signal)) {
    return stream;
  }
  const onAbort = isNodeStream(stream)
    ? () => {
        stream.destroy(__intrinsic__makeAbortError(undefined, { cause: signal.reason }));
      }
    : () => {
        stream[kControllerErrorFunction](__intrinsic__makeAbortError(undefined, { cause: signal.reason }));
      };
  if (signal.aborted) {
    onAbort();
  } else {
    addAbortListener ??= (__intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 3/*internal/abort_listener*/) || __intrinsic__createInternalModuleById(3/*internal/abort_listener*/)).addAbortListener;
    const disposable = addAbortListener(signal, onAbort);
    eos(stream, disposable[SymbolDispose]);
  }
  return stream;
}

$ = {
  addAbortSignal,
  addAbortSignalNoValidate,
};
;$$EXPORT$$($).$$EXPORT_END$$;
