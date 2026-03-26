// @ts-nocheck
var $;// GENERATED TEMP FILE - DO NOT EDIT
// Sourced from src/js/internal/streams/passthrough.ts


// a passthrough stream.
// basically just the most minimal sort of Transform stream.
// Every written chunk gets output as-is.

"use strict";

const Transform = (__intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 57/*internal/streams/transform*/) || __intrinsic__createInternalModuleById(57/*internal/streams/transform*/));

function PassThrough(options): void {
  if (!(this instanceof PassThrough)) return new PassThrough(options);

  Transform.__intrinsic__call(this, options);
}
__intrinsic__toClass(PassThrough, "PassThrough", Transform);

PassThrough.prototype._transform = function (chunk, encoding, cb) {
  cb(null, chunk);
};

$ = PassThrough;
;$$EXPORT$$($).$$EXPORT_END$$;
