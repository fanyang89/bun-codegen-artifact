// @ts-nocheck
var $;// GENERATED TEMP FILE - DO NOT EDIT
// Sourced from src/js/node/trace_events.ts


// Hardcoded module "node:trace_events"
// This is a stub! This is not actually implemented yet.
class Tracing {
  enabled = false;
  categories = "";
}

function createTracing(opts) {
  if (typeof opts !== "object" || opts == null) {
    // @ts-ignore
    throw __intrinsic__makeErrorWithCode(118, "options", "object", opts);
  }

  // TODO: validate categories
  // @ts-ignore
  return new Tracing(opts);
}

function getEnabledCategories() {
  return "";
}

$ = {
  createTracing,
  getEnabledCategories,
};
;$$EXPORT$$($).$$EXPORT_END$$;
