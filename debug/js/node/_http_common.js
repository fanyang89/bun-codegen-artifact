(function (){"use strict";// build/debug/tmp_modules/node/_http_common.ts
var $;
var { checkIsHttpToken } = @getInternalField(@internalModuleRegistry, 68) || @createInternalModuleById(68);
var FreeList = @getInternalField(@internalModuleRegistry, 19) || @createInternalModuleById(19);
var { methods, allMethods, HTTPParser } = process.binding("http_parser");
var incoming = @getInternalField(@internalModuleRegistry, 74) || @createInternalModuleById(74);
var { IncomingMessage, readStart, readStop } = incoming;
var RegExpPrototypeExec = @RegExp.prototype.exec;
var headerCharRegex;
function checkInvalidHeaderChar(val) {
  if (!headerCharRegex) {
    headerCharRegex = /[^\t\x20-\x7e\x80-\xff]/;
  }
  return RegExpPrototypeExec.@call(headerCharRegex, val) !== null;
}
var validateHeaderName = (name, label) => {
  if (typeof name !== "string" || !name || !checkIsHttpToken(name)) {
    throw @makeErrorWithCode(127, label || "Header name", name);
  }
};
var validateHeaderValue = (name, value) => {
  if (value === @undefined) {
    throw @makeErrorWithCode(71, value, name);
  }
  if (checkInvalidHeaderChar(value)) {
    throw @makeErrorWithCode(121, "header content", name);
  }
};
var insecureHTTPParser = false;
var kIncomingMessage = Symbol("IncomingMessage");
var kOnMessageBegin = HTTPParser.kOnMessageBegin | 0;
var kOnHeaders = HTTPParser.kOnHeaders | 0;
var kOnHeadersComplete = HTTPParser.kOnHeadersComplete | 0;
var kOnBody = HTTPParser.kOnBody | 0;
var kOnMessageComplete = HTTPParser.kOnMessageComplete | 0;
var kOnExecute = HTTPParser.kOnExecute | 0;
var kOnTimeout = HTTPParser.kOnTimeout | 0;
var MAX_HEADER_PAIRS = 2000;
function parserOnHeaders(headers, url) {
  if (this.maxHeaderPairs <= 0 || this._headers.length < this.maxHeaderPairs) {
    this._headers.push(...headers);
  }
  this._url += url;
}
function parserOnHeadersComplete(versionMajor, versionMinor, headers, method, url, statusCode, statusMessage, upgrade, shouldKeepAlive) {
  const parser = this;
  const { socket } = parser;
  if (headers === @undefined) {
    headers = parser._headers;
    parser._headers = [];
  }
  if (url === @undefined) {
    url = parser._url;
    parser._url = "";
  }
  const ParserIncomingMessage = socket?.server?.[kIncomingMessage] || IncomingMessage;
  const incoming2 = parser.incoming = new ParserIncomingMessage(socket);
  incoming2.httpVersionMajor = versionMajor;
  incoming2.httpVersionMinor = versionMinor;
  incoming2.httpVersion = `${versionMajor}.${versionMinor}`;
  incoming2.joinDuplicateHeaders = socket?.server?.joinDuplicateHeaders || parser.joinDuplicateHeaders;
  incoming2.url = url;
  incoming2.upgrade = upgrade;
  let n = headers.length;
  if (parser.maxHeaderPairs > 0)
    n = Math.min(n, parser.maxHeaderPairs);
  incoming2._addHeaderLines(headers, n);
  if (typeof method === "number") {
    incoming2.method = allMethods[method];
  } else {
    incoming2.statusCode = statusCode;
    incoming2.statusMessage = statusMessage;
  }
  return parser.onIncoming(incoming2, shouldKeepAlive);
}
function parserOnBody(b) {
  const stream = this.incoming;
  if (stream === null)
    return;
  if (!stream._dumped) {
    const ret = stream.push(b);
    if (!ret)
      readStop(this.socket);
  }
}
function parserOnMessageComplete() {
  const parser = this;
  const stream = parser.incoming;
  if (stream !== null) {
    stream.complete = true;
    const headers = parser._headers;
    if (headers.length) {
      stream._addHeaderLines(headers, headers.length);
      parser._headers = [];
      parser._url = "";
    }
    stream.push(null);
  }
  readStart(parser.socket);
}
var parsers = new FreeList("parsers", 1000, function parsersCb() {
  const parser = new HTTPParser;
  cleanParser(parser);
  parser[kOnHeaders] = parserOnHeaders;
  parser[kOnHeadersComplete] = parserOnHeadersComplete;
  parser[kOnBody] = parserOnBody;
  parser[kOnMessageComplete] = parserOnMessageComplete;
  return parser;
});
function closeParserInstance(parser) {
  parser.close();
}
function freeParser(parser, req, socket) {
  if (parser) {
    if (parser._consumed)
      parser.unconsume();
    cleanParser(parser);
    parser.remove();
    if (parsers.free(parser) === false) {
      setImmediate(closeParserInstance, parser);
    } else {
      parser.free();
    }
  }
  if (req) {
    req.parser = null;
  }
  if (socket) {
    socket.parser = null;
  }
}
function cleanParser(parser) {
  parser._headers = [];
  parser._url = "";
  parser.socket = null;
  parser.incoming = null;
  parser.outgoing = null;
  parser.maxHeaderPairs = MAX_HEADER_PAIRS;
  parser[kOnMessageBegin] = null;
  parser[kOnExecute] = null;
  parser[kOnTimeout] = null;
  parser._consumed = false;
  parser.onIncoming = null;
  parser.joinDuplicateHeaders = null;
}
function prepareError(err, parser, rawPacket) {
  err.rawPacket = rawPacket || parser.getCurrentBuffer();
  if (typeof err.reason === "string")
    err.message = `Parse Error: ${err.reason}`;
}
var warnedLenient = false;
function isLenient() {
  if (insecureHTTPParser && !warnedLenient) {
    warnedLenient = true;
    process.emitWarning("Using insecure HTTP parsing");
  }
  return insecureHTTPParser;
}
$ = {
  validateHeaderName,
  validateHeaderValue,
  _checkIsHttpToken: checkIsHttpToken,
  _checkInvalidHeaderChar: checkInvalidHeaderChar,
  chunkExpression: /(?:^|\W)chunked(?:$|\W)/i,
  continueExpression: /(?:^|\W)100-continue(?:$|\W)/i,
  CRLF: `\r
`,
  freeParser,
  methods,
  parsers,
  kIncomingMessage,
  HTTPParser,
  isLenient,
  prepareError
};
return $})
