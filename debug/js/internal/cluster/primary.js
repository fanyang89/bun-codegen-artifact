(function (){"use strict";// build/debug/tmp_modules/internal/cluster/primary.ts
var $;
var EventEmitter = @getInternalField(@internalModuleRegistry, 96) || @createInternalModuleById(96);
var Worker = @getInternalField(@internalModuleRegistry, 10) || @createInternalModuleById(10);
var RoundRobinHandle = @getInternalField(@internalModuleRegistry, 9) || @createInternalModuleById(9);
var path = @getInternalField(@internalModuleRegistry, 107) || @createInternalModuleById(107);
var { throwNotImplemented, kHandle } = @getInternalField(@internalModuleRegistry, 32) || @createInternalModuleById(32);
var sendHelper = @lazy(3);
var onInternalMessage = @lazy(7);
var child_process;
var ArrayPrototypeSlice = @Array.prototype.slice;
var ObjectValues = Object.values;
var ObjectKeys = Object.keys;
var cluster = new EventEmitter;
var intercom = new EventEmitter;
var SCHED_NONE = 1;
var SCHED_RR = 2;
$ = cluster;
var handles = new Map;
cluster.isWorker = false;
cluster.isMaster = true;
cluster.isPrimary = true;
cluster.Worker = Worker;
cluster.workers = {};
cluster.settings = {};
cluster.SCHED_NONE = SCHED_NONE;
cluster.SCHED_RR = SCHED_RR;
var ids = 0;
var initialized = false;
var schedulingPolicyEnv = process.env.NODE_CLUSTER_SCHED_POLICY;
var schedulingPolicy = 0;
if (schedulingPolicyEnv === "rr")
  schedulingPolicy = SCHED_RR;
else if (schedulingPolicyEnv === "none")
  schedulingPolicy = SCHED_NONE;
else if (false) {} else
  schedulingPolicy = SCHED_RR;
cluster.schedulingPolicy = schedulingPolicy;
cluster.setupPrimary = function(options) {
  const settings = {
    args: ArrayPrototypeSlice.@call(process.argv, 2),
    exec: process.argv[1],
    execArgv: process.execArgv,
    silent: false,
    ...cluster.settings,
    ...options
  };
  cluster.settings = settings;
  if (initialized === true)
    return process.nextTick(setupSettingsNT, settings);
  initialized = true;
  schedulingPolicy = cluster.schedulingPolicy;
  if (!(schedulingPolicy === SCHED_NONE || schedulingPolicy === SCHED_RR))
    throw new Error(`Bad cluster.schedulingPolicy: ${schedulingPolicy}`);
  process.nextTick(setupSettingsNT, settings);
};
cluster.setupMaster = cluster.setupPrimary;
function setupSettingsNT(settings) {
  cluster.emit("setup", settings);
}
function createWorkerProcess(id, env) {
  const workerEnv = { ...process.env, ...env, NODE_UNIQUE_ID: `${id}` };
  const execArgv = [...cluster.settings.execArgv];
  child_process ??= @getInternalField(@internalModuleRegistry, 87) || @createInternalModuleById(87);
  return child_process.fork(cluster.settings.exec, cluster.settings.args, {
    cwd: cluster.settings.cwd,
    env: workerEnv,
    serialization: cluster.settings.serialization,
    silent: cluster.settings.silent,
    windowsHide: cluster.settings.windowsHide,
    execArgv,
    stdio: cluster.settings.stdio,
    gid: cluster.settings.gid,
    uid: cluster.settings.uid
  });
}
function removeWorker(worker) {
  if (!worker)
    throw new Error("ERR_INTERNAL_ASSERTION");
  delete cluster.workers[worker.id];
  if (ObjectKeys(cluster.workers).length === 0) {
    if (!(handles.size === 0))
      throw new Error("Resource leak detected.");
    intercom.emit("disconnect");
  }
}
function removeHandlesForWorker(worker) {
  if (!worker)
    throw new Error("ERR_INTERNAL_ASSERTION");
  handles.forEach((handle, key) => {
    if (handle.remove(worker))
      handles.delete(key);
  });
}
cluster.fork = function(env) {
  cluster.setupPrimary();
  const id = ++ids;
  const workerProcess = createWorkerProcess(id, env);
  const worker = new Worker({
    id,
    process: workerProcess
  });
  worker.on("message", function(message, handle) {
    cluster.emit("message", this, message, handle);
  });
  worker.process.once("exit", (exitCode, signalCode) => {
    if (!worker.isConnected()) {
      removeHandlesForWorker(worker);
      removeWorker(worker);
    }
    worker.exitedAfterDisconnect = !!worker.exitedAfterDisconnect;
    worker.state = "dead";
    worker.emit("exit", exitCode, signalCode);
    cluster.emit("exit", worker, exitCode, signalCode);
  });
  worker.process.once("disconnect", () => {
    worker.process.channel = null;
    removeHandlesForWorker(worker);
    if (worker.isDead())
      removeWorker(worker);
    worker.exitedAfterDisconnect = !!worker.exitedAfterDisconnect;
    worker.state = "disconnected";
    worker.emit("disconnect");
    cluster.emit("disconnect", worker);
  });
  onInternalMessage(worker.process[kHandle], worker, onmessage);
  process.nextTick(emitForkNT, worker);
  cluster.workers[worker.id] = worker;
  return worker;
};
function emitForkNT(worker) {
  cluster.emit("fork", worker);
}
cluster.disconnect = function(cb) {
  const workers = ObjectKeys(cluster.workers);
  if (workers.length === 0) {
    process.nextTick(() => intercom.emit("disconnect"));
  } else {
    for (const worker of ObjectValues(cluster.workers)) {
      if (worker.isConnected()) {
        worker.disconnect();
      }
    }
  }
  if (typeof cb === "function")
    intercom.once("disconnect", cb);
};
var methodMessageMapping = {
  close,
  exitedAfterDisconnect,
  listening,
  online,
  queryServer
};
function onmessage(message, _handle) {
  const worker = this;
  const fn = methodMessageMapping[message.act];
  if (typeof fn === "function")
    fn(worker, message);
}
function online(worker) {
  worker.state = "online";
  worker.emit("online");
  cluster.emit("online", worker);
}
function exitedAfterDisconnect(worker, message) {
  worker.exitedAfterDisconnect = true;
  send(worker, { ack: message.seq });
}
function queryServer(worker, message) {
  if (worker.exitedAfterDisconnect)
    return;
  const key = `${message.address}:${message.port}:${message.addressType}:` + `${message.fd}:${message.index}`;
  let handle = handles.get(key);
  if (handle === @undefined) {
    let address = message.address;
    if (message.port < 0 && typeof address === "string" && true) {
      address = path.relative(process.cwd(), address);
      if (message.address.length < address.length)
        address = message.address;
    }
    if (schedulingPolicy !== SCHED_RR || message.addressType === "udp4" || message.addressType === "udp6") {
      throwNotImplemented("node:cluster SCHED_NONE");
    } else {
      handle = new RoundRobinHandle(key, address, message);
    }
    handles.set(key, handle);
  }
  if (!handle.data)
    handle.data = message.data;
  handle.add(worker, (errno, reply, handle2) => {
    const { data } = handles.get(key);
    if (errno)
      handles.delete(key);
    send(worker, {
      errno,
      key,
      ack: message.seq,
      data,
      ...reply
    }, handle2);
  });
}
function listening(worker, message) {
  const info = {
    addressType: message.addressType,
    address: message.address,
    port: message.port,
    fd: message.fd
  };
  worker.state = "listening";
  worker.emit("listening", info);
  cluster.emit("listening", worker, info);
}
function close(worker, message) {
  const key = message.key;
  const handle = handles.get(key);
  if (handle && handle.remove(worker))
    handles.delete(key);
}
function send(worker, message, handle, cb) {
  return sendHelper(worker.process[kHandle], message, handle, cb);
}
Worker.prototype.disconnect = function() {
  this.exitedAfterDisconnect = true;
  send(this, { act: "disconnect" });
  this.process.disconnect();
  removeHandlesForWorker(this);
  removeWorker(this);
  return this;
};
Worker.prototype.destroy = function(signo) {
  const proc = this.process;
  const signal = signo || "SIGTERM";
  proc.kill(signal);
};
return $})
