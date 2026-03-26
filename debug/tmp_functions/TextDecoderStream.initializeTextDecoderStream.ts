// @ts-nocheck
// GENERATED TEMP FILE - DO NOT EDIT
// Sourced from ../../../src/js/builtins/TextDecoderStream.ts

// do not allow the bundler to rename a symbol to $
($);

$$capture_start$$(function() {  const label = arguments.length >= 1 ? arguments[0] : "utf-8";
  const options = arguments.length >= 2 ? arguments[1] : {};

  const startAlgorithm = () => {
    return Promise.__intrinsic__resolve();
  };
  const transformAlgorithm = chunk => {
    const decoder = __intrinsic__getByIdDirectPrivate(this, "textDecoder");
    let buffer;
    try {
      buffer = decoder.decode(chunk, { stream: true });
    } catch (e) {
      return Promise.__intrinsic__reject(e);
    }
    if (buffer) {
      const transformStream = __intrinsic__getByIdDirectPrivate(this, "textDecoderStreamTransform");
      const controller = __intrinsic__getByIdDirectPrivate(transformStream, "controller");
      __intrinsic__transformStreamDefaultControllerEnqueue(controller, buffer);
    }
    return Promise.__intrinsic__resolve();
  };
  const flushAlgorithm = () => {
    const decoder = __intrinsic__getByIdDirectPrivate(this, "textDecoder");
    let buffer;
    try {
      buffer = decoder.decode(undefined, { stream: false });
    } catch (e) {
      return Promise.__intrinsic__reject(e);
    }
    if (buffer) {
      const transformStream = __intrinsic__getByIdDirectPrivate(this, "textDecoderStreamTransform");
      const controller = __intrinsic__getByIdDirectPrivate(transformStream, "controller");
      __intrinsic__transformStreamDefaultControllerEnqueue(controller, buffer);
    }
    return Promise.__intrinsic__resolve();
  };

  const transform = __intrinsic__createTransformStream(startAlgorithm, transformAlgorithm, flushAlgorithm);
  __intrinsic__putByIdDirectPrivate(this, "textDecoderStreamTransform", transform);

  const fatal = !!options.fatal;
  const ignoreBOM = !!options.ignoreBOM;
  const decoder = new TextDecoder(label, { fatal, ignoreBOM });

  __intrinsic__putByIdDirectPrivate(this, "fatal", fatal);
  __intrinsic__putByIdDirectPrivate(this, "ignoreBOM", ignoreBOM);
  __intrinsic__putByIdDirectPrivate(this, "encoding", decoder.encoding);
  __intrinsic__putByIdDirectPrivate(this, "textDecoder", decoder);

  return this;
}).$$capture_end$$;
