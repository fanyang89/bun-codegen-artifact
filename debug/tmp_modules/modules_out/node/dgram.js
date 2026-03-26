// @bun
// build/debug/tmp_modules/node/dgram.ts
var $;
var BIND_STATE_UNBOUND = 0;
var BIND_STATE_BINDING = 1;
var BIND_STATE_BOUND = 2;
var CONNECT_STATE_DISCONNECTED = 0;
var CONNECT_STATE_CONNECTING = 1;
var CONNECT_STATE_CONNECTED = 2;
var RECV_BUFFER = true;
var SEND_BUFFER = false;
var kStateSymbol = Symbol("state symbol");
var kOwnerSymbol = Symbol("owner symbol");
var async_id_symbol = Symbol("async_id_symbol");
var { throwNotImplemented } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 32) || __intrinsic__createInternalModuleById(32);
var {
  validateString,
  validateNumber,
  validateFunction,
  validatePort,
  validateAbortSignal
} = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 68) || __intrinsic__createInternalModuleById(68);
var { isIP } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 28) || __intrinsic__createInternalModuleById(28);
var EventEmitter = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 96) || __intrinsic__createInternalModuleById(96);
var { deprecate } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 65) || __intrinsic__createInternalModuleById(65);
var SymbolDispose = Symbol.dispose;
var SymbolAsyncDispose = Symbol.asyncDispose;
var ObjectDefineProperty = Object.defineProperty;
var FunctionPrototypeBind = Function.prototype.bind;

