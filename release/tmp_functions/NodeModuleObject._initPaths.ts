// @ts-nocheck
// GENERATED TEMP FILE - DO NOT EDIT
// Sourced from ../../../src/js/builtins/NodeModuleObject.ts

// do not allow the bundler to rename a symbol to $
($);

$$capture_start$$(function() {  const homeDir = process.platform === "win32" ? process.env.USERPROFILE : Bun.env.HOME;
  const nodePath = process.platform === "win32" ? process.env.NODE_PATH : Bun.env.NODE_PATH;

  // process.execPath is $PREFIX/bin/node except on Windows where it is
  // $PREFIX\node.exe where $PREFIX is the root of the Node.js installation.
  const path = (__intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 107/*node:path*/) || __intrinsic__createInternalModuleById(107/*node:path*/));
  const prefixDir =
    process.platform === "win32" ? path.resolve(process.execPath, "..") : path.resolve(process.execPath, "..", "..");

  const paths = [path.resolve(prefixDir, "lib", "node")];

  if (homeDir) {
    paths.unshift(path.resolve(homeDir, ".node_libraries"));
    paths.unshift(path.resolve(homeDir, ".node_modules"));
  }

  if (nodePath) {
    paths.unshift(...nodePath.split(path.delimiter).filter(Boolean));
  }

  const M = (__intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 147/*node:module*/) || __intrinsic__createInternalModuleById(147/*node:module*/));
  M.globalPaths = paths;
}).$$capture_end$$;
