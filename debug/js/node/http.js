(function (){"use strict";// build/debug/tmp_modules/node/http.ts
var $;
var { validateInteger } = @getInternalField(@internalModuleRegistry, 68) || @createInternalModuleById(68);
var { Agent, globalAgent } = @getInternalField(@internalModuleRegistry, 71) || @createInternalModuleById(71);
var { ClientRequest } = @getInternalField(@internalModuleRegistry, 72) || @createInternalModuleById(72);
var { validateHeaderName, validateHeaderValue, parsers } = @getInternalField(@internalModuleRegistry, 73) || @createInternalModuleById(73);
var { IncomingMessage } = @getInternalField(@internalModuleRegistry, 74) || @createInternalModuleById(74);
var { OutgoingMessage } = @getInternalField(@internalModuleRegistry, 75) || @createInternalModuleById(75);
var { Server, ServerResponse } = @getInternalField(@internalModuleRegistry, 76) || @createInternalModuleById(76);
var { METHODS, STATUS_CODES, setMaxHTTPHeaderSize, getMaxHTTPHeaderSize } = @getInternalField(@internalModuleRegistry, 25) || @createInternalModuleById(25);
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
return $})
