(function (){"use strict";// build/debug/tmp_modules/node/https.ts
var $;
var http = @getInternalField(@internalModuleRegistry, 99) || @createInternalModuleById(99);
var { urlToHttpOptions } = @getInternalField(@internalModuleRegistry, 63) || @createInternalModuleById(63);
var ArrayPrototypeShift = @Array.prototype.shift;
var ObjectAssign = Object.assign;
var ArrayPrototypeUnshift = @Array.prototype.unshift;
function request(...args) {
  let options = {};
  if (typeof args[0] === "string") {
    const urlStr = ArrayPrototypeShift.@call(args);
    options = urlToHttpOptions(new URL(urlStr));
  } else if (args[0] instanceof URL) {
    options = urlToHttpOptions(ArrayPrototypeShift.@call(args));
  }
  if (args[0] && typeof args[0] !== "function") {
    ObjectAssign.@call(null, options, ArrayPrototypeShift.@call(args));
  }
  options._defaultAgent = https.globalAgent;
  ArrayPrototypeUnshift.@call(args, options);
  return new http.ClientRequest(...args);
}
function get(input, options, cb) {
  const req = request(input, options, cb);
  req.end();
  return req;
}
function Agent(options) {
  if (!(this instanceof Agent))
    return new Agent(options);
  http.Agent.@apply(this, [options]);
  this.defaultPort = 443;
  this.protocol = "https:";
  this.maxCachedSessions = this.options.maxCachedSessions;
  if (this.maxCachedSessions === @undefined)
    this.maxCachedSessions = 100;
}
@toClass(Agent, "Agent", http.Agent);
Agent.prototype.createConnection = http.createConnection;
var https = {
  Agent,
  globalAgent: new Agent({ keepAlive: true, scheduling: "lifo", timeout: 5000 }),
  Server: http.Server,
  createServer: http.createServer,
  get,
  request
};
$ = https;
return $})
