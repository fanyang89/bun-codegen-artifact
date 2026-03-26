// @ts-nocheck
// GENERATED TEMP FILE - DO NOT EDIT
// Sourced from ../../../src/js/builtins/TextEncoderStream.ts

// do not allow the bundler to rename a symbol to $
($);

$$capture_start$$(function() {  const startAlgorithm = () => {
    return Promise.__intrinsic__resolve();
  };
  const transformAlgorithm = chunk => {
    const encoder = __intrinsic__getByIdDirectPrivate(this, "textEncoderStreamEncoder");
    try {
      var buffer = encoder.encode(chunk);
    } catch (e) {
      return Promise.__intrinsic__reject(e);
    }
    if (buffer.length) {
      const transformStream = __intrinsic__getByIdDirectPrivate(this, "textEncoderStreamTransform");
      const controller = __intrinsic__getByIdDirectPrivate(transformStream, "controller");
      __intrinsic__transformStreamDefaultControllerEnqueue(controller, buffer);
    }
    return Promise.__intrinsic__resolve();
  };
  const flushAlgorithm = () => {
    const encoder = __intrinsic__getByIdDirectPrivate(this, "textEncoderStreamEncoder");
    const buffer = encoder.flush();
    if (buffer.length) {
      const transformStream = __intrinsic__getByIdDirectPrivate(this, "textEncoderStreamTransform");
      const controller = __intrinsic__getByIdDirectPrivate(transformStream, "controller");
      __intrinsic__transformStreamDefaultControllerEnqueue(controller, buffer);
    }
    return Promise.__intrinsic__resolve();
  };

  const transform = __intrinsic__createTransformStream(startAlgorithm, transformAlgorithm, flushAlgorithm);
  __intrinsic__putByIdDirectPrivate(this, "textEncoderStreamTransform", transform);
  __intrinsic__putByIdDirectPrivate(this, "textEncoderStreamEncoder", new __intrinsic__TextEncoderStreamEncoder());

  return this;
}).$$capture_end$$;