class ERR_SOCKET_BUFFER_SIZE extends Error {
  constructor(ctx) {
    super(`Invalid buffer size: ${ctx}`);
    this.code = "ERR_SOCKET_BUFFER_SIZE";
  }
}
function isInt32(value) {
  return value === (value | 0);
}
function defaultTriggerAsyncIdScope(triggerAsyncId, block, ...args) {
  return block.__intrinsic__apply(null, args);
}
function lookup4(lookup, address, callback) {
  return lookup(address || "127.0.0.1", 4, callback);
}
function lookup6(lookup, address, callback) {
  return lookup(address || "::1", 6, callback);
}
function EINVAL(syscall) {
  throw Object.assign(new Error(`${syscall} EINVAL`), {
    code: "EINVAL",
    syscall
  });
}
var dns;
function newHandle(type, lookup) {
  if (lookup === __intrinsic__undefined) {
    if (dns === __intrinsic__undefined) {
      dns = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 94) || __intrinsic__createInternalModuleById(94);
    }
    lookup = dns.lookup;
  } else {
    validateFunction(lookup, "lookup");
  }
  const handle = {};
  if (type === "udp4") {
    handle.lookup = FunctionPrototypeBind.__intrinsic__call(lookup4, handle, lookup);
  } else if (type === "udp6") {
    handle.lookup = FunctionPrototypeBind.__intrinsic__call(lookup6, handle, lookup);
  } else {
    throw __intrinsic__makeErrorWithCode(218);
  }
  handle.onmessage = onMessage;
  return handle;
}
function onMessage(nread, handle, buf, rinfo) {
  const self = handle[kOwnerSymbol];
  if (nread < 0) {
    return self.emit("error", Object.assign(new Error("recvmsg"), {
      syscall: "recvmsg",
      errno: nread
    }));
  }
  rinfo.size = buf.length;
  self.emit("message", buf, rinfo);
}
var udpSocketChannel;
function Socket(type, listener) {
  EventEmitter.__intrinsic__call(this);
  let lookup;
  let recvBufferSize;
  let sendBufferSize;
  let options;
  if (type !== null && typeof type === "object") {
    options = type;
    type = options.type;
    lookup = options.lookup;
    recvBufferSize = options.recvBufferSize;
    sendBufferSize = options.sendBufferSize;
  }
  const handle = newHandle(type, lookup);
  handle[kOwnerSymbol] = this;
  this.type = type;
  if (typeof listener === "function")
    this.on("message", listener);
  this[kStateSymbol] = {
    handle,
    receiving: false,
    bindState: BIND_STATE_UNBOUND,
    connectState: CONNECT_STATE_DISCONNECTED,
    queue: __intrinsic__undefined,
    reuseAddr: options && options.reuseAddr,
    reusePort: options && options.reusePort,
    ipv6Only: options && options.ipv6Only,
    recvBufferSize,
    sendBufferSize,
    unrefOnBind: false
  };
  if (options?.signal !== __intrinsic__undefined) {
    const { signal } = options;
    validateAbortSignal(signal, "options.signal");
    const onAborted = () => {
      if (this[kStateSymbol].handle)
        this.close();
    };
    if (signal.aborted) {
      onAborted();
    } else {
      const disposable = EventEmitter.addAbortListener(signal, onAborted);
      this.once("close", disposable[SymbolDispose]);
    }
  }
  if (!udpSocketChannel) {
    udpSocketChannel = (__intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 92) || __intrinsic__createInternalModuleById(92)).channel("udp.socket");
  }
  if (udpSocketChannel.hasSubscribers) {
    udpSocketChannel.publish({
      socket: this
    });
  }
}
__intrinsic__toClass(Socket, "Socket", EventEmitter);
function createSocket(type, listener) {
  return new Socket(type, listener);
}
function bufferSize(self, size, _buffer) {
  if (size >>> 0 !== size)
    throw __intrinsic__makeErrorWithCode(216);
  const ctx = {};
  const ret = 1 << 19;
  if (ret === __intrinsic__undefined) {
    throw new ERR_SOCKET_BUFFER_SIZE(ctx);
  }
  return ret;
}
Socket.prototype.bind = function(port_, address_) {
  let port = port_;
  const state = this[kStateSymbol];
  if (state.bindState !== BIND_STATE_UNBOUND) {
    this.emit("error", __intrinsic__makeErrorWithCode(215));
    return;
  }
  state.bindState = BIND_STATE_BINDING;
  const cb = arguments.length && arguments[arguments.length - 1];
  if (typeof cb === "function") {
    let removeListeners2 = function() {
      this.removeListener("error", removeListeners2);
      this.removeListener("listening", onListening2);
    }, onListening2 = function() {
      removeListeners2.__intrinsic__call(this);
      cb.__intrinsic__call(this);
    };
    var removeListeners = removeListeners2, onListening = onListening2;
    this.on("error", removeListeners2);
    this.on("listening", onListening2);
  }
  if (port !== null && typeof port === "object" && typeof port.recvStart === "function") {
    throwNotImplemented("Socket.prototype.bind(handle)");
  }
  if (port !== null && typeof port === "object" && isInt32(port.fd) && port.fd > 0) {
    throwNotImplemented("Socket.prototype.bind({ fd })");
  }
  let address;
  if (port !== null && typeof port === "object") {
    address = port.address || "";
    port = port.port;
  } else {
    address = typeof address_ === "function" ? "" : address_;
  }
  if (!address) {
    if (this.type === "udp4")
      address = "0.0.0.0";
    else
      address = "::";
  }
  state.handle.lookup(address, (err, ip) => {
    if (!state.handle)
      return;
    if (err) {
      state.bindState = BIND_STATE_UNBOUND;
      this.emit("error", err);
      return;
    }
    let flags = 32 /* LISTEN_DISALLOW_REUSE_PORT_FAILURE */;
    if (state.reuseAddr) {
      flags |= 16 /* LISTEN_REUSE_ADDR */;
    }
    if (state.ipv6Only) {
      flags |= 8 /* SOCKET_IPV6_ONLY */;
    }
    if (state.reusePort) {
      flags |= 4 /* LISTEN_REUSE_PORT */;
    }
    const family = this.type === "udp4" ? "IPv4" : "IPv6";
    try {
      Bun.udpSocket({
        hostname: ip,
        port: port || 0,
        flags,
        socket: {
          data: (_socket, data, port2, address2) => {
            this.emit("message", data, {
              port: port2,
              address: address2,
              size: data.length,
              family
            });
          },
          error: (error) => {
            this.emit("error", error);
          }
        }
      }).__intrinsic__then((socket) => {
        if (state.unrefOnBind) {
          socket.unref();
          state.unrefOnBind = false;
        }
        state.handle.socket = socket;
        state.receiving = true;
        state.bindState = BIND_STATE_BOUND;
        this.emit("listening");
      }, (err2) => {
        state.bindState = BIND_STATE_UNBOUND;
        this.emit("error", err2);
      });
    } catch (err2) {
      state.bindState = BIND_STATE_UNBOUND;
      this.emit("error", err2);
    }
  });
  return this;
};
Socket.prototype.connect = function(port, address, callback) {
  port = validatePort(port, "Port", false);
  if (typeof address === "function") {
    callback = address;
    address = "";
  } else if (address === __intrinsic__undefined) {
    address = "";
  }
  validateString(address, "address");
  const state = this[kStateSymbol];
  if (state.connectState !== CONNECT_STATE_DISCONNECTED)
    throw __intrinsic__makeErrorWithCode(222);
  state.connectState = CONNECT_STATE_CONNECTING;
  if (state.bindState === BIND_STATE_UNBOUND)
    this.bind({ port: 0, exclusive: true }, null);
  if (state.bindState !== BIND_STATE_BOUND) {
    enqueue(this, FunctionPrototypeBind.__intrinsic__call(_connect, this, port, address, callback));
    return;
  }
  _connect.__intrinsic__apply(this, [port, address, callback]);
};
function _connect(port, address, callback) {
  const state = this[kStateSymbol];
  if (callback)
    this.once("connect", callback);
  const afterDns = (ex, ip) => {
    defaultTriggerAsyncIdScope(this[async_id_symbol], doConnect, ex, this, ip, address, port, callback);
  };
  state.handle.lookup(address, afterDns);
}
var connectFn = __intrinsic__lazy(47);
function doConnect(ex, self, ip, address, port, callback) {
  const state = self[kStateSymbol];
  if (!state.handle)
    return;
  if (!ex) {
    try {
      connectFn.__intrinsic__call(state.handle.socket, ip, port);
    } catch (e) {
      ex = e;
    }
  }
  if (ex) {
    state.connectState = CONNECT_STATE_DISCONNECTED;
    return process.nextTick(() => {
      if (callback) {
        self.removeListener("connect", callback);
        callback(ex);
      } else {
        self.emit("error", ex);
      }
    });
  }
  state.connectState = CONNECT_STATE_CONNECTED;
  process.nextTick(() => self.emit("connect"));
}
var disconnectFn = __intrinsic__lazy(48);
Socket.prototype.disconnect = function() {
  const state = this[kStateSymbol];
  if (state.connectState !== CONNECT_STATE_CONNECTED)
    throw __intrinsic__makeErrorWithCode(223);
  disconnectFn.__intrinsic__call(state.handle.socket);
  state.connectState = CONNECT_STATE_DISCONNECTED;
};
Socket.prototype.sendto = function(buffer, offset, length, port, address, callback) {
  validateNumber(offset, "offset");
  validateNumber(length, "length");
  validateNumber(port, "port");
  validateString(address, "address");
  this.send(buffer, offset, length, port, address, callback);
};
function sliceBuffer(buffer, offset, length) {
  if (typeof buffer === "string") {
    buffer = __intrinsic__Buffer.from(buffer);
  } else if (!__intrinsic__ArrayBuffer.isView(buffer)) {
    throw __intrinsic__makeErrorWithCode(118, "buffer", ["string", "Buffer", "TypedArray", "DataView"], buffer);
  }
  offset = offset >>> 0;
  length = length >>> 0;
  if (offset > buffer.byteLength) {
    throw __intrinsic__makeErrorWithCode(12, "offset");
  }
  if (offset + length > buffer.byteLength) {
    throw __intrinsic__makeErrorWithCode(12, "length");
  }
  return __intrinsic__Buffer.from(buffer.buffer, buffer.byteOffset + offset, length);
}
function fixBufferList(list) {
  const newlist = new __intrinsic__Array(list.length);
  for (let i = 0, l = list.length;i < l; i++) {
    const buf = list[i];
    if (typeof buf === "string")
      newlist[i] = __intrinsic__Buffer.from(buf);
    else if (!__intrinsic__ArrayBuffer.isView(buf))
      return null;
    else
      newlist[i] = __intrinsic__Buffer.from(buf.buffer, buf.byteOffset, buf.byteLength);
  }
  return newlist;
}
function enqueue(self, toEnqueue) {
  const state = self[kStateSymbol];
  if (state.queue === __intrinsic__undefined) {
    state.queue = [];
    self.once(EventEmitter.errorMonitor, onListenError);
    self.once("listening", onListenSuccess);
  }
  state.queue.push(toEnqueue);
}
function onListenSuccess() {
  this.removeListener(EventEmitter.errorMonitor, onListenError);
  clearQueue.__intrinsic__call(this);
}
function onListenError(_err) {
  this.removeListener("listening", onListenSuccess);
  this[kStateSymbol].queue = __intrinsic__undefined;
}
function clearQueue() {
  const state = this[kStateSymbol];
  const queue = state.queue;
  state.queue = __intrinsic__undefined;
  for (const queueEntry of queue)
    queueEntry();
}
Socket.prototype.send = function(buffer, offset, length, port, address, callback) {
  let list;
  const state = this[kStateSymbol];
  const connected = state.connectState === CONNECT_STATE_CONNECTED;
  if (!connected) {
    if (address || port && typeof port !== "function") {
      buffer = sliceBuffer(buffer, offset, length);
    } else {
      callback = port;
      port = offset;
      address = length;
    }
  } else {
    if (typeof length === "number") {
      buffer = sliceBuffer(buffer, offset, length);
      if (typeof port === "function") {
        callback = port;
        port = null;
      }
    } else {
      callback = offset;
    }
    if (port || address)
      throw __intrinsic__makeErrorWithCode(222);
  }
  if (!__intrinsic__Array.isArray(buffer)) {
    if (typeof buffer === "string") {
      list = [__intrinsic__Buffer.from(buffer)];
    } else if (!__intrinsic__ArrayBuffer.isView(buffer)) {
      throw __intrinsic__makeErrorWithCode(118, "buffer", ["string", "Buffer", "TypedArray", "DataView"], buffer);
    } else {
      list = [buffer];
    }
  } else if (!(list = fixBufferList(buffer))) {
    throw __intrinsic__makeErrorWithCode(118, "buffer list arguments", ["string", "Buffer", "TypedArray", "DataView"], buffer);
  }
  if (!connected)
    port = validatePort(port, "Port", false);
  if (typeof callback !== "function")
    callback = __intrinsic__undefined;
  if (typeof address === "function") {
    callback = address;
    address = __intrinsic__undefined;
  } else if (address != null) {
    validateString(address, "address");
  }
  if (state.bindState === BIND_STATE_UNBOUND)
    this.bind({ port: 0, exclusive: true }, null);
  if (list.length === 0)
    list.push(__intrinsic__Buffer.alloc(0));
  if (state.bindState !== BIND_STATE_BOUND) {
    enqueue(this, FunctionPrototypeBind.__intrinsic__call(this.send, this, list, port, address, callback));
    return;
  }
  const afterDns = (ex, ip) => {
    defaultTriggerAsyncIdScope(this[async_id_symbol], doSend, ex, this, ip, list, address, port, callback);
  };
  if (!connected) {
    state.handle.lookup(address, afterDns);
  } else {
    afterDns(null, null);
  }
};
function doSend(ex, self, ip, list, address, port, callback) {
  const state = self[kStateSymbol];
  if (ex) {
    if (typeof callback === "function") {
      process.nextTick(callback, ex);
      return;
    }
    process.nextTick(() => self.emit("error", ex));
    return;
  }
  if (!state.handle) {
    return;
  }
  const socket = state.handle.socket;
  if (!socket) {
    return;
  }
  let err = null;
  let success = false;
  let data;
  if (list === __intrinsic__undefined)
    data = new __intrinsic__Buffer(0);
  else if (__intrinsic__Array.isArray(list) && list.length === 1) {
    const { buffer, byteOffset, byteLength } = list[0];
    data = new __intrinsic__Buffer(buffer).slice(byteOffset).slice(0, byteLength);
  } else
    data = __intrinsic__Buffer.concat(list);
  try {
    if (port) {
      success = socket.send(data, port, ip);
    } else {
      success = socket.send(data);
    }
  } catch (e) {
    err = e;
  }
  if (callback) {
    if (err) {
      err.address = ip;
      err.port = port;
      err.message = `send ${err.code} ${ip}:${port}`;
      process.nextTick(callback, err);
    } else {
      const sent = success ? data.byteLength : 0;
      process.nextTick(callback, null, sent);
    }
  }
}
Socket.prototype.close = function(callback) {
  const state = this[kStateSymbol];
  const queue = state.queue;
  if (typeof callback === "function")
    this.on("close", callback);
  if (queue !== __intrinsic__undefined) {
    queue.push(FunctionPrototypeBind.__intrinsic__call(this.close, this));
    return this;
  }
  state.receiving = false;
  state.handle.socket?.close();
  state.handle = null;
  defaultTriggerAsyncIdScope(this[async_id_symbol], process.nextTick, socketCloseNT, this);
  return this;
};
Socket.prototype[SymbolAsyncDispose] = async function() {
  if (!this[kStateSymbol].handle.socket) {
    return;
  }
  const { promise, resolve, reject } = __intrinsic__newPromiseCapability(__intrinsic__Promise);
  this.close((err) => {
    if (err) {
      reject(err);
    } else {
      resolve();
    }
  });
  return promise;
};
function socketCloseNT(self) {
  self.emit("close");
}
Socket.prototype.address = function() {
  const addr = this[kStateSymbol].handle.socket?.address;
  if (!addr)
    throw __intrinsic__makeErrorWithCode(224);
  return addr;
};
Socket.prototype.remoteAddress = function() {
  const state = this[kStateSymbol];
  const socket = state.handle.socket;
  if (!socket)
    throw __intrinsic__makeErrorWithCode(224);
  if (state.connectState !== CONNECT_STATE_CONNECTED)
    throw __intrinsic__makeErrorWithCode(223);
  if (!socket.remoteAddress)
    throw __intrinsic__makeErrorWithCode(223);
  return socket.remoteAddress;
};
Socket.prototype.setBroadcast = function(arg) {
  const handle = this[kStateSymbol].handle;
  if (!handle?.socket) {
    throw new Error("setBroadcast EBADF");
  }
  return handle.socket.setBroadcast(arg);
};
Socket.prototype.setTTL = function(ttl) {
  if (typeof ttl !== "number") {
    throw __intrinsic__makeErrorWithCode(118, "ttl", "number", ttl);
  }
  const handle = this[kStateSymbol].handle;
  if (!handle?.socket) {
    throw new Error("setTTL EBADF");
  }
  return handle.socket.setTTL(ttl);
};
Socket.prototype.setMulticastTTL = function(ttl) {
  if (typeof ttl !== "number") {
    throw __intrinsic__makeErrorWithCode(118, "ttl", "number", ttl);
  }
  const handle = this[kStateSymbol].handle;
  if (!handle?.socket) {
    throw new Error("setMulticastTTL EBADF");
  }
  return handle.socket.setMulticastTTL(ttl);
};
Socket.prototype.setMulticastLoopback = function(arg) {
  const handle = this[kStateSymbol].handle;
  if (!handle?.socket) {
    throw new Error("setMulticastLoopback EBADF");
  }
  return handle.socket.setMulticastLoopback(arg);
};
Socket.prototype.setMulticastInterface = function(interfaceAddress) {
  validateString(interfaceAddress, "interfaceAddress");
  const handle = this[kStateSymbol].handle;
  if (!handle?.socket) {
    throw __intrinsic__makeErrorWithCode(224);
  }
  if (!handle.socket.setMulticastInterface(interfaceAddress)) {
    throw EINVAL("setMulticastInterface");
  }
};
Socket.prototype.addMembership = function(multicastAddress, interfaceAddress) {
  if (!multicastAddress) {
    throw __intrinsic__makeErrorWithCode(150, "multicastAddress");
  }
  validateString(multicastAddress, "multicastAddress");
  if (typeof interfaceAddress !== "undefined") {
    validateString(interfaceAddress, "interfaceAddress");
  }
  const { handle, bindState } = this[kStateSymbol];
  if (!handle?.socket) {
    if (!isIP(multicastAddress)) {
      throw EINVAL("addMembership");
    }
    throw __intrinsic__makeErrorWithCode(224);
  }
  if (bindState === BIND_STATE_UNBOUND) {
    this.bind({ port: 0, exclusive: true }, null);
  }
  return handle.socket.addMembership(multicastAddress, interfaceAddress);
};
Socket.prototype.dropMembership = function(multicastAddress, interfaceAddress) {
  if (!multicastAddress) {
    throw __intrinsic__makeErrorWithCode(150, "multicastAddress");
  }
  validateString(multicastAddress, "multicastAddress");
  if (typeof interfaceAddress !== "undefined") {
    validateString(interfaceAddress, "interfaceAddress");
  }
  const { handle } = this[kStateSymbol];
  if (!handle?.socket) {
    if (!isIP(multicastAddress)) {
      throw EINVAL("dropMembership");
    }
    throw __intrinsic__makeErrorWithCode(224);
  }
  return handle.socket.dropMembership(multicastAddress, interfaceAddress);
};
Socket.prototype.addSourceSpecificMembership = function(sourceAddress, groupAddress, interfaceAddress) {
  validateString(sourceAddress, "sourceAddress");
  validateString(groupAddress, "groupAddress");
  if (typeof interfaceAddress !== "undefined") {
    validateString(interfaceAddress, "interfaceAddress");
  }
  const { handle, bindState } = this[kStateSymbol];
  if (!handle?.socket) {
    if (!isIP(sourceAddress) || !isIP(groupAddress)) {
      throw EINVAL("addSourceSpecificMembership");
    }
    throw __intrinsic__makeErrorWithCode(224);
  }
  if (bindState === BIND_STATE_UNBOUND) {
    this.bind(0);
  }
  return handle.socket.addSourceSpecificMembership(sourceAddress, groupAddress, interfaceAddress);
};
Socket.prototype.dropSourceSpecificMembership = function(sourceAddress, groupAddress, interfaceAddress) {
  validateString(sourceAddress, "sourceAddress");
  validateString(groupAddress, "groupAddress");
  if (typeof interfaceAddress !== "undefined") {
    validateString(interfaceAddress, "interfaceAddress");
  }
  const { handle, bindState } = this[kStateSymbol];
  if (!handle?.socket) {
    if (!isIP(sourceAddress) || !isIP(groupAddress)) {
      throw EINVAL("dropSourceSpecificMembership");
    }
    throw __intrinsic__makeErrorWithCode(224);
  }
  if (bindState === BIND_STATE_UNBOUND) {
    this.bind(0);
  }
  return handle.socket.dropSourceSpecificMembership(sourceAddress, groupAddress, interfaceAddress);
};
Socket.prototype.ref = function() {
  const socket = this[kStateSymbol].handle?.socket;
  if (socket)
    socket.ref();
  return this;
};
Socket.prototype.unref = function() {
  const socket = this[kStateSymbol].handle?.socket;
  if (socket) {
    socket.unref();
  } else {
    this[kStateSymbol].unrefOnBind = true;
  }
  return this;
};
Socket.prototype.setRecvBufferSize = function(size) {
  bufferSize(this, size, RECV_BUFFER);
};
Socket.prototype.setSendBufferSize = function(size) {
  bufferSize(this, size, SEND_BUFFER);
};
Socket.prototype.getRecvBufferSize = function() {
  return bufferSize(this, 0, RECV_BUFFER);
};
Socket.prototype.getSendBufferSize = function() {
  return bufferSize(this, 0, SEND_BUFFER);
};
Socket.prototype.getSendQueueSize = function() {
  return 0;
};
Socket.prototype.getSendQueueCount = function() {
  return 0;
};
ObjectDefineProperty(Socket.prototype, "_handle", {
  get: deprecate(function() {
    return this[kStateSymbol].handle;
  }, "Socket.prototype._handle is deprecated", "DEP0112"),
  set: deprecate(function(val) {
    this[kStateSymbol].handle = val;
  }, "Socket.prototype._handle is deprecated", "DEP0112")
});
ObjectDefineProperty(Socket.prototype, "_receiving", {
  get: deprecate(function() {
    return this[kStateSymbol].receiving;
  }, "Socket.prototype._receiving is deprecated", "DEP0112"),
  set: deprecate(function(val) {
    this[kStateSymbol].receiving = val;
  }, "Socket.prototype._receiving is deprecated", "DEP0112")
});
ObjectDefineProperty(Socket.prototype, "_bindState", {
  get: deprecate(function() {
    return this[kStateSymbol].bindState;
  }, "Socket.prototype._bindState is deprecated", "DEP0112"),
  set: deprecate(function(val) {
    this[kStateSymbol].bindState = val;
  }, "Socket.prototype._bindState is deprecated", "DEP0112")
});
ObjectDefineProperty(Socket.prototype, "_queue", {
  get: deprecate(function() {
    return this[kStateSymbol].queue;
  }, "Socket.prototype._queue is deprecated", "DEP0112"),
  set: deprecate(function(val) {
    this[kStateSymbol].queue = val;
  }, "Socket.prototype._queue is deprecated", "DEP0112")
});
ObjectDefineProperty(Socket.prototype, "_reuseAddr", {
  get: deprecate(function() {
    return this[kStateSymbol].reuseAddr;
  }, "Socket.prototype._reuseAddr is deprecated", "DEP0112"),
  set: deprecate(function(val) {
    this[kStateSymbol].reuseAddr = val;
  }, "Socket.prototype._reuseAddr is deprecated", "DEP0112")
});
function healthCheck(socket) {
  if (!socket[kStateSymbol].handle) {
    throw __intrinsic__makeErrorWithCode(224);
  }
}
Socket.prototype._healthCheck = deprecate(function() {
  healthCheck(this);
}, "Socket.prototype._healthCheck() is deprecated", "DEP0112");
function stopReceiving(socket) {
  const state = socket[kStateSymbol];
  if (!state.receiving)
    return;
  state.receiving = false;
}
Socket.prototype._stopReceiving = deprecate(function() {
  stopReceiving(this);
}, "Socket.prototype._stopReceiving() is deprecated", "DEP0112");
$ = {
  createSocket,
  Socket
};
$$EXPORT$$($).$$EXPORT_END$$;
