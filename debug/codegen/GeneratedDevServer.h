#pragma once
#include "root.h"

namespace {

extern "C" SYSV_ABI JSC::EncodedJSValue bindgen_DevServer_jsGetDeinitCountForTesting(JSC::JSGlobalObject*, JSC::CallFrame*);

} // namespace

namespace Generated {

/// Generated binding code for src/bake/DevServer.zig
namespace DevServer {

constexpr auto* jsGetDeinitCountForTesting = &bindgen_DevServer_jsGetDeinitCountForTesting;

} // namespace DevServer

} // namespace Generated
