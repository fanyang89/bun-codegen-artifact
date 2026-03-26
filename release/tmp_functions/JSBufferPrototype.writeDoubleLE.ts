// @ts-nocheck
// GENERATED TEMP FILE - DO NOT EDIT
// Sourced from ../../../src/js/builtins/JSBufferPrototype.ts

// do not allow the bundler to rename a symbol to $
($);

$$capture_start$$(function(value,offset) {  if (offset === undefined) offset = 0;
  value = +value;
  // prettier-ignore
  if (typeof offset !== "number" || this[offset] === undefined || this[offset + 7] === undefined) (__intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 8/*internal/buffer*/) || __intrinsic__createInternalModuleById(8/*internal/buffer*/)).checkBounds(this, offset, 8);
  (this.__intrinsic__dataView ||= new DataView(this.buffer, this.byteOffset, this.byteLength)).setFloat64(offset, value, true);
  return offset + 8;
}).$$capture_end$$;
