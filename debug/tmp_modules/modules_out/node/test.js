// @bun
// build/debug/tmp_modules/node/test.ts
var $;
var { jest } = Bun;
var { kEmptyObject, throwNotImplemented } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 32) || __intrinsic__createInternalModuleById(32);
var kDefaultName = "<anonymous>";
var kDefaultFunction = () => {};
var kDefaultOptions = kEmptyObject;
function run() {
  throwNotImplemented("run()", 5090, "Use `bun:test` in the interim.");
}
function mock() {
  throwNotImplemented("mock()", 5090, "Use `bun:test` in the interim.");
}
function fileSnapshot(_value, _path, _options = kEmptyObject) {
  throwNotImplemented("fileSnapshot()", 5090, "Use `bun:test` in the interim.");
}
function snapshot(_value, _options = kEmptyObject) {
  throwNotImplemented("snapshot()", 5090, "Use `bun:test` in the interim.");
}
var assert = {
  ...__intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 85) || __intrinsic__createInternalModuleById(85),
  fileSnapshot,
  snapshot
};
delete assert.AssertionError;
delete assert.CallTracker;
delete assert.strict;
var checkNotInsideTest;

class TestContext {
  #insideTest;
  #name;
  #filePath;
  #parent;
  #abortController;
  constructor(insideTest, name, filePath, parent) {
    this.#insideTest = insideTest;
    this.#name = name;
    this.#filePath = filePath || parent?.filePath || kDefaultFilePath;
    this.#parent = parent;
  }
  get signal() {
    if (this.#abortController === __intrinsic__undefined) {
      this.#abortController = new AbortController;
    }
    return this.#abortController.signal;
  }
  get name() {
    return this.#name;
  }
  get fullName() {
    let fullName = this.#name;
    let parent = this.#parent;
    while (parent && parent.name) {
      fullName = `${parent.name} > ${fullName}`;
      parent = parent.#parent;
    }
    return fullName;
  }
  get filePath() {
    return this.#filePath;
  }
  diagnostic(message) {
    console.log(message);
  }
  plan(_count, _options = kEmptyObject) {
    throwNotImplemented("plan()", 5090, "Use `bun:test` in the interim.");
  }
  get assert() {
    return assert;
  }
  get mock() {
    throwNotImplemented("mock", 5090, "Use `bun:test` in the interim.");
    return __intrinsic__undefined;
  }
  runOnly(_value) {
    throwNotImplemented("runOnly()", 5090, "Use `bun:test` in the interim.");
  }
  skip(_message) {
    throwNotImplemented("skip()", 5090, "Use `bun:test` in the interim.");
  }
  todo(_message) {
    throwNotImplemented("todo()", 5090, "Use `bun:test` in the interim.");
  }
  before(arg0, arg1) {
    const { fn } = createHook(arg0, arg1);
    const { beforeAll } = bunTest();
    beforeAll(fn);
  }
  after(arg0, arg1) {
    const { fn } = createHook(arg0, arg1);
    const { afterAll } = bunTest();
    afterAll(fn);
  }
  beforeEach(arg0, arg1) {
    const { fn } = createHook(arg0, arg1);
    const { beforeEach } = bunTest();
    beforeEach(fn);
  }
  afterEach(arg0, arg1) {
    const { fn } = createHook(arg0, arg1);
    const { afterEach } = bunTest();
    afterEach(fn);
  }
  waitFor(_condition, _options = kEmptyObject) {
    throwNotImplemented("waitFor()", 5090, "Use `bun:test` in the interim.");
  }
  test(arg0, arg1, arg2) {
    const { name, fn, options } = createTest(arg0, arg1, arg2);
    this.#checkNotInsideTest("test");
    const { test } = bunTest();
    if (options.only) {
      test.only(name, fn);
    } else if (options.todo) {
      test.todo(name, fn);
    } else if (options.skip) {
      test.skip(name, fn);
    } else {
      test(name, fn);
    }
  }
  describe(arg0, arg1, arg2) {
    const { name, fn } = createDescribe(arg0, arg1, arg2);
    this.#checkNotInsideTest("describe");
    const { describe } = bunTest();
    describe(name, fn);
  }
  #checkNotInsideTest(fn) {
    if (this.#insideTest) {
      throwNotImplemented(`${fn}() inside another test()`, 5090, "Use `bun:test` in the interim.");
    }
  }
  static {
    checkNotInsideTest = (ctx, fn) => {
      if (ctx)
        ctx.#checkNotInsideTest(fn);
    };
  }
}
function bunTest() {
  return jest(Bun.main);
}
var ctx = __intrinsic__undefined;
function describe(arg0, arg1, arg2) {
  const { name, fn } = createDescribe(arg0, arg1, arg2);
  const { describe: describe2 } = bunTest();
  describe2(name, fn);
}
describe.skip = function(arg0, arg1, arg2) {
  const { name, fn } = createDescribe(arg0, arg1, arg2);
  const { describe: describe2 } = bunTest();
  describe2.skip(name, fn);
};
describe.todo = function(arg0, arg1, arg2) {
  const { name, fn } = createDescribe(arg0, arg1, arg2);
  const { describe: describe2 } = bunTest();
  describe2.todo(name, fn);
};
describe.only = function(arg0, arg1, arg2) {
  const { name, fn } = createDescribe(arg0, arg1, arg2);
  const { describe: describe2 } = bunTest();
  describe2.only(name, fn);
};
function test(arg0, arg1, arg2) {
  const { name, fn, options } = createTest(arg0, arg1, arg2);
  const { test: test2 } = bunTest();
  test2(name, fn, options);
}
test.skip = function(arg0, arg1, arg2) {
  const { name, fn, options } = createTest(arg0, arg1, arg2);
  const { test: test2 } = bunTest();
  test2.skip(name, fn, options);
};
test.todo = function(arg0, arg1, arg2) {
  const { name, fn, options } = createTest(arg0, arg1, arg2);
  const { test: test2 } = bunTest();
  test2.todo(name, fn, options);
};
test.only = function(arg0, arg1, arg2) {
  const { name, fn, options } = createTest(arg0, arg1, arg2);
  const { test: test2 } = bunTest();
  test2.only(name, fn, options);
};
function before(arg0, arg1) {
  const { fn } = createHook(arg0, arg1);
  const { beforeAll } = bunTest();
  beforeAll(fn);
}
function after(arg0, arg1) {
  const { fn } = createHook(arg0, arg1);
  const { afterAll } = bunTest();
  afterAll(fn);
}
function beforeEach(arg0, arg1) {
  const { fn } = createHook(arg0, arg1);
  const { beforeEach: beforeEach2 } = bunTest();
  beforeEach2(fn);
}
function afterEach(arg0, arg1) {
  const { fn } = createHook(arg0, arg1);
  const { afterEach: afterEach2 } = bunTest();
  afterEach2(fn);
}
function parseTestOptions(arg0, arg1, arg2) {
  let name;
  let options;
  let fn;
  if (typeof arg0 === "function") {
    name = arg0.name || kDefaultName;
    fn = arg0;
    if (typeof arg1 === "object") {
      options = arg1;
    } else {
      options = kDefaultOptions;
    }
  } else if (typeof arg0 === "string") {
    name = arg0;
    if (typeof arg1 === "object") {
      options = arg1;
      if (typeof arg2 === "function") {
        fn = arg2;
      } else {
        fn = kDefaultFunction;
      }
    } else if (typeof arg1 === "function") {
      fn = arg1;
      options = kDefaultOptions;
    } else {
      fn = kDefaultFunction;
      options = kDefaultOptions;
    }
  } else {
    name = kDefaultName;
    fn = kDefaultFunction;
    options = kDefaultOptions;
  }
  return { name, options, fn };
}
function createTest(arg0, arg1, arg2) {
  const { name, options, fn } = parseTestOptions(arg0, arg1, arg2);
  checkNotInsideTest(ctx, "test");
  const context = new TestContext(true, name, Bun.main, ctx);
  const runTest = (done) => {
    const originalContext = ctx;
    ctx = context;
    const endTest = (error) => {
      try {
        done(error);
      } finally {
        ctx = originalContext;
      }
    };
    let result;
    try {
      result = fn(context);
    } catch (error) {
      endTest(error);
      return;
    }
    if (result instanceof __intrinsic__Promise) {
      result.then(() => endTest()).catch((error) => endTest(error));
    } else {
      endTest();
    }
  };
  return { name, options, fn: runTest };
}
function createDescribe(arg0, arg1, arg2) {
  const { name, fn, options } = parseTestOptions(arg0, arg1, arg2);
  checkNotInsideTest(ctx, "describe");
  const context = new TestContext(false, name, Bun.main, ctx);
  const runDescribe = () => {
    const originalContext = ctx;
    ctx = context;
    const endDescribe = () => {
      ctx = originalContext;
    };
    try {
      return fn(context);
    } finally {
      endDescribe();
    }
  };
  return { name, options, fn: runDescribe };
}
function parseHookOptions(arg0, arg1) {
  let fn;
  let options;
  if (typeof arg0 === "function") {
    fn = arg0;
  } else {
    fn = kDefaultFunction;
  }
  if (typeof arg1 === "object") {
    options = arg1;
  } else {
    options = kDefaultOptions;
  }
  return { fn, options };
}
function createHook(arg0, arg1) {
  const { fn, options } = parseHookOptions(arg0, arg1);
  const runHook = (done) => {
    let result;
    try {
      result = fn();
    } catch (error) {
      done(error);
      return;
    }
    if (result instanceof __intrinsic__Promise) {
      result.then(() => done()).catch((error) => done(error));
    } else {
      done();
    }
  };
  return { options, fn: runHook };
}
function setDefaultSnapshotSerializer(_serializers) {
  throwNotImplemented("setDefaultSnapshotSerializer()", 5090, "Use `bun:test` in the interim.");
}
function setResolveSnapshotPath(_fn) {
  throwNotImplemented("setResolveSnapshotPath()", 5090, "Use `bun:test` in the interim.");
}
test.describe = describe;
test.suite = describe;
test.test = test;
test.it = test;
test.before = before;
test.after = after;
test.beforeEach = beforeEach;
test.afterEach = afterEach;
test.assert = assert;
test.snapshot = {
  setDefaultSnapshotSerializer,
  setResolveSnapshotPath
};
test.run = run;
test.mock = mock;
$ = test;
$$EXPORT$$($).$$EXPORT_END$$;
