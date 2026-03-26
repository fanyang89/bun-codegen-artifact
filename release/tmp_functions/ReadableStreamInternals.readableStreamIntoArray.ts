// @ts-nocheck
// GENERATED TEMP FILE - DO NOT EDIT
// Sourced from ../../../src/js/builtins/ReadableStreamInternals.ts

// do not allow the bundler to rename a symbol to $
($);

$$capture_start$$(function(stream) {  var reader = stream.getReader();
  var manyResult = reader.readMany();

  async function processManyResult(result) {
    let { done, value } = result;
    var chunks = value || [];

    while (!done) {
      var thisResult = reader.readMany();
      if (__intrinsic__isPromise(thisResult)) {
        thisResult = await thisResult;
      }

      ({ done, value = [] } = thisResult);
      const length = value.length || 0;
      if (length > 1) {
        chunks = chunks.concat(value);
      } else if (length === 1) {
        chunks.push(value[0]);
      }
    }

    return chunks;
  }

  if (manyResult && __intrinsic__isPromise(manyResult)) {
    return manyResult.__intrinsic__then(processManyResult);
  }

  return processManyResult(manyResult);
}).$$capture_end$$;
