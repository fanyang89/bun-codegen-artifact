// @bun
// build/debug/tmp_modules/node/vm.ts
var $;
var { SafePromiseAllReturnArrayLike } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 30) || __intrinsic__createInternalModuleById(30);
var { throwNotImplemented } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 32) || __intrinsic__createInternalModuleById(32);
var {
  validateObject,
  validateString,
  validateUint32,
  validateBoolean,
  validateInt32,
  validateBuffer,
  validateFunction
} = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 68) || __intrinsic__createInternalModuleById(68);
var util = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 126) || __intrinsic__createInternalModuleById(126);
var vm = __intrinsic__lazy(88);
var ObjectFreeze = Object.freeze;
var ObjectDefineProperty = Object.defineProperty;
var ArrayPrototypeMap = __intrinsic__Array.prototype.map;
var PromisePrototypeThen = __intrinsic__Promise.prototype.__intrinsic__then;
var PromiseResolve = __intrinsic__Promise.__intrinsic__resolve.bind(__intrinsic__Promise);
var ObjectPrototypeHasOwnProperty = Object.prototype.hasOwnProperty;
var ObjectGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var ObjectSetPrototypeOf = Object.setPrototypeOf;
var ObjectGetPrototypeOf = Object.getPrototypeOf;
var SymbolToStringTag = Symbol.toStringTag;
var ArrayIsArray = __intrinsic__Array.isArray;
var ArrayPrototypeSome = __intrinsic__Array.prototype.some;
var ArrayPrototypeForEach = __intrinsic__Array.prototype.forEach;
var ArrayPrototypeIndexOf = __intrinsic__Array.prototype.indexOf;
var kPerContextModuleId = Symbol("kPerContextModuleId");
var kNative = Symbol("kNative");
var kContext = Symbol("kContext");
var kLink = Symbol("kLink");
var kDependencySpecifiers = Symbol("kDependencySpecifiers");
var kNoError = Symbol("kNoError");
var kEmptyObject = Object.freeze(Object.create(null));
var {
  Script,
  Module: ModuleNative,
  createContext,
  isContext,
  compileFunction,
  isModuleNamespaceObject,
  kUnlinked,
  kLinked,
  kEvaluated,
  kErrored,
  DONT_CONTEXTIFY,
  USE_MAIN_CONTEXT_DEFAULT_LOADER
} = vm;
function runInContext(code, context, options) {
  validateContext(context);
  if (typeof options === "string") {
    options = { filename: options };
  }
  return new Script(code, options).runInContext(context, options);
}
function runInThisContext(code, options) {
  if (typeof options === "string") {
    options = { filename: options };
  }
  return new Script(code, options).runInThisContext(options);
}
function runInNewContext(code, context, options) {
  if (context !== __intrinsic__undefined && (typeof context !== "object" || context === null)) {
    validateContext(context);
  }
  if (typeof options === "string") {
    options = { filename: options };
  }
  context = createContext(context, options);
  return createScript(code, options).runInNewContext(context, options);
}
function createScript(code, options) {
  return new Script(code, options);
}
function measureMemory() {
  throwNotImplemented("node:vm measureMemory");
}
function validateContext(contextifiedObject) {
  if (contextifiedObject !== constants.DONT_CONTEXTIFY && !isContext(contextifiedObject)) {
    const error = new Error('The "contextifiedObject" argument must be an vm.Context');
    error.code = "ERR_INVALID_ARG_TYPE";
    error.name = "TypeError";
    throw error;
  }
}
function validateModule(module, typename = "Module") {
  if (!isModule(module)) {
    const error = new Error('The "this" argument must be an instance of ' + typename);
    error.code = "ERR_INVALID_ARG_TYPE";
    error.name = "TypeError";
    throw error;
  }
}
var globalModuleId = 0;
var defaultModuleName = "vm:module";

