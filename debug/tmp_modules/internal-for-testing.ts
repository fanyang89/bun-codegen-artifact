// @ts-nocheck
var $;// GENERATED TEMP FILE - DO NOT EDIT
// Sourced from src/js/internal-for-testing.ts


// Hardcoded module "bun:internal-for-testing"

// If you want to test an internal API, add a binding into this file.
//
// Then at test time: import ... from "bun:internal-for-testing"
//
// In a debug build, the import is always allowed.
// It is disallowed in release builds unless run in Bun's CI.

const fmtBinding = __intrinsic__lazy(98);

export const highlightJavaScript = (code: string) => fmtBinding(code, "highlight-javascript");
export const escapePowershell = (code: string) => fmtBinding(code, "escape-powershell");

export const canonicalizeIP = __intrinsic__lazy(78);

export const SQL = __intrinsic__lazy(1);

export const patchInternals = {
  parse: __intrinsic__lazy(99),
  apply: __intrinsic__lazy(100),
  makeDiff: __intrinsic__lazy(101),
};

const shellLex = __intrinsic__lazy(102);
const shellParse = __intrinsic__lazy(103);

export const escapeRegExp = __intrinsic__lazy(104);
export const escapeRegExpForPackageNameMatching = __intrinsic__lazy(105);

export const shellInternals = {
  lex: (a, ...b) => shellLex(a.raw, b),
  parse: (a, ...b) => shellParse(a.raw, b),
  /**
   * Checks if the given builtin is disabled on the current platform
   *
   * @example
   * ```typescript
   * const isDisabled = builtinDisabled("cp")
   * ```
   */
  builtinDisabled: __intrinsic__lazy(106),
};

export const iniInternals = {
  parse: __intrinsic__lazy(107),
  // loadNpmrc: (
  //   src: string,
  //   env?: Record<string, string>,
  // ): {
  //   default_registry_url: string;
  //   default_registry_token: string;
  //   default_registry_username: string;
  //   default_registry_password: string;
  // } => $newZigFunction("ini.zig", "IniTestingAPIs.loadNpmrcFromJS", 2)(src, env),
  loadNpmrc: __intrinsic__lazy(108),
};

export const cssInternals = {
  minifyTestWithOptions: __intrinsic__lazy(109),
  minifyErrorTestWithOptions: __intrinsic__lazy(110),
  testWithOptions: __intrinsic__lazy(111),
  prefixTestWithOptions: __intrinsic__lazy(112),
  minifyTest: __intrinsic__lazy(113),
  prefixTest: __intrinsic__lazy(114),
  _test: __intrinsic__lazy(115),
  attrTest: __intrinsic__lazy(116),
};

export const crash_handler = __intrinsic__lazy(117) as {
  getMachOImageZeroOffset: () => number;
  segfault: () => void;
  panic: () => void;
  rootError: () => void;
  outOfMemory: () => void;
  raiseIgnoringPanicHandler: () => void;
};

export const upgrade_test_helpers = __intrinsic__lazy(118) as {
  openTempDirWithoutSharingDelete: () => void;
  closeTempDirHandle: () => void;
};

export const install_test_helpers = __intrinsic__lazy(119) as {
  /**
   * Returns the lockfile at the given path as an object.
   */
  parseLockfile: (cwd: string) => any;
};

export const jscInternals = __intrinsic__lazy(120);

export const nativeFrameForTesting: (callback: () => void) => void = __intrinsic__lazy(121);

// Linux-only. Create an in-memory file descriptor with a preset size.
// You should call fs.closeSync(fd) when you're done with it.
export const memfd_create: (size: number) => number = __intrinsic__lazy(122);

export const setSyntheticAllocationLimitForTesting: (limit: number) => number = __intrinsic__lazy(123);

export const npm_manifest_test_helpers = __intrinsic__lazy(124) as {
  /**
   * Returns the parsed manifest file. Currently only returns an array of available versions.
   */
  parseManifest: (manifestFileName: string, registryUrl: string) => any;
};

// Like npm-package-arg, sort of https://www.npmjs.com/package/npm-package-arg
export type Dependency = any;
export const npa: (name: string) => Dependency = __intrinsic__lazy(125);

export const npmTag: (
  name: string,
) => undefined | "npm" | "dist_tag" | "tarball" | "folder" | "symlink" | "workspace" | "git" | "github" =
  __intrinsic__lazy(126);

export const readTarball: (tarball: string) => any = __intrinsic__lazy(127);

export const isArchitectureMatch: (architecture: string[]) => boolean = __intrinsic__lazy(128);

export const isOperatingSystemMatch: (operatingSystem: string[]) => boolean = __intrinsic__lazy(129);

export const createSocketPair: () => [number, number] = __intrinsic__lazy(130);

export const isModuleResolveFilenameSlowPathEnabled: () => boolean = __intrinsic__lazy(131);

export const frameworkRouterInternals = __intrinsic__lazy(132) as {
  parseRoutePattern: (style: string, pattern: string) => null | { kind: string; pattern: string };
  FrameworkRouter: {
    new (opts: any): any;
  };
};

export const bindgen = __intrinsic__lazy(133) as {
  add: (a: any, b: any) => number;
  requiredAndOptionalArg: (a: any, b?: any, c?: any, d?: any) => number;
};

export const noOpForTesting = __intrinsic__lazy(134);
export const Dequeue = (__intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 17/*internal/fifo*/) || __intrinsic__createInternalModuleById(17/*internal/fifo*/));

export const fs = (__intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 97/*node:fs/promises*/) || __intrinsic__createInternalModuleById(97/*node:fs/promises*/)).__intrinsic__data;

export const fsStreamInternals = {
  writeStreamFastPath(str) {
    return str[(__intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 23/*internal/fs/streams*/) || __intrinsic__createInternalModuleById(23/*internal/fs/streams*/)).kWriteStreamFastPath];
  },
};

export const arrayBufferViewHasBuffer = __intrinsic__lazy(135);

export const timerInternals = {
  timerClockMs: __intrinsic__lazy(136),
};

export const decodeURIComponentSIMD = __intrinsic__lazy(137);

export const getDevServerDeinitCount = __intrinsic__lazy(138);
export const getCounters = __intrinsic__lazy(139);
export const hasNonReifiedStatic = __intrinsic__lazy(140);

interface setSocketOptionsFn {
  (socket: Bun.Socket, sendBuffer: 1, size: number): void;
  (socket: Bun.Socket, recvBuffer: 2, size: number): void;
}

export const setSocketOptions: setSocketOptionsFn = __intrinsic__lazy(141);
type SerializationContext = "worker" | "window" | "postMessage" | "default";
export const structuredCloneAdvanced: (
  value: any,
  transferList: any[],
  forTransfer: boolean,
  forStorage: boolean,
  serializationContext: SerializationContext,
) => any = __intrinsic__lazy(142);

export const lsanDoLeakCheck = __intrinsic__lazy(143);

export const getEventLoopStats: () => { activeTasks: number; concurrentRef: number; numPolls: number } =
  __intrinsic__lazy(144);

export const hostedGitInfo = {
  parseUrl: __intrinsic__lazy(145),
  fromUrl: __intrinsic__lazy(146),
};
;$$EXPORT$$($).$$EXPORT_END$$;
