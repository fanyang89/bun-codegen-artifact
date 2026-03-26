// @ts-nocheck
// GENERATED TEMP FILE - DO NOT EDIT
// Sourced from ../../../src/js/builtins/JSBufferConstructor.ts

// do not allow the bundler to rename a symbol to $
($);

$$capture_start$$(function(value,encodingOrOffset,length) {  if (typeof value === "string") return new __intrinsic__Buffer(value, encodingOrOffset);

  if (typeof value === "object" && value !== null) {
    if (__intrinsic__inherits(4, value)) return new __intrinsic__Buffer(value, encodingOrOffset, length);
    if (__intrinsic__isTypedArrayView(value)) return new __intrinsic__Buffer(value, encodingOrOffset, length);

    const valueOf = value.valueOf && value.valueOf();
    if (valueOf != null && valueOf !== value && (typeof valueOf === "string" || typeof valueOf === "object")) {
      return Buffer.from(valueOf, encodingOrOffset, length);
    }

    if (value.length !== undefined || __intrinsic__inherits(4, value.buffer)) {
      if (typeof value.length !== "number") return new __intrinsic__Buffer(0);
      if (value.length <= 0) return new __intrinsic__Buffer(0);
      return new __intrinsic__Buffer(value);
    }
    const { type, data } = value;
    if (type === "Buffer" && __intrinsic__isArray(data)) {
      if (data.length <= 0) return new __intrinsic__Buffer(0);
      return new __intrinsic__Buffer(data);
    }

    const toPrimitive = __intrinsic__tryGetByIdWithWellKnownSymbol(value, "toPrimitive");
    if (typeof toPrimitive === "function") {
      const primitive = toPrimitive.__intrinsic__call(value, "string");
      if (typeof primitive === "string") {
        return new __intrinsic__Buffer(primitive, encodingOrOffset);
      }
    }
  }

  throw __intrinsic__makeErrorWithCode(118, 
    "first argument",
    ["string", "Buffer", "ArrayBuffer", "Array", "Array-like Object"],
    value,
  );
}).$$capture_end$$;