class Module {
  constructor(options) {
    if (new.target === Module) {
      __intrinsic__throwTypeError("Module is not a constructor");
    }
    const { context, sourceText, syntheticExportNames, syntheticEvaluationSteps } = options;
    if (context !== __intrinsic__undefined) {
      validateObject(context, "context");
      if (!isContext(context)) {
        throw __intrinsic__makeErrorWithCode(118, "options.context", "vm.Context", context);
      }
    }
    let { identifier } = options;
    if (identifier !== __intrinsic__undefined) {
      validateString(identifier, "options.identifier");
    } else if (context === __intrinsic__undefined) {
      identifier = `${defaultModuleName}(${globalModuleId++})`;
    } else if (context[kPerContextModuleId] !== __intrinsic__undefined) {
      const curId = context[kPerContextModuleId];
      identifier = `${defaultModuleName}(${curId})`;
      context[kPerContextModuleId] += 1;
    } else {
      identifier = `${defaultModuleName}(0)`;
      ObjectDefineProperty(context, kPerContextModuleId, {
        __proto__: null,
        value: 1,
        writable: true,
        enumerable: false,
        configurable: true
      });
    }
    if (sourceText !== __intrinsic__undefined) {
      this[kNative] = new ModuleNative(identifier, context, sourceText, options.lineOffset, options.columnOffset, options.cachedData, options.initializeImportMeta, this, options.importModuleDynamically ? importModuleDynamicallyWrap(options.importModuleDynamically) : __intrinsic__undefined);
    } else {
      $assert(syntheticEvaluationSteps, "syntheticEvaluationSteps");
      this[kNative] = new ModuleNative(identifier, context, syntheticExportNames, syntheticEvaluationSteps, this);
    }
    this[kContext] = context;
  }
  get identifier() {
    validateModule(this);
    return this[kNative].identifier;
  }
  get context() {
    validateModule(this);
    return this[kContext];
  }
  get status() {
    validateModule(this);
    return this[kNative].getStatus();
  }
  get namespace() {
    validateModule(this);
    if (this[kNative].getStatusCode() < kLinked) {
      throw __intrinsic__makeErrorWithCode(292, "must not be unlinked or linking");
    }
    return this[kNative].getNamespace();
  }
  get error() {
    validateModule(this);
    if (this[kNative].getStatusCode() !== kErrored) {
      throw __intrinsic__makeErrorWithCode(292, "must be errored");
    }
    return this[kNative].getError();
  }
  async link(linker) {
    validateModule(this);
    validateFunction(linker, "linker");
    if (this[kNative].getStatusCode() === kLinked) {
      throw __intrinsic__makeErrorWithCode(293);
    }
    if (this[kNative].getStatusCode() !== kUnlinked) {
      throw __intrinsic__makeErrorWithCode(292, "must be unlinked");
    }
    await this[kLink](linker);
    this[kNative].instantiate();
  }
  async evaluate(options = kEmptyObject) {
    validateModule(this);
    validateObject(options, "options");
    let timeout = options.timeout;
    if (timeout === __intrinsic__undefined) {
      timeout = -1;
    } else {
      validateUint32(timeout, "options.timeout", true);
    }
    const { breakOnSigint = false } = options;
    validateBoolean(breakOnSigint, "options.breakOnSigint");
    const status = this[kNative].getStatusCode();
    if (status !== kLinked && status !== kEvaluated && status !== kErrored) {
      throw __intrinsic__makeErrorWithCode(292, "must be one of linked, evaluated, or errored");
    }
    await this[kNative].evaluate(timeout, breakOnSigint);
  }
  [util.inspect.custom](depth, options) {
    validateModule(this);
    if (typeof depth === "number" && depth < 0)
      return this;
    const constructor = getConstructorOf(this) || Module;
    const o = { __proto__: { constructor } };
    o.status = this.status;
    o.identifier = this.identifier;
    o.context = this.context;
    ObjectSetPrototypeOf(o, ObjectGetPrototypeOf(this));
    ObjectDefineProperty(o, SymbolToStringTag, {
      __proto__: null,
      value: constructor.name,
      configurable: true
    });
    return util.inspect(o, { ...options, customInspect: false });
  }
}

