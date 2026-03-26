// @bun
// build/release/tmp_modules/internal/util/colors.ts
var $, exports = {
  blue: "",
  green: "",
  white: "",
  yellow: "",
  red: "",
  gray: "",
  clear: "",
  reset: "",
  hasColors: !1,
  shouldColorize(stream) {
    if (process.env.FORCE_COLOR !== __intrinsic__undefined)
      return (__intrinsic__getInternalField(__intrinsic__internalModuleRegistry, 62) || __intrinsic__createInternalModuleById(62)).getColorDepth(process.env) > 2;
    return stream?.isTTY && (typeof stream.getColorDepth === "function" ? stream.getColorDepth() > 2 : !0);
  },
  refresh() {
    if (exports.shouldColorize(process.stderr))
      exports.blue = "\x1B[34m", exports.green = "\x1B[32m", exports.white = "\x1B[39m", exports.yellow = "\x1B[33m", exports.red = "\x1B[31m", exports.gray = "\x1B[90m", exports.clear = "\x1Bc", exports.reset = "\x1B[0m", exports.hasColors = !0;
    else
      exports.blue = "", exports.green = "", exports.white = "", exports.yellow = "", exports.red = "", exports.gray = "", exports.clear = "", exports.reset = "", exports.hasColors = !1;
  }
};
exports.refresh();
$ = exports;
$$EXPORT$$($).$$EXPORT_END$$;
