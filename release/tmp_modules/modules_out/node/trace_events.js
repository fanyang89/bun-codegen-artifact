// @bun
// build/release/tmp_modules/node/trace_events.ts
var $;

class Tracing {
  enabled = !1;
  categories = "";
}
function createTracing(opts) {
  if (typeof opts !== "object" || opts == null)
    throw __intrinsic__makeErrorWithCode(118, "options", "object", opts);
  return new Tracing(opts);
}
function getEnabledCategories() {
  return "";
}
$ = {
  createTracing,
  getEnabledCategories
};
$$EXPORT$$($).$$EXPORT_END$$;
