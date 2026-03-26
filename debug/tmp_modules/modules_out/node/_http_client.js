// @bun
// build/debug/tmp_modules/node/_http_client.ts
var $;
var { isIP, isIPv6 } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 28) || __intrinsic__createInternalModuleById(28);
var {
  checkIsHttpToken,
  validateFunction,
  validateInteger,
  validateBoolean,
  validateString
} = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 68) || __intrinsic__createInternalModuleById(68);
var nodeHttpClient = __intrinsic__lazy(39);
var { urlToHttpOptions } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 63) || __intrinsic__createInternalModuleById(63);
var { throwOnInvalidTLSArray } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 61) || __intrinsic__createInternalModuleById(61);
var { validateHeaderName } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 73) || __intrinsic__createInternalModuleById(73);
var { getTimerDuration } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 60) || __intrinsic__createInternalModuleById(60);
var { ConnResetException } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 32) || __intrinsic__createInternalModuleById(32);
var {
  kBodyChunks,
  abortedSymbol,
  kClearTimeout,
  emitErrorNextTickIfErrorListenerNT,
  isAbortError,
  kTls,
  kAbortController,
  kMethod,
  kAgent,
  kProtocol,
  kPath,
  kUseDefaultPort,
  kHost,
  kPort,
  kSocketPath,
  kFetchRequest,
  kRes,
  kUpgradeOrConnect,
  kParser,
  kMaxHeaderSize,
  kMaxHeadersCount,
  kReusedSocket,
  kOptions,
  kTimeoutTimer,
  kEmitState,
  ClientRequestEmitState,
  kSignal,
  kEmptyObject,
  getIsNextIncomingMessageHTTPS,
  setIsNextIncomingMessageHTTPS,
  typeSymbol,
  NodeHTTPIncomingRequestType,
  reqSymbol,
  callCloseCallback,
  emitCloseNTAndComplete
} = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 25) || __intrinsic__createInternalModuleById(25);
var { globalAgent } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 71) || __intrinsic__createInternalModuleById(71);
var { IncomingMessage } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 74) || __intrinsic__createInternalModuleById(74);
var { OutgoingMessage } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 75) || __intrinsic__createInternalModuleById(75);
var globalReportError = globalThis.reportError;
var setTimeout = globalThis.setTimeout;
var INVALID_PATH_REGEX = /[^\u0021-\u00ff]/;
var { URL } = globalThis;
var ObjectAssign = Object.assign;
var RegExpPrototypeExec = __intrinsic__RegExp.prototype.exec;
var StringPrototypeToUpperCase = __intrinsic__String.prototype.toUpperCase;
function emitErrorEventNT(self, err) {
  if (self.destroyed)
    return;
  if (self.listenerCount("error") > 0) {
    self.emit("error", err);
  }
}
function ClientRequest(input, options, cb) {
  if (!(this instanceof ClientRequest)) {
    return new ClientRequest(input, options, cb);
  }
  this.write = (chunk, encoding, callback) => {
    if (this.destroyed)
      return false;
    if (__intrinsic__isCallable(chunk)) {
      callback = chunk;
      chunk = __intrinsic__undefined;
      encoding = __intrinsic__undefined;
    } else if (__intrinsic__isCallable(encoding)) {
      callback = encoding;
      encoding = __intrinsic__undefined;
    } else if (!__intrinsic__isCallable(callback)) {
      callback = __intrinsic__undefined;
    }
    return write_(chunk, encoding, callback);
  };
  let writeCount = 0;
  let resolveNextChunk = (_end) => {};
  const pushChunk = (chunk) => {
    this[kBodyChunks].push(chunk);
    if (writeCount > 1) {
      startFetch();
    }
    resolveNextChunk?.(false);
  };
  const write_ = (chunk, encoding, callback) => {
    const MAX_FAKE_BACKPRESSURE_SIZE = 1024 * 1024;
    const canSkipReEncodingData = typeof chunk === "string" && (encoding === "utf-8" || encoding === "utf8" || !encoding) || __intrinsic__isTypedArrayView(chunk) && (!encoding || encoding === "buffer" || encoding === "utf-8");
    let bodySize = 0;
    if (!canSkipReEncodingData) {
      chunk = __intrinsic__Buffer.from(chunk, encoding);
    }
    bodySize = chunk.length;
    writeCount++;
    if (!this[kBodyChunks]) {
      this[kBodyChunks] = [];
      pushChunk(chunk);
      if (callback)
        callback();
      return true;
    }
    for (let chunk2 of this[kBodyChunks]) {
      bodySize += chunk2.length;
      if (bodySize >= MAX_FAKE_BACKPRESSURE_SIZE) {
        break;
      }
    }
    pushChunk(chunk);
    if (callback)
      callback();
    return bodySize < MAX_FAKE_BACKPRESSURE_SIZE;
  };
  const oldEnd = this.end;
  this.end = function(chunk, encoding, callback) {
    oldEnd?.__intrinsic__call(this, chunk, encoding, callback);
    if (__intrinsic__isCallable(chunk)) {
      callback = chunk;
      chunk = __intrinsic__undefined;
      encoding = __intrinsic__undefined;
    } else if (__intrinsic__isCallable(encoding)) {
      callback = encoding;
      encoding = __intrinsic__undefined;
    } else if (!__intrinsic__isCallable(callback)) {
      callback = __intrinsic__undefined;
    }
    if (chunk) {
      if (this.finished) {
        emitErrorNextTickIfErrorListenerNT(this, __intrinsic__makeErrorWithCode(236), callback);
        return this;
      }
      write_(chunk, encoding, null);
    } else if (this.finished) {
      if (callback) {
        if (!this.writableFinished) {
          this.on("finish", callback);
        } else {
          callback(__intrinsic__makeErrorWithCode(226, "end"));
        }
      }
    }
    if (callback) {
      this.once("finish", callback);
    }
    if (!this.finished) {
      send();
      resolveNextChunk?.(true);
    }
    return this;
  };
  this.flushHeaders = function() {
    if (!fetching) {
      this[kAbortController] ??= new AbortController;
      this[kAbortController].signal.addEventListener("abort", onAbort, {
        once: true
      });
      startFetch();
    }
  };
  this.destroy = function(err) {
    if (this.destroyed)
      return this;
    this.destroyed = true;
    const res = this.res;
    if (res) {
      res._dump();
    }
    this.finished = true;
    if (this.res && !this.res.complete) {
      this.res.emit("end");
    }
    this[kAbortController]?.abort?.();
    this.socket.destroy(err);
    return this;
  };
  this._ensureTls = () => {
    if (this[kTls] === null)
      this[kTls] = {};
    return this[kTls];
  };
  const socketCloseListener = () => {
    this.destroyed = true;
    const res = this.res;
    if (res) {
      if (!res.complete) {
        res.destroy(new ConnResetException("aborted"));
      }
      if (!this._closed) {
        this._closed = true;
        callCloseCallback(this);
        this.emit("close");
        this.socket?.emit?.("close");
      }
      if (!res.aborted && res.readable) {
        res.push(null);
      }
    } else if (!this._closed) {
      this._closed = true;
      callCloseCallback(this);
      this.emit("close");
      this.socket?.emit?.("close");
    }
  };
  const onAbort = (_err) => {
    this[kClearTimeout]?.();
    socketCloseListener();
    if (!this[abortedSymbol] && !this?.res?.complete) {
      process.nextTick(emitAbortNextTick, this);
      this[abortedSymbol] = true;
    }
  };
  let fetching = false;
  const startFetch = (customBody) => {
    if (fetching) {
      return false;
    }
    fetching = true;
    const method2 = this[kMethod];
    let keepalive = true;
    const agentKeepalive = this[kAgent]?.keepAlive;
    if (agentKeepalive !== __intrinsic__undefined) {
      keepalive = agentKeepalive;
    }
    const protocol2 = this[kProtocol];
    const path = this[kPath];
    let host2 = this[kHost];
    const getURL = (host3) => {
      if (isIPv6(host3)) {
        host3 = `[${host3}]`;
      }
      if (path.startsWith("http://") || path.startsWith("https://")) {
        return [path, `${protocol2}//${host3}${this[kUseDefaultPort] ? "" : ":" + this[kPort]}`];
      } else {
        let proxy;
        const url = `${protocol2}//${host3}${this[kUseDefaultPort] ? "" : ":" + this[kPort]}${path}`;
        try {
          const agentProxy = this[kAgent]?.proxy;
          proxy = agentProxy?.href || agentProxy;
        } catch {}
        return [url, proxy];
      }
    };
    const go = (url, proxy, softFail = false) => {
      const tls = protocol2 === "https:" && this[kTls] ? { ...this[kTls], serverName: this[kTls].servername } : __intrinsic__undefined;
      const fetchOptions = {
        method: method2,
        headers: this.getHeaders(),
        redirect: "manual",
        signal: this[kAbortController]?.signal,
        timeout: false,
        decompress: false,
        keepalive
      };
      let keepOpen = false;
      const isDuplex = customBody === __intrinsic__undefined && !this.finished;
      if (isDuplex) {
        fetchOptions.duplex = "half";
        keepOpen = true;
      }
      if (customBody !== __intrinsic__undefined) {
        fetchOptions.body = customBody;
      } else if (isDuplex && (method2 !== "GET" && method2 !== "HEAD" && method2 !== "OPTIONS" || this[kBodyChunks]?.length > 0)) {
        const self = this;
        fetchOptions.body = async function* () {
          while (self[kBodyChunks]?.length > 0) {
            yield self[kBodyChunks].shift();
          }
          if (self[kBodyChunks]?.length === 0) {
            self.emit("drain");
          }
          while (!self.finished) {
            yield await new __intrinsic__Promise((resolve) => {
              resolveNextChunk = (end) => {
                resolveNextChunk = __intrinsic__undefined;
                if (end) {
                  resolve(__intrinsic__undefined);
                } else {
                  resolve(self[kBodyChunks].shift());
                }
              };
            });
            if (self[kBodyChunks]?.length === 0) {
              self.emit("drain");
            }
          }
          handleResponse?.();
        };
      }
      if (tls) {
        fetchOptions.tls = tls;
      }
      if (!!$debug_log_enabled) {
        fetchOptions.verbose = true;
      }
      if (proxy) {
        fetchOptions.proxy = proxy;
      }
      const socketPath = this[kSocketPath];
      if (socketPath) {
        fetchOptions.unix = socketPath;
      }
      this[kFetchRequest] = nodeHttpClient(url, fetchOptions).then((response) => {
        if (this.aborted) {
          maybeEmitClose();
          return;
        }
        handleResponse = () => {
          this[kFetchRequest] = null;
          this[kClearTimeout]();
          handleResponse = __intrinsic__undefined;
          const prevIsHTTPS = getIsNextIncomingMessageHTTPS();
          setIsNextIncomingMessageHTTPS(response.url.startsWith("https:"));
          var res = this.res = new IncomingMessage(response, {
            [typeSymbol]: NodeHTTPIncomingRequestType.FetchResponse,
            [reqSymbol]: this
          });
          setIsNextIncomingMessageHTTPS(prevIsHTTPS);
          res.req = this;
          let timer;
          res.setTimeout = (msecs, callback) => {
            if (timer) {
              clearTimeout(timer);
            }
            timer = setTimeout(() => {
              if (res.complete) {
                return;
              }
              res.emit("timeout");
              callback?.();
            }, msecs);
          };
          process.nextTick((self, res2) => {
            const contentLength = res2.headers["content-length"];
            if (contentLength && isNaN(Number(contentLength))) {
              emitErrorEventNT(self, __intrinsic__makeErrorWithCode(287, "Parse Error"));
              res2.complete = true;
              maybeEmitClose();
              return;
            }
            try {
              if (self.aborted || !self.emit("response", res2)) {
                res2._dump();
              }
            } finally {
              maybeEmitClose();
              if (res2.statusCode === 304) {
                res2.complete = true;
                maybeEmitClose();
                return;
              }
            }
          }, this, res);
        };
        if (!keepOpen) {
          handleResponse();
        }
        onEnd();
      });
      if (!softFail) {
        this[kFetchRequest].catch((err) => {
          if (err.code === "ConnectionRefused") {
            err = new Error("ECONNREFUSED");
            err.code = "ECONNREFUSED";
          }
          if (isAbortError(err)) {
            return;
          }
          if (!!$debug_log_enabled)
            globalReportError(err);
          try {
            this.emit("error", err);
          } catch (_err) {}
        }).finally(() => {
          if (!keepOpen) {
            fetching = false;
            this[kFetchRequest] = null;
            this[kClearTimeout]();
          }
        });
      }
      return this[kFetchRequest];
    };
    if (isIP(host2) || !options.lookup) {
      const [url, proxy] = getURL(host2);
      go(url, proxy, false);
      return true;
    }
    try {
      options.lookup(host2, { all: true }, (err, results) => {
        if (err) {
          if (!!$debug_log_enabled)
            globalReportError(err);
          process.nextTick((self, err2) => self.emit("error", err2), this, err);
          return;
        }
        let candidates = results.sort((a, b) => b.family - a.family);
        const fail = (message, name, code, syscall) => {
          const error = new Error(message);
          error.name = name;
          error.code = code;
          error.syscall = syscall;
          if (!!$debug_log_enabled)
            globalReportError(error);
          process.nextTick((self, err2) => self.emit("error", err2), this, error);
        };
        if (candidates.length === 0) {
          fail("No records found", "DNSException", "ENOTFOUND", "getaddrinfo");
          return;
        }
        if (!this.hasHeader("Host")) {
          this.setHeader("Host", `${host2}${this[kUseDefaultPort] ? "" : ":" + this[kPort]}`);
        }
        if (protocol2 === "https:" && !this[kTls]?.servername) {
          this._ensureTls().servername = host2;
        }
        const iterate = () => {
          if (candidates.length === 0) {
            fail(`connect ECONNREFUSED ${host2}:${port}`, "Error", "ECONNREFUSED", "connect");
            return;
          }
          const [url, proxy] = getURL(candidates.shift().address);
          go(url, proxy, candidates.length > 0).catch(iterate);
        };
        iterate();
      });
      return true;
    } catch (err) {
      if (!!$debug_log_enabled)
        globalReportError(err);
      process.nextTick((self, err2) => self.emit("error", err2), this, err);
      return false;
    }
  };
  let onEnd = () => {};
  let handleResponse = () => {};
  const send = () => {
    this.finished = true;
    this[kAbortController] ??= new AbortController;
    this[kAbortController].signal.addEventListener("abort", onAbort, { once: true });
    var body = this[kBodyChunks] && this[kBodyChunks].length > 1 ? new Blob(this[kBodyChunks]) : this[kBodyChunks]?.[0];
    try {
      startFetch(body);
      onEnd = () => {
        handleResponse?.();
      };
    } catch (err) {
      if (!!$debug_log_enabled)
        globalReportError(err);
      this.emit("error", err);
    } finally {
      process.nextTick(maybeEmitFinish.bind(this));
    }
  };
  const maybeEmitSocket = () => {
    if (this.destroyed)
      return;
    if (!(this[kEmitState] & 1 << ClientRequestEmitState.socket)) {
      this[kEmitState] |= 1 << ClientRequestEmitState.socket;
      this.emit("socket", this.socket);
    }
  };
  const maybeEmitPrefinish = () => {
    maybeEmitSocket();
    if (!(this[kEmitState] & 1 << ClientRequestEmitState.prefinish)) {
      this[kEmitState] |= 1 << ClientRequestEmitState.prefinish;
      this.emit("prefinish");
    }
  };
  const maybeEmitFinish = () => {
    maybeEmitPrefinish();
    if (!(this[kEmitState] & 1 << ClientRequestEmitState.finish)) {
      this[kEmitState] |= 1 << ClientRequestEmitState.finish;
      this.emit("finish");
    }
  };
  const maybeEmitClose = () => {
    maybeEmitPrefinish();
    if (!this._closed) {
      process.nextTick(emitCloseNTAndComplete, this);
    }
  };
  this.abort = () => {
    if (this.aborted)
      return;
    this[abortedSymbol] = true;
    process.nextTick(emitAbortNextTick, this);
    this[kAbortController]?.abort?.();
    this.destroy();
  };
  if (typeof input === "string") {
    const urlStr = input;
    try {
      var urlObject = new URL(urlStr);
    } catch (_err) {
      throw __intrinsic__makeErrorWithCode(141, `Invalid URL: ${urlStr}`);
    }
    input = urlToHttpOptions(urlObject);
  } else if (input && typeof input === "object" && input instanceof URL) {
    input = urlToHttpOptions(input);
  } else {
    cb = options;
    options = input;
    input = null;
  }
  if (typeof options === "function") {
    cb = options;
    options = input || kEmptyObject;
  } else {
    options = ObjectAssign(input || {}, options);
  }
  this[kTls] = null;
  this[kAbortController] = null;
  let agent = options.agent;
  const defaultAgent = options._defaultAgent || globalAgent;
  if (agent === false) {
    agent = new defaultAgent.constructor;
  } else if (agent == null) {
    agent = defaultAgent;
  } else if (typeof agent.addRequest !== "function") {
    throw __intrinsic__makeErrorWithCode(118, "options.agent", "Agent-like Object, undefined, or false", agent);
  }
  this[kAgent] = agent;
  this.destroyed = false;
  const protocol = options.protocol || defaultAgent.protocol;
  let expectedProtocol = defaultAgent.protocol;
  if (this.agent.protocol) {
    expectedProtocol = this.agent.protocol;
  }
  if (protocol !== expectedProtocol) {
    throw __intrinsic__makeErrorWithCode(133, protocol, expectedProtocol);
  }
  this[kProtocol] = protocol;
  if (options.path) {
    const path = __intrinsic__String(options.path);
    if (RegExpPrototypeExec.__intrinsic__call(INVALID_PATH_REGEX, path) !== null) {
      throw __intrinsic__makeErrorWithCode(251, "Request path");
    }
  }
  const defaultPort = options.defaultPort || this[kAgent].defaultPort;
  const port = this[kPort] = options.port || defaultPort || 80;
  this[kUseDefaultPort] = this[kPort] === defaultPort;
  const host = this[kHost] = options.host = validateHost(options.hostname, "hostname") || validateHost(options.host, "host") || "localhost";
  this[kSocketPath] = options.socketPath;
  const signal = options.signal;
  if (signal) {
    signal.addEventListener("abort", () => {
      this[kAbortController]?.abort();
    }, { once: true });
    this[kSignal] = signal;
  }
  let method = options.method;
  const methodIsString = typeof method === "string";
  if (method !== null && method !== __intrinsic__undefined && !methodIsString) {
    throw __intrinsic__makeErrorWithCode(118, "options.method", "string", method);
  }
  if (methodIsString && method) {
    if (!checkIsHttpToken(method)) {
      throw __intrinsic__makeErrorWithCode(127, "Method", method);
    }
    method = this[kMethod] = StringPrototypeToUpperCase.__intrinsic__call(method);
  } else {
    method = this[kMethod] = "GET";
  }
  const _maxHeaderSize = options.maxHeaderSize;
  const maxHeaderSize = options.maxHeaderSize;
  if (maxHeaderSize !== __intrinsic__undefined)
    validateInteger(maxHeaderSize, "maxHeaderSize", 0);
  this.maxHeaderSize = maxHeaderSize;
  this[kMaxHeaderSize] = _maxHeaderSize;
  const insecureHTTPParser = options.insecureHTTPParser;
  if (insecureHTTPParser !== __intrinsic__undefined) {
    validateBoolean(insecureHTTPParser, "options.insecureHTTPParser");
  }
  this.insecureHTTPParser = insecureHTTPParser;
  const joinDuplicateHeaders = options.joinDuplicateHeaders;
  if (joinDuplicateHeaders !== __intrinsic__undefined) {
    validateBoolean(joinDuplicateHeaders, "options.joinDuplicateHeaders");
  }
  this.joinDuplicateHeaders = joinDuplicateHeaders;
  if (options.pfx) {
    throw new Error("pfx is not supported");
  }
  const mergedTlsOptions = { __proto__: null, ...agent?.connectOpts, ...options, ...agent?.options };
  if (mergedTlsOptions.rejectUnauthorized !== __intrinsic__undefined) {
    this._ensureTls().rejectUnauthorized = mergedTlsOptions.rejectUnauthorized;
  }
  if (mergedTlsOptions.ca) {
    throwOnInvalidTLSArray("options.ca", mergedTlsOptions.ca);
    this._ensureTls().ca = mergedTlsOptions.ca;
  }
  if (mergedTlsOptions.cert) {
    throwOnInvalidTLSArray("options.cert", mergedTlsOptions.cert);
    this._ensureTls().cert = mergedTlsOptions.cert;
  }
  if (mergedTlsOptions.key) {
    throwOnInvalidTLSArray("options.key", mergedTlsOptions.key);
    this._ensureTls().key = mergedTlsOptions.key;
  }
  if (mergedTlsOptions.passphrase) {
    validateString(mergedTlsOptions.passphrase, "options.passphrase");
    this._ensureTls().passphrase = mergedTlsOptions.passphrase;
  }
  if (mergedTlsOptions.ciphers) {
    validateString(mergedTlsOptions.ciphers, "options.ciphers");
    this._ensureTls().ciphers = mergedTlsOptions.ciphers;
  }
  if (mergedTlsOptions.servername) {
    validateString(mergedTlsOptions.servername, "options.servername");
    this._ensureTls().servername = mergedTlsOptions.servername;
  }
  if (mergedTlsOptions.secureOptions) {
    validateInteger(mergedTlsOptions.secureOptions, "options.secureOptions");
    this._ensureTls().secureOptions = mergedTlsOptions.secureOptions;
  }
  this[kPath] = options.path || "/";
  if (cb) {
    this.once("response", cb);
  }
  $debug_log(`new ClientRequest: ${this[kMethod]} ${this[kProtocol]}//${this[kHost]}:${this[kPort]}${this[kPath]}`);
  this.finished = false;
  this[kRes] = null;
  this[kUpgradeOrConnect] = false;
  this[kParser] = null;
  this[kMaxHeadersCount] = null;
  this[kReusedSocket] = false;
  this[kHost] = host;
  this[kProtocol] = protocol;
  if (options.timeout !== __intrinsic__undefined) {
    const timeout = getTimerDuration(options.timeout, "timeout");
    this.timeout = timeout;
    this.setTimeout(timeout, __intrinsic__undefined);
  }
  const { headers } = options;
  const headersArray = __intrinsic__isJSArray(headers);
  if (headersArray) {
    const length = headers.length;
    if (__intrinsic__isJSArray(headers[0])) {
      for (let i = 0;i < length; i++) {
        const actualHeader = headers[i];
        if (actualHeader.length !== 2) {
          throw __intrinsic__makeErrorWithCode(119, "options.headers", "expected array of [key, value]");
        }
        const key = actualHeader[0];
        validateHeaderName(key);
        const lowerKey = key?.toLowerCase();
        if (lowerKey === "host") {
          if (!this.getHeader(key)) {
            this.setHeader(key, actualHeader[1]);
          }
        } else {
          this.appendHeader(key, actualHeader[1]);
        }
      }
    } else {
      if (length % 2 !== 0) {
        throw __intrinsic__makeErrorWithCode(119, "options.headers", "expected [key, value, key, value, ...]");
      }
      for (let i = 0;i < length; ) {
        this.appendHeader(headers[i++], headers[i++]);
      }
    }
  } else {
    if (headers) {
      for (let key in headers) {
        const value = headers[key];
        if (key === "host" || key === "hostname") {
          if (value !== null && value !== __intrinsic__undefined && typeof value !== "string") {
            throw __intrinsic__makeErrorWithCode(118, `options.${key}`, ["string", "undefined", "null"], value);
          }
        }
        this.setHeader(key, value);
      }
    }
    var auth = options.auth;
    if (auth && !this.getHeader("Authorization")) {
      this.setHeader("Authorization", "Basic " + __intrinsic__Buffer.from(auth).toString("base64"));
    }
  }
  const { signal: _signal, ...optsWithoutSignal } = options;
  this[kOptions] = optsWithoutSignal;
  this._httpMessage = this;
  process.nextTick(emitContinueAndSocketNT, this);
  this[kEmitState] = 0;
  this.setSocketKeepAlive = (_enable = true, _initialDelay = 0) => {};
  this.setNoDelay = (_noDelay = true) => {};
  this[kClearTimeout] = () => {
    const timeoutTimer = this[kTimeoutTimer];
    if (timeoutTimer) {
      clearTimeout(timeoutTimer);
      this[kTimeoutTimer] = __intrinsic__undefined;
      this.removeAllListeners("timeout");
    }
  };
}
var ClientRequestPrototype = {
  constructor: ClientRequest,
  __proto__: OutgoingMessage.prototype,
  setTimeout(msecs, callback) {
    if (this.destroyed) {
      return this;
    }
    this.timeout = msecs = getTimerDuration(msecs, "msecs");
    clearTimeout(this[kTimeoutTimer]);
    if (msecs === 0) {
      if (callback !== __intrinsic__undefined) {
        validateFunction(callback, "callback");
        this.removeListener("timeout", callback);
      }
      this[kTimeoutTimer] = __intrinsic__undefined;
    } else {
      this[kTimeoutTimer] = setTimeout(() => {
        this[kTimeoutTimer] = __intrinsic__undefined;
        this[kAbortController]?.abort();
        this.emit("timeout");
      }, msecs).unref();
      if (callback !== __intrinsic__undefined) {
        validateFunction(callback, "callback");
        this.once("timeout", callback);
      }
    }
    return this;
  },
  clearTimeout(cb) {
    this.setTimeout(0, cb);
  },
  get path() {
    return this[kPath];
  },
  get port() {
    return this[kPort];
  },
  get method() {
    return this[kMethod];
  },
  get host() {
    return this[kHost];
  },
  get protocol() {
    return this[kProtocol];
  },
  get agent() {
    return this[kAgent];
  },
  set agent(value) {
    this[kAgent] = value;
  },
  get aborted() {
    return this[abortedSymbol] || this[kSignal]?.aborted || !!this[kAbortController]?.signal.aborted;
  },
  set aborted(value) {
    this[abortedSymbol] = value;
  },
  get writable() {
    return true;
  }
};
ClientRequest.prototype = ClientRequestPrototype;
__intrinsic__setPrototypeDirect.__intrinsic__call(ClientRequest, OutgoingMessage);
function validateHost(host, name) {
  if (host !== null && host !== __intrinsic__undefined && typeof host !== "string") {
    throw __intrinsic__makeErrorWithCode(118, `options.${name}`, ["string", "undefined", "null"], host);
  }
  return host;
}
function emitContinueAndSocketNT(self) {
  if (self.destroyed)
    return;
  if (!(self[kEmitState] & 1 << ClientRequestEmitState.socket)) {
    self[kEmitState] |= 1 << ClientRequestEmitState.socket;
    self.emit("socket", self.socket);
  }
  if (!self._closed && self.getHeader("expect") === "100-continue") {
    self.emit("continue");
  }
}
function emitAbortNextTick(self) {
  self.emit("abort");
}
$ = {
  ClientRequest,
  kBodyChunks,
  abortedSymbol
};
$$EXPORT$$($).$$EXPORT_END$$;
