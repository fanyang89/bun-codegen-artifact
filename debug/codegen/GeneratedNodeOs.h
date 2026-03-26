#pragma once
#include "root.h"

namespace {

extern "C" SYSV_ABI JSC::EncodedJSValue bindgen_Node_os_jsCpus(JSC::JSGlobalObject*, JSC::CallFrame*);
extern "C" SYSV_ABI JSC::EncodedJSValue bindgen_Node_os_jsFreemem(JSC::JSGlobalObject*, JSC::CallFrame*);
extern "C" SYSV_ABI JSC::EncodedJSValue bindgen_Node_os_jsGetPriority(JSC::JSGlobalObject*, JSC::CallFrame*);
extern "C" SYSV_ABI JSC::EncodedJSValue bindgen_Node_os_jsHomedir(JSC::JSGlobalObject*, JSC::CallFrame*);
extern "C" SYSV_ABI JSC::EncodedJSValue bindgen_Node_os_jsHostname(JSC::JSGlobalObject*, JSC::CallFrame*);
extern "C" SYSV_ABI JSC::EncodedJSValue bindgen_Node_os_jsLoadavg(JSC::JSGlobalObject*, JSC::CallFrame*);
extern "C" SYSV_ABI JSC::EncodedJSValue bindgen_Node_os_jsNetworkInterfaces(JSC::JSGlobalObject*, JSC::CallFrame*);
extern "C" SYSV_ABI JSC::EncodedJSValue bindgen_Node_os_jsRelease(JSC::JSGlobalObject*, JSC::CallFrame*);
extern "C" SYSV_ABI JSC::EncodedJSValue bindgen_Node_os_jsTotalmem(JSC::JSGlobalObject*, JSC::CallFrame*);
extern "C" SYSV_ABI JSC::EncodedJSValue bindgen_Node_os_jsUptime(JSC::JSGlobalObject*, JSC::CallFrame*);
extern "C" SYSV_ABI JSC::EncodedJSValue bindgen_Node_os_jsUserInfo(JSC::JSGlobalObject*, JSC::CallFrame*);
extern "C" SYSV_ABI JSC::EncodedJSValue bindgen_Node_os_jsVersion(JSC::JSGlobalObject*, JSC::CallFrame*);
extern "C" SYSV_ABI JSC::EncodedJSValue bindgen_Node_os_jsSetPriority(JSC::JSGlobalObject*, JSC::CallFrame*);

} // namespace

namespace Generated {

/// Generated binding code for src/bun.js/node/node_os.zig
namespace node_os {

struct UserInfoOptions {
    BunString encoding;
};

constexpr auto* jsCpus = &bindgen_Node_os_jsCpus;
constexpr auto* jsFreemem = &bindgen_Node_os_jsFreemem;
constexpr auto* jsGetPriority = &bindgen_Node_os_jsGetPriority;
constexpr auto* jsHomedir = &bindgen_Node_os_jsHomedir;
constexpr auto* jsHostname = &bindgen_Node_os_jsHostname;
constexpr auto* jsLoadavg = &bindgen_Node_os_jsLoadavg;
constexpr auto* jsNetworkInterfaces = &bindgen_Node_os_jsNetworkInterfaces;
constexpr auto* jsRelease = &bindgen_Node_os_jsRelease;
constexpr auto* jsTotalmem = &bindgen_Node_os_jsTotalmem;
constexpr auto* jsUptime = &bindgen_Node_os_jsUptime;
constexpr auto* jsUserInfo = &bindgen_Node_os_jsUserInfo;
constexpr auto* jsVersion = &bindgen_Node_os_jsVersion;
constexpr auto* jsSetPriority = &bindgen_Node_os_jsSetPriority;

} // namespace node_os

} // namespace Generated

namespace WebCore {

} // namespace WebCore
