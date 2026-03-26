#pragma once
#include "root.h"

namespace {

extern "C" SYSV_ABI JSC::EncodedJSValue bindgen_Bindgen_test_jsAdd(JSC::JSGlobalObject*, JSC::CallFrame*);
extern "C" SYSV_ABI JSC::EncodedJSValue bindgen_Bindgen_test_jsRequiredAndOptionalArg(JSC::JSGlobalObject*, JSC::CallFrame*);

} // namespace

namespace Generated {

/// Generated binding code for src/bun.js/bindgen_test.zig
namespace bindgen_test {

constexpr auto* jsAdd = &bindgen_Bindgen_test_jsAdd;
constexpr auto* jsRequiredAndOptionalArg = &bindgen_Bindgen_test_jsRequiredAndOptionalArg;

} // namespace bindgen_test

} // namespace Generated
