// @ts-nocheck
// GENERATED TEMP FILE - DO NOT EDIT
// Sourced from ../../../src/js/builtins/JSBufferPrototype.ts

// do not allow the bundler to rename a symbol to $
($);

$$capture_start$$(function(offset,byteLength) {  if (offset === undefined) throw __intrinsic__makeErrorWithCode(118, "offset", "number", offset);
  if (typeof byteLength !== "number") throw __intrinsic__makeErrorWithCode(118, "byteLength", "number", byteLength);
  const view = (this.__intrinsic__dataView ||= new DataView(this.buffer, this.byteOffset, this.byteLength));
  switch (byteLength) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
    case 6: {
      if (typeof offset !== "number" || (offset | 0) !== offset)
        (__intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 68/*internal/validators*/) || __intrinsic__createInternalModuleById(68/*internal/validators*/)).validateInteger(offset, "offset");
      if (!(offset >= 0 && offset <= this.length - byteLength))
        (__intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 8/*internal/buffer*/) || __intrinsic__createInternalModuleById(8/*internal/buffer*/)).boundsError(offset, this.length - byteLength);
    }
  }
  switch (byteLength) {
    case 1: {
      return view.getUint8(offset);
    }
    case 2: {
      return view.getUint16(offset, false);
    }
    case 3: {
      return view.getUint16(offset + 1, false) + view.getUint8(offset) * 2 ** 16;
    }
    case 4: {
      return view.getUint32(offset, false);
    }
    case 5: {
      return view.getUint8(offset) * 2 ** 32 + view.getUint32(offset + 1, false);
    }
    case 6: {
      return view.getUint16(offset, false) * 2 ** 32 + view.getUint32(offset + 2, false);
    }
  }
  (__intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 8/*internal/buffer*/) || __intrinsic__createInternalModuleById(8/*internal/buffer*/)).boundsError(byteLength, 6, "byteLength");
}).$$capture_end$$;
