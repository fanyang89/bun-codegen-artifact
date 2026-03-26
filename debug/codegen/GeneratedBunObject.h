#pragma once
#include "root.h"

namespace {

extern "C" SYSV_ABI JSC::EncodedJSValue bindgen_BunObject_jsBraces(JSC::JSGlobalObject*, JSC::CallFrame*);
extern "C" SYSV_ABI JSC::EncodedJSValue bindgen_BunObject_jsGc(JSC::JSGlobalObject*, JSC::CallFrame*);

} // namespace

namespace Generated {

/// Generated binding code for src/bun.js/api/BunObject.zig
namespace BunObject {

struct BracesOptions {
    bool parse;
    bool tokenize;
};

constexpr auto* jsBraces = &bindgen_BunObject_jsBraces;
constexpr auto* jsGc = &bindgen_BunObject_jsGc;

} // namespace BunObject

} // namespace Generated

namespace WebCore {

} // namespace WebCore
