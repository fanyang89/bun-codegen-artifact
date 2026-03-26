// @ts-nocheck
// GENERATED TEMP FILE - DO NOT EDIT
// Sourced from ../../../src/js/builtins/JSBufferPrototype.ts

// do not allow the bundler to rename a symbol to $
($);

$$capture_start$$(function(value,offset) {  if (offset === undefined) offset = 0;
  value = +value;
  const min = 0;
  const max = 0xffff;
  // prettier-ignore
  if (typeof offset !== "number" || value < min || value > max || this[offset] === undefined || this[offset + 1] === undefined) (__intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 8/*internal/buffer*/) || __intrinsic__createInternalModuleById(8/*internal/buffer*/)).checkInt(this, value, offset, min, max, 2);
  (this.__intrinsic__dataView ||= new DataView(this.buffer, this.byteOffset, this.byteLength)).setUint16(offset, value, false);
  return offset + 2;
}).$$capture_end$$;
