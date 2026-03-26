// @bun
// build/debug/tmp_modules/node/domain.ts
var $;
var EventEmitter;
var ObjectDefineProperty = Object.defineProperty;
var domain = {};
domain.createDomain = domain.create = function() {
  if (!EventEmitter) {
    EventEmitter = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 96) || __intrinsic__createInternalModuleById(96);
  }
  var d = new EventEmitter;
  function emitError(e) {
    e ||= __intrinsic__makeErrorWithCode(252);
    if (typeof e === "object") {
      e.domainEmitter = this;
      ObjectDefineProperty(e, "domain", {
        __proto__: null,
        configurable: true,
        enumerable: false,
        value: domain,
        writable: true
      });
      e.domainThrown = false;
    }
    d.emit("error", e);
  }
  d.add = function(emitter) {
    emitter.on("error", emitError);
  };
  d.remove = function(emitter) {
    emitter.removeListener("error", emitError);
  };
  d.bind = function(fn) {
    return function() {
      var args = __intrinsic__Array.prototype.slice.__intrinsic__call(arguments);
      try {
        fn.__intrinsic__apply(null, args);
      } catch (err) {
        emitError(err);
      }
    };
  };
  d.intercept = function(fn) {
    return function(err) {
      if (err) {
        emitError(err);
      } else {
        var args = __intrinsic__Array.prototype.slice.__intrinsic__call(arguments, 1);
        try {
          fn.__intrinsic__apply(null, args);
        } catch (err2) {
          emitError(err2);
        }
      }
    };
  };
  d.run = function(fn) {
    try {
      fn();
    } catch (err) {
      emitError(err);
    }
    return this;
  };
  d.dispose = function() {
    this.removeAllListeners();
    return this;
  };
  d.enter = d.exit = function() {
    return this;
  };
  return d;
};
$ = domain;
$$EXPORT$$($).$$EXPORT_END$$;
