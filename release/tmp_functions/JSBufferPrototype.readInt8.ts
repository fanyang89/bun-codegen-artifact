// @ts-nocheck
// GENERATED TEMP FILE - DO NOT EDIT
// Sourced from ../../../src/js/builtins/JSBufferPrototype.ts

// do not allow the bundler to rename a symbol to $
($);

$$capture_start$$(function(offset) {  if (offset === undefined) offset = 0;
  if (typeof offset !== "number" || this[offset] === undefined) __intrinsic__checkBufferRead(this, offset, 1);
  return (this.__intrinsic__dataView ||= new DataView(this.buffer, this.byteOffset, this.byteLength)).getInt8(offset);
}).$$capture_end$$;
