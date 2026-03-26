// @ts-nocheck
var $;// GENERATED TEMP FILE - DO NOT EDIT
// Sourced from src/js/internal/stream.promises.ts


"use strict";

const ArrayPrototypePop = Array.prototype.pop;

const { isIterable, isNodeStream, isWebStream } = (__intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 58/*internal/streams/utils*/) || __intrinsic__createInternalModuleById(58/*internal/streams/utils*/));
const { pipelineImpl: pl } = (__intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 54/*internal/streams/pipeline*/) || __intrinsic__createInternalModuleById(54/*internal/streams/pipeline*/));
const { finished } = (__intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 47/*internal/streams/end-of-stream*/) || __intrinsic__createInternalModuleById(47/*internal/streams/end-of-stream*/));

// require("internal/stream");

function pipeline(...streams) {
  return new Promise((resolve, reject) => {
    let signal;
    let end;
    const lastArg = streams[streams.length - 1];
    if (
      lastArg &&
      typeof lastArg === "object" &&
      !isNodeStream(lastArg) &&
      !isIterable(lastArg) &&
      !isWebStream(lastArg)
    ) {
      const options = ArrayPrototypePop.__intrinsic__call(streams);
      signal = options.signal;
      end = options.end;
    }

    pl(
      streams,
      (err, value) => {
        if (err) {
          reject(err);
        } else {
          resolve(value);
        }
      },
      { signal, end },
    );
  });
}

$ = {
  finished,
  pipeline,
};
;$$EXPORT$$($).$$EXPORT_END$$;
