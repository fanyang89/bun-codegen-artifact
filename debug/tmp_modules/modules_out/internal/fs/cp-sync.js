// @bun
// build/debug/tmp_modules/internal/fs/cp-sync.ts
var $;
var ArrayPrototypeEvery = __intrinsic__Array.prototype.every;
var ArrayPrototypeFilter = __intrinsic__Array.prototype.filter;
var StringPrototypeSplit = __intrinsic__String.prototype.split;
function areIdentical(srcStat, destStat) {
  return destStat.ino && destStat.dev && destStat.ino === srcStat.ino && destStat.dev === srcStat.dev;
}
var normalizePathToArray = (path) => ArrayPrototypeFilter.__intrinsic__call(StringPrototypeSplit.__intrinsic__call(resolve(path), sep), Boolean);
function isSrcSubdir(src, dest) {
  const srcArr = normalizePathToArray(src);
  const destArr = normalizePathToArray(dest);
  return ArrayPrototypeEvery.__intrinsic__call(srcArr, (cur, i) => destArr[i] === cur);
}
var {
  chmodSync,
  copyFileSync,
  existsSync,
  lstatSync,
  mkdirSync,
  readdirSync,
  readlinkSync,
  statSync,
  symlinkSync,
  unlinkSync,
  utimesSync
} = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 98) || __intrinsic__createInternalModuleById(98);
var { dirname, isAbsolute, join, parse, resolve, sep } = __intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 107) || __intrinsic__createInternalModuleById(107);
function cpSyncFn(src, dest, opts) {
  const { srcStat, destStat, skipped } = checkPathsSync(src, dest, opts);
  if (skipped)
    return;
  checkParentPathsSync(src, srcStat, dest);
  return checkParentDir(destStat, src, dest, opts);
}
function checkPathsSync(src, dest, opts) {
  if (opts.filter) {
    const shouldCopy = opts.filter(src, dest);
    if (__intrinsic__isPromise(shouldCopy)) {
      throw new Error("Expected a boolean from the filter function, but got a promise. Use `fs.promises.cp` instead.");
    }
    if (!shouldCopy)
      return { __proto__: null, skipped: true };
  }
  const { srcStat, destStat } = getStatsSync(src, dest, opts);
  if (destStat) {
    if (areIdentical(srcStat, destStat)) {
      throw new Error("src and dest cannot be the same");
    }
    if (srcStat.isDirectory() && !destStat.isDirectory()) {
      throw new Error(`cannot overwrite directory ${src} with non-directory ${dest}`);
    }
    if (!srcStat.isDirectory() && destStat.isDirectory()) {
      throw new Error(`cannot overwrite non-directory ${src} with directory ${dest}`);
    }
  }
  if (srcStat.isDirectory() && isSrcSubdir(src, dest)) {
    throw new Error(`cannot copy ${src} to a subdirectory of self ${dest}`);
  }
  return { __proto__: null, srcStat, destStat, skipped: false };
}
function getStatsSync(src, dest, opts) {
  let destStat;
  const statFunc = opts.dereference ? (file) => statSync(file, { bigint: true }) : (file) => lstatSync(file, { bigint: true });
  const srcStat = statFunc(src);
  try {
    destStat = statFunc(dest);
  } catch (err) {
    if (err.code === "ENOENT")
      return { srcStat, destStat: null };
    throw err;
  }
  return { srcStat, destStat };
}
function checkParentPathsSync(src, srcStat, dest) {
  const srcParent = resolve(dirname(src));
  const destParent = resolve(dirname(dest));
  if (destParent === srcParent || destParent === parse(destParent).root)
    return;
  let destStat;
  try {
    destStat = statSync(destParent, { bigint: true });
  } catch (err) {
    if (err.code === "ENOENT")
      return;
    throw err;
  }
  if (areIdentical(srcStat, destStat)) {
    throw new Error(`cannot copy ${src} to a subdirectory of self ${dest}`);
  }
  return checkParentPathsSync(src, srcStat, destParent);
}
function checkParentDir(destStat, src, dest, opts) {
  const destParent = dirname(dest);
  if (!existsSync(destParent))
    mkdirSync(destParent, { recursive: true });
  return getStats(destStat, src, dest, opts);
}
function getStats(destStat, src, dest, opts) {
  const statSyncFn = opts.dereference ? statSync : lstatSync;
  const srcStat = statSyncFn(src);
  if (srcStat.isDirectory() && opts.recursive) {
    return onDir(srcStat, destStat, src, dest, opts);
  } else if (srcStat.isDirectory()) {
    throw new Error(`${src} is a directory (not copied)`);
  } else if (srcStat.isFile() || srcStat.isCharacterDevice() || srcStat.isBlockDevice()) {
    return onFile(srcStat, destStat, src, dest, opts);
  } else if (srcStat.isSymbolicLink()) {
    return onLink(destStat, src, dest, opts);
  } else if (srcStat.isSocket()) {
    throw new Error(`cannot copy a socket file: ${dest}`);
  } else if (srcStat.isFIFO()) {
    throw new Error(`cannot copy a FIFO pipe: ${dest}`);
  }
  throw new Error(`cannot copy an unknown file type: ${dest}`);
}
function onFile(srcStat, destStat, src, dest, opts) {
  if (!destStat)
    return copyFile(srcStat, src, dest, opts);
  return mayCopyFile(srcStat, src, dest, opts);
}
function mayCopyFile(srcStat, src, dest, opts) {
  if (opts.force) {
    unlinkSync(dest);
    return copyFile(srcStat, src, dest, opts);
  } else if (opts.errorOnExist) {
    throw new Error(`${dest} already exists`);
  }
}
function copyFile(srcStat, src, dest, opts) {
  copyFileSync(src, dest, opts.mode);
  if (opts.preserveTimestamps)
    handleTimestamps(srcStat.mode, src, dest);
  return setDestMode(dest, srcStat.mode);
}
function handleTimestamps(srcMode, src, dest) {
  if (fileIsNotWritable(srcMode))
    makeFileWritable(dest, srcMode);
  return setDestTimestamps(src, dest);
}
function fileIsNotWritable(srcMode) {
  return (srcMode & 128) === 0;
}
function makeFileWritable(dest, srcMode) {
  return setDestMode(dest, srcMode | 128);
}
function setDestMode(dest, srcMode) {
  return chmodSync(dest, srcMode);
}
function setDestTimestamps(src, dest) {
  const updatedSrcStat = statSync(src);
  return utimesSync(dest, updatedSrcStat.atime, updatedSrcStat.mtime);
}
function onDir(srcStat, destStat, src, dest, opts) {
  if (!destStat)
    return mkDirAndCopy(srcStat.mode, src, dest, opts);
  return copyDir(src, dest, opts);
}
function mkDirAndCopy(srcMode, src, dest, opts) {
  mkdirSync(dest);
  copyDir(src, dest, opts);
  return setDestMode(dest, srcMode);
}
function copyDir(src, dest, opts) {
  for (const dirent of readdirSync(src, { withFileTypes: true })) {
    const { name } = dirent;
    const srcItem = join(src, name);
    const destItem = join(dest, name);
    const { destStat, skipped } = checkPathsSync(srcItem, destItem, opts);
    if (!skipped)
      getStats(destStat, srcItem, destItem, opts);
  }
}
function onLink(destStat, src, dest, opts) {
  let resolvedSrc = readlinkSync(src);
  if (!opts.verbatimSymlinks && !isAbsolute(resolvedSrc)) {
    resolvedSrc = resolve(dirname(src), resolvedSrc);
  }
  if (!destStat) {
    return symlinkSync(resolvedSrc, dest);
  }
  let resolvedDest;
  try {
    resolvedDest = readlinkSync(dest);
  } catch (err) {
    if (err.code === "EINVAL" || err.code === "UNKNOWN") {
      return symlinkSync(resolvedSrc, dest);
    }
    throw err;
  }
  if (!isAbsolute(resolvedDest)) {
    resolvedDest = resolve(dirname(dest), resolvedDest);
  }
  if (isSrcSubdir(resolvedSrc, resolvedDest)) {
    throw new Error(`cannot copy ${resolvedSrc} to a subdirectory of self ${resolvedDest}`);
  }
  if (statSync(dest).isDirectory() && isSrcSubdir(resolvedDest, resolvedSrc)) {
    throw new Error(`cannot overwrite ${resolvedDest} with ${resolvedSrc}`);
  }
  return copyLink(resolvedSrc, dest);
}
function copyLink(resolvedSrc, dest) {
  unlinkSync(dest);
  return symlinkSync(resolvedSrc, dest);
}
$ = cpSyncFn;
$$EXPORT$$($).$$EXPORT_END$$;
