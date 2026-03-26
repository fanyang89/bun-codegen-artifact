// @bun
// build/debug/tmp_modules/internal-for-testing.ts
var $;
var fmtBinding = __intrinsic__lazy(98);
var highlightJavaScript = (code) => fmtBinding(code, "highlight-javascript");
var escapePowershell = (code) => fmtBinding(code, "escape-powershell");
var canonicalizeIP = __intrinsic__lazy(78);
var SQL = __intrinsic__lazy(1);
var patchInternals = {
  parse: __intrinsic__lazy(99),
  apply: __intrinsic__lazy(100),
  makeDiff: __intrinsic__lazy(101)
};
var shellLex = __intrinsic__lazy(102);
var shellParse = __intrinsic__lazy(103);
var escapeRegExp = __intrinsic__lazy(104);
var escapeRegExpForPackageNameMatching = __intrinsic__lazy(105);
var shellInternals = {
  lex: (a, ...b) => shellLex(a.raw, b),
  parse: (a, ...b) => shellParse(a.raw, b),
  builtinDisabled: __intrinsic__lazy(106)
};
var iniInternals = {
  parse: __intrinsic__lazy(107),
  loadNpmrc: __intrinsic__lazy(108)
};
var cssInternals = {
  minifyTestWithOptions: __intrinsic__lazy(109),
  minifyErrorTestWithOptions: __intrinsic__lazy(110),
  testWithOptions: __intrinsic__lazy(111),
  prefixTestWithOptions: __intrinsic__lazy(112),
  minifyTest: __intrinsic__lazy(113),
  prefixTest: __intrinsic__lazy(114),
  _test: __intrinsic__lazy(115),
  attrTest: __intrinsic__lazy(116)
};
var crash_handler = __intrinsic__lazy(117);
var upgrade_test_helpers = __intrinsic__lazy(118);
var install_test_helpers = __intrinsic__lazy(119);
var jscInternals = __intrinsic__lazy(120);
var nativeFrameForTesting = __intrinsic__lazy(121);
var memfd_create = __intrinsic__lazy(122);
var setSyntheticAllocationLimitForTesting = __intrinsic__lazy(123);
var npm_manifest_test_helpers = __intrinsic__lazy(124);
var npa = __intrinsic__lazy(125);
var npmTag = __intrinsic__lazy(126);
var readTarball = __intrinsic__lazy(127);
var isArchitectureMatch = __intrinsic__lazy(128);
var isOperatingSystemMatch = __intrinsic__lazy(129);
var createSocketPair = __intrinsic__lazy(130);
var isModuleResolveFilenameSlowPathEnabled = __intrinsic__lazy(131);
var frameworkRouterInternals = __intrinsic__lazy(132);
var bindgen = __intrinsic__lazy(133);
var noOpForTesting = __intrinsic__lazy(134);
var Dequeue = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 17) || __intrinsic__createInternalModuleById(17);
var fs = (__intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 97) || __intrinsic__createInternalModuleById(97)).__intrinsic__data;
var fsStreamInternals = {
  writeStreamFastPath(str) {
    return str[(__intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 23) || __intrinsic__createInternalModuleById(23)).kWriteStreamFastPath];
  }
};
var arrayBufferViewHasBuffer = __intrinsic__lazy(135);
var timerInternals = {
  timerClockMs: __intrinsic__lazy(136)
};
var decodeURIComponentSIMD = __intrinsic__lazy(137);
var getDevServerDeinitCount = __intrinsic__lazy(138);
var getCounters = __intrinsic__lazy(139);
var hasNonReifiedStatic = __intrinsic__lazy(140);
var setSocketOptions = __intrinsic__lazy(141);
var structuredCloneAdvanced = __intrinsic__lazy(142);
var lsanDoLeakCheck = __intrinsic__lazy(143);
var getEventLoopStats = __intrinsic__lazy(144);
var hostedGitInfo = {
  parseUrl: __intrinsic__lazy(145),
  fromUrl: __intrinsic__lazy(146)
};
$$EXPORT$$($).$$EXPORT_END$$;
export {
  upgrade_test_helpers,
  timerInternals,
  structuredCloneAdvanced,
  shellInternals,
  setSyntheticAllocationLimitForTesting,
  setSocketOptions,
  readTarball,
  patchInternals,
  npm_manifest_test_helpers,
  npmTag,
  npa,
  noOpForTesting,
  nativeFrameForTesting,
  memfd_create,
  lsanDoLeakCheck,
  jscInternals,
  isOperatingSystemMatch,
  isModuleResolveFilenameSlowPathEnabled,
  isArchitectureMatch,
  install_test_helpers,
  iniInternals,
  hostedGitInfo,
  highlightJavaScript,
  hasNonReifiedStatic,
  getEventLoopStats,
  getDevServerDeinitCount,
  getCounters,
  fsStreamInternals,
  fs,
  frameworkRouterInternals,
  escapeRegExpForPackageNameMatching,
  escapeRegExp,
  escapePowershell,
  decodeURIComponentSIMD,
  cssInternals,
  createSocketPair,
  crash_handler,
  canonicalizeIP,
  bindgen,
  arrayBufferViewHasBuffer,
  SQL,
  Dequeue
};
