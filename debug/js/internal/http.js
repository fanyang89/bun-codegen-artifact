(function (){"use strict";// build/debug/tmp_modules/internal/http.ts
var $;
var { isIPv4 } = @getInternalField(@internalModuleRegistry, 28) || @createInternalModuleById(28);
var {
  getHeader,
  setHeader,
  Headers,
  assignHeaders: assignHeadersFast,
  setRequestTimeout,
  headersTuple,
  webRequestOrResponseHasBodyValue,
  setServerCustomOptions,
  getCompleteWebRequestOrResponseBodyValueAsArrayBuffer,
  drainMicrotasks,
  setServerIdleTimeout
} = @lazy(9);
var getRawKeys = @lazy(10);
var kDeprecatedReplySymbol = Symbol("deprecatedReply");
var kBodyChunks = Symbol("bodyChunks");
var kPath = Symbol("path");
var kPort = Symbol("port");
var kMethod = Symbol("method");
var kHost = Symbol("host");
var kProtocol = Symbol("protocol");
var kAgent = Symbol("agent");
var kFetchRequest = Symbol("fetchRequest");
var kTls = Symbol("tls");
var kUseDefaultPort = Symbol("useDefaultPort");
var kRes = Symbol("res");
var kUpgradeOrConnect = Symbol("upgradeOrConnect");
var kParser = Symbol("parser");
var kMaxHeadersCount = Symbol("maxHeadersCount");
var kReusedSocket = Symbol("reusedSocket");
var kTimeoutTimer = Symbol("timeoutTimer");
var kOptions = Symbol("options");
var kSocketPath = Symbol("socketPath");
var kSignal = Symbol("signal");
var kMaxHeaderSize = Symbol("maxHeaderSize");
var abortedSymbol = Symbol("aborted");
var kClearTimeout = Symbol("kClearTimeout");
var headerStateSymbol = Symbol("headerState");
var kEmitState = Symbol("emitState");
var bodyStreamSymbol = Symbol("bodyStream");
var controllerSymbol = Symbol("controller");
var runSymbol = Symbol("run");
var deferredSymbol = Symbol("deferred");
var eofInProgress = Symbol("eofInProgress");
var fakeSocketSymbol = Symbol("fakeSocket");
var firstWriteSymbol = Symbol("firstWrite");
var headersSymbol = Symbol("headers");
var isTlsSymbol = Symbol("is_tls");
var kHandle = Symbol("handle");
var kRealListen = Symbol("kRealListen");
var noBodySymbol = Symbol("noBody");
var optionsSymbol = Symbol("options");
var reqSymbol = Symbol("req");
var timeoutTimerSymbol = Symbol("timeoutTimer");
var tlsSymbol = Symbol("tls");
var typeSymbol = Symbol("type");
var webRequestOrResponse = Symbol("FetchAPI");
var statusCodeSymbol = Symbol("statusCode");
var kAbortController = Symbol.for("kAbortController");
var statusMessageSymbol = Symbol("statusMessage");
var kInternalSocketData = Symbol.for("::bunternal::");
var serverSymbol = Symbol.for("::bunternal::");
var kPendingCallbacks = Symbol("pendingCallbacks");
var kRequest = Symbol("request");
var kCloseCallback = Symbol("closeCallback");
var kDeferredTimeouts = Symbol("deferredTimeouts");
var kEmptyObject = Object.freeze(Object.create(null));
var ClientRequestEmitState;
((ClientRequestEmitState2) => {
  ClientRequestEmitState2[ClientRequestEmitState2["socket"] = 1] = "socket";
  ClientRequestEmitState2[ClientRequestEmitState2["prefinish"] = 2] = "prefinish";
  ClientRequestEmitState2[ClientRequestEmitState2["finish"] = 3] = "finish";
  ClientRequestEmitState2[ClientRequestEmitState2["response"] = 4] = "response";
})(ClientRequestEmitState ||= {});
var NodeHTTPResponseAbortEvent;
((NodeHTTPResponseAbortEvent2) => {
  NodeHTTPResponseAbortEvent2[NodeHTTPResponseAbortEvent2["none"] = 0] = "none";
  NodeHTTPResponseAbortEvent2[NodeHTTPResponseAbortEvent2["abort"] = 1] = "abort";
  NodeHTTPResponseAbortEvent2[NodeHTTPResponseAbortEvent2["timeout"] = 2] = "timeout";
})(NodeHTTPResponseAbortEvent ||= {});
var NodeHTTPIncomingRequestType;
((NodeHTTPIncomingRequestType2) => {
  NodeHTTPIncomingRequestType2[NodeHTTPIncomingRequestType2["FetchRequest"] = 0] = "FetchRequest";
  NodeHTTPIncomingRequestType2[NodeHTTPIncomingRequestType2["FetchResponse"] = 1] = "FetchResponse";
  NodeHTTPIncomingRequestType2[NodeHTTPIncomingRequestType2["NodeHTTPResponse"] = 2] = "NodeHTTPResponse";
})(NodeHTTPIncomingRequestType ||= {});
var NodeHTTPBodyReadState;
((NodeHTTPBodyReadState2) => {
  NodeHTTPBodyReadState2[NodeHTTPBodyReadState2["none"] = 0] = "none";
  NodeHTTPBodyReadState2[NodeHTTPBodyReadState2["pending"] = 2] = "pending";
  NodeHTTPBodyReadState2[NodeHTTPBodyReadState2["done"] = 4] = "done";
  NodeHTTPBodyReadState2[NodeHTTPBodyReadState2["hasBufferedDataDuringPause"] = 8] = "hasBufferedDataDuringPause";
})(NodeHTTPBodyReadState ||= {});
var NodeHTTPResponseFlags;
((NodeHTTPResponseFlags2) => {
  NodeHTTPResponseFlags2[NodeHTTPResponseFlags2["socket_closed"] = 1] = "socket_closed";
  NodeHTTPResponseFlags2[NodeHTTPResponseFlags2["request_has_completed"] = 2] = "request_has_completed";
  NodeHTTPResponseFlags2[NodeHTTPResponseFlags2["closed_or_completed"] = 3] = "closed_or_completed";
})(NodeHTTPResponseFlags ||= {});
var NodeHTTPHeaderState;
((NodeHTTPHeaderState2) => {
  NodeHTTPHeaderState2[NodeHTTPHeaderState2["none"] = 0] = "none";
  NodeHTTPHeaderState2[NodeHTTPHeaderState2["assigned"] = 1] = "assigned";
  NodeHTTPHeaderState2[NodeHTTPHeaderState2["sent"] = 2] = "sent";
})(NodeHTTPHeaderState ||= {});
function emitErrorNextTickIfErrorListenerNT(self, err, cb) {
  process.nextTick(emitErrorNextTickIfErrorListener, self, err, cb);
}
function emitErrorNextTickIfErrorListener(self, err, cb) {
  if (@isCallable(cb)) {
    if (self.listenerCount("error") == 0) {
      cb();
    } else {
      cb(err);
    }
  }
}
function isAbortError(err) {
  return err?.name === "AbortError";
}
var isNextIncomingMessageHTTPS = false;
function getIsNextIncomingMessageHTTPS() {
  return isNextIncomingMessageHTTPS;
}
function setIsNextIncomingMessageHTTPS(value) {
  isNextIncomingMessageHTTPS = value;
}
function callCloseCallback(self) {
  if (self[kCloseCallback]) {
    self[kCloseCallback]();
    self[kCloseCallback] = @undefined;
  }
}
function emitCloseNT(self) {
  if (!self._closed) {
    self.destroyed = true;
    self._closed = true;
    callCloseCallback(self);
    self.emit("close");
  }
}
function emitCloseNTAndComplete(self) {
  if (!self._closed) {
    self._closed = true;
    callCloseCallback(self);
    self.emit("close");
  }
  self.complete = true;
}
function emitEOFIncomingMessageOuter(self) {
  self.push(null);
  self.complete = true;
}
function emitEOFIncomingMessage(self) {
  self[eofInProgress] = true;
  process.nextTick(emitEOFIncomingMessageOuter, self);
}
function validateMsecs(numberlike, field) {
  if (typeof numberlike !== "number" || numberlike < 0) {
    throw @makeErrorWithCode(118, field, "number", numberlike);
  }
  return numberlike;
}
var METHODS = [
  "ACL",
  "BIND",
  "CHECKOUT",
  "CONNECT",
  "COPY",
  "DELETE",
  "GET",
  "HEAD",
  "LINK",
  "LOCK",
  "M-SEARCH",
  "MERGE",
  "MKACTIVITY",
  "MKCALENDAR",
  "MKCOL",
  "MOVE",
  "NOTIFY",
  "OPTIONS",
  "PATCH",
  "POST",
  "PROPFIND",
  "PROPPATCH",
  "PURGE",
  "PUT",
  "QUERY",
  "REBIND",
  "REPORT",
  "SEARCH",
  "SOURCE",
  "SUBSCRIBE",
  "TRACE",
  "UNBIND",
  "UNLINK",
  "UNLOCK",
  "UNSUBSCRIBE"
];
var STATUS_CODES = {
  100: "Continue",
  101: "Switching Protocols",
  102: "Processing",
  103: "Early Hints",
  200: "OK",
  201: "Created",
  202: "Accepted",
  203: "Non-Authoritative Information",
  204: "No Content",
  205: "Reset Content",
  206: "Partial Content",
  207: "Multi-Status",
  208: "Already Reported",
  226: "IM Used",
  300: "Multiple Choices",
  301: "Moved Permanently",
  302: "Found",
  303: "See Other",
  304: "Not Modified",
  305: "Use Proxy",
  307: "Temporary Redirect",
  308: "Permanent Redirect",
  400: "Bad Request",
  401: "Unauthorized",
  402: "Payment Required",
  403: "Forbidden",
  404: "Not Found",
  405: "Method Not Allowed",
  406: "Not Acceptable",
  407: "Proxy Authentication Required",
  408: "Request Timeout",
  409: "Conflict",
  410: "Gone",
  411: "Length Required",
  412: "Precondition Failed",
  413: "Payload Too Large",
  414: "URI Too Long",
  415: "Unsupported Media Type",
  416: "Range Not Satisfiable",
  417: "Expectation Failed",
  418: "I'm a Teapot",
  421: "Misdirected Request",
  422: "Unprocessable Entity",
  423: "Locked",
  424: "Failed Dependency",
  425: "Too Early",
  426: "Upgrade Required",
  428: "Precondition Required",
  429: "Too Many Requests",
  431: "Request Header Fields Too Large",
  451: "Unavailable For Legal Reasons",
  500: "Internal Server Error",
  501: "Not Implemented",
  502: "Bad Gateway",
  503: "Service Unavailable",
  504: "Gateway Timeout",
  505: "HTTP Version Not Supported",
  506: "Variant Also Negotiates",
  507: "Insufficient Storage",
  508: "Loop Detected",
  509: "Bandwidth Limit Exceeded",
  510: "Not Extended",
  511: "Network Authentication Required"
};
function hasServerResponseFinished(self, chunk, callback) {
  const finished = self.finished;
  if (chunk) {
    const destroyed = self.destroyed;
    if (finished || destroyed) {
      let err;
      if (finished) {
        err = @makeErrorWithCode(236);
      } else if (destroyed) {
        err = @makeErrorWithCode(228, "Stream is destroyed");
      }
      if (!destroyed) {
        process.nextTick(emitErrorNt, self, err, callback);
      } else if (@isCallable(callback)) {
        process.nextTick(callback, err);
      }
      return true;
    }
  } else if (finished) {
    if (@isCallable(callback)) {
      if (!self.writableFinished) {
        self.on("finish", callback);
      } else {
        callback(@makeErrorWithCode(226, "end"));
      }
    }
    return true;
  }
  return false;
}
function emitErrorNt(msg, err, callback) {
  if (@isCallable(callback)) {
    callback(err);
  }
  if (@isCallable(msg.emit) && !msg.destroyed) {
    msg.emit("error", err);
  }
}
var setMaxHTTPHeaderSize = @lazy(11);
var getMaxHTTPHeaderSize = @lazy(12);
var kOutHeaders = Symbol("kOutHeaders");
function ipToInt(ip) {
  const octets = ip.split(".");
  let result = 0;
  for (let i = 0;i < octets.length; i++)
    result = (result << 8) + Number.parseInt(octets[i]);
  return result >>> 0;
}

class ProxyConfig {
  href;
  protocol;
  auth;
  bypassList;
  proxyConnectionOptions;
  constructor(proxyUrl, keepAlive, noProxyList) {
    let parsedURL;
    try {
      parsedURL = new URL(proxyUrl);
    } catch {
      throw @makeErrorWithCode(198, `Invalid proxy URL: ${proxyUrl}`);
    }
    const { hostname, port, protocol, username, password } = parsedURL;
    this.href = proxyUrl;
    this.protocol = protocol;
    if (username || password) {
      const auth = `${decodeURIComponent(username)}:${decodeURIComponent(password)}`;
      this.auth = `Basic ${@Buffer.from(auth).toString("base64")}`;
    }
    if (noProxyList) {
      this.bypassList = noProxyList.split(",").map((entry) => entry.trim().toLowerCase());
    } else {
      this.bypassList = [];
    }
    this.proxyConnectionOptions = {
      host: hostname[0] === "[" ? hostname.slice(1, -1) : hostname,
      port: port ? Number(port) : protocol === "https:" ? 443 : 80
    };
  }
  shouldUseProxy(hostname, port) {
    const bypassList = this.bypassList;
    if (this.bypassList.length === 0)
      return true;
    const host = hostname.toLowerCase();
    const hostWithPort = port ? `${host}:${port}` : host;
    for (let i = 0;i < bypassList.length; i++) {
      const entry = bypassList[i];
      if (entry === "*")
        return false;
      if (entry === host || entry === hostWithPort)
        return false;
      if (entry.startsWith(".")) {
        const suffix = entry.substring(1);
        if (host.endsWith(suffix))
          return false;
      }
      if (entry.startsWith("*.") && host.endsWith(entry.substring(1)))
        return false;
      if (entry.includes("-") && isIPv4(host)) {
        let { 0: startIP, 1: endIP } = entry.split("-");
        startIP = startIP.trim();
        endIP = endIP.trim();
        if (startIP && endIP && isIPv4(startIP) && isIPv4(endIP)) {
          const hostInt = ipToInt(host);
          const startInt = ipToInt(startIP);
          const endInt = ipToInt(endIP);
          if (hostInt >= startInt && hostInt <= endInt)
            return false;
        }
      }
    }
    return true;
  }
}
function parseProxyConfigFromEnv(env, protocol, keepAlive) {
  if (protocol !== "http:" && protocol !== "https:")
    return null;
  const proxyUrl = protocol === "https:" ? env.https_proxy || env.HTTPS_PROXY : env.http_proxy || env.HTTP_PROXY;
  if (!proxyUrl)
    return null;
  if (proxyUrl.includes("\r") || proxyUrl.includes(`
`)) {
    throw @makeErrorWithCode(198, `Invalid proxy URL: ${proxyUrl}`);
  }
  if (!proxyUrl.startsWith("http://") && !proxyUrl.startsWith("https://"))
    return null;
  return new ProxyConfig(proxyUrl, keepAlive, env.no_proxy || env.NO_PROXY);
}
function checkShouldUseProxy(proxyConfig, reqOptions) {
  if (!proxyConfig)
    return false;
  if (reqOptions.socketPath)
    return false;
  return proxyConfig.shouldUseProxy(reqOptions.host || "localhost", reqOptions.port);
}
function filterEnvForProxies(env) {
  return {
    http_proxy: env.http_proxy,
    HTTP_PROXY: env.HTTP_PROXY,
    https_proxy: env.https_proxy,
    HTTPS_PROXY: env.HTTPS_PROXY,
    no_proxy: env.no_proxy,
    NO_PROXY: env.NO_PROXY
  };
}
return{
  webRequestOrResponseHasBodyValue,
  webRequestOrResponse,
  validateMsecs,
  typeSymbol,
  tlsSymbol,
  timeoutTimerSymbol,
  statusMessageSymbol,
  statusCodeSymbol,
  setServerIdleTimeout,
  setServerCustomOptions,
  setRequestTimeout,
  setMaxHTTPHeaderSize,
  setIsNextIncomingMessageHTTPS,
  setHeader,
  serverSymbol,
  runSymbol,
  reqSymbol,
  parseProxyConfigFromEnv,
  optionsSymbol,
  noBodySymbol,
  kUseDefaultPort,
  kUpgradeOrConnect,
  kTls,
  kTimeoutTimer,
  kSocketPath,
  kSignal,
  kReusedSocket,
  kRes,
  kRequest,
  kRealListen,
  kProtocol,
  kPort,
  kPendingCallbacks,
  kPath,
  kParser,
  kOutHeaders,
  kOptions,
  kMethod,
  kMaxHeadersCount,
  kMaxHeaderSize,
  kInternalSocketData,
  kHost,
  kHandle,
  kFetchRequest,
  kEmptyObject,
  kEmitState,
  kDeprecatedReplySymbol,
  kDeferredTimeouts,
  kCloseCallback,
  kClearTimeout,
  kBodyChunks,
  kAgent,
  kAbortController,
  isTlsSymbol,
  isAbortError,
  headersTuple,
  headersSymbol,
  headerStateSymbol,
  hasServerResponseFinished,
  getRawKeys,
  getMaxHTTPHeaderSize,
  getIsNextIncomingMessageHTTPS,
  getHeader,
  getCompleteWebRequestOrResponseBodyValueAsArrayBuffer,
  firstWriteSymbol,
  filterEnvForProxies,
  fakeSocketSymbol,
  eofInProgress,
  emitErrorNextTickIfErrorListenerNT,
  emitEOFIncomingMessage,
  emitCloseNTAndComplete,
  emitCloseNT,
  drainMicrotasks,
  deferredSymbol,
  controllerSymbol,
  checkShouldUseProxy,
  callCloseCallback,
  bodyStreamSymbol,
  assignHeadersFast,
  abortedSymbol,
  STATUS_CODES,
  NodeHTTPResponseFlags,
  NodeHTTPResponseAbortEvent,
  NodeHTTPIncomingRequestType,
  NodeHTTPHeaderState,
  NodeHTTPBodyReadState,
  METHODS,
  Headers,
  ClientRequestEmitState
};})
