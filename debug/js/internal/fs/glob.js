(function (){"use strict";// build/debug/tmp_modules/internal/fs/glob.ts
var $;
var { validateObject, validateString, validateFunction, validateArray } = @getInternalField(@internalModuleRegistry, 68) || @createInternalModuleById(68);
var { sep } = @getInternalField(@internalModuleRegistry, 107) || @createInternalModuleById(107);
var isWindows = false;
async function* glob(pattern, options) {
  const patterns = validatePattern(pattern);
  const globOptions = mapOptions(options || {});
  const exclude = globOptions.exclude;
  const excludeGlobs = @Array.isArray(exclude) ? exclude.flatMap((pattern2) => [new Bun.Glob(pattern2), new Bun.Glob(pattern2.replace(/\/+$/, "") + "/**")]) : null;
  for (const pat of patterns) {
    for await (const ent of new Bun.Glob(pat).scan(globOptions)) {
      if (typeof exclude === "function") {
        if (exclude(ent))
          continue;
      } else if (excludeGlobs) {
        if (excludeGlobs.some((glob2) => glob2.match(ent))) {
          continue;
        }
      }
      yield ent;
    }
  }
}
function* globSync(pattern, options) {
  const patterns = validatePattern(pattern);
  const globOptions = mapOptions(options || {});
  const exclude = globOptions.exclude;
  const excludeGlobs = @Array.isArray(exclude) ? exclude.flatMap((pattern2) => [new Bun.Glob(pattern2), new Bun.Glob(pattern2.replace(/\/+$/, "") + "/**")]) : null;
  for (const pat of patterns) {
    for (const ent of new Bun.Glob(pat).scanSync(globOptions)) {
      if (typeof exclude === "function") {
        if (exclude(ent))
          continue;
      } else if (excludeGlobs) {
        if (excludeGlobs.some((glob2) => glob2.match(ent))) {
          continue;
        }
      }
      yield ent;
    }
  }
}
function validatePattern(pattern) {
  if (@Array.isArray(pattern)) {
    validateArray(pattern, "pattern");
    return pattern.map((p) => {
      validateString(p, "pattern");
      return isWindows ? p.replaceAll("/", sep) : p;
    });
  }
  validateString(pattern, "pattern");
  return [isWindows ? pattern.replaceAll("/", sep) : pattern];
}
function mapOptions(options) {
  validateObject(options, "options");
  let exclude = options.exclude ?? no;
  if (@Array.isArray(exclude)) {
    validateArray(exclude, "options.exclude");
    if (isWindows) {
      exclude = exclude.map((pattern) => pattern.replaceAll("\\", "/"));
    }
  } else {
    validateFunction(exclude, "options.exclude");
  }
  if (options.withFileTypes) {
    @throwTypeError("fs.glob does not support options.withFileTypes yet. Please open an issue on GitHub.");
  }
  return {
    cwd: options?.cwd ?? process.cwd(),
    followSymlinks: true,
    onlyFiles: false,
    exclude
  };
}
var no = (_) => false;
$ = { glob, globSync };
return $})
