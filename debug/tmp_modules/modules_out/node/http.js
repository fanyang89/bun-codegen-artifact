// @bun
// build/debug/tmp_modules/node/http.ts
var $;
var { validateInteger } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 68) || __intrinsic__createInternalModuleById(68);
var { Agent, globalAgent } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 71) || __intrinsic__createInternalModuleById(71);
var { ClientRequest } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 72) || __intrinsic__createInternalModuleById(72);
var { validateHeaderName, validateHeaderValue, parsers } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 73) || __intrinsic__createInternalModuleById(73);
var { IncomingMessage } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 74) || __intrinsic__createInternalModuleById(74);
var { OutgoingMessage } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 75) || __intrinsic__createInternalModuleById(75);
var { Server, ServerResponse } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 76) || __intrinsic__createInternalModuleById(76);
var { METHODS, STATUS_CODES, setMaxHTTPHeaderSize, getMaxHTTPHeaderSize } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 25) || __intrinsic__createInternalModuleById(25);
var { WebSocket, CloseEvent, MessageEvent } = globalThis;
function createServer(options, callback) {
  return new Server(options, callback);
}
function request(url, options, cb) {
  return new ClientRequest(url, options, cb);
}
function get(url, options, cb) {
  const req = request(url, options, cb);
  req.end();
  return req;
}
var http_exports = {
  Agent,
  Server,
  METHODS,
  STATUS_CODES,
  createServer,
  ServerResponse,
  IncomingMessage,
  request,
  get,
  get maxHeaderSize() {
    return getMaxHTTPHeaderSize();
  },
  set maxHeaderSize(value) {
    setMaxHTTPHeaderSize(value);
  },
  validateHeaderName,
  validateHeaderValue,
  setMaxIdleHTTPParsers(max) {
    validateInteger(max, "max", 1);
    parsers.max = max;
  },
  globalAgent,
  ClientRequest,
  OutgoingMessage,
  WebSocket,
  CloseEvent,
  MessageEvent
};
$ = http_exports;
$$EXPORT$$($).$$EXPORT_END$$;
