(function (){"use strict";
let $assert = function(check, sourceString, ...message) {
  if (!check) {
    const prevPrepareStackTrace = Error.prepareStackTrace;
    Error.prepareStackTrace = (e, stack) => {
      return e.name + ': ' + e.message + '\n' + stack.slice(1).map(x => '  at ' + x.toString()).join('\n');
    };
    const e = new Error(sourceString);
    e.stack; // materialize stack
    e.name = 'AssertionError';
    Error.prepareStackTrace = prevPrepareStackTrace;
    console.error('[internal:cluster/child] ASSERTION FAILED: ' + sourceString);
    if (message.length) console.warn(...message);
    console.warn(e.stack.split('\n')[1] + '\n');
    if (Bun.env.ASSERT === 'CRASH') process.exit(0xAA);
    throw e;
  }
}
// build/debug/tmp_modules/internal/cluster/child.ts
var $;
var EventEmitter = @getInternalField(@internalModuleRegistry, 96) || @createInternalModuleById(96);
var Worker = @getInternalField(@internalModuleRegistry, 10) || @createInternalModuleById(10);
var path = @getInternalField(@internalModuleRegistry, 107) || @createInternalModuleById(107);
var sendHelper = @lazy(4);
var onInternalMessage = @lazy(5);
var FunctionPrototype = Function.prototype;
var ArrayPrototypeJoin = @Array.prototype.join;
var ObjectAssign = Object.assign;
var cluster = new EventEmitter;
var handles = new Map;
var indexes = new Map;
var noop = FunctionPrototype;
var TIMEOUT_MAX = 2 ** 31 - 1;
var kNoFailure = 0;
var owner_symbol = Symbol("owner_symbol");
$ = cluster;
cluster.isWorker = true;
cluster.isMaster = false;
cluster.isPrimary = false;
cluster.worker = null;
cluster.Worker = Worker;
cluster._setupWorker = function() {
  const worker = new Worker({
    id: +process.env.NODE_UNIQUE_ID | 0,
    process,
    state: "online"
  });
  cluster.worker = worker;
  @lazy(6)();
  process.once("disconnect", () => {
    process.channel = null;
    worker.emit("disconnect");
    if (!worker.exitedAfterDisconnect) {
      process.exit(kNoFailure);
    }
  });
  onInternalMessage(worker, onmessage);
  send({ act: "online" });
  function onmessage(message, handle) {
    if (message.act === "newconn")
      onconnection(message, handle);
    else if (message.act === "disconnect")
      worker._disconnect(true);
  }
};
cluster._getServer = function(obj, options, cb) {
  let address = options.address;
  if (options.port < 0 && typeof address === "string" && true)
    address = path.resolve(address);
  const indexesKey = ArrayPrototypeJoin.@call([address, options.port, options.addressType, options.fd], ":");
  let indexSet = indexes.get(indexesKey);
  if (indexSet === @undefined) {
    indexSet = { nextIndex: 0, set: new Set };
    indexes.set(indexesKey, indexSet);
  }
  const index = indexSet.nextIndex++;
  indexSet.set.add(index);
  const message = {
    act: "queryServer",
    index,
    data: null,
    ...options
  };
  message.address = address;
  if (obj._getServerData)
    message.data = obj._getServerData();
  send(message, (reply, handle) => {
    if (typeof obj._setServerData === "function")
      obj._setServerData(reply.data);
    if (handle) {
      shared(reply, { handle, indexesKey, index }, cb);
    } else {
      rr(reply, { indexesKey, index }, cb);
    }
  });
  obj.once("listening", () => {
    if (!indexes.has(indexesKey)) {
      return;
    }
    cluster.worker.state = "listening";
    const address2 = obj.address();
    message.act = "listening";
    message.port = address2 && address2.port || options.port;
    send(message);
  });
};
function removeIndexesKey(indexesKey, index) {
  const indexSet = indexes.get(indexesKey);
  if (!indexSet) {
    return;
  }
  indexSet.set.delete(index);
  if (indexSet.set.size === 0) {
    indexes.delete(indexesKey);
  }
}
function shared(message, { handle, indexesKey, index }, cb) {
  const key = message.key;
  const close = handle.close;
  handle.close = function() {
    send({ act: "close", key });
    handles.delete(key);
    removeIndexesKey(indexesKey, index);
    return close.@apply(handle, arguments);
  };
  $assert(handles.has(key) === false, "handles.has(key) === false");
  handles.set(key, handle);
  cb(message.errno, handle);
}
function rr(message, { indexesKey, index }, cb) {
  if (message.errno)
    return cb(message.errno, null);
  let key = message.key;
  let fakeHandle = null;
  function ref() {
    if (!fakeHandle) {
      fakeHandle = setInterval(noop, TIMEOUT_MAX);
    }
  }
  function unref() {
    if (fakeHandle) {
      clearInterval(fakeHandle);
      fakeHandle = null;
    }
  }
  function listen(_backlog) {
    return 0;
  }
  function close() {
    if (key === @undefined)
      return;
    unref();
    send({ act: "close", key });
    handles.delete(key);
    removeIndexesKey(indexesKey, index);
    key = @undefined;
  }
  function getsockname(out) {
    if (key)
      ObjectAssign(out, message.sockname);
    return 0;
  }
  const handle = { close, listen, ref, unref };
  handle.ref();
  if (message.sockname) {
    handle.getsockname = getsockname;
  }
  $assert(handles.has(key) === false, "handles.has(key) === false");
  handles.set(key, handle);
  cb(0, handle);
}
function onconnection(message, handle) {
  const key = message.key;
  const server = handles.get(key);
  let accepted = server !== @undefined;
  if (accepted && server[owner_symbol]) {
    const self = server[owner_symbol];
    if (self.maxConnections != null && self._connections >= self.maxConnections) {
      accepted = false;
    }
  }
  send({ ack: message.seq, accepted });
  if (accepted)
    server.onconnection(0, handle);
  else
    handle.close();
}
function send(message, cb) {
  return sendHelper(message, null, cb);
}
Worker.prototype.disconnect = function() {
  if (this.state !== "disconnecting" && this.state !== "destroying") {
    this.state = "disconnecting";
    this._disconnect();
  }
  return this;
};
Worker.prototype._disconnect = function(primaryInitiated) {
  this.exitedAfterDisconnect = true;
  let waitingCount = 1;
  function checkWaitingCount() {
    waitingCount--;
    if (waitingCount === 0) {
      if (primaryInitiated) {
        process.disconnect();
      } else {
        send({ act: "exitedAfterDisconnect" }, () => process.disconnect());
      }
    }
  }
  handles.forEach((handle) => {
    waitingCount++;
    if (handle[owner_symbol])
      handle[owner_symbol].close(checkWaitingCount);
    else
      handle.close(checkWaitingCount);
  });
  handles.clear();
  checkWaitingCount();
};
Worker.prototype.destroy = function() {
  if (this.state === "destroying")
    return;
  this.exitedAfterDisconnect = true;
  if (!this.isConnected()) {
    process.exit(kNoFailure);
  } else {
    this.state = "destroying";
    send({ act: "exitedAfterDisconnect" }, () => process.disconnect());
    process.once("disconnect", () => process.exit(kNoFailure));
  }
};
return $})
