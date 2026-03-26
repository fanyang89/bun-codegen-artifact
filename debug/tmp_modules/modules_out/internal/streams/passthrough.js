// @bun
// build/debug/tmp_modules/internal/streams/passthrough.ts
var $;
var Transform = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 57) || __intrinsic__createInternalModuleById(57);
function PassThrough(options) {
  if (!(this instanceof PassThrough))
    return new PassThrough(options);
  Transform.__intrinsic__call(this, options);
}
__intrinsic__toClass(PassThrough, "PassThrough", Transform);
PassThrough.prototype._transform = function(chunk, encoding, cb) {
  cb(null, chunk);
};
$ = PassThrough;
$$EXPORT$$($).$$EXPORT_END$$;
