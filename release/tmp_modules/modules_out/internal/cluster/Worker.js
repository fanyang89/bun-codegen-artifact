// @bun
// build/release/tmp_modules/internal/cluster/Worker.ts
var $, EventEmitter = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 96) || __intrinsic__createInternalModuleById(96), ObjectFreeze = Object.freeze, kEmptyObject = ObjectFreeze(Object.create(null));
function Worker(options) {
  if (!(this instanceof Worker))
    return new Worker(options);
  if (EventEmitter.__intrinsic__apply(this, []), options === null || typeof options !== "object")
    options = kEmptyObject;
  if (this.exitedAfterDisconnect = __intrinsic__undefined, this.state = options.state || "none", this.id = options.id | 0, options.process)
    this.process = options.process, this.process.on("error", (code, signal) => this.emit("error", code, signal)), this.process.on("message", (message, handle) => this.emit("message", message, handle));
}
__intrinsic__toClass(Worker, "Worker", EventEmitter);
Worker.prototype.kill = function() {
  this.destroy.__intrinsic__apply(this, arguments);
};
Worker.prototype.send = function() {
  return this.process.send.__intrinsic__apply(this.process, arguments);
};
Worker.prototype.isDead = function() {
  return this.process.exitCode != null || this.process.signalCode != null;
};
Worker.prototype.isConnected = function() {
  return this.process.connected;
};
$ = Worker;
$$EXPORT$$($).$$EXPORT_END$$;
