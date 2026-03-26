(function (){"use strict";// build/debug/tmp_modules/internal/shared.ts
var $;
var { SafeArrayIterator } = @getInternalField(@internalModuleRegistry, 30) || @createInternalModuleById(30);
var ObjectFreeze = Object.freeze;

class NotImplementedError extends Error {
  code;
  constructor(feature, issue, extra) {
    super(feature + " is not yet implemented in Bun." + (issue ? " Track the status & thumbs up the issue: https://github.com/oven-sh/bun/issues/" + issue : "") + (extra ? ". " + extra : ""));
    this.name = "NotImplementedError";
    this.code = "ERR_NOT_IMPLEMENTED";
    hideFromStack(NotImplementedError);
  }
  get ["constructor"]() {
    return Error;
  }
}
function throwNotImplemented(feature, issue, extra) {
  hideFromStack(throwNotImplemented);
  throw new NotImplementedError(feature, issue, extra);
}
function hideFromStack(...fns) {
  for (const fn of fns) {
    Object.defineProperty(fn, "name", {
      value: "::bunternal::"
    });
  }
}
var warned;
function warnNotImplementedOnce(feature, issue) {
  if (!warned) {
    warned = new Set;
  }
  if (warned.has(feature)) {
    return;
  }
  warned.add(feature);
  console.warn(new NotImplementedError(feature, issue));
}
var util;

class ExceptionWithHostPort extends Error {
  errno;
  syscall;
  port;
  address;
  constructor(err, syscall, address, port) {
    util ??= @getInternalField(@internalModuleRegistry, 126) || @createInternalModuleById(126);
    const code = util.getSystemErrorName(err);
    let details = "";
    if (port && port > 0) {
      details = ` ${address}:${port}`;
    } else if (address) {
      details = ` ${address}`;
    }
    super(`${syscall} ${code}${details}`);
    this.errno = err;
    this.code = code;
    this.syscall = syscall;
    this.address = address;
    if (port) {
      this.port = port;
    }
  }
  get ["constructor"]() {
    return Error;
  }
}

class NodeAggregateError extends AggregateError {
  constructor(errors, message) {
    super(new SafeArrayIterator(errors), message);
    this.code = errors[0]?.code;
  }
  get ["constructor"]() {
    return AggregateError;
  }
}

class ConnResetException extends Error {
  constructor(msg) {
    super(msg);
    this.code = "ECONNRESET";
  }
  get ["constructor"]() {
    return Error;
  }
}

class ErrnoException extends Error {
  errno;
  syscall;
  constructor(err, syscall, original) {
    util ??= @getInternalField(@internalModuleRegistry, 126) || @createInternalModuleById(126);
    const code = util.getSystemErrorName(err);
    const message = original ? `${syscall} ${code} ${original}` : `${syscall} ${code}`;
    super(message);
    this.errno = err;
    this.code = code;
    this.syscall = syscall;
  }
  get ["constructor"]() {
    return Error;
  }
}
function once(callback, { preserveReturnValue = false } = kEmptyObject) {
  let called = false;
  let returnValue;
  return function(...args) {
    if (called)
      return returnValue;
    called = true;
    const result = callback.@apply(this, args);
    returnValue = preserveReturnValue ? result : @undefined;
    return result;
  };
}
var kEmptyObject = ObjectFreeze(Object.create(null));
function getLazy(initializer) {
  let value;
  let initialized = false;
  return function() {
    if (initialized)
      return value;
    value = initializer();
    initialized = true;
    return value;
  };
}
$ = {
  NotImplementedError,
  throwNotImplemented,
  hideFromStack,
  warnNotImplementedOnce,
  ExceptionWithHostPort,
  NodeAggregateError,
  ConnResetException,
  ErrnoException,
  once,
  getLazy,
  kHandle: Symbol("kHandle"),
  kAutoDestroyed: Symbol("kAutoDestroyed"),
  kResistStopPropagation: Symbol("kResistStopPropagation"),
  kWeakHandler: Symbol("kWeak"),
  kGetNativeReadableProto: Symbol("kGetNativeReadableProto"),
  kEmptyObject
};
return $})