class SourceTextModule extends Module {
  #error = kNoError;
  #statusOverride;
  constructor(sourceText, options = kEmptyObject) {
    validateString(sourceText, "sourceText");
    validateObject(options, "options");
    const {
      lineOffset = 0,
      columnOffset = 0,
      initializeImportMeta,
      importModuleDynamically,
      context,
      identifier,
      cachedData
    } = options;
    validateInt32(lineOffset, "options.lineOffset");
    validateInt32(columnOffset, "options.columnOffset");
    if (initializeImportMeta !== __intrinsic__undefined) {
      validateFunction(initializeImportMeta, "options.initializeImportMeta");
    }
    if (importModuleDynamically !== __intrinsic__undefined) {
      validateFunction(importModuleDynamically, "options.importModuleDynamically");
    }
    if (cachedData !== __intrinsic__undefined) {
      validateBuffer(cachedData, "options.cachedData");
    }
    super({
      sourceText,
      context,
      identifier,
      lineOffset,
      columnOffset,
      cachedData,
      initializeImportMeta,
      importModuleDynamically
    });
    this[kDependencySpecifiers] = __intrinsic__undefined;
  }
  async[kLink](linker) {
    validateModule(this, "SourceTextModule");
    if (this[kNative].getStatusCode() >= kLinked) {
      throw __intrinsic__makeErrorWithCode(293);
    }
    this.#statusOverride = "linking";
    const moduleRequests = this[kNative].createModuleRecord();
    const specifiers = __intrinsic__Array(moduleRequests.length);
    const modulePromises = __intrinsic__Array(moduleRequests.length);
    for (let idx = 0;idx < moduleRequests.length; idx++) {
      const { specifier, attributes } = moduleRequests[idx];
      const linkerResult = linker(specifier, this, {
        attributes,
        assert: attributes
      });
      const modulePromise = PromisePrototypeThen.__intrinsic__call(PromiseResolve(linkerResult), async (mod) => {
        if (!isModule(mod)) {
          throw __intrinsic__makeErrorWithCode(295);
        }
        if (mod.context !== this.context) {
          throw __intrinsic__makeErrorWithCode(296);
        }
        if (mod.status === "errored") {
          throw __intrinsic__makeErrorWithCode(297, `request for '${specifier}' resolved to an errored mod`, mod.error);
        }
        if (mod.status === "unlinked") {
          await mod[kLink](linker);
        }
        return mod[kNative];
      });
      modulePromises[idx] = modulePromise;
      specifiers[idx] = specifier;
    }
    try {
      const moduleNatives = await SafePromiseAllReturnArrayLike(modulePromises);
      this[kNative].link(specifiers, moduleNatives, 0);
    } catch (e) {
      this.#error = e;
      throw e;
    } finally {
      this.#statusOverride = __intrinsic__undefined;
    }
  }
  get dependencySpecifiers() {
    validateModule(this, "SourceTextModule");
    this[kDependencySpecifiers] ??= ObjectFreeze(ArrayPrototypeMap.__intrinsic__call(this[kNative].getModuleRequests(), (request) => request[0]));
    return this[kDependencySpecifiers];
  }
  get status() {
    validateModule(this, "SourceTextModule");
    if (this.#error !== kNoError) {
      return "errored";
    }
    if (this.#statusOverride) {
      return this.#statusOverride;
    }
    return super.status;
  }
  get error() {
    validateModule(this, "SourceTextModule");
    if (this.#error !== kNoError) {
      return this.#error;
    }
    return super.error;
  }
  createCachedData() {
    validateModule(this, "SourceTextModule");
    const { status } = this;
    if (status === "evaluating" || status === "evaluated" || status === "errored") {
      throw __intrinsic__makeErrorWithCode(294);
    }
    return this[kNative].createCachedData();
  }
}

class SyntheticModule extends Module {
  constructor(exportNames, evaluateCallback, options = kEmptyObject) {
    if (!ArrayIsArray(exportNames) || ArrayPrototypeSome.__intrinsic__call(exportNames, (e) => typeof e !== "string")) {
      throw __intrinsic__makeErrorWithCode(118, "exportNames", "Array of unique strings", exportNames);
    } else {
      ArrayPrototypeForEach.__intrinsic__call(exportNames, (name, i) => {
        if (ArrayPrototypeIndexOf.__intrinsic__call(exportNames, name, i + 1) !== -1) {
          throw __intrinsic__makeErrorWithCode(119, `exportNames.${name}`, name, "is duplicated");
        }
      });
    }
    validateFunction(evaluateCallback, "evaluateCallback");
    validateObject(options, "options");
    const { context, identifier } = options;
    super({
      syntheticExportNames: exportNames,
      syntheticEvaluationSteps: evaluateCallback,
      context,
      identifier
    });
  }
  [kLink]() {}
  setExport(name, value) {
    validateModule(this, "SyntheticModule");
    validateString(name, "name");
    if (this[kNative].getStatusCode() < kLinked) {
      throw __intrinsic__makeErrorWithCode(292, "must be linked");
    }
    this[kNative].setExport(name, value);
  }
}
var constants = {
  __proto__: null,
  USE_MAIN_CONTEXT_DEFAULT_LOADER,
  DONT_CONTEXTIFY
};
function isModule(object) {
  return typeof object === "object" && object !== null && ObjectPrototypeHasOwnProperty.__intrinsic__call(object, kNative);
}
function importModuleDynamicallyWrap(importModuleDynamically) {
  const importModuleDynamicallyWrapper = async (...args) => {
    const m = await importModuleDynamically.__intrinsic__apply(this, args);
    if (isModuleNamespaceObject(m)) {
      return m;
    }
    if (!isModule(m)) {
      throw __intrinsic__makeErrorWithCode(295);
    }
    if (m.status === "errored") {
      throw m.error;
    }
    return m.namespace;
  };
  return importModuleDynamicallyWrapper;
}
function getConstructorOf(obj) {
  while (obj) {
    const descriptor = ObjectGetOwnPropertyDescriptor(obj, "constructor");
    if (descriptor !== __intrinsic__undefined && typeof descriptor.value === "function" && descriptor.value.name !== "") {
      return descriptor.value;
    }
    obj = ObjectGetPrototypeOf(obj);
  }
}
$ = {
  createContext,
  runInContext,
  runInNewContext,
  runInThisContext,
  isContext,
  compileFunction,
  measureMemory,
  Script,
  Module,
  SourceTextModule,
  SyntheticModule,
  createScript,
  constants: ObjectFreeze(constants)
};
$$EXPORT$$($).$$EXPORT_END$$;
