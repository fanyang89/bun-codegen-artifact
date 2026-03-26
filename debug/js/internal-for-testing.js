(function (){"use strict";// build/debug/tmp_modules/internal-for-testing.ts
var $;
var fmtBinding = @lazy(98);
var highlightJavaScript = (code) => fmtBinding(code, "highlight-javascript");
var escapePowershell = (code) => fmtBinding(code, "escape-powershell");
var canonicalizeIP = @lazy(78);
var SQL = @lazy(1);
var patchInternals = {
  parse: @lazy(99),
  apply: @lazy(100),
  makeDiff: @lazy(101)
};
var shellLex = @lazy(102);
var shellParse = @lazy(103);
var escapeRegExp = @lazy(104);
var escapeRegExpForPackageNameMatching = @lazy(105);
var shellInternals = {
  lex: (a, ...b) => shellLex(a.raw, b),
  parse: (a, ...b) => shellParse(a.raw, b),
  builtinDisabled: @lazy(106)
};
var iniInternals = {
  parse: @lazy(107),
  loadNpmrc: @lazy(108)
};
var cssInternals = {
  minifyTestWithOptions: @lazy(109),
  minifyErrorTestWithOptions: @lazy(110),
  testWithOptions: @lazy(111),
  prefixTestWithOptions: @lazy(112),
  minifyTest: @lazy(113),
  prefixTest: @lazy(114),
  _test: @lazy(115),
  attrTest: @lazy(116)
};
var crash_handler = @lazy(117);
var upgrade_test_helpers = @lazy(118);
var install_test_helpers = @lazy(119);
var jscInternals = @lazy(120);
var nativeFrameForTesting = @lazy(121);
var memfd_create = @lazy(122);
var setSyntheticAllocationLimitForTesting = @lazy(123);
var npm_manifest_test_helpers = @lazy(124);
var npa = @lazy(125);
var npmTag = @lazy(126);
var readTarball = @lazy(127);
var isArchitectureMatch = @lazy(128);
var isOperatingSystemMatch = @lazy(129);
var createSocketPair = @lazy(130);
var isModuleResolveFilenameSlowPathEnabled = @lazy(131);
var frameworkRouterInternals = @lazy(132);
var bindgen = @lazy(133);
var noOpForTesting = @lazy(134);
var Dequeue = @getInternalField(@internalModuleRegistry, 17) || @createInternalModuleById(17);
var fs = (@getInternalField(@internalModuleRegistry, 97) || @createInternalModuleById(97)).@data;
var fsStreamInternals = {
  writeStreamFastPath(str) {
    return str[(@getInternalField(@internalModuleRegistry, 23) || @createInternalModuleById(23)).kWriteStreamFastPath];
  }
};
var arrayBufferViewHasBuffer = @lazy(135);
var timerInternals = {
  timerClockMs: @lazy(136)
};
var decodeURIComponentSIMD = @lazy(137);
var getDevServerDeinitCount = @lazy(138);
var getCounters = @lazy(139);
var hasNonReifiedStatic = @lazy(140);
var setSocketOptions = @lazy(141);
var structuredCloneAdvanced = @lazy(142);
var lsanDoLeakCheck = @lazy(143);
var getEventLoopStats = @lazy(144);
var hostedGitInfo = {
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
