// @bun
// build/release/tmp_modules/node/tls.ts
var $, { isArrayBufferView, isTypedArray } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 144) || __intrinsic__createInternalModuleById(144), net = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 104) || __intrinsic__createInternalModuleById(104), Duplex = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 44) || __intrinsic__createInternalModuleById(44), addServerName = __intrinsic__lazy(69), { throwNotImplemented } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 32) || __intrinsic__createInternalModuleById(32), { throwOnInvalidTLSArray } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 61) || __intrinsic__createInternalModuleById(61), { validateString } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 68) || __intrinsic__createInternalModuleById(68), { Server: NetServer, Socket: NetSocket } = net, getBundledRootCertificates = __intrinsic__lazy(75), getExtraCACertificates = __intrinsic__lazy(76), getSystemCACertificates = __intrinsic__lazy(77), canonicalizeIP = __intrinsic__lazy(78), getTLSDefaultCiphers = __intrinsic__lazy(79), setTLSDefaultCiphers = __intrinsic__lazy(80), _VALID_CIPHERS_SET;
function getValidCiphersSet() {
  if (!_VALID_CIPHERS_SET)
    _VALID_CIPHERS_SET = /* @__PURE__ */ new Set([
      "EXP1024-RC4-MD5",
      "EXP1024-RC2-CBC-MD5",
      "EXP1024-DES-CBC-SHA",
      "EXP1024-DHE-DSS-DES-CBC-SHA",
      "EXP1024-RC4-SHA",
      "EXP1024-DHE-DSS-RC4-SHA",
      "DHE-DSS-RC4-SHA",
      "AES128-SHA",
      "DH-DSS-AES128-SHA",
      "DH-RSA-AES128-SHA",
      "DHE-DSS-AES128-SHA",
      "DHE-RSA-AES128-SHA",
      "ADH-AES128-SHA",
      "AES256-SHA",
      "DH-DSS-AES256-SHA",
      "DH-RSA-AES256-SHA",
      "DHE-DSS-AES256-SHA",
      "DHE-RSA-AES256-SHA",
      "ADH-AES256-SHA",
      "ECDH-ECDSA-NULL-SHA",
      "ECDH-ECDSA-RC4-SHA",
      "ECDH-ECDSA-DES-CBC3-SHA",
      "ECDH-ECDSA-AES128-SHA",
      "ECDH-ECDSA-AES256-SHA",
      "ECDHE-ECDSA-NULL-SHA",
      "ECDHE-ECDSA-RC4-SHA",
      "ECDHE-ECDSA-DES-CBC3-SHA",
      "ECDHE-ECDSA-AES128-SHA",
      "ECDHE-ECDSA-AES256-SHA",
      "ECDH-RSA-NULL-SHA",
      "ECDH-RSA-RC4-SHA",
      "ECDH-RSA-DES-CBC3-SHA",
      "ECDH-RSA-AES128-SHA",
      "ECDH-RSA-AES256-SHA",
      "ECDHE-RSA-NULL-SHA",
      "ECDHE-RSA-RC4-SHA",
      "ECDHE-RSA-DES-CBC3-SHA",
      "ECDHE-RSA-AES128-SHA",
      "ECDHE-RSA-AES256-SHA",
      "ECDHE-RSA-AES128-SHA256",
      "AECDH-NULL-SHA",
      "AECDH-RC4-SHA",
      "AECDH-DES-CBC3-SHA",
      "AECDH-AES128-SHA",
      "AECDH-AES256-SHA",
      "PSK-RC4-SHA",
      "PSK-3DES-EDE-CBC-SHA",
      "PSK-AES128-CBC-SHA",
      "PSK-AES256-CBC-SHA",
      "ECDHE-PSK-AES128-CBC-SHA",
      "ECDHE-PSK-AES256-CBC-SHA",
      "SRP-3DES-EDE-CBC-SHA",
      "SRP-RSA-3DES-EDE-CBC-SHA",
      "SRP-DSS-3DES-EDE-CBC-SHA",
      "SRP-AES-128-CBC-SHA",
      "SRP-RSA-AES-128-CBC-SHA",
      "SRP-DSS-AES-128-CBC-SHA",
      "SRP-AES-256-CBC-SHA",
      "SRP-RSA-AES-256-CBC-SHA",
      "SRP-DSS-AES-256-CBC-SHA",
      "CAMELLIA128-SHA",
      "DH-DSS-CAMELLIA128-SHA",
      "DH-RSA-CAMELLIA128-SHA",
      "DHE-DSS-CAMELLIA128-SHA",
      "DHE-RSA-CAMELLIA128-SHA",
      "ADH-CAMELLIA128-SHA",
      "CAMELLIA256-SHA",
      "DH-DSS-CAMELLIA256-SHA",
      "DH-RSA-CAMELLIA256-SHA",
      "DHE-DSS-CAMELLIA256-SHA",
      "DHE-RSA-CAMELLIA256-SHA",
      "ADH-CAMELLIA256-SHA",
      "SEED-SHA",
      "DH-DSS-SEED-SHA",
      "DH-RSA-SEED-SHA",
      "DHE-DSS-SEED-SHA",
      "DHE-RSA-SEED-SHA",
      "ADH-SEED-SHA",
      "NULL-SHA256",
      "AES128-SHA256",
      "AES256-SHA256",
      "DH-DSS-AES128-SHA256",
      "DH-RSA-AES128-SHA256",
      "DHE-DSS-AES128-SHA256",
      "DHE-RSA-AES128-SHA256",
      "DH-DSS-AES256-SHA256",
      "DH-RSA-AES256-SHA256",
      "DHE-DSS-AES256-SHA256",
      "DHE-RSA-AES256-SHA256",
      "ADH-AES128-SHA256",
      "ADH-AES256-SHA256",
      "AES128-GCM-SHA256",
      "AES256-GCM-SHA384",
      "DHE-RSA-AES128-GCM-SHA256",
      "DHE-RSA-AES256-GCM-SHA384",
      "DH-RSA-AES128-GCM-SHA256",
      "DH-RSA-AES256-GCM-SHA384",
      "DHE-DSS-AES128-GCM-SHA256",
      "DHE-DSS-AES256-GCM-SHA384",
      "DH-DSS-AES128-GCM-SHA256",
      "DH-DSS-AES256-GCM-SHA384",
      "ADH-AES128-GCM-SHA256",
      "ADH-AES256-GCM-SHA384",
      "ECDHE-ECDSA-AES128-SHA256",
      "ECDHE-ECDSA-AES256-SHA384",
      "ECDH-ECDSA-AES128-SHA256",
      "ECDH-ECDSA-AES256-SHA384",
      "ECDHE-RSA-AES128-SHA256",
      "ECDHE-RSA-AES256-SHA384",
      "ECDH-RSA-AES128-SHA256",
      "ECDH-RSA-AES256-SHA384",
      "ECDHE-ECDSA-AES128-GCM-SHA256",
      "ECDHE-ECDSA-AES256-GCM-SHA384",
      "ECDH-ECDSA-AES128-GCM-SHA256",
      "ECDH-ECDSA-AES256-GCM-SHA384",
      "ECDHE-RSA-AES128-GCM-SHA256",
      "ECDHE-RSA-AES256-GCM-SHA384",
      "ECDH-RSA-AES128-GCM-SHA256",
      "ECDH-RSA-AES256-GCM-SHA384",
      "ECDHE-RSA-CHACHA20-POLY1305",
      "ECDHE-ECDSA-CHACHA20-POLY1305",
      "ECDHE-PSK-CHACHA20-POLY1305",
      "TLS_AES_128_GCM_SHA256",
      "TLS_AES_256_GCM_SHA384",
      "TLS_CHACHA20_POLY1305_SHA256",
      "HIGH",
      "!aNULL",
      "!eNULL",
      "!EXPORT",
      "!DES",
      "!RC4",
      "!MD5",
      "!PSK",
      "!SRP",
      "!CAMELLIA"
    ]);
  return _VALID_CIPHERS_SET;
}
function validateCiphers(ciphers, name = "options") {
  if (ciphers !== __intrinsic__undefined && ciphers !== null) {
    validateString(ciphers, `${name}.ciphers`);
    let ciphersSet = getValidCiphersSet(), requested = ciphers.split(":");
    for (let r of requested)
      if (r && !ciphersSet.has(r))
        throw __intrinsic__makeErrorWithCode(248);
  }
}
var SymbolReplace = Symbol.replace, RegExpPrototypeSymbolReplace = __intrinsic__RegExp.prototype[SymbolReplace], RegExpPrototypeExec = __intrinsic__RegExp.prototype.exec, ObjectAssign = Object.assign, StringPrototypeStartsWith = __intrinsic__String.prototype.startsWith, StringPrototypeSlice = __intrinsic__String.prototype.slice, StringPrototypeIncludes = __intrinsic__String.prototype.includes, StringPrototypeSplit = __intrinsic__String.prototype.split, StringPrototypeIndexOf = __intrinsic__String.prototype.indexOf, StringPrototypeSubstring = __intrinsic__String.prototype.substring, StringPrototypeEndsWith = __intrinsic__String.prototype.endsWith, StringFromCharCode = __intrinsic__String.fromCharCode, StringPrototypeCharCodeAt = __intrinsic__String.prototype.charCodeAt, ArrayPrototypeIncludes = __intrinsic__Array.prototype.includes, ArrayPrototypeJoin = __intrinsic__Array.prototype.join, ArrayPrototypeForEach = __intrinsic__Array.prototype.forEach, ArrayPrototypePush = __intrinsic__Array.prototype.push, ArrayPrototypeSome = __intrinsic__Array.prototype.some, ArrayPrototypeReduce = __intrinsic__Array.prototype.reduce, ObjectFreeze = Object.freeze;
function parseCertString() {
  throwNotImplemented("Not implemented");
}
var rejectUnauthorizedDefault = process.env.NODE_TLS_REJECT_UNAUTHORIZED !== "0" && process.env.NODE_TLS_REJECT_UNAUTHORIZED !== "false";
function unfqdn(host) {
  return RegExpPrototypeSymbolReplace.__intrinsic__call(/[.]$/, host, "");
}
function toLowerCase(c) {
  return StringFromCharCode(32 + StringPrototypeCharCodeAt.__intrinsic__call(c, 0));
}
function splitHost(host) {
  return StringPrototypeSplit.__intrinsic__call(RegExpPrototypeSymbolReplace.__intrinsic__call(/[A-Z]/g, unfqdn(host), toLowerCase), ".");
}
function check(hostParts, pattern, wildcards) {
  if (!pattern)
    return !1;
  let patternParts = splitHost(pattern);
  if (hostParts.length !== patternParts.length)
    return !1;
  if (ArrayPrototypeIncludes.__intrinsic__call(patternParts, ""))
    return !1;
  let isBad = (s) => RegExpPrototypeExec.__intrinsic__call(/[^\u0021-\u007F]/u, s) !== null;
  if (ArrayPrototypeSome.__intrinsic__call(patternParts, isBad))
    return !1;
  for (let i = hostParts.length - 1;i > 0; i -= 1)
    if (hostParts[i] !== patternParts[i])
      return !1;
  let hostSubdomain = hostParts[0], patternSubdomain = patternParts[0], patternSubdomainParts = StringPrototypeSplit.__intrinsic__call(patternSubdomain, "*");
  if (patternSubdomainParts.length === 1 || StringPrototypeIncludes.__intrinsic__call(patternSubdomain, "xn--"))
    return hostSubdomain === patternSubdomain;
  if (!wildcards)
    return !1;
  if (patternSubdomainParts.length > 2)
    return !1;
  if (patternParts.length <= 2)
    return !1;
  let { 0: prefix, 1: suffix } = patternSubdomainParts;
  if (prefix.length + suffix.length > hostSubdomain.length)
    return !1;
  if (!StringPrototypeStartsWith.__intrinsic__call(hostSubdomain, prefix))
    return !1;
  if (!StringPrototypeEndsWith.__intrinsic__call(hostSubdomain, suffix))
    return !1;
  return !0;
}
var jsonStringPattern = /^"(?:[^"\\\u0000-\u001f]|\\(?:["\\/bfnrt]|u[0-9a-fA-F]{4}))*"/;
function splitEscapedAltNames(altNames) {
  let result = [], currentToken = "", offset = 0;
  while (offset !== altNames.length) {
    let nextSep = StringPrototypeIndexOf.__intrinsic__call(altNames, ", ", offset), nextQuote = StringPrototypeIndexOf.__intrinsic__call(altNames, '"', offset);
    if (nextQuote !== -1 && (nextSep === -1 || nextQuote < nextSep)) {
      currentToken += StringPrototypeSubstring.__intrinsic__call(altNames, offset, nextQuote);
      let match = RegExpPrototypeExec.__intrinsic__call(jsonStringPattern, StringPrototypeSubstring.__intrinsic__call(altNames, nextQuote));
      if (!match)
        throw __intrinsic__makeErrorWithCode(238);
      currentToken += JSON.parse(match[0]), offset = nextQuote + match[0].length;
    } else if (nextSep !== -1)
      currentToken += StringPrototypeSubstring.__intrinsic__call(altNames, offset, nextSep), ArrayPrototypePush.__intrinsic__call(result, currentToken), currentToken = "", offset = nextSep + 2;
    else
      currentToken += StringPrototypeSubstring.__intrinsic__call(altNames, offset), offset = altNames.length;
  }
  return ArrayPrototypePush.__intrinsic__call(result, currentToken), result;
}
function checkServerIdentity(hostname, cert) {
  let { subject, subjectaltname: altNames } = cert, dnsNames = [], ips = [];
  if (hostname = "" + hostname, altNames) {
    let splitAltNames = StringPrototypeIncludes.__intrinsic__call(altNames, '"') ? splitEscapedAltNames(altNames) : StringPrototypeSplit.__intrinsic__call(altNames, ", ");
    ArrayPrototypeForEach.__intrinsic__call(splitAltNames, (name) => {
      if (StringPrototypeStartsWith.__intrinsic__call(name, "DNS:"))
        ArrayPrototypePush.__intrinsic__call(dnsNames, StringPrototypeSlice.__intrinsic__call(name, 4));
      else if (StringPrototypeStartsWith.__intrinsic__call(name, "IP Address:"))
        ArrayPrototypePush.__intrinsic__call(ips, canonicalizeIP(StringPrototypeSlice.__intrinsic__call(name, 11)));
    });
  }
  let valid = !1, reason = "Unknown reason";
  if (hostname = unfqdn(hostname), net.isIP(hostname)) {
    if (valid = ArrayPrototypeIncludes.__intrinsic__call(ips, canonicalizeIP(hostname)), !valid)
      reason = `IP: ${hostname} is not in the cert's list: ` + ArrayPrototypeJoin.__intrinsic__call(ips, ", ");
  } else if (dnsNames.length > 0 || subject?.CN) {
    let hostParts = splitHost(hostname), wildcard = (pattern) => check(hostParts, pattern, !0);
    if (dnsNames.length > 0) {
      if (valid = ArrayPrototypeSome.__intrinsic__call(dnsNames, wildcard), !valid)
        reason = `Host: ${hostname}. is not in the cert's altnames: ${altNames}`;
    } else {
      let cn = subject.CN;
      if (__intrinsic__Array.isArray(cn))
        valid = ArrayPrototypeSome.__intrinsic__call(cn, wildcard);
      else if (cn)
        valid = wildcard(cn);
      if (!valid)
        reason = `Host: ${hostname}. is not cert's CN: ${cn}`;
    }
  } else
    reason = "Cert does not contain a DNS name";
  if (!valid)
    return __intrinsic__makeErrorWithCode(239, reason, hostname, cert);
}
var InternalSecureContext = class SecureContext {
  context;
  key;
  cert;
  ca;
  passphrase;
  servername;
  secureOptions;
  constructor(options) {
    let context = {};
    if (options) {
      let cert = options.cert;
      if (cert)
        throwOnInvalidTLSArray("options.cert", cert), this.cert = cert;
      let key = options.key;
      if (key)
        throwOnInvalidTLSArray("options.key", key), this.key = key;
      let ca = options.ca;
      if (ca)
        throwOnInvalidTLSArray("options.ca", ca), this.ca = ca;
      let passphrase = options.passphrase;
      if (passphrase && typeof passphrase !== "string")
        __intrinsic__throwTypeError("passphrase argument must be an string");
      this.passphrase = passphrase;
      let servername = options.servername;
      if (servername && typeof servername !== "string")
        __intrinsic__throwTypeError("servername argument must be an string");
      this.servername = servername;
      let secureOptions = options.secureOptions || 0;
      if (secureOptions && typeof secureOptions !== "number")
        __intrinsic__throwTypeError("secureOptions argument must be an number");
      if (this.secureOptions = secureOptions, !__intrinsic__isUndefinedOrNull(options.privateKeyIdentifier)) {
        if (__intrinsic__isUndefinedOrNull(options.privateKeyEngine))
          throw __intrinsic__makeErrorWithCode(119, "options.privateKeyEngine", options.privateKeyEngine);
        else if (typeof options.privateKeyEngine !== "string")
          throw __intrinsic__makeErrorWithCode(118, "options.privateKeyEngine", ["string", "null", "undefined"], options.privateKeyEngine);
        if (typeof options.privateKeyIdentifier !== "string")
          throw __intrinsic__makeErrorWithCode(118, "options.privateKeyIdentifier", ["string", "null", "undefined"], options.privateKeyIdentifier);
      }
    }
    this.context = context;
  }
};
function SecureContext2(options) {
  return new InternalSecureContext(options);
}
function createSecureContext(options) {
  return new SecureContext2(options);
}
function translatePeerCertificate(c) {
  return c;
}
var ksecureContext = Symbol("ksecureContext"), kcheckServerIdentity = Symbol("kcheckServerIdentity"), ksession = Symbol("ksession"), krenegotiationDisabled = Symbol("renegotiationDisabled"), buntls = Symbol.for("::buntls::");
function TLSSocket(socket, options) {
  this[ksecureContext] = __intrinsic__undefined, this.ALPNProtocols = __intrinsic__undefined, this[kcheckServerIdentity] = __intrinsic__undefined, this[ksession] = __intrinsic__undefined, this.alpnProtocol = null, this._secureEstablished = !1, this._rejectUnauthorized = rejectUnauthorizedDefault, this._securePending = !0, this._newSessionPending = __intrinsic__undefined, this._controlReleased = __intrinsic__undefined, this.secureConnecting = !1, this._SNICallback = __intrinsic__undefined, this.servername = __intrinsic__undefined, this.authorized = !1, this.authorizationError, this[krenegotiationDisabled] = __intrinsic__undefined, this.encrypted = !0;
  let isNetSocketOrDuplex = socket instanceof Duplex;
  if (options = isNetSocketOrDuplex ? { ...options, allowHalfOpen: !1 } : options || socket || {}, NetSocket.__intrinsic__call(this, options), this.ciphers = options.ciphers, this.ciphers)
    validateCiphers(options.ciphers);
  if (typeof options === "object") {
    let { ALPNProtocols } = options;
    if (ALPNProtocols)
      convertALPNProtocols(ALPNProtocols, this);
    if (isNetSocketOrDuplex)
      this._handle = socket, this._handle._parentWrap = this;
  }
  this[ksecureContext] = options.secureContext || createSecureContext(options), this.authorized = !1, this.secureConnecting = !0, this._secureEstablished = !1, this._securePending = !0, this[kcheckServerIdentity] = options.checkServerIdentity || checkServerIdentity, this[ksession] = options.session || null;
}
__intrinsic__toClass(TLSSocket, "TLSSocket", NetSocket);
TLSSocket.prototype._start = function _start() {
  this.connect();
};
TLSSocket.prototype.getSession = function getSession() {
  return this._handle?.getSession?.();
};
TLSSocket.prototype.getEphemeralKeyInfo = function getEphemeralKeyInfo() {
  return this._handle?.getEphemeralKeyInfo?.();
};
TLSSocket.prototype.getCipher = function getCipher() {
  return this._handle?.getCipher?.();
};
TLSSocket.prototype.getSharedSigalgs = function getSharedSigalgs() {
  return this._handle?.getSharedSigalgs?.();
};
TLSSocket.prototype.getProtocol = function getProtocol() {
  return this._handle?.getTLSVersion?.();
};
TLSSocket.prototype.getFinished = function getFinished() {
  return this._handle?.getTLSFinishedMessage?.() || __intrinsic__undefined;
};
TLSSocket.prototype.getPeerFinished = function getPeerFinished() {
  return this._handle?.getTLSPeerFinishedMessage?.() || __intrinsic__undefined;
};
TLSSocket.prototype.isSessionReused = function isSessionReused() {
  return this._handle?.isSessionReused?.() ?? !1;
};
TLSSocket.prototype.renegotiate = function renegotiate(options, callback) {
  if (this[krenegotiationDisabled]) {
    let error = __intrinsic__makeErrorWithCode(245);
    if (typeof callback === "function")
      process.nextTick(callback, error);
    return !1;
  }
  let socket = this._handle;
  if (!socket)
    return;
  if (options) {
    let requestCert = !!this._requestCert, rejectUnauthorized = !!this._rejectUnauthorized;
    if (options.requestCert !== __intrinsic__undefined)
      requestCert = !!options.requestCert;
    if (options.rejectUnauthorized !== __intrinsic__undefined)
      rejectUnauthorized = !!options.rejectUnauthorized;
    if (requestCert !== this._requestCert || rejectUnauthorized !== this._rejectUnauthorized)
      socket.setVerifyMode?.(requestCert, rejectUnauthorized), this._requestCert = requestCert, this._rejectUnauthorized = rejectUnauthorized;
  }
  try {
    if (socket.renegotiate?.(), typeof callback === "function")
      this.once("secure", () => callback(null));
    return !0;
  } catch (err) {
    if (typeof callback === "function")
      process.nextTick(callback, err);
    return !1;
  }
};
TLSSocket.prototype.disableRenegotiation = function disableRenegotiation() {
  return this[krenegotiationDisabled] = !0, this._handle?.disableRenegotiation?.();
};
TLSSocket.prototype.getTLSTicket = function getTLSTicket() {
  return this._handle?.getTLSTicket?.();
};
TLSSocket.prototype.exportKeyingMaterial = function exportKeyingMaterial(length, label, context) {
  if (context)
    return this._handle?.exportKeyingMaterial?.(length, label, context);
  return this._handle?.exportKeyingMaterial?.(length, label);
};
TLSSocket.prototype.setMaxSendFragment = function setMaxSendFragment(size) {
  return this._handle?.setMaxSendFragment?.(size) || !1;
};
TLSSocket.prototype.enableTrace = function enableTrace() {};
TLSSocket.prototype.setServername = function setServername(name) {
  if (this.isServer)
    throw __intrinsic__makeErrorWithCode(246);
  this.servername = name, this._handle?.setServername?.(name);
};
TLSSocket.prototype.setSession = function setSession(session) {
  if (this[ksession] = session, typeof session === "string")
    session = __intrinsic__Buffer.from(session, "latin1");
  return this._handle?.setSession?.(session);
};
TLSSocket.prototype.getPeerCertificate = function getPeerCertificate(abbreviated) {
  if (this._handle) {
    let cert = arguments.length < 1 ? this._handle.getPeerCertificate?.() : this._handle.getPeerCertificate?.(abbreviated);
    if (cert)
      return translatePeerCertificate(cert);
    return {};
  }
  return null;
};
TLSSocket.prototype.getCertificate = function getCertificate() {
  let cert = this._handle?.getCertificate?.();
  if (cert)
    return translatePeerCertificate(cert);
};
TLSSocket.prototype.getPeerX509Certificate = function getPeerX509Certificate() {
  return this._handle?.getPeerX509Certificate?.();
};
TLSSocket.prototype.getX509Certificate = function getX509Certificate() {
  return this._handle?.getX509Certificate?.();
};
TLSSocket.prototype[buntls] = function(port, host) {
  return {
    socket: this._handle,
    ALPNProtocols: this.ALPNProtocols,
    serverName: this.servername || host || "localhost",
    checkServerIdentity: this[kcheckServerIdentity],
    session: this[ksession],
    rejectUnauthorized: this._rejectUnauthorized,
    requestCert: this._requestCert,
    ciphers: this.ciphers,
    ...this[ksecureContext]
  };
};
var CLIENT_RENEG_LIMIT = 3, CLIENT_RENEG_WINDOW = 600;
function Server(options, secureConnectionListener) {
  if (!(this instanceof Server))
    return new Server(options, secureConnectionListener);
  NetServer.__intrinsic__apply(this, [options, secureConnectionListener]), this.key = __intrinsic__undefined, this.cert = __intrinsic__undefined, this.ca = __intrinsic__undefined, this.passphrase = __intrinsic__undefined, this.secureOptions = __intrinsic__undefined, this._rejectUnauthorized = rejectUnauthorizedDefault, this._requestCert = __intrinsic__undefined, this.servername = __intrinsic__undefined, this.ALPNProtocols = __intrinsic__undefined;
  let contexts = null;
  this.addContext = function(hostname, context) {
    if (typeof hostname !== "string")
      __intrinsic__throwTypeError("hostname must be a string");
    if (!(context instanceof InternalSecureContext))
      context = createSecureContext(context);
    if (this._handle)
      addServerName(this._handle, hostname, context);
    else {
      if (!contexts)
        contexts = /* @__PURE__ */ new Map;
      contexts.set(hostname, context);
    }
  }, this.setSecureContext = function(options2) {
    if (options2 instanceof InternalSecureContext)
      options2 = options2.context;
    if (options2) {
      let { ALPNProtocols } = options2;
      if (ALPNProtocols)
        convertALPNProtocols(ALPNProtocols, this);
      let cert = options2.cert;
      if (cert)
        throwOnInvalidTLSArray("options.cert", cert), this.cert = cert;
      let key = options2.key;
      if (key)
        throwOnInvalidTLSArray("options.key", key), this.key = key;
      let ca = options2.ca;
      if (ca)
        throwOnInvalidTLSArray("options.ca", ca), this.ca = ca;
      let passphrase = options2.passphrase;
      if (passphrase && typeof passphrase !== "string")
        throw __intrinsic__makeErrorWithCode(118, "options.passphrase", "string", passphrase);
      this.passphrase = passphrase;
      let servername = options2.servername;
      if (servername && typeof servername !== "string")
        throw __intrinsic__makeErrorWithCode(118, "options.servername", "string", servername);
      this.servername = servername;
      let secureOptions = options2.secureOptions || 0;
      if (secureOptions && typeof secureOptions !== "number")
        throw __intrinsic__makeErrorWithCode(118, "options.secureOptions", "number", secureOptions);
      this.secureOptions = secureOptions;
      let requestCert = options2.requestCert || !1;
      if (requestCert)
        this._requestCert = requestCert;
      else
        this._requestCert = __intrinsic__undefined;
      let rejectUnauthorized = options2.rejectUnauthorized;
      if (typeof rejectUnauthorized < "u")
        this._rejectUnauthorized = rejectUnauthorized;
      else
        this._rejectUnauthorized = rejectUnauthorizedDefault;
      if (typeof options2.ciphers < "u") {
        if (typeof options2.ciphers !== "string")
          throw __intrinsic__makeErrorWithCode(118, "options.ciphers", "string", options2.ciphers);
        validateCiphers(options2.ciphers), this.ciphers = options2.ciphers;
      }
    }
  }, Server.prototype.getTicketKeys = function() {
    throw Error("Not implented in Bun yet");
  }, Server.prototype.setTicketKeys = function() {
    throw Error("Not implented in Bun yet");
  }, this[buntls] = function(port, host, isClient) {
    return [
      {
        serverName: this.servername || host || "localhost",
        key: this.key,
        cert: this.cert,
        ca: this.ca,
        passphrase: this.passphrase,
        secureOptions: this.secureOptions,
        rejectUnauthorized: this._rejectUnauthorized,
        requestCert: isClient ? !0 : this._requestCert,
        ALPNProtocols: this.ALPNProtocols,
        clientRenegotiationLimit: CLIENT_RENEG_LIMIT,
        clientRenegotiationWindow: CLIENT_RENEG_WINDOW,
        contexts,
        ciphers: this.ciphers
      },
      TLSSocket
    ];
  }, this.setSecureContext(options);
}
__intrinsic__toClass(Server, "Server", NetServer);
function createServer(options, connectionListener) {
  return new Server(options, connectionListener);
}
var DEFAULT_ECDH_CURVE = "auto", DEFAULT_MIN_VERSION = "TLSv1.2", DEFAULT_MAX_VERSION = "TLSv1.3";
function normalizeConnectArgs(listArgs) {
  let args = net._normalizeArgs(listArgs);
  if (listArgs[1] !== null && typeof listArgs[1] === "object")
    ObjectAssign(args[0], listArgs[1]);
  else if (listArgs[2] !== null && typeof listArgs[2] === "object")
    ObjectAssign(args[0], listArgs[2]);
  return args;
}
function connect(...args) {
  let normal = normalizeConnectArgs(args), options = normal[0], { ALPNProtocols } = options;
  if (ALPNProtocols)
    convertALPNProtocols(ALPNProtocols, options);
  return new TLSSocket(options).connect(normal);
}
function getCiphers() {
  return getDefaultCiphers().split(":");
}
function convertProtocols(protocols) {
  let lens = new __intrinsic__Array(protocols.length), buff = __intrinsic__Buffer.allocUnsafe(ArrayPrototypeReduce.__intrinsic__call(protocols, (p, c, i) => {
    let len = __intrinsic__Buffer.byteLength(c);
    if (len > 255)
      __intrinsic__throwRangeError(`The byte length of the protocol at index ${i} exceeds the maximum length. It must be <= 255. Received ${len}`);
    return lens[i] = len, p + 1 + len;
  }, 0)), offset = 0;
  for (let i = 0, c = protocols.length;i < c; i++)
    buff[offset++] = lens[i], buff.write(protocols[i], offset), offset += lens[i];
  return buff;
}
function convertALPNProtocols(protocols, out) {
  if (__intrinsic__Array.isArray(protocols))
    out.ALPNProtocols = convertProtocols(protocols);
  else if (isTypedArray(protocols))
    out.ALPNProtocols = __intrinsic__Buffer.from(protocols);
  else if (isArrayBufferView(protocols))
    out.ALPNProtocols = __intrinsic__Buffer.from(protocols.buffer.slice(protocols.byteOffset, protocols.byteOffset + protocols.byteLength));
  else if (__intrinsic__Buffer.isBuffer(protocols))
    out.ALPNProtocols = protocols;
}
var bundledRootCertificates;
function cacheBundledRootCertificates() {
  return bundledRootCertificates ||= getBundledRootCertificates(), bundledRootCertificates;
}
var getUseSystemCA = __intrinsic__lazy(81), defaultCACertificates;
function cacheDefaultCACertificates() {
  if (defaultCACertificates)
    return defaultCACertificates;
  defaultCACertificates = [];
  let bundled = cacheBundledRootCertificates();
  for (let i = 0;i < bundled.length; ++i)
    ArrayPrototypePush.__intrinsic__call(defaultCACertificates, bundled[i]);
  if (getUseSystemCA() || process.env.NODE_USE_SYSTEM_CA === "1") {
    let system = cacheSystemCACertificates();
    for (let i = 0;i < system.length; ++i)
      ArrayPrototypePush.__intrinsic__call(defaultCACertificates, system[i]);
  }
  if (process.env.NODE_EXTRA_CA_CERTS) {
    let extra = cacheExtraCACertificates();
    for (let i = 0;i < extra.length; ++i)
      ArrayPrototypePush.__intrinsic__call(defaultCACertificates, extra[i]);
  }
  return ObjectFreeze(defaultCACertificates), defaultCACertificates;
}
var systemCACertificates;
function cacheSystemCACertificates() {
  return systemCACertificates ||= getSystemCACertificates(), systemCACertificates;
}
var extraCACertificates;
function cacheExtraCACertificates() {
  return extraCACertificates ||= getExtraCACertificates(), extraCACertificates;
}
function getCACertificates(type = "default") {
  switch (validateString(type, "type"), type) {
    case "default":
      return cacheDefaultCACertificates();
    case "bundled":
      return cacheBundledRootCertificates();
    case "system":
      return cacheSystemCACertificates();
    case "extra":
      return cacheExtraCACertificates();
    default:
      throw __intrinsic__makeErrorWithCode(119, "type", type);
  }
}
function tlsCipherFilter(a) {
  return !a.startsWith("TLS_");
}
function getDefaultCiphers() {
  let ciphers = getTLSDefaultCiphers();
  return `TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256:TLS_AES_128_GCM_SHA256${ciphers ? ":" + ciphers : ""}`;
}
$ = {
  CLIENT_RENEG_LIMIT,
  CLIENT_RENEG_WINDOW,
  connect,
  convertALPNProtocols,
  createSecureContext,
  createServer,
  get DEFAULT_CIPHERS() {
    return getDefaultCiphers();
  },
  set DEFAULT_CIPHERS(value) {
    if (value)
      validateCiphers(value, "value"), value = value.split(":").filter(tlsCipherFilter).join(":");
    setTLSDefaultCiphers(value);
  },
  DEFAULT_ECDH_CURVE,
  DEFAULT_MAX_VERSION,
  DEFAULT_MIN_VERSION,
  getCiphers,
  parseCertString,
  SecureContext: SecureContext2,
  Server,
  TLSSocket,
  checkServerIdentity,
  get rootCertificates() {
    return cacheBundledRootCertificates();
  },
  getCACertificates
};
$$EXPORT$$($).$$EXPORT_END$$;
