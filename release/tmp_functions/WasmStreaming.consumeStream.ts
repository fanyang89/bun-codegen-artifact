// @ts-nocheck
// GENERATED TEMP FILE - DO NOT EDIT
// Sourced from ../../../src/js/builtins/WasmStreaming.ts

// do not allow the bundler to rename a symbol to $
($);

$$capture_start$$(async function(stream) {  // NOTE: We're not using this.cancel()...where should that be used?
  try {
    for await (const chunk of stream) this.addBytes(chunk);
  } catch (error) {
    this.fail(error);
    return;
  }

  this.finalize();
}).$$capture_end$$;
