// @ts-nocheck
var $;// GENERATED TEMP FILE - DO NOT EDIT
// Sourced from src/js/internal/cluster/Worker.ts


const EventEmitter = (__intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 96/*node:events*/) || __intrinsic__createInternalModuleById(96/*node:events*/));

const ObjectFreeze = Object.freeze;

const kEmptyObject = ObjectFreeze(Object.create(null));

function Worker(options) {
  if (!(this instanceof Worker)) return new Worker(options);

  EventEmitter.__intrinsic__apply(this, []);

  if (options === null || typeof options !== "object") options = kEmptyObject;

  this.exitedAfterDisconnect = undefined;

  this.state = options.state || "none";
  this.id = options.id | 0;

  if (options.process) {
    this.process = options.process;
    this.process.on("error", (code, signal) => this.emit("error", code, signal));
    this.process.on("message", (message, handle) => this.emit("message", message, handle));
  }
}
__intrinsic__toClass(Worker, "Worker", EventEmitter);

Worker.prototype.kill = function () {
  this.destroy.__intrinsic__apply(this, arguments);
};

Worker.prototype.send = function () {
  return this.process.send.__intrinsic__apply(this.process, arguments);
};

Worker.prototype.isDead = function () {
  return this.process.exitCode != null || this.process.signalCode != null;
};

Worker.prototype.isConnected = function () {
  return this.process.connected;
};

$ = Worker;
;$$EXPORT$$($).$$EXPORT_END$$;
