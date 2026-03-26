// @ts-nocheck
// GENERATED TEMP FILE - DO NOT EDIT
// Sourced from ../../../src/js/builtins/ReadableStreamInternals.ts

// do not allow the bundler to rename a symbol to $
($);

$$capture_start$$(function(reader,error) {  const requests = __intrinsic__getByIdDirectPrivate(reader, "readRequests");
  __intrinsic__putByIdDirectPrivate(reader, "readRequests", __intrinsic__createFIFO());
  for (var request = requests.shift(); request; request = requests.shift()) __intrinsic__rejectPromise(request, error);
}).$$capture_end$$;
