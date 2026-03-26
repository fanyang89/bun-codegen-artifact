(function (){"use strict";
let $assert = function(check, sourceString, ...message) {
  if (!check) {
    const prevPrepareStackTrace = Error.prepareStackTrace;
    Error.prepareStackTrace = (e, stack) => {
      return e.name + ': ' + e.message + '\n' + stack.slice(1).map(x => '  at ' + x.toString()).join('\n');
    };
    const e = new Error(sourceString);
    e.stack; // materialize stack
    e.name = 'AssertionError';
    Error.prepareStackTrace = prevPrepareStackTrace;
    console.error('[path] ASSERTION FAILED: ' + sourceString);
    if (message.length) console.warn(...message);
    console.warn(e.stack.split('\n')[1] + '\n');
    if (Bun.env.ASSERT === 'CRASH') process.exit(0xAA);
    throw e;
  }
}
// build/debug/tmp_modules/node/path.ts
var $;
var { validateString } = @getInternalField(@internalModuleRegistry, 68) || @createInternalModuleById(68);
var [bindingPosix, bindingWin32] = @lazy(73);
var toNamespacedPathPosix = bindingPosix.toNamespacedPath.bind(bindingPosix);
var toNamespacedPathWin32 = bindingWin32.toNamespacedPath.bind(bindingWin32);
var posix = {
  resolve: bindingPosix.resolve.bind(bindingPosix),
  normalize: bindingPosix.normalize.bind(bindingPosix),
  isAbsolute: bindingPosix.isAbsolute.bind(bindingPosix),
  join: bindingPosix.join.bind(bindingPosix),
  relative: bindingPosix.relative.bind(bindingPosix),
  toNamespacedPath: toNamespacedPathPosix,
  dirname: bindingPosix.dirname.bind(bindingPosix),
  basename: bindingPosix.basename.bind(bindingPosix),
  extname: bindingPosix.extname.bind(bindingPosix),
  format: bindingPosix.format.bind(bindingPosix),
  parse: bindingPosix.parse.bind(bindingPosix),
  sep: "/",
  delimiter: ":",
  win32: @undefined,
  posix: @undefined,
  _makeLong: toNamespacedPathPosix
};
var win32 = {
  resolve: bindingWin32.resolve.bind(bindingWin32),
  normalize: bindingWin32.normalize.bind(bindingWin32),
  isAbsolute: bindingWin32.isAbsolute.bind(bindingWin32),
  join: bindingWin32.join.bind(bindingWin32),
  relative: bindingWin32.relative.bind(bindingWin32),
  toNamespacedPath: toNamespacedPathWin32,
  dirname: bindingWin32.dirname.bind(bindingWin32),
  basename: bindingWin32.basename.bind(bindingWin32),
  extname: bindingWin32.extname.bind(bindingWin32),
  format: bindingWin32.format.bind(bindingWin32),
  parse: bindingWin32.parse.bind(bindingWin32),
  sep: "\\",
  delimiter: ";",
  win32: @undefined,
  posix,
  _makeLong: toNamespacedPathWin32
};
posix.win32 = win32.win32 = win32;
posix.posix = posix;
var prevGlob;
var prevPattern;
function matchesGlob(isWindows, path, pattern) {
  let glob;
  validateString(path, "path");
  if (isWindows)
    path = path.replaceAll("\\", "/");
  if (prevGlob) {
    $assert(prevPattern !== @undefined, "prevPattern !== undefined");
    if (prevPattern === pattern) {
      glob = prevGlob;
    } else {
      validateString(pattern, "pattern");
      if (isWindows)
        pattern = pattern.replaceAll("\\", "/");
      glob = prevGlob = new Bun.Glob(pattern);
      prevPattern = pattern;
    }
  } else {
    validateString(pattern, "pattern");
    if (isWindows)
      pattern = pattern.replaceAll("\\", "/");
    glob = prevGlob = new Bun.Glob(pattern);
    prevPattern = pattern;
  }
  return glob.match(path);
}
posix.matchesGlob = matchesGlob.bind(null, false);
win32.matchesGlob = matchesGlob.bind(null, true);
$ = posix;
return $})
