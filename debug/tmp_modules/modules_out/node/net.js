// @bun
// build/debug/tmp_modules/node/net.ts
var $;
var Duplex = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 44) || __intrinsic__createInternalModuleById(44);
var { getDefaultHighWaterMark } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 56) || __intrinsic__createInternalModuleById(56);
var EventEmitter = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 96) || __intrinsic__createInternalModuleById(96);
var dns;
var normalizedArgsSymbol = Symbol("normalizedArgs");
var { ExceptionWithHostPort, ConnResetException, NodeAggregateError, ErrnoException } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 32) || __intrinsic__createInternalModuleById(32);
var { kTimeout, getTimerDuration } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 60) || __intrinsic__createInternalModuleById(60);
var { validateFunction, validateNumber, validateAbortSignal, validatePort, validateBoolean, validateInt32, validateString } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 68) || __intrinsic__createInternalModuleById(68);
var { isIPv4, isIPv6, isIP } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 28) || __intrinsic__createInternalModuleById(28);
var ArrayPrototypeIncludes = __intrinsic__Array.prototype.includes;
var ArrayPrototypePush = __intrinsic__Array.prototype.push;
var MathMax = Math.max;
var { UV_ECANCELED, UV_ETIMEDOUT } = process.binding("uv");
var isWindows = false;
var getDefaultAutoSelectFamily = __intrinsic__lazy(61);
var setDefaultAutoSelectFamily = __intrinsic__lazy(62);
var getDefaultAutoSelectFamilyAttemptTimeout = __intrinsic__lazy(63);
var setDefaultAutoSelectFamilyAttemptTimeout = __intrinsic__lazy(64);
var SocketAddress = __intrinsic__lazy(65);
var BlockList = __intrinsic__lazy(66);
var newDetachedSocket = __intrinsic__lazy(67);
var doConnect = __intrinsic__lazy(68);
var addServerName = __intrinsic__lazy(69);
var upgradeDuplexToTLS = __intrinsic__lazy(38);
var isNamedPipeSocket = __intrinsic__lazy(70);
var getBufferedAmount = __intrinsic__lazy(71);
var bunTlsSymbol = Symbol.for("::buntls::");
var bunSocketServerOptions = Symbol.for("::bunnetserveroptions::");
var owner_symbol = Symbol("owner_symbol");
var kServerSocket = Symbol("kServerSocket");
var kBytesWritten = Symbol("kBytesWritten");
var bunTLSConnectOptions = Symbol.for("::buntlsconnectoptions::");
var kReinitializeHandle = Symbol("kReinitializeHandle");
var kRealListen = Symbol("kRealListen");
var kSetNoDelay = Symbol("kSetNoDelay");
var kSetKeepAlive = Symbol("kSetKeepAlive");
var kSetKeepAliveInitialDelay = Symbol("kSetKeepAliveInitialDelay");
var kConnectOptions = Symbol("connect-options");
var kAttach = Symbol("kAttach");
var kCloseRawConnection = Symbol("kCloseRawConnection");
var kpendingRead = Symbol("kpendingRead");
var kupgraded = Symbol("kupgraded");
var ksocket = Symbol("ksocket");
var khandlers = Symbol("khandlers");
var kclosed = Symbol("closed");
var kended = Symbol("ended");
var kwriteCallback = Symbol("writeCallback");
var kSocketClass = Symbol("kSocketClass");
function endNT(socket, callback, err) {
  socket.__intrinsic__end();
  callback(err);
}
function emitCloseNT(self, hasError) {
  self.emit("close", hasError);
}
function detachSocket(self) {
  if (!self)
    self = this;
  self._handle = null;
}
function destroyNT(self, err) {
  self.destroy(err);
}
function destroyWhenAborted(err) {
  if (!this.destroyed) {
    this.destroy(err.target.reason);
  }
}
function onSocketEnd() {
  if (!this.allowHalfOpen) {
    this.write = writeAfterFIN;
  }
}
function writeAfterFIN(chunk, encoding, cb) {
  if (!this.writableEnded) {
    return Duplex.prototype.write.__intrinsic__call(this, chunk, encoding, cb);
  }
  if (typeof encoding === "function") {
    cb = encoding;
    encoding = null;
  }
  const err = new Error("This socket has been ended by the other party");
  err.code = "EPIPE";
  if (typeof cb === "function") {
    process.nextTick(cb, err);
  }
  this.destroy(err);
  return false;
}
function onConnectEnd() {
  if (!this._hadError && this.secureConnecting) {
    const options = this[kConnectOptions];
    this._hadError = true;
    const error = new ConnResetException("Client network socket disconnected before secure TLS connection was established");
    error.path = options.path;
    error.host = options.host;
    error.port = options.port;
    error.localAddress = options.localAddress;
    this.destroy(error);
  }
}
var SocketHandlers = {
  close(socket, err) {
    const self = socket.data;
    if (!self || self[kclosed])
      return;
    self[kclosed] = true;
    detachSocket(self);
    SocketEmitEndNT(self, err);
    self.data = null;
  },
  data(socket, buffer) {
    const { data: self } = socket;
    if (!self)
      return;
    self.bytesRead += buffer.length;
    if (!self.push(buffer)) {
      socket.pause();
    }
  },
  drain(socket) {
    const self = socket.data;
    if (!self)
      return;
    const callback = self[kwriteCallback];
    self.connecting = false;
    if (callback) {
      const writeChunk = self._pendingData;
      if (socket.__intrinsic__write(writeChunk || "", self._pendingEncoding || "utf8")) {
        self._pendingData = self[kwriteCallback] = null;
        callback(null);
      } else {
        self._pendingData = null;
      }
      self[kBytesWritten] = socket.bytesWritten;
    }
  },
  end(socket) {
    const self = socket.data;
    if (!self)
      return;
    SocketEmitEndNT(self);
  },
  error(socket, error) {
    const self = socket.data;
    if (!self)
      return;
    if (self._hadError)
      return;
    self._hadError = true;
    const callback = self[kwriteCallback];
    if (callback) {
      self[kwriteCallback] = null;
      callback(error);
    }
    self.emit("error", error);
  },
  open(socket) {
    const self = socket.data;
    if (!self)
      return;
    socket.timeout(0);
    if (self.timeout) {
      self.setTimeout(self.timeout);
    }
    self._handle = socket;
    self.connecting = false;
    const options = self[bunTLSConnectOptions];
    if (options) {
      const { session } = options;
      if (session) {
        self.setSession(session);
      }
    }
    if (self[kSetNoDelay]) {
      socket.setNoDelay(true);
    }
    if (self[kSetKeepAlive]) {
      socket.setKeepAlive(true, self[kSetKeepAliveInitialDelay]);
    }
    if (!self[kupgraded]) {
      self[kBytesWritten] = socket.bytesWritten;
      self.emit("connect", self);
      self.emit("ready");
    }
    SocketHandlers.drain(socket);
  },
  handshake(socket, success, verifyError) {
    const { data: self } = socket;
    if (!self)
      return;
    if (!success && verifyError?.code === "ECONNRESET") {
      return;
    }
    self._securePending = false;
    self.secureConnecting = false;
    self._secureEstablished = !!success;
    self.emit("secure", self);
    self.alpnProtocol = socket.alpnProtocol;
    const { checkServerIdentity } = self[bunTLSConnectOptions];
    if (!verifyError && typeof checkServerIdentity === "function" && self.servername) {
      const cert = self.getPeerCertificate(true);
      if (cert) {
        verifyError = checkServerIdentity(self.servername, cert);
      }
    }
    if (self._requestCert || self._rejectUnauthorized) {
      if (verifyError) {
        self.authorized = false;
        self.authorizationError = verifyError.code || verifyError.message;
        if (self._rejectUnauthorized) {
          self.destroy(verifyError);
          return;
        }
      } else {
        self.authorized = true;
      }
    } else {
      self.authorized = true;
    }
    self.emit("secureConnect", verifyError);
    self.removeListener("end", onConnectEnd);
  },
  timeout(socket) {
    const self = socket.data;
    if (!self)
      return;
    self.emit("timeout", self);
  },
  binaryType: "buffer"
};
function SocketEmitEndNT(self, _err) {
  if (!self[kended]) {
    if (!self.allowHalfOpen) {
      self.write = writeAfterFIN;
    }
    self[kended] = true;
    self.push(null);
  }
}
var ServerHandlers = {
  data(socket, buffer) {
    const { data: self } = socket;
    if (!self)
      return;
    self.bytesRead += buffer.length;
    if (!self.push(buffer)) {
      socket.pause();
    }
  },
  close(socket, err) {
    $debug_log("Bun.Server close");
    const data = this.data;
    if (!data)
      return;
    {
      if (!data[kclosed]) {
        data[kclosed] = true;
        detachSocket(data);
        SocketEmitEndNT(data, err);
        data.data = null;
        socket[owner_symbol] = null;
      }
    }
  },
  end(socket) {
    SocketHandlers.end(socket);
  },
  open(socket) {
    $debug_log("Bun.Server open");
    const self = socket.data;
    socket[kServerSocket] = self._handle;
    const options = self[bunSocketServerOptions];
    const { pauseOnConnect, connectionListener, [kSocketClass]: SClass, requestCert, rejectUnauthorized } = options;
    const _socket = new SClass({});
    _socket.isServer = true;
    _socket._requestCert = requestCert;
    _socket._rejectUnauthorized = rejectUnauthorized;
    _socket[kAttach](this.localPort, socket);
    if (self.blockList) {
      const addressType = isIP(socket.remoteAddress);
      if (addressType && self.blockList.check(socket.remoteAddress, `ipv${addressType}`)) {
        const data = {
          localAddress: _socket.localAddress,
          localPort: _socket.localPort || this.localPort,
          localFamily: _socket.localFamily,
          remoteAddress: _socket.remoteAddress,
          remotePort: _socket.remotePort,
          remoteFamily: _socket.remoteFamily || "IPv4"
        };
        socket.end();
        self.emit("drop", data);
        return;
      }
    }
    if (self.maxConnections != null && self._connections >= self.maxConnections) {
      const data = {
        localAddress: _socket.localAddress,
        localPort: _socket.localPort || this.localPort,
        localFamily: _socket.localFamily,
        remoteAddress: _socket.remoteAddress,
        remotePort: _socket.remotePort,
        remoteFamily: _socket.remoteFamily || "IPv4"
      };
      socket.end();
      self.emit("drop", data);
      return;
    }
    const bunTLS = _socket[bunTlsSymbol];
    const isTLS = typeof bunTLS === "function";
    self._connections++;
    _socket.server = self;
    if (pauseOnConnect) {
      _socket.pause();
    }
    if (typeof connectionListener === "function") {
      this.pauseOnConnect = pauseOnConnect;
      if (!isTLS) {
        self.prependOnceListener("connection", connectionListener);
      }
    }
    self.emit("connection", _socket);
    if (!pauseOnConnect && !isTLS) {
      _socket.resume();
    }
  },
  handshake(socket, success, verifyError) {
    const self = socket.data;
    if (!success && verifyError?.code === "ECONNRESET") {
      const err = new ConnResetException("socket hang up");
      self.emit("_tlsError", err);
      self.server.emit("tlsClientError", err, self);
      self._hadError = true;
      self.destroy();
      return;
    }
    self._securePending = false;
    self.secureConnecting = false;
    self._secureEstablished = !!success;
    self.servername = socket.getServername();
    const server = self.server;
    self.alpnProtocol = socket.alpnProtocol;
    if (self._requestCert || self._rejectUnauthorized) {
      if (verifyError) {
        self.authorized = false;
        self.authorizationError = verifyError.code || verifyError.message;
        server.emit("tlsClientError", verifyError, self);
        if (self._rejectUnauthorized) {
          self.emit("secure", self);
          self.destroy(verifyError);
          return;
        }
      } else {
        self.authorized = true;
      }
    } else {
      self.authorized = true;
    }
    const connectionListener = server[bunSocketServerOptions]?.connectionListener;
    if (typeof connectionListener === "function") {
      server.prependOnceListener("secureConnection", connectionListener);
    }
    server.emit("secureConnection", self);
    self.emit("secure", self);
    self.emit("secureConnect", verifyError);
    if (server.pauseOnConnect) {
      self.pause();
    } else {
      self.resume();
    }
  },
  error(socket, error) {
    const data = this.data;
    if (!data)
      return;
    if (data._hadError)
      return;
    data._hadError = true;
    const bunTLS = this[bunTlsSymbol];
    if (typeof bunTLS === "function") {
      if (!data._secureEstablished) {
        data.destroy(error);
      } else if (data.isServer && data._rejectUnauthorized && /peer did not return a certificate/.test(error?.message)) {
        data.destroy();
      } else {
        data._emitTLSError(error);
        this.emit("_tlsError", error);
        this.server.emit("tlsClientError", error, data);
        SocketHandlers.error(socket, error, true);
        return;
      }
    }
    SocketHandlers.error(socket, error, true);
    this.server?.emit("clientError", error, data);
  },
  timeout(socket) {
    SocketHandlers.timeout(socket);
  },
  drain(socket) {
    SocketHandlers.drain(socket);
  },
  binaryType: "buffer"
};
var SocketHandlers2 = {
  open(socket) {
    $debug_log("Bun.Socket open");
    let { self, req } = socket.data;
    socket[owner_symbol] = self;
    $debug_log("self[kupgraded]", __intrinsic__String(self[kupgraded]));
    if (!self[kupgraded])
      req.oncomplete(0, self._handle, req, true, true);
    socket.data.req = __intrinsic__undefined;
    if (self.pauseOnConnect) {
      self.pause();
    }
    if (self[kupgraded]) {
      self.connecting = false;
      const options = self[bunTLSConnectOptions];
      if (options) {
        const { session } = options;
        if (session) {
          self.setSession(session);
        }
      }
      SocketHandlers2.drain(socket);
    }
  },
  data(socket, buffer) {
    $debug_log("Bun.Socket data");
    const { self } = socket.data;
    self.bytesRead += buffer.length;
    if (!self.push(buffer))
      socket.pause();
  },
  drain(socket) {
    $debug_log("Bun.Socket drain");
    const { self } = socket.data;
    const callback = self[kwriteCallback];
    self.connecting = false;
    if (callback) {
      const writeChunk = self._pendingData;
      if (socket.__intrinsic__write(writeChunk || "", self._pendingEncoding || "utf8")) {
        self[kBytesWritten] = socket.bytesWritten;
        self._pendingData = self[kwriteCallback] = null;
        callback(null);
      } else {
        self[kBytesWritten] = socket.bytesWritten;
        self._pendingData = null;
      }
    }
  },
  end(socket) {
    $debug_log("Bun.Socket end");
    const { self } = socket.data;
    if (self[kended])
      return;
    self[kended] = true;
    if (!self.allowHalfOpen)
      self.write = writeAfterFIN;
    self.push(null);
    self.read(0);
  },
  close(socket, err) {
    $debug_log("Bun.Socket close");
    let { self } = socket.data;
    if (err)
      $debug_log(err);
    if (self[kclosed])
      return;
    self[kclosed] = true;
    self[kended] = true;
    if (!self.allowHalfOpen)
      self.write = writeAfterFIN;
    self.push(null);
    self.read(0);
  },
  handshake(socket, success, verifyError) {
    $debug_log("Bun.Socket handshake");
    const { self } = socket.data;
    if (!success && verifyError?.code === "ECONNRESET") {
      return;
    }
    self._securePending = false;
    self.secureConnecting = false;
    self._secureEstablished = !!success;
    self.emit("secure", self);
    self.alpnProtocol = socket.alpnProtocol;
    const { checkServerIdentity } = self[bunTLSConnectOptions];
    if (!verifyError && typeof checkServerIdentity === "function" && self.servername) {
      const cert = self.getPeerCertificate(true);
      if (cert) {
        verifyError = checkServerIdentity(self.servername, cert);
      }
    }
    if (self._requestCert || self._rejectUnauthorized) {
      if (verifyError) {
        self.authorized = false;
        self.authorizationError = verifyError.code || verifyError.message;
        if (self._rejectUnauthorized) {
          self.destroy(verifyError);
          return;
        }
      } else {
        self.authorized = true;
      }
    } else {
      self.authorized = true;
    }
    self.emit("secureConnect", verifyError);
    self.removeListener("end", onConnectEnd);
  },
  error(socket, error) {
    $debug_log("Bun.Socket error");
    if (socket.data === __intrinsic__undefined)
      return;
    const { self } = socket.data;
    if (self._hadError)
      return;
    self._hadError = true;
    const callback = self[kwriteCallback];
    if (callback) {
      self[kwriteCallback] = null;
      callback(error);
    }
    if (!self.destroyed)
      process.nextTick(destroyNT, self, error);
  },
  timeout(socket) {
    $debug_log("Bun.Socket timeout");
    const { self } = socket.data;
    self.emit("timeout", self);
  },
  connectError(socket, error) {
    $debug_log("Bun.Socket connectError");
    let { self, req } = socket.data;
    socket[owner_symbol] = self;
    req.oncomplete(error.errno, self._handle, req, true, true);
    socket.data.req = __intrinsic__undefined;
  }
};
function kConnectTcp(self, addressType, req, address, port) {
  $debug_log("SocketHandle.kConnectTcp", addressType, address, port);
  const promise = doConnect(self._handle, {
    hostname: address,
    port,
    ipv6Only: addressType === 6,
    allowHalfOpen: self.allowHalfOpen,
    tls: req.tls,
    data: { self, req },
    socket: self[khandlers]
  });
  promise.catch((_reason) => {});
  return 0;
}
function kConnectPipe(self, req, address) {
  $debug_log("SocketHandle.kConnectPipe");
  const promise = doConnect(self._handle, {
    hostname: address,
    unix: address,
    allowHalfOpen: self.allowHalfOpen,
    tls: req.tls,
    data: { self, req },
    socket: self[khandlers]
  });
  promise.catch((_reason) => {});
  return 0;
}
function Socket(options) {
  if (!(this instanceof Socket))
    return new Socket(options);
  let {
    socket,
    signal,
    allowHalfOpen = false,
    onread = null,
    noDelay = false,
    keepAlive = false,
    keepAliveInitialDelay,
    ...opts
  } = options || {};
  if (options?.objectMode)
    throw __intrinsic__makeErrorWithCode(119, "options.objectMode", options.objectMode, "is not supported");
  if (options?.readableObjectMode)
    throw __intrinsic__makeErrorWithCode(119, "options.readableObjectMode", options.readableObjectMode, "is not supported");
  if (options?.writableObjectMode)
    throw __intrinsic__makeErrorWithCode(119, "options.writableObjectMode", options.writableObjectMode, "is not supported");
  if (keepAliveInitialDelay !== __intrinsic__undefined) {
    validateNumber(keepAliveInitialDelay, "options.keepAliveInitialDelay");
    if (keepAliveInitialDelay < 0)
      keepAliveInitialDelay = 0;
  }
  if (options?.fd !== __intrinsic__undefined) {
    validateInt32(options.fd, "options.fd", 0);
  }
  Duplex.__intrinsic__call(this, {
    ...opts,
    allowHalfOpen,
    readable: true,
    writable: true,
    emitClose: false,
    autoDestroy: true,
    decodeStrings: false
  });
  this._parent = null;
  this._parentWrap = null;
  this[kpendingRead] = __intrinsic__undefined;
  this[kupgraded] = null;
  this[kSetNoDelay] = Boolean(noDelay);
  this[kSetKeepAlive] = Boolean(keepAlive);
  this[kSetKeepAliveInitialDelay] = ~~(keepAliveInitialDelay / 1000);
  this[khandlers] = SocketHandlers2;
  this.bytesRead = 0;
  this[kBytesWritten] = __intrinsic__undefined;
  this[kclosed] = false;
  this[kended] = false;
  this.connecting = false;
  this._host = __intrinsic__undefined;
  this._port = __intrinsic__undefined;
  this[bunTLSConnectOptions] = null;
  this.timeout = 0;
  this[kwriteCallback] = __intrinsic__undefined;
  this._pendingData = __intrinsic__undefined;
  this._pendingEncoding = __intrinsic__undefined;
  this._hadError = false;
  this.isServer = false;
  this._handle = null;
  this[ksocket] = __intrinsic__undefined;
  this.server = __intrinsic__undefined;
  this.pauseOnConnect = false;
  this._peername = null;
  this._sockname = null;
  this._closeAfterHandlingError = false;
  this.on("end", onSocketEnd);
  if (options?.fd !== __intrinsic__undefined) {
    const { fd } = options;
    validateInt32(fd, "fd", 0);
  }
  if (socket instanceof Socket) {
    this[ksocket] = socket;
  }
  if (onread) {
    if (typeof onread !== "object") {
      __intrinsic__throwTypeError("onread must be an object");
    }
    if (typeof onread.callback !== "function") {
      __intrinsic__throwTypeError("onread.callback must be a function");
    }
    this[khandlers] = {
      ...SocketHandlers2,
      data({ data: self }, buffer) {
        if (!self)
          return;
        try {
          onread.callback(buffer.length, buffer);
        } catch (e) {
          self.emit("error", e);
        }
      }
    };
  }
  if (signal) {
    if (signal.aborted) {
      process.nextTick(destroyNT, this, signal.reason);
    } else {
      signal.addEventListener("abort", destroyWhenAborted.bind(this));
    }
  }
  if (opts.blockList) {
    if (!BlockList.isBlockList(opts.blockList)) {
      throw __intrinsic__makeErrorWithCode(118, "options.blockList", "net.BlockList", opts.blockList);
    }
    this.blockList = opts.blockList;
  }
}
__intrinsic__toClass(Socket, "Socket", Duplex);
Socket.prototype.address = function address() {
  return {
    address: this.localAddress,
    family: this.localFamily,
    port: this.localPort
  };
};
Socket.prototype._onTimeout = function() {
  if (this._pendingData) {
    return;
  }
  const handle = this._handle;
  if (handle && getBufferedAmount(handle) > 0) {
    return;
  }
  this.emit("timeout");
};
Object.defineProperty(Socket.prototype, "bufferSize", {
  get: function() {
    return this.writableLength;
  }
});
Object.defineProperty(Socket.prototype, "_bytesDispatched", {
  get: function() {
    return this[kBytesWritten] || 0;
  }
});
Object.defineProperty(Socket.prototype, "bytesWritten", {
  get: function() {
    let bytes = this[kBytesWritten] || 0;
    const data = this._pendingData;
    const writableBuffer = this.writableBuffer;
    if (!writableBuffer)
      return __intrinsic__undefined;
    for (const el of writableBuffer) {
      bytes += el.chunk instanceof __intrinsic__Buffer ? el.chunk.length : __intrinsic__Buffer.byteLength(el.chunk, el.encoding);
    }
    if (__intrinsic__isArray(data)) {
      for (let i = 0;i < data.length; i++) {
        const chunk = data[i];
        if (data.allBuffers || chunk instanceof __intrinsic__Buffer)
          bytes += chunk.length;
        else
          bytes += __intrinsic__Buffer.byteLength(chunk.chunk, chunk.encoding);
      }
    } else if (data) {
      if (typeof data !== "string")
        bytes += data.length;
      else
        bytes += __intrinsic__Buffer.byteLength(data, this._pendingEncoding || "utf8");
    }
    return bytes;
  }
});
Socket.prototype[kAttach] = function(port, socket) {
  socket.data = this;
  socket[owner_symbol] = this;
  if (this.timeout) {
    this.setTimeout(this.timeout);
  }
  socket.timeout(0);
  this._handle = socket;
  this.connecting = false;
  if (this[kSetNoDelay]) {
    socket.setNoDelay(true);
  }
  if (this[kSetKeepAlive]) {
    socket.setKeepAlive(true, this[kSetKeepAliveInitialDelay]);
  }
  if (!this[kupgraded]) {
    this[kBytesWritten] = socket.bytesWritten;
    this.emit("connect", this);
    this.emit("ready");
  }
  SocketHandlers.drain(socket);
};
Socket.prototype[kCloseRawConnection] = function() {
  const connection = this[kupgraded];
  connection.connecting = false;
  connection._handle = null;
  connection.unref();
  connection.destroy();
};
Socket.prototype.connect = function connect(...args) {
  $debug_log("Socket.prototype.connect");
  {
    const [options2, connectListener] = __intrinsic__isArray(args[0]) && args[0][normalizedArgsSymbol] ? args[0] : normalizeArgs(args);
    let connection = this[ksocket];
    let upgradeDuplex = false;
    let { port, host, path: path2, socket, rejectUnauthorized, checkServerIdentity, session, fd, pauseOnConnect } = options2;
    this.servername = options2.servername;
    if (socket) {
      connection = socket;
    }
    if (fd) {
      doConnect(this._handle, {
        data: this,
        fd,
        socket: SocketHandlers,
        allowHalfOpen: this.allowHalfOpen
      }).catch((error) => {
        if (!this.destroyed) {
          this.emit("error", error);
          this.emit("close", true);
        }
      });
    }
    this.pauseOnConnect = pauseOnConnect;
    if (pauseOnConnect) {
      this.pause();
    } else {
      process.nextTick(() => {
        this.resume();
      });
      this.connecting = true;
    }
    if (fd) {
      return this;
    }
    if (!(socket && __intrinsic__isObject(socket) && socket instanceof Duplex) && port === __intrinsic__undefined && path2 == null) {
      throw __intrinsic__makeErrorWithCode(150, ["options", "port", "path"]);
    }
    const bunTLS = this[bunTlsSymbol];
    var tls = __intrinsic__undefined;
    if (typeof bunTLS === "function") {
      tls = bunTLS.__intrinsic__call(this, port, host, true);
      this._requestCert = true;
      if (tls) {
        if (typeof rejectUnauthorized !== "undefined") {
          this._rejectUnauthorized = rejectUnauthorized;
          tls.rejectUnauthorized = rejectUnauthorized;
        } else {
          this._rejectUnauthorized = tls.rejectUnauthorized;
        }
        tls.requestCert = true;
        tls.session = session || tls.session;
        this.servername = tls.servername;
        tls.checkServerIdentity = checkServerIdentity || tls.checkServerIdentity;
        this[bunTLSConnectOptions] = tls;
        if (!connection && tls.socket) {
          connection = tls.socket;
        }
      }
      if (connection) {
        if (typeof connection !== "object" || !(connection instanceof Socket) || typeof connection[bunTlsSymbol] === "function") {
          if (connection instanceof Duplex) {
            upgradeDuplex = true;
          } else {
            __intrinsic__throwTypeError("socket must be an instance of net.Socket or Duplex");
          }
        }
      }
      this.authorized = false;
      this.secureConnecting = true;
      this._secureEstablished = false;
      this._securePending = true;
      this[kConnectOptions] = options2;
      this.prependListener("end", onConnectEnd);
    }
    if (connection) {
      if (connectListener != null)
        this.once("secureConnect", connectListener);
      try {
        this._undestroy();
        const socket2 = connection._handle;
        if (!upgradeDuplex && socket2) {
          upgradeDuplex = isNamedPipeSocket(socket2);
        }
        if (upgradeDuplex) {
          this[kupgraded] = connection;
          const [result, events] = upgradeDuplexToTLS(connection, {
            data: { self: this, req: { oncomplete: afterConnect } },
            tls,
            socket: this[khandlers]
          });
          connection.on("data", events[0]);
          connection.on("end", events[1]);
          connection.on("drain", events[2]);
          connection.on("close", events[3]);
          this._handle = result;
        } else {
          if (socket2) {
            this[kupgraded] = connection;
            const result = socket2.upgradeTLS({
              data: { self: this, req: { oncomplete: afterConnect } },
              tls,
              socket: this[khandlers]
            });
            if (result) {
              const [raw, tls2] = result;
              connection._handle = raw;
              this.once("end", this[kCloseRawConnection]);
              raw.connecting = false;
              this._handle = tls2;
            } else {
              this._handle = null;
              throw new Error("Invalid socket");
            }
          } else {
            connection.once("connect", () => {
              const socket3 = connection._handle;
              if (!upgradeDuplex && socket3) {
                upgradeDuplex = isNamedPipeSocket(socket3);
              }
              if (upgradeDuplex) {
                this[kupgraded] = connection;
                const [result, events] = upgradeDuplexToTLS(connection, {
                  data: { self: this, req: { oncomplete: afterConnect } },
                  tls,
                  socket: this[khandlers]
                });
                connection.on("data", events[0]);
                connection.on("end", events[1]);
                connection.on("drain", events[2]);
                connection.on("close", events[3]);
                this._handle = result;
              } else {
                this[kupgraded] = connection;
                const result = socket3.upgradeTLS({
                  data: { self: this, req: { oncomplete: afterConnect } },
                  tls,
                  socket: this[khandlers]
                });
                if (result) {
                  const [raw, tls2] = result;
                  connection._handle = raw;
                  this.once("end", this[kCloseRawConnection]);
                  raw.connecting = false;
                  this._handle = tls2;
                } else {
                  this._handle = null;
                  throw new Error("Invalid socket");
                }
              }
            });
          }
        }
      } catch (error) {
        process.nextTick(emitErrorAndCloseNextTick, this, error);
      }
      return this;
    }
  }
  const [options, cb] = __intrinsic__isArray(args[0]) && args[0][normalizedArgsSymbol] ? args[0] : normalizeArgs(args);
  if (typeof this[bunTlsSymbol] === "function" && cb !== null) {
    this.once("secureConnect", cb);
  } else if (cb !== null) {
    this.once("connect", cb);
  }
  if (this._parent?.connecting) {
    return this;
  }
  if (this.write !== Socket.prototype.write) {
    this.write = Socket.prototype.write;
  }
  if (this.destroyed) {
    this._handle = null;
    this._peername = null;
    this._sockname = null;
  }
  this.connecting = true;
  const { path } = options;
  const pipe = !!path;
  $debug_log("pipe", pipe, path);
  if (!this._handle) {
    this._handle = newDetachedSocket(typeof this[bunTlsSymbol] === "function");
    initSocketHandle(this);
  }
  if (!pipe) {
    lookupAndConnect(this, options);
  } else {
    validateString(path, "options.path");
    internalConnect(this, options, path);
  }
  return this;
};
Socket.prototype[kReinitializeHandle] = function reinitializeHandle(handle) {
  this._handle?.close();
  this._handle = handle;
  this._handle[owner_symbol] = this;
  initSocketHandle(this);
};
Socket.prototype.end = function end(data, encoding, callback) {
  $debug_log("Socket.prototype.end");
  return Duplex.prototype.end.__intrinsic__call(this, data, encoding, callback);
};
Socket.prototype._destroy = function _destroy(err, callback) {
  $debug_log("Socket.prototype._destroy");
  this.connecting = false;
  for (let s = this;s !== null; s = s._parent) {
    clearTimeout(s[kTimeout]);
  }
  $debug_log("close");
  if (this._handle) {
    $debug_log("close handle");
    const isException = err ? true : false;
    this[kBytesWritten] = this._handle.bytesWritten;
    if (this.resetAndClosing) {
      this.resetAndClosing = false;
      const err2 = this._handle.close();
      setImmediate(() => {
        $debug_log("emit close");
        this.emit("close", isException);
      });
      if (err2)
        this.emit("error", new ErrnoException(err2, "reset"));
    } else if (this._closeAfterHandlingError) {
      queueMicrotask(() => closeSocketHandle(this, isException, true));
    } else {
      closeSocketHandle(this, isException);
    }
    if (!this._closeAfterHandlingError) {
      if (this._handle)
        this._handle.onread = () => {};
      this._handle = null;
      this._sockname = null;
    }
    callback(err);
  } else {
    callback(err);
    process.nextTick(emitCloseNT, this, false);
  }
  if (this.server) {
    $debug_log("has server");
    this.server._connections--;
    if (this.server._emitCloseIfDrained) {
      this.server._emitCloseIfDrained();
    }
  }
};
Socket.prototype._final = function _final(callback) {
  $debug_log("Socket.prototype._final");
  if (this.connecting) {
    return this.once("connect", () => this._final(callback));
  }
  const socket = this._handle;
  if (!socket)
    return callback();
  process.nextTick(endNT, socket, callback);
};
Object.defineProperty(Socket.prototype, "localAddress", {
  get: function() {
    return this._getsockname().address;
  }
});
Object.defineProperty(Socket.prototype, "localFamily", {
  get: function() {
    return this._getsockname().family;
  }
});
Object.defineProperty(Socket.prototype, "localPort", {
  get: function() {
    return this._getsockname().port;
  }
});
Object.defineProperty(Socket.prototype, "_connecting", {
  get: function() {
    return this.connecting;
  }
});
Object.defineProperty(Socket.prototype, "pending", {
  get: function() {
    return !this._handle || this.connecting;
  }
});
Socket.prototype.resume = function resume() {
  if (!this.connecting) {
    this._handle?.resume();
  }
  return Duplex.prototype.resume.__intrinsic__call(this);
};
Socket.prototype.pause = function pause() {
  if (!this.destroyed) {
    this._handle?.pause();
  }
  return Duplex.prototype.pause.__intrinsic__call(this);
};
Socket.prototype.read = function read(size) {
  if (!this.connecting) {
    this._handle?.resume();
  }
  return Duplex.prototype.read.__intrinsic__call(this, size);
};
Socket.prototype._read = function _read(size) {
  const socket = this._handle;
  if (this.connecting || !socket) {
    this.once("connect", () => this._read(size));
  } else {
    socket?.resume();
  }
};
Socket.prototype._reset = function _reset() {
  $debug_log("Socket.prototype._reset");
  this.resetAndClosing = true;
  return this.destroy();
};
Socket.prototype._getpeername = function() {
  if (!this._handle || this.connecting) {
    return this._peername || {};
  } else if (!this._peername) {
    const family = this._handle.remoteFamily;
    if (!family)
      return {};
    this._peername = {
      family,
      address: this._handle.remoteAddress,
      port: this._handle.remotePort
    };
  }
  return this._peername;
};
Socket.prototype._getsockname = function() {
  if (!this._handle || this.connecting) {
    return this._sockname || {};
  } else if (!this._sockname) {
    const family = this._handle.localFamily;
    if (!family)
      return {};
    this._sockname = {
      family,
      address: this._handle.localAddress,
      port: this._handle.localPort
    };
  }
  return this._sockname;
};
Object.defineProperty(Socket.prototype, "readyState", {
  get: function() {
    if (this.connecting)
      return "opening";
    if (this.readable && this.writable)
      return "open";
    if (this.readable && !this.writable)
      return "readOnly";
    if (!this.readable && this.writable)
      return "writeOnly";
    return "closed";
  }
});
Socket.prototype.ref = function ref() {
  const socket = this._handle;
  if (!socket) {
    this.once("connect", this.ref);
    return this;
  }
  socket.ref();
  return this;
};
Object.defineProperty(Socket.prototype, "remotePort", {
  get: function() {
    return this._getpeername().port;
  }
});
Object.defineProperty(Socket.prototype, "remoteAddress", {
  get: function() {
    return this._getpeername().address;
  }
});
Object.defineProperty(Socket.prototype, "remoteFamily", {
  get: function() {
    return this._getpeername().family;
  }
});
Socket.prototype.resetAndDestroy = function resetAndDestroy() {
  if (this._handle) {
    if (this.connecting) {
      this.once("connect", () => this._reset());
    } else {
      this._reset();
    }
  } else {
    this.destroy(__intrinsic__makeErrorWithCode(220));
  }
  return this;
};
Socket.prototype.setKeepAlive = function setKeepAlive(enable = false, initialDelayMsecs = 0) {
  enable = Boolean(enable);
  const initialDelay = ~~(initialDelayMsecs / 1000);
  if (!this._handle) {
    this[kSetKeepAlive] = enable;
    this[kSetKeepAliveInitialDelay] = initialDelay;
    return this;
  }
  if (!this._handle.setKeepAlive) {
    return this;
  }
  if (enable !== this[kSetKeepAlive] || enable && this[kSetKeepAliveInitialDelay] !== initialDelay) {
    this[kSetKeepAlive] = enable;
    this[kSetKeepAliveInitialDelay] = initialDelay;
    this._handle.setKeepAlive(enable, initialDelay);
  }
  return this;
};
Socket.prototype.setNoDelay = function setNoDelay(enable = true) {
  enable = Boolean(enable === __intrinsic__undefined ? true : enable);
  if (!this._handle) {
    this[kSetNoDelay] = enable;
    return this;
  }
  if (this._handle.setNoDelay && enable !== this[kSetNoDelay]) {
    this[kSetNoDelay] = enable;
    this._handle.setNoDelay(enable);
  }
  return this;
};
Socket.prototype.setTimeout = {
  setTimeout(msecs, callback) {
    if (this.destroyed)
      return this;
    this.timeout = msecs;
    msecs = getTimerDuration(msecs, "msecs");
    clearTimeout(this[kTimeout]);
    if (msecs === 0) {
      if (callback !== __intrinsic__undefined) {
        validateFunction(callback, "callback");
        this.removeListener("timeout", callback);
      }
    } else {
      this[kTimeout] = setTimeout(this._onTimeout.bind(this), msecs).unref();
      if (callback !== __intrinsic__undefined) {
        validateFunction(callback, "callback");
        this.once("timeout", callback);
      }
    }
    return this;
  }
}.setTimeout;
Socket.prototype._unrefTimer = function _unrefTimer() {
  for (let s = this;s !== null; s = s._parent) {
    if (s[kTimeout])
      s[kTimeout].refresh();
  }
};
Socket.prototype.unref = function unref() {
  const socket = this._handle;
  if (!socket) {
    this.once("connect", this.unref);
    return this;
  }
  socket.unref();
  return this;
};
Socket.prototype.destroySoon = function destroySoon() {
  if (this.writable)
    this.end();
  if (this.writableFinished)
    this.destroy();
  else
    this.once("finish", this.destroy);
};
Socket.prototype._writev = function _writev(data, callback) {
  const allBuffers = data.allBuffers;
  const chunks = data;
  if (allBuffers) {
    if (data.length === 1) {
      return this._write(data[0], "buffer", callback);
    }
    for (let i = 0;i < data.length; i++) {
      data[i] = data[i].chunk;
    }
  } else {
    if (data.length === 1) {
      const { chunk: chunk2, encoding } = data[0];
      return this._write(chunk2, encoding, callback);
    }
    for (let i = 0;i < data.length; i++) {
      const { chunk: chunk2, encoding } = data[i];
      if (typeof chunk2 === "string") {
        data[i] = __intrinsic__Buffer.from(chunk2, encoding);
      } else {
        data[i] = chunk2;
      }
    }
  }
  const chunk = __intrinsic__Buffer.concat(chunks || []);
  return this._write(chunk, "buffer", callback);
};
Socket.prototype._write = function _write(chunk, encoding, callback) {
  $debug_log("Socket.prototype._write");
  if (this.connecting) {
    let onClose = function() {
      callback(__intrinsic__makeErrorWithCode(219));
    };
    this[kwriteCallback] = callback;
    this._pendingData = chunk;
    this._pendingEncoding = encoding;
    this.once("connect", function connect2() {
      this.off("close", onClose);
      this._write(chunk, encoding, callback);
    });
    this.once("close", onClose);
    return;
  }
  this._pendingData = null;
  this._pendingEncoding = "";
  this[kwriteCallback] = null;
  const socket = this._handle;
  if (!socket) {
    callback(__intrinsic__makeErrorWithCode(220));
    return false;
  }
  this._unrefTimer();
  const success = socket.__intrinsic__write(chunk, encoding);
  this[kBytesWritten] = socket.bytesWritten;
  if (success) {
    callback();
  } else if (this[kwriteCallback]) {
    callback(new Error("overlapping _write()"));
  } else {
    this[kwriteCallback] = callback;
  }
};
function createConnection(...args) {
  const normalized = normalizeArgs(args);
  const options = normalized[0];
  const socket = new Socket(options);
  if (options.timeout) {
    socket.setTimeout(options.timeout);
  }
  return socket.connect(normalized);
}
function lookupAndConnect(self, options) {
  const { localAddress, localPort } = options;
  const host = options.host || "localhost";
  let { port, autoSelectFamilyAttemptTimeout, autoSelectFamily } = options;
  validateString(host, "options.host");
  if (localAddress && !isIP(localAddress)) {
    throw __intrinsic__makeErrorWithCode(128, localAddress);
  }
  if (localPort) {
    validateNumber(localPort, "options.localPort");
  }
  if (typeof port !== "undefined") {
    if (typeof port !== "number" && typeof port !== "string") {
      throw __intrinsic__makeErrorWithCode(118, "options.port", ["number", "string"], port);
    }
    validatePort(port);
  }
  port |= 0;
  if (autoSelectFamily != null) {
    validateBoolean(autoSelectFamily, "options.autoSelectFamily");
  } else {
    autoSelectFamily = getDefaultAutoSelectFamily();
  }
  if (autoSelectFamilyAttemptTimeout != null) {
    validateInt32(autoSelectFamilyAttemptTimeout, "options.autoSelectFamilyAttemptTimeout", 1);
    if (autoSelectFamilyAttemptTimeout < 10) {
      autoSelectFamilyAttemptTimeout = 10;
    }
  } else {
    autoSelectFamilyAttemptTimeout = getDefaultAutoSelectFamilyAttemptTimeout();
  }
  const addressType = isIP(host);
  if (addressType) {
    process.nextTick(() => {
      if (self.connecting) {
        internalConnect(self, options, host, port, addressType, localAddress, localPort);
      }
    });
    return;
  }
  if (options.lookup != null)
    validateFunction(options.lookup, "options.lookup");
  if (dns === __intrinsic__undefined)
    dns = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 94) || __intrinsic__createInternalModuleById(94);
  const dnsopts = {
    family: socketToDnsFamily(options.family),
    hints: options.hints || 0
  };
  if (!isWindows && dnsopts.family !== 4 && dnsopts.family !== 6 && dnsopts.hints === 0) {
    dnsopts.hints = dns.ADDRCONFIG;
  }
  $debug_log("connect: find host", host, addressType);
  $debug_log("connect: dns options", dnsopts);
  self._host = host;
  self._port = port;
  const lookup = options.lookup || dns.lookup;
  if (dnsopts.family !== 4 && dnsopts.family !== 6 && !localAddress && autoSelectFamily) {
    $debug_log("connect: autodetecting", host, port);
    dnsopts.all = true;
    lookupAndConnectMultiple(self, lookup, host, options, dnsopts, port, localAddress, localPort, autoSelectFamilyAttemptTimeout);
    return;
  }
  lookup(host, dnsopts, function emitLookup(err, ip, addressType2) {
    self.emit("lookup", err, ip, addressType2, host);
    if (!self.connecting)
      return;
    if (err) {
      process.nextTick(destroyNT, self, err);
    } else if (!isIP(ip)) {
      err = __intrinsic__makeErrorWithCode(128, ip);
      process.nextTick(destroyNT, self, err);
    } else if (addressType2 !== 4 && addressType2 !== 6) {
      err = __intrinsic__makeErrorWithCode(117, addressType2, options.host, options.port);
      process.nextTick(destroyNT, self, err);
    } else {
      self._unrefTimer();
      internalConnect(self, options, ip, port, addressType2, localAddress, localPort);
    }
  });
}
function socketToDnsFamily(family) {
  switch (family) {
    case "IPv4":
      return 4;
    case "IPv6":
      return 6;
  }
  return family;
}
function lookupAndConnectMultiple(self, lookup, host, options, dnsopts, port, localAddress, localPort, timeout) {
  lookup(host, dnsopts, function emitLookup(err, addresses) {
    if (!self.connecting) {
      return;
    } else if (err) {
      self.emit("lookup", err, __intrinsic__undefined, __intrinsic__undefined, host);
      process.nextTick(destroyNT, self, err);
      return;
    }
    const validAddresses = [[], []];
    const validIps = [[], []];
    let destinations;
    for (let i = 0, l = addresses.length;i < l; i++) {
      const address2 = addresses[i];
      const { address: ip, family: addressType } = address2;
      self.emit("lookup", err, ip, addressType, host);
      if (!self.connecting) {
        return;
      }
      if (isIP(ip) && (addressType === 4 || addressType === 6)) {
        destinations ||= addressType === 6 ? { 6: 0, 4: 1 } : { 4: 0, 6: 1 };
        const destination = destinations[addressType];
        if (!ArrayPrototypeIncludes.__intrinsic__call(validIps[destination], ip)) {
          ArrayPrototypePush.__intrinsic__call(validAddresses[destination], address2);
          ArrayPrototypePush.__intrinsic__call(validIps[destination], ip);
        }
      }
    }
    if (!validAddresses[0].length && !validAddresses[1].length) {
      const { address: firstIp, family: firstAddressType } = addresses[0];
      if (!isIP(firstIp)) {
        err = __intrinsic__makeErrorWithCode(128, firstIp);
        process.nextTick(destroyNT, self, err);
      } else if (firstAddressType !== 4 && firstAddressType !== 6) {
        err = __intrinsic__makeErrorWithCode(117, firstAddressType, options.host, options.port);
        process.nextTick(destroyNT, self, err);
      }
      return;
    }
    const toAttempt = [];
    for (let i = 0, l = MathMax(validAddresses[0].length, validAddresses[1].length);i < l; i++) {
      if (i in validAddresses[0]) {
        ArrayPrototypePush.__intrinsic__call(toAttempt, validAddresses[0][i]);
      }
      if (i in validAddresses[1]) {
        ArrayPrototypePush.__intrinsic__call(toAttempt, validAddresses[1][i]);
      }
    }
    if (toAttempt.length === 1) {
      $debug_log("connect/multiple: only one address found, switching back to single connection");
      const { address: ip, family: addressType } = toAttempt[0];
      self._unrefTimer();
      internalConnect(self, options, ip, port, addressType, localAddress, localPort);
      return;
    }
    self.autoSelectFamilyAttemptedAddresses = [];
    $debug_log("connect/multiple: will try the following addresses", toAttempt);
    const context = {
      socket: self,
      addresses: toAttempt,
      current: 0,
      port,
      localPort,
      timeout,
      [kTimeout]: null,
      errors: [],
      options
    };
    self._unrefTimer();
    internalConnectMultiple(context);
  });
}
function internalConnect(self, options, address2, port, addressType, localAddress, localPort, _flags) {
  $assert(self.connecting, "self.connecting");
  let err;
  if (localAddress || localPort) {
    if (addressType === 4) {
      localAddress ||= "0.0.0.0";
    } else {
      localAddress ||= "::";
    }
    $debug_log("connect: binding to localAddress: %s and localPort: %d (addressType: %d)", localAddress, localPort, addressType);
    err = checkBindError(err, localPort, self._handle);
    if (err) {
      const ex = new ExceptionWithHostPort(err, "bind", localAddress, localPort);
      self.destroy(ex);
      return;
    }
  }
  let connection = self[ksocket];
  if (options.socket) {
    connection = options.socket;
  }
  let tls = __intrinsic__undefined;
  const bunTLS = self[bunTlsSymbol];
  if (typeof bunTLS === "function") {
    tls = bunTLS.__intrinsic__call(self, port, self._host, true);
    self._requestCert = true;
    if (tls) {
      const { rejectUnauthorized, session, checkServerIdentity } = options;
      if (typeof rejectUnauthorized !== "undefined") {
        self._rejectUnauthorized = rejectUnauthorized;
        tls.rejectUnauthorized = rejectUnauthorized;
      } else {
        self._rejectUnauthorized = tls.rejectUnauthorized;
      }
      tls.requestCert = true;
      tls.session = session || tls.session;
      self.servername = tls.servername;
      tls.checkServerIdentity = checkServerIdentity || tls.checkServerIdentity;
      self[bunTLSConnectOptions] = tls;
      if (!connection && tls.socket) {
        connection = tls.socket;
      }
    }
    self.authorized = false;
    self.secureConnecting = true;
    self._secureEstablished = false;
    self._securePending = true;
    self[kConnectOptions] = options;
    self.prependListener("end", onConnectEnd);
  }
  $debug_log("connect: attempting to connect to %s:%d (addressType: %d)", address2, port, addressType);
  self.emit("connectionAttempt", address2, port, addressType);
  if (addressType === 6 || addressType === 4) {
    if (self.blockList?.check(address2, `ipv${addressType}`)) {
      self.destroy(__intrinsic__makeErrorWithCode(142, address2));
      return;
    }
    const req = {};
    req.oncomplete = afterConnect;
    req.address = address2;
    req.port = port;
    req.localAddress = localAddress;
    req.localPort = localPort;
    req.addressType = addressType;
    req.tls = tls;
    err = kConnectTcp(self, addressType, req, address2, port);
  } else {
    const req = {};
    req.address = address2;
    req.oncomplete = afterConnect;
    req.tls = tls;
    err = kConnectPipe(self, req, address2);
  }
  if (err) {
    const ex = new ExceptionWithHostPort(err, "connect", address2, port);
    self.destroy(ex);
  }
}
function internalConnectMultiple(context, canceled) {
  clearTimeout(context[kTimeout]);
  const self = context.socket;
  if (self._aborted) {
    return;
  }
  if (canceled || context.current === context.addresses.length) {
    if (context.errors.length === 0) {
      self.destroy(__intrinsic__makeErrorWithCode(221));
      return;
    }
    self.destroy(new NodeAggregateError(context.errors));
    return;
  }
  $assert(self.connecting, "self.connecting");
  const current = context.current++;
  if (current > 0) {
    self[kReinitializeHandle](newDetachedSocket(typeof self[bunTlsSymbol] === "function"));
  }
  const { localPort, port, _flags } = context;
  const { address: address2, family: addressType } = context.addresses[current];
  let localAddress;
  let err;
  if (localPort) {
    if (addressType === 4) {
      localAddress = DEFAULT_IPV4_ADDR;
    } else {
      localAddress = DEFAULT_IPV6_ADDR;
    }
    $debug_log("connect/multiple: binding to localAddress: %s and localPort: %d (addressType: %d)", localAddress, localPort, addressType);
    err = checkBindError(err, localPort, self._handle);
    if (err) {
      ArrayPrototypePush.__intrinsic__call(context.errors, new ExceptionWithHostPort(err, "bind", localAddress, localPort));
      internalConnectMultiple(context);
      return;
    }
  }
  if (self.blockList?.check(address2, `ipv${addressType}`)) {
    const ex = __intrinsic__makeErrorWithCode(142, address2);
    ArrayPrototypePush.__intrinsic__call(context.errors, ex);
    self.emit("connectionAttemptFailed", address2, port, addressType, ex);
    internalConnectMultiple(context);
    return;
  }
  let connection = self[ksocket];
  if (context.options.socket) {
    connection = context.options.socket;
  }
  let tls = __intrinsic__undefined;
  const bunTLS = self[bunTlsSymbol];
  if (typeof bunTLS === "function") {
    tls = bunTLS.__intrinsic__call(self, port, self._host, true);
    self._requestCert = true;
    if (tls) {
      const { rejectUnauthorized, session, checkServerIdentity } = context.options;
      if (typeof rejectUnauthorized !== "undefined") {
        self._rejectUnauthorized = rejectUnauthorized;
        tls.rejectUnauthorized = rejectUnauthorized;
      } else {
        self._rejectUnauthorized = tls.rejectUnauthorized;
      }
      tls.requestCert = true;
      tls.session = session || tls.session;
      self.servername = tls.servername;
      tls.checkServerIdentity = checkServerIdentity || tls.checkServerIdentity;
      self[bunTLSConnectOptions] = tls;
      if (!connection && tls.socket) {
        connection = tls.socket;
      }
    }
    self.authorized = false;
    self.secureConnecting = true;
    self._secureEstablished = false;
    self._securePending = true;
    self[kConnectOptions] = context.options;
    self.prependListener("end", onConnectEnd);
  }
  $debug_log("connect/multiple: attempting to connect to %s:%d (addressType: %d)", address2, port, addressType);
  self.emit("connectionAttempt", address2, port, addressType);
  const req = {};
  req.oncomplete = afterConnectMultiple.bind(__intrinsic__undefined, context, current);
  req.address = address2;
  req.port = port;
  req.localAddress = localAddress;
  req.localPort = localPort;
  req.addressType = addressType;
  req.tls = tls;
  ArrayPrototypePush.__intrinsic__call(self.autoSelectFamilyAttemptedAddresses, `${address2}:${port}`);
  err = kConnectTcp(self, addressType, req, address2, port);
  if (err) {
    const ex = new ExceptionWithHostPort(err, "connect", address2, port);
    ArrayPrototypePush.__intrinsic__call(context.errors, ex);
    self.emit("connectionAttemptFailed", address2, port, addressType, ex);
    internalConnectMultiple(context);
    return;
  }
  if (current < context.addresses.length - 1) {
    $debug_log("connect/multiple: setting the attempt timeout to %d ms", context.timeout);
    context[kTimeout] = setTimeout(internalConnectMultipleTimeout, context.timeout, context, req, self._handle).unref();
  }
}
function internalConnectMultipleTimeout(context, req, handle) {
  $debug_log("connect/multiple: connection to %s:%s timed out", req.address, req.port);
  context.socket.emit("connectionAttemptTimeout", req.address, req.port, req.addressType);
  req.oncomplete = __intrinsic__undefined;
  ArrayPrototypePush.__intrinsic__call(context.errors, createConnectionError(req, UV_ETIMEDOUT));
  handle.close();
  if (context.socket.connecting) {
    internalConnectMultiple(context);
  }
}
function afterConnect(status, handle, req, readable, writable) {
  if (!handle)
    return;
  const self = handle[owner_symbol];
  if (!self)
    return;
  if (self.destroyed) {
    return;
  }
  $debug_log("afterConnect", status, readable, writable);
  $assert(self.connecting, "self.connecting");
  self.connecting = false;
  self._sockname = null;
  if (status === 0) {
    if (self.readable && !readable) {
      self.push(null);
      self.read();
    }
    if (self.writable && !writable) {
      self.end();
    }
    self._unrefTimer();
    if (self[kSetNoDelay] && self._handle.setNoDelay) {
      self._handle.setNoDelay(true);
    }
    if (self[kSetKeepAlive] && self._handle.setKeepAlive) {
      self._handle.setKeepAlive(true, self[kSetKeepAliveInitialDelay]);
    }
    self.emit("connect");
    self.emit("ready");
    if (readable && !self.isPaused())
      self.read(0);
  } else {
    let details;
    if (req.localAddress && req.localPort) {
      details = req.localAddress + ":" + req.localPort;
    }
    const ex = new ExceptionWithHostPort(status, "connect", req.address, req.port);
    if (details) {
      ex.localAddress = req.localAddress;
      ex.localPort = req.localPort;
    }
    self.emit("connectionAttemptFailed", req.address, req.port, req.addressType, ex);
    self.destroy(ex);
  }
}
function afterConnectMultiple(context, current, status, handle, req, readable, writable) {
  $debug_log("connect/multiple: connection attempt to %s:%s completed with status %s", req.address, req.port, status);
  $debug_log("clearTimeout", context[kTimeout]);
  clearTimeout(context[kTimeout]);
  if (status === 0 && current !== context.current - 1) {
    $debug_log("connect/multiple: ignoring successful but timedout connection to %s:%s", req.address, req.port);
    handle.close();
    return;
  }
  const self = context.socket;
  if (status !== 0) {
    const ex = createConnectionError(req, status);
    ArrayPrototypePush.__intrinsic__call(context.errors, ex);
    self.emit("connectionAttemptFailed", req.address, req.port, req.addressType, ex);
    if (context.socket.connecting) {
      internalConnectMultiple(context, status === UV_ECANCELED);
    }
    return;
  }
  afterConnect(status, self._handle, req, readable, writable);
}
function createConnectionError(req, status) {
  let details;
  if (req.localAddress && req.localPort) {
    details = req.localAddress + ":" + req.localPort;
  }
  const ex = new ExceptionWithHostPort(status, "connect", req.address, req.port);
  if (details) {
    ex.localAddress = req.localAddress;
    ex.localPort = req.localPort;
  }
  return ex;
}
function Server(options, connectionListener) {
  if (!(this instanceof Server)) {
    return new Server(options, connectionListener);
  }
  EventEmitter.__intrinsic__apply(this, []);
  if (typeof options === "function") {
    connectionListener = options;
    options = {};
  } else if (options == null || typeof options === "object") {
    options = { ...options };
  } else {
    throw __intrinsic__makeErrorWithCode(118, "options", ["Object", "Function"], options);
  }
  const {
    allowHalfOpen = false,
    keepAlive = false,
    keepAliveInitialDelay = 0,
    highWaterMark = getDefaultHighWaterMark(),
    pauseOnConnect = false,
    noDelay = false
  } = options;
  this._connections = 0;
  this._handle = null;
  this._usingWorkers = false;
  this.workers = [];
  this._unref = false;
  this.listeningId = 1;
  this[bunSocketServerOptions] = __intrinsic__undefined;
  this.allowHalfOpen = allowHalfOpen;
  this.keepAlive = keepAlive;
  this.keepAliveInitialDelay = keepAliveInitialDelay;
  this.highWaterMark = highWaterMark;
  this.pauseOnConnect = Boolean(pauseOnConnect);
  this.noDelay = noDelay;
  options.connectionListener = connectionListener;
  this[bunSocketServerOptions] = options;
  if (options.blockList) {
    if (!BlockList.isBlockList(options.blockList)) {
      throw __intrinsic__makeErrorWithCode(118, "options.blockList", "net.BlockList", options.blockList);
    }
    this.blockList = options.blockList;
  }
}
__intrinsic__toClass(Server, "Server", EventEmitter);
Object.defineProperty(Server.prototype, "listening", {
  get() {
    return !!this._handle;
  }
});
Server.prototype.ref = function ref2() {
  this._unref = false;
  this._handle?.ref();
  return this;
};
Server.prototype.unref = function unref2() {
  this._unref = true;
  this._handle?.unref();
  return this;
};
Server.prototype.close = function close(callback) {
  if (typeof callback === "function") {
    if (!this._handle) {
      this.once("close", function close2() {
        callback(__intrinsic__makeErrorWithCode(214));
      });
    } else {
      this.once("close", callback);
    }
  }
  if (this._handle) {
    this._handle.stop(false);
    this._handle = null;
  }
  this._emitCloseIfDrained();
  return this;
};
Server.prototype[Symbol.asyncDispose] = function() {
  const { resolve, reject, promise } = __intrinsic__Promise.withResolvers();
  this.close(function(err, ...args) {
    if (err)
      reject(err);
    else
      resolve(...args);
  });
  return promise;
};
Server.prototype._emitCloseIfDrained = function _emitCloseIfDrained() {
  if (this._handle || this._connections > 0) {
    return;
  }
  process.nextTick(() => {
    this.emit("close");
  });
};
Server.prototype.address = function address2() {
  const server = this._handle;
  if (server) {
    const unix = server.unix;
    if (unix) {
      return unix;
    }
    const out = {};
    const err = this._handle.getsockname(out);
    if (err)
      throw new ErrnoException(err, "address");
    return out;
  }
  return null;
};
Server.prototype.getConnections = function getConnections(callback) {
  if (typeof callback === "function") {
    callback(null, this._handle ? this._connections : 0);
  }
  return this;
};
Server.prototype.listen = function listen(port, hostname, onListen) {
  const argsLength = arguments.length;
  if (typeof port === "string") {
    const numPort = Number(port);
    if (!Number.isNaN(numPort))
      port = numPort;
  }
  let backlog;
  let path;
  let exclusive = false;
  let allowHalfOpen = false;
  let reusePort = false;
  let ipv6Only = false;
  let fd;
  if (typeof port === "string") {
    if (Number.isSafeInteger(hostname)) {
      if (hostname > 0) {
        backlog = hostname;
      }
    } else if (typeof hostname === "function") {
      onListen = hostname;
    }
    path = port;
    hostname = __intrinsic__undefined;
    port = __intrinsic__undefined;
  } else {
    if (typeof hostname === "number") {
      backlog = hostname;
      hostname = __intrinsic__undefined;
    } else if (typeof hostname === "function") {
      onListen = hostname;
      hostname = __intrinsic__undefined;
    } else if (typeof hostname === "string" && typeof onListen === "number") {
      backlog = onListen;
      onListen = argsLength > 3 ? arguments[3] : __intrinsic__undefined;
    }
    if (typeof port === "function") {
      onListen = port;
      port = 0;
    } else if (typeof port === "object") {
      const options = port;
      addServerAbortSignalOption(this, options);
      hostname = options.host;
      exclusive = options.exclusive;
      path = options.path;
      port = options.port;
      ipv6Only = options.ipv6Only;
      allowHalfOpen = options.allowHalfOpen;
      reusePort = options.reusePort;
      backlog = options.backlog;
      if (typeof options.fd === "number" && options.fd >= 0) {
        fd = options.fd;
        port = 0;
      }
      const isLinux = true;
      if (!Number.isSafeInteger(port) || port < 0) {
        if (path) {
          const isAbstractPath = path.startsWith("\x00");
          if (isLinux && isAbstractPath && (options.writableAll || options.readableAll)) {
            const message = `The argument 'options' can not set readableAll or writableAll to true when path is abstract unix socket. Received ${JSON.stringify(options)}`;
            const error = __intrinsic__makeTypeError(message);
            error.code = "ERR_INVALID_ARG_VALUE";
            throw error;
          }
          hostname = path;
          port = __intrinsic__undefined;
        } else {
          let message = `The argument 'options' must have the property "port" or "path"`;
          try {
            message = `${message}. Received ${JSON.stringify(options)}`;
          } catch {}
          const error = __intrinsic__makeTypeError(message);
          error.code = "ERR_INVALID_ARG_VALUE";
          throw error;
        }
      } else if (port === __intrinsic__undefined) {
        port = 0;
      }
      if (typeof options.callback === "function")
        onListen = options?.callback;
    } else if (!Number.isSafeInteger(port) || port < 0) {
      port = 0;
    }
    hostname = hostname || "::";
  }
  if (typeof port === "number" && (port < 0 || port >= 65536)) {
    throw __intrinsic__makeErrorWithCode(217, `options.port should be >= 0 and < 65536. Received type number: (${port})`);
  }
  if (this._handle) {
    throw __intrinsic__makeErrorWithCode(213);
  }
  if (onListen != null) {
    this.once("listening", onListen);
  }
  try {
    var tls = __intrinsic__undefined;
    var TLSSocketClass = __intrinsic__undefined;
    const bunTLS = this[bunTlsSymbol];
    const options = this[bunSocketServerOptions];
    let contexts = null;
    if (typeof bunTLS === "function") {
      [tls, TLSSocketClass] = bunTLS.__intrinsic__call(this, port, hostname, false);
      options.servername = tls.serverName;
      options[kSocketClass] = TLSSocketClass;
      contexts = tls.contexts;
      if (!tls.requestCert) {
        tls.rejectUnauthorized = false;
      }
    } else {
      options[kSocketClass] = Socket;
    }
    listenInCluster(this, null, port, 4, backlog, fd, exclusive, ipv6Only, allowHalfOpen, reusePort, __intrinsic__undefined, __intrinsic__undefined, path, hostname, tls, contexts, onListen);
  } catch (err) {
    setTimeout(emitErrorNextTick, 1, this, err);
  }
  return this;
};
Server.prototype[kRealListen] = function(path, port, hostname, exclusive, ipv6Only, allowHalfOpen, reusePort, tls, contexts, _onListen, fd) {
  if (path) {
    this._handle = Bun.listen({
      unix: path,
      tls,
      allowHalfOpen: allowHalfOpen || this[bunSocketServerOptions]?.allowHalfOpen || false,
      reusePort: reusePort || this[bunSocketServerOptions]?.reusePort || false,
      ipv6Only: ipv6Only || this[bunSocketServerOptions]?.ipv6Only || false,
      exclusive: exclusive || this[bunSocketServerOptions]?.exclusive || false,
      socket: ServerHandlers,
      data: this
    });
  } else if (fd != null) {
    this._handle = Bun.listen({
      fd,
      hostname,
      tls,
      allowHalfOpen: allowHalfOpen || this[bunSocketServerOptions]?.allowHalfOpen || false,
      reusePort: reusePort || this[bunSocketServerOptions]?.reusePort || false,
      ipv6Only: ipv6Only || this[bunSocketServerOptions]?.ipv6Only || false,
      exclusive: exclusive || this[bunSocketServerOptions]?.exclusive || false,
      socket: ServerHandlers,
      data: this
    });
  } else {
    this._handle = Bun.listen({
      port,
      hostname,
      tls,
      allowHalfOpen: allowHalfOpen || this[bunSocketServerOptions]?.allowHalfOpen || false,
      reusePort: reusePort || this[bunSocketServerOptions]?.reusePort || false,
      ipv6Only: ipv6Only || this[bunSocketServerOptions]?.ipv6Only || false,
      exclusive: exclusive || this[bunSocketServerOptions]?.exclusive || false,
      socket: ServerHandlers,
      data: this
    });
  }
  const addr = this.address();
  if (addr && typeof addr === "object") {
    const familyLast = __intrinsic__String(addr.family).slice(-1);
    this._connectionKey = `${familyLast}:${addr.address}:${port}`;
  }
  if (contexts) {
    for (const [name, context] of contexts) {
      addServerName(this._handle, name, context);
    }
  }
  if (this._unref)
    this.unref();
  setTimeout(emitListeningNextTick, 1, this);
};
Server.prototype[EventEmitter.captureRejectionSymbol] = function(err, event, sock) {
  switch (event) {
    case "connection":
      sock.destroy(err);
      break;
    default:
      this.emit("error", err);
  }
};
Server.prototype.getsockname = function getsockname(out) {
  out.port = this.address().port;
  return out;
};
function emitErrorNextTick(self, error) {
  self.emit("error", error);
}
function emitErrorAndCloseNextTick(self, error) {
  self.emit("error", error);
  self.emit("close", true);
}
function addServerAbortSignalOption(self, options) {
  if (options?.signal === __intrinsic__undefined) {
    return;
  }
  validateAbortSignal(options.signal, "options.signal");
  const { signal } = options;
  const onAborted = () => self.close();
  if (signal.aborted) {
    process.nextTick(onAborted);
  } else {
    signal.addEventListener("abort", onAborted);
  }
}
function emitListeningNextTick(self) {
  if (!self._handle)
    return;
  self.emit("listening");
}
var cluster;
function listenInCluster(server, address3, port, addressType, backlog, fd, exclusive, ipv6Only, allowHalfOpen, reusePort, flags, options, path, hostname, tls, contexts, onListen) {
  exclusive = !!exclusive;
  if (cluster === __intrinsic__undefined)
    cluster = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 88) || __intrinsic__createInternalModuleById(88);
  if (cluster.isPrimary || exclusive) {
    server[kRealListen](path, port, hostname, exclusive, ipv6Only, allowHalfOpen, reusePort, tls, contexts, onListen, fd);
    return;
  }
  const serverQuery = {
    address: address3,
    port,
    addressType,
    fd,
    flags,
    backlog,
    ...options
  };
  cluster._getServer(server, serverQuery, function listenOnPrimaryHandle(err, handle) {
    err = checkBindError(err, port, handle);
    if (err) {
      throw new ExceptionWithHostPort(err, "bind", address3, port);
    }
    server[kRealListen](path, port, hostname, exclusive, ipv6Only, allowHalfOpen, reusePort, tls, contexts, onListen, fd);
  });
}
function createServer(options, connectionListener) {
  return new Server(options, connectionListener);
}
function normalizeArgs(args) {
  let arr;
  if (args.length === 0) {
    arr = [{}, null];
    arr[normalizedArgsSymbol] = true;
    return arr;
  }
  const arg0 = args[0];
  let options = {};
  if (typeof arg0 === "object" && arg0 !== null) {
    options = arg0;
  } else if (isPipeName(arg0)) {
    options.path = arg0;
  } else {
    options.port = arg0;
    if (args.length > 1 && typeof args[1] === "string") {
      options.host = args[1];
    }
  }
  const cb = args[args.length - 1];
  if (typeof cb !== "function")
    arr = [options, null];
  else
    arr = [options, cb];
  arr[normalizedArgsSymbol] = true;
  return arr;
}
function initSocketHandle(self) {
  self._undestroy();
  self._sockname = null;
  self[kclosed] = false;
  self[kended] = false;
  if (self._handle) {
    self._handle[owner_symbol] = self;
  }
}
function closeSocketHandle(self, isException, isCleanupPending = false) {
  $debug_log("closeSocketHandle", isException, isCleanupPending, !!self._handle);
  if (self._handle) {
    self._handle.close();
    setImmediate(() => {
      $debug_log("emit close", isCleanupPending);
      self.emit("close", isException);
      if (isCleanupPending) {
        self._handle.onread = () => {};
        self._handle = null;
        self._sockname = null;
      }
    });
  }
}
function checkBindError(err, port, handle) {
  if (err === 0 && port > 0 && handle.getsockname) {
    const out = {};
    err = handle.getsockname(out);
    if (err === 0 && port !== out.port) {
      $debug_log(`checkBindError, bound to ${out.port} instead of ${port}`);
      const UV_EADDRINUSE = -4091;
      err = UV_EADDRINUSE;
    }
  }
  return err;
}
function isPipeName(s) {
  return typeof s === "string" && toNumber(s) === false;
}
function toNumber(x) {
  return (x = Number(x)) >= 0 ? x : false;
}
var warnSimultaneousAccepts = true;
function _setSimultaneousAccepts() {
  if (warnSimultaneousAccepts) {
    process.emitWarning("net._setSimultaneousAccepts() is deprecated and will be removed.", "DeprecationWarning", "DEP0121");
    warnSimultaneousAccepts = false;
  }
}
$ = {
  createServer,
  Server,
  createConnection,
  connect: createConnection,
  isIP,
  isIPv4,
  isIPv6,
  Socket,
  _normalizeArgs: normalizeArgs,
  _setSimultaneousAccepts,
  getDefaultAutoSelectFamily,
  setDefaultAutoSelectFamily,
  getDefaultAutoSelectFamilyAttemptTimeout,
  setDefaultAutoSelectFamilyAttemptTimeout,
  BlockList,
  SocketAddress,
  Stream: Socket
};
$$EXPORT$$($).$$EXPORT_END$$;
