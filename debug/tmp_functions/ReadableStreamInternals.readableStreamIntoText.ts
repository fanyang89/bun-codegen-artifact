// @ts-nocheck
// GENERATED TEMP FILE - DO NOT EDIT
// Sourced from ../../../src/js/builtins/ReadableStreamInternals.ts

// do not allow the bundler to rename a symbol to $
($);

$$capture_start$$(function(stream) {  const highWaterMark = __intrinsic__getByIdDirectPrivate(stream, "highWaterMark");
  const [textStream, closer] = __intrinsic__createTextStream(highWaterMark);
  const prom = __intrinsic__readStreamIntoSink(stream, textStream, false);

  if (prom && __intrinsic__isPromise(prom)) {
    return Promise.__intrinsic__resolve(prom).__intrinsic__then(closer.promise).__intrinsic__then(__intrinsic__withoutUTF8BOM);
  }

  return closer.promise.__intrinsic__then(__intrinsic__withoutUTF8BOM);
}).$$capture_end$$;
