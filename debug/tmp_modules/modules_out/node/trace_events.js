// @bun
// build/debug/tmp_modules/node/trace_events.ts
var $;

class Tracing {
  enabled = false;
  categories = "";
}
function createTracing(opts) {
  if (typeof opts !== "object" || opts == null) {
    throw __intrinsic__makeErrorWithCode(118, "options", "object", opts);
  }
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
