// @ts-nocheck
// GENERATED TEMP FILE - DO NOT EDIT
// Sourced from ../../../src/js/builtins/Glob.ts

// do not allow the bundler to rename a symbol to $
($);

$$capture_start$$(function(opts) {  const valuesPromise = this.__intrinsic__pull(opts);
  async function* iter() {
    const values = (await valuesPromise) || [];
    yield* values;
  }
  return iter();
}).$$capture_end$$;
