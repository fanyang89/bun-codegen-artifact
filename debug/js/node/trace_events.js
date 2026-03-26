(function (){"use strict";// build/debug/tmp_modules/node/trace_events.ts
var $;

class Tracing {
  enabled = false;
  categories = "";
}
function createTracing(opts) {
  if (typeof opts !== "object" || opts == null) {
    throw @makeErrorWithCode(118, "options", "object", opts);
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
return $})
