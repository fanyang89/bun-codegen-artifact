// @bun
// build/release/tmp_modules/internal-for-testing.ts
var $, fmtBinding = __intrinsic__lazy(98), highlightJavaScript = (code) => fmtBinding(code, "highlight-javascript"), escapePowershell = (code) => fmtBinding(code, "escape-powershell"), canonicalizeIP = __intrinsic__lazy(78), SQL = __intrinsic__lazy(1), patchInternals = {
  parse: __intrinsic__lazy(99),
  apply: __intrinsic__lazy(100),
  makeDiff: __intrinsic__lazy(101)
}, shellLex = __intrinsic__lazy(102), shellParse = __intrinsic__lazy(103), escapeRegExp = __intrinsic__lazy(104), escapeRegExpForPackageNameMatching = __intrinsic__lazy(105), shellInternals = {
  lex: (a, ...b) => shellLex(a.raw, b),
  parse: (a, ...b) => shellParse(a.raw, b),
  builtinDisabled: __intrinsic__lazy(106)
}, iniInternals = {
  parse: __intrinsic__lazy(107),
  loadNpmrc: __intrinsic__lazy(108)
}, cssInternals = {
  minifyTestWithOptions: __intrinsic__lazy(109),
  minifyErrorTestWithOptions: __intrinsic__lazy(110),
  testWithOptions: __intrinsic__lazy(111),
  prefixTestWithOptions: __intrinsic__lazy(112),
  minifyTest: __intrinsic__lazy(113),
  prefixTest: __intrinsic__lazy(114),
  _test: __intrinsic__lazy(115),
  attrTest: __intrinsic__lazy(116)
}, crash_handler = __intrinsic__lazy(117), upgrade_test_helpers = __intrinsic__lazy(118), install_test_helpers = __intrinsic__lazy(119), jscInternals = __intrinsic__lazy(120), nativeFrameForTesting = __intrinsic__lazy(121), memfd_create = __intrinsic__lazy(122), setSyntheticAllocationLimitForTesting = __intrinsic__lazy(123), npm_manifest_test_helpers = __intrinsic__lazy(124), npa = __intrinsic__lazy(125), npmTag = __intrinsic__lazy(126), readTarball = __intrinsic__lazy(127), isArchitectureMatch = __intrinsic__lazy(128), isOperatingSystemMatch = __intrinsic__lazy(129), createSocketPair = __intrinsic__lazy(130), isModuleResolveFilenameSlowPathEnabled = __intrinsic__lazy(131), frameworkRouterInternals = __intrinsic__lazy(132), bindgen = __intrinsic__lazy(133), noOpForTesting = __intrinsic__lazy(134), Dequeue = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 17) || __intrinsic__createInternalModuleById(17), fs = (__intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 97) || __intrinsic__createInternalModuleById(97)).__intrinsic__data, fsStreamInternals = {
  writeStreamFastPath(str) {
    return str[(__intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 23) || __intrinsic__createInternalModuleById(23)).kWriteStreamFastPath];
  }
}, arrayBufferViewHasBuffer = __intrinsic__lazy(135), timerInternals = {
  timerClockMs: __intrinsic__lazy(136)
}, decodeURIComponentSIMD = __intrinsic__lazy(137), getDevServerDeinitCount = __intrinsic__lazy(138), getCounters = __intrinsic__lazy(139), hasNonReifiedStatic = __intrinsic__lazy(140), setSocketOptions = __intrinsic__lazy(141), structuredCloneAdvanced = __intrinsic__lazy(142), lsanDoLeakCheck = __intrinsic__lazy(143), getEventLoopStats = __intrinsic__lazy(144), hostedGitInfo = {
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
