(function (){"use strict";// build/debug/tmp_modules/internal/tty.ts
var $;
var COLORS_2 = 1;
var COLORS_16 = 4;
var COLORS_256 = 8;
var COLORS_16m = 24;
var TERM_ENVS = {
  eterm: COLORS_16,
  cons25: COLORS_16,
  console: COLORS_16,
  cygwin: COLORS_16,
  dtterm: COLORS_16,
  gnome: COLORS_16,
  hurd: COLORS_16,
  jfbterm: COLORS_16,
  konsole: COLORS_16,
  kterm: COLORS_16,
  mlterm: COLORS_16,
  mosh: COLORS_16m,
  putty: COLORS_16,
  st: COLORS_16,
  "rxvt-unicode-24bit": COLORS_16m,
  terminator: COLORS_16m
};
var TERM_ENVS_REG_EXP = [/ansi/, /color/, /linux/, /^con[0-9]*x[0-9]/, /^rxvt/, /^screen/, /^xterm/, /^vt100/];
var warned = false;
function warnOnDeactivatedColors(env) {
  if (warned)
    return;
  let name = "";
  if (env.NODE_DISABLE_COLORS !== @undefined)
    name = "NODE_DISABLE_COLORS";
  if (env.NO_COLOR !== @undefined) {
    if (name !== "") {
      name += "' and '";
    }
    name += "NO_COLOR";
  }
  if (name !== "") {
    process.emitWarning(`The '${name}' env is ignored due to the 'FORCE_COLOR' env being set.`, "Warning");
    warned = true;
  }
}
function getColorDepth(env) {
  const FORCE_COLOR = env.FORCE_COLOR;
  if (FORCE_COLOR !== @undefined) {
    switch (FORCE_COLOR) {
      case "":
      case "1":
      case "true":
        warnOnDeactivatedColors(env);
        return COLORS_16;
      case "2":
        warnOnDeactivatedColors(env);
        return COLORS_256;
      case "3":
        warnOnDeactivatedColors(env);
        return COLORS_16m;
      default:
        return COLORS_2;
    }
  }
  if (env.NODE_DISABLE_COLORS !== @undefined || env.NO_COLOR !== @undefined || env.TERM === "dumb") {
    return COLORS_2;
  }
  if (false) {}
  if (env.TMUX) {
    return COLORS_256;
  }
  if (env.CI) {
    if (["APPVEYOR", "BUILDKITE", "CIRCLECI", "DRONE", "GITHUB_ACTIONS", "GITLAB_CI", "TRAVIS"].some((sign) => (sign in env)) || env.CI_NAME === "codeship") {
      return COLORS_256;
    }
    return COLORS_2;
  }
  const TEAMCITY_VERSION = env.TEAMCITY_VERSION;
  if (TEAMCITY_VERSION) {
    return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(TEAMCITY_VERSION) ? COLORS_16 : COLORS_2;
  }
  switch (env.TERM_PROGRAM) {
    case "iTerm.app":
      if (!env.TERM_PROGRAM_VERSION || /^[0-2]\./.test(env.TERM_PROGRAM_VERSION)) {
        return COLORS_256;
      }
      return COLORS_16m;
    case "HyperTerm":
    case "ghostty":
    case "WezTerm":
    case "MacTerm":
      return COLORS_16m;
    case "Apple_Terminal":
      return COLORS_256;
  }
  const COLORTERM = env.COLORTERM;
  if (COLORTERM === "truecolor" || COLORTERM === "24bit") {
    return COLORS_16m;
  }
  const TERM = env.TERM;
  if (TERM) {
    if (TERM.startsWith("xterm-256") !== null) {
      return COLORS_256;
    }
    const termEnv = TERM.toLowerCase();
    if (TERM_ENVS[termEnv]) {
      return TERM_ENVS[termEnv];
    }
    if (TERM_ENVS_REG_EXP.some((term) => term.test(termEnv))) {
      return COLORS_16;
    }
  }
  if (env.COLORTERM) {
    return COLORS_16;
  }
  return COLORS_2;
}
$ = { getColorDepth };
return $})
