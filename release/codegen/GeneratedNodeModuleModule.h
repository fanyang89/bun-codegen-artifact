#pragma once
#include "root.h"

namespace {

extern "C" SYSV_ABI JSC::EncodedJSValue bindgen_NodeModuleModule_js_stat(JSC::JSGlobalObject*, JSC::CallFrame*);

} // namespace

namespace Generated {

/// Generated binding code for src/bun.js/bindings/NodeModuleModule.zig
namespace NodeModuleModule {

constexpr auto* js_stat = &bindgen_NodeModuleModule_js_stat;

} // namespace NodeModuleModule

} // namespace Generated
