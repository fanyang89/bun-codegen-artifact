(function (){"use strict";// build/debug/tmp_modules/internal/stream.promises.ts
var $;
var ArrayPrototypePop = @Array.prototype.pop;
var { isIterable, isNodeStream, isWebStream } = @getInternalField(@internalModuleRegistry, 58) || @createInternalModuleById(58);
var { pipelineImpl: pl } = @getInternalField(@internalModuleRegistry, 54) || @createInternalModuleById(54);
var { finished } = @getInternalField(@internalModuleRegistry, 47) || @createInternalModuleById(47);
function pipeline(...streams) {
  return new @Promise((resolve, reject) => {
    let signal;
    let end;
    const lastArg = streams[streams.length - 1];
    if (lastArg && typeof lastArg === "object" && !isNodeStream(lastArg) && !isIterable(lastArg) && !isWebStream(lastArg)) {
      const options = ArrayPrototypePop.@call(streams);
      signal = options.signal;
      end = options.end;
    }
    pl(streams, (err, value) => {
      if (err) {
        reject(err);
      } else {
        resolve(value);
      }
    }, { signal, end });
  });
}
$ = {
  finished,
  pipeline
};
return $})
