// @ts-nocheck
// GENERATED TEMP FILE - DO NOT EDIT
// Sourced from ../../../src/js/builtins/CompressionStream.ts

// do not allow the bundler to rename a symbol to $
($);

$$capture_start$$(function(format) {  const zlib = (__intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 131/*node:zlib*/) || __intrinsic__createInternalModuleById(131/*node:zlib*/));
  const stream = (__intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 117/*node:stream*/) || __intrinsic__createInternalModuleById(117/*node:stream*/));

  const builders = {
    "deflate": zlib.createDeflate,
    "deflate-raw": zlib.createDeflateRaw,
    "gzip": zlib.createGzip,
    "brotli": zlib.createBrotliCompress,
    "zstd": zlib.createZstdCompress,
  };

  if (!(format in builders))
    throw __intrinsic__makeErrorWithCode(119, "format", format, "must be one of: " + Object.keys(builders).join(", "));

  const handle = builders[format]();
  __intrinsic__putByIdDirectPrivate(this, "readable", stream.Readable.toWeb(handle));
  __intrinsic__putByIdDirectPrivate(this, "writable", stream.Writable.toWeb(handle));

  return this;
}).$$capture_end$$;
