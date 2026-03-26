// @bun
// build/release/tmp_modules/internal/stream.promises.ts
var $, ArrayPrototypePop = __intrinsic__Array.prototype.pop, { isIterable, isNodeStream, isWebStream } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 58) || __intrinsic__createInternalModuleById(58), { pipelineImpl: pl } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 54) || __intrinsic__createInternalModuleById(54), { finished } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 47) || __intrinsic__createInternalModuleById(47);
function pipeline(...streams) {
  return new __intrinsic__Promise((resolve, reject) => {
    let signal, end, lastArg = streams[streams.length - 1];
    if (lastArg && typeof lastArg === "object" && !isNodeStream(lastArg) && !isIterable(lastArg) && !isWebStream(lastArg)) {
      let options = ArrayPrototypePop.__intrinsic__call(streams);
      signal = options.signal, end = options.end;
    }
    pl(streams, (err, value) => {
      if (err)
        reject(err);
      else
        resolve(value);
    }, { signal, end });
  });
}
$ = {
  finished,
  pipeline
};
$$EXPORT$$($).$$EXPORT_END$$;
