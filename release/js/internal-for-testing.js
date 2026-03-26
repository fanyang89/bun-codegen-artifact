(function (){"use strict";// build/release/tmp_modules/internal-for-testing.ts
var $, fmtBinding = @lazy(98), highlightJavaScript = (code) => fmtBinding(code, "highlight-javascript"), escapePowershell = (code) => fmtBinding(code, "escape-powershell"), canonicalizeIP = @lazy(78), SQL = @lazy(1), patchInternals = {
  parse: @lazy(99),
  apply: @lazy(100),
  makeDiff: @lazy(101)
}, shellLex = @lazy(102), shellParse = @lazy(103), escapeRegExp = @lazy(104), escapeRegExpForPackageNameMatching = @lazy(105), shellInternals = {
  lex: (a, ...b) => shellLex(a.raw, b),
  parse: (a, ...b) => shellParse(a.raw, b),
  builtinDisabled: @lazy(106)
}, iniInternals = {
  parse: @lazy(107),
  loadNpmrc: @lazy(108)
}, cssInternals = {
  minifyTestWithOptions: @lazy(109),
  minifyErrorTestWithOptions: @lazy(110),
  testWithOptions: @lazy(111),
  prefixTestWithOptions: @lazy(112),
  minifyTest: @lazy(113),
  prefixTest: @lazy(114),
  _test: @lazy(115),
  attrTest: @lazy(116)
}, crash_handler = @lazy(117), upgrade_test_helpers = @lazy(118), install_test_helpers = @lazy(119), jscInternals = @lazy(120), nativeFrameForTesting = @lazy(121), memfd_create = @lazy(122), setSyntheticAllocationLimitForTesting = @lazy(123), npm_manifest_test_helpers = @lazy(124), npa = @lazy(125), npmTag = @lazy(126), readTarball = @lazy(127), isArchitectureMatch = @lazy(128), isOperatingSystemMatch = @lazy(129), createSocketPair = @lazy(130), isModuleResolveFilenameSlowPathEnabled = @lazy(131), frameworkRouterInternals = @lazy(132), bindgen = @lazy(133), noOpForTesting = @lazy(134), Dequeue = @getInternalField(@internalModuleRegistry, 17) || @createInternalModuleById(17), fs = (@getInternalField(@internalModuleRegistry, 97) || @createInternalModuleById(97)).@data, fsStreamInternals = {
  writeStreamFastPath(str) {
    return str[(@getInternalField(@internalModuleRegistry, 23) || @createInternalModuleById(23)).kWriteStreamFastPath];
  }
}, arrayBufferViewHasBuffer = @lazy(135), timerInternals = {
  timerClockMs: @lazy(136)
}, decodeURIComponentSIMD = @lazy(137), getDevServerDeinitCount = @lazy(138), getCounters = @lazy(139), hasNonReifiedStatic = @lazy(140), setSocketOptions = @lazy(141), structuredCloneAdvanced = @lazy(142), lsanDoLeakCheck = @lazy(143), getEventLoopStats = @lazy(144), hostedGitInfo = {
  parseUrl: @lazy(145),
  fromUrl: @lazy(146)
};
return{
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
};})
