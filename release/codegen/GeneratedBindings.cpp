#include "root.h"
#include "IDLTypes.h"
#include "JSDOMBinding.h"
#include "JSDOMConvertBase.h"
#include "JSDOMConvertBoolean.h"
#include "JSDOMConvertNumbers.h"
#include "JSDOMConvertStrings.h"
#include "JSDOMExceptionHandling.h"
#include "JSDOMOperation.h"
#include "GeneratedBunObject.h"
#include "ObjectBindings.h"
#include "GeneratedNodeOs.h"
#include "BindgenCustomEnforceRange.h"
#include "ErrorCode.h"
#include "GeneratedFmt.h"
#include "JavaScriptCore/JSCInlines.h"
#include "JavaScriptCore/JSString.h"
#include "wtf/NeverDestroyed.h"
#include "wtf/SortedArrayMap.h"

// These "Arguments" definitions are for communication between C++ and Zig.
// Field layout depends on implementation details in "bindgen.ts", and
// is not intended for usage outside generated binding code.
struct BindgenTestRequiredAndOptionalArgArguments {
    bool bSet;
    bool dSet;
    uint8_t dValue;
    size_t bValue;
};

namespace Generated {

// Internal dictionary parse for BracesOptions
bool convertBunObjectBracesOptions(BunObject::BracesOptions* result, JSC::JSGlobalObject* global, JSC::JSValue value) {
    auto& vm = JSC::getVM(global);
    auto throwScope = DECLARE_THROW_SCOPE(vm);
    bool isNullOrUndefined = value.isUndefinedOrNull();
    auto* object = isNullOrUndefined ? nullptr : value.getObject();
    if (!isNullOrUndefined && !object) [[unlikely]] {
        throwTypeError(global, throwScope);
        return false;
    }
    JSC::JSValue propValue;
    // tokenize
    if (isNullOrUndefined) {
        propValue = JSC::jsUndefined();
    } else {
        propValue = Bun::getIfPropertyExistsPrototypePollutionMitigation(vm, global, object, JSC::Identifier::fromString(vm, "tokenize"_s));
        RETURN_IF_EXCEPTION(throwScope, false);
    }
    if (!propValue.isUndefined()) {
        result->tokenize = WebCore::convert<WebCore::IDLBoolean>(*global, propValue);
        RETURN_IF_EXCEPTION(throwScope, {});
    } else {
        result->tokenize = false;
    }
    // parse
    if (isNullOrUndefined) {
        propValue = JSC::jsUndefined();
    } else {
        propValue = Bun::getIfPropertyExistsPrototypePollutionMitigation(vm, global, object, JSC::Identifier::fromString(vm, "parse"_s));
        RETURN_IF_EXCEPTION(throwScope, false);
    }
    if (!propValue.isUndefined()) {
        result->parse = WebCore::convert<WebCore::IDLBoolean>(*global, propValue);
        RETURN_IF_EXCEPTION(throwScope, {});
    } else {
        result->parse = false;
    }
    return true;
}

// Internal dictionary parse for UserInfoOptions
bool convertnode_osUserInfoOptions(node_os::UserInfoOptions* result, JSC::JSGlobalObject* global, JSC::JSValue value, WTF::String& encoding_str) {
    auto& vm = JSC::getVM(global);
    auto throwScope = DECLARE_THROW_SCOPE(vm);
    bool isNullOrUndefined = value.isUndefinedOrNull();
    auto* object = isNullOrUndefined ? nullptr : value.getObject();
    if (!isNullOrUndefined && !object) [[unlikely]] {
        throwTypeError(global, throwScope);
        return false;
    }
    JSC::JSValue propValue;
    // encoding
    if (isNullOrUndefined) {
        propValue = JSC::jsUndefined();
    } else {
        propValue = Bun::getIfPropertyExistsPrototypePollutionMitigation(vm, global, object, JSC::Identifier::fromString(vm, "encoding"_s));
        RETURN_IF_EXCEPTION(throwScope, false);
    }
    if (!propValue.isUndefined()) {
        encoding_str = WebCore::convert<WebCore::IDLDOMString>(*global, propValue);
        RETURN_IF_EXCEPTION(throwScope, {});
        result->encoding = Bun::toString(encoding_str);
    } else {
        result->encoding = Bun::BunStringEmpty;
    }
    return true;
}

// Dispatch for "fn getDeinitCountForTesting(...)" in "src/bake/DevServer.zig"
extern "C" bool bindgen_DevServer_dispatchGetDeinitCountForTesting1(JSC::JSGlobalObject*, size_t*);
extern "C" SYSV_ABI JSC::EncodedJSValue bindgen_DevServer_jsGetDeinitCountForTesting(JSC::JSGlobalObject* global, JSC::CallFrame* callFrame)
{
    auto& vm = JSC::getVM(global);
    auto throwScope = DECLARE_THROW_SCOPE(vm);
    size_t out;
    if (!bindgen_DevServer_dispatchGetDeinitCountForTesting1(
        global,
        &out
    )) {
        return {};
    }
    return JSC::JSValue::encode(WebCore::toJS<WebCore::IDLUnsignedLongLong>(*global, out));
}

// Dispatch for "fn braces(...)" in "src/bun.js/api/BunObject.zig"
extern "C" JSC::EncodedJSValue bindgen_BunObject_dispatchBraces1(JSC::JSGlobalObject*, const BunString*, const BunObject::BracesOptions*);
extern "C" SYSV_ABI JSC::EncodedJSValue bindgen_BunObject_jsBraces(JSC::JSGlobalObject* global, JSC::CallFrame* callFrame)
{
    auto& vm = JSC::getVM(global);
    auto throwScope = DECLARE_THROW_SCOPE(vm);
    size_t argumentCount = callFrame->argumentCount();
    if (argumentCount < 1) {
        return JSC::throwVMError(global, throwScope, createNotEnoughArgumentsError(global));
    }
    WTF::String wtfString_0;
    JSC::EnsureStillAliveScope arg0 = callFrame->uncheckedArgument(0);
    wtfString_0 = WebCore::convert<WebCore::IDLDOMString>(*global, arg0.value());
    RETURN_IF_EXCEPTION(throwScope, {});
    BunString argInput = Bun::toString(wtfString_0);
    JSC::EnsureStillAliveScope arg1 = callFrame->argument(1);
    BunObject::BracesOptions argOptions;
    if (!arg1.value().isUndefinedOrNull()) {
        auto did_convert = convertBunObjectBracesOptions(&argOptions, global, arg1.value());
        RETURN_IF_EXCEPTION(throwScope, {});
        if (!did_convert) return {};
    } else {
        argOptions = BunObject::BracesOptions {
            .parse = false,
            .tokenize = false,
        };
    }
    return bindgen_BunObject_dispatchBraces1(
        global,
        &argInput,
        &argOptions);
}

// Dispatch for "fn gc(...)" in "src/bun.js/api/BunObject.zig"
extern "C" bool bindgen_BunObject_dispatchGc1(JSC::JSGlobalObject*, const bool*, size_t*);
extern "C" SYSV_ABI JSC::EncodedJSValue bindgen_BunObject_jsGc(JSC::JSGlobalObject* global, JSC::CallFrame* callFrame)
{
    auto& vm = JSC::getVM(global);
    auto throwScope = DECLARE_THROW_SCOPE(vm);
    JSC::EnsureStillAliveScope arg0 = callFrame->argument(0);
    bool argForce;
    if (!arg0.value().isUndefinedOrNull()) {
        argForce = WebCore::convert<WebCore::IDLBoolean>(*global, arg0.value());
        RETURN_IF_EXCEPTION(throwScope, {});
    } else {
        argForce = false;
    }
    size_t out;
    if (!bindgen_BunObject_dispatchGc1(
        global,
        &argForce,
        &out
    )) {
        return {};
    }
    return JSC::JSValue::encode(WebCore::toJS<WebCore::IDLUnsignedLongLong>(*global, out));
}

// Dispatch for "fn add(...)" in "src/bun.js/bindgen_test.zig"
extern "C" bool bindgen_Bindgen_test_dispatchAdd1(JSC::JSGlobalObject*, const int32_t*, const int32_t*, int32_t*);
extern "C" SYSV_ABI JSC::EncodedJSValue bindgen_Bindgen_test_jsAdd(JSC::JSGlobalObject* global, JSC::CallFrame* callFrame)
{
    auto& vm = JSC::getVM(global);
    auto throwScope = DECLARE_THROW_SCOPE(vm);
    size_t argumentCount = callFrame->argumentCount();
    if (argumentCount < 1) {
        return JSC::throwVMError(global, throwScope, createNotEnoughArgumentsError(global));
    }
    JSC::EnsureStillAliveScope arg0 = callFrame->uncheckedArgument(0);
    int32_t argA = WebCore::convert<WebCore::IDLLong>(*global, arg0.value());
    RETURN_IF_EXCEPTION(throwScope, {});
    JSC::EnsureStillAliveScope arg1 = callFrame->argument(1);
    int32_t argB;
    if (!arg1.value().isUndefinedOrNull()) {
        argB = WebCore::convert<WebCore::IDLLong>(*global, arg1.value());
        RETURN_IF_EXCEPTION(throwScope, {});
    } else {
        argB = -1;
    }
    int32_t out;
    if (!bindgen_Bindgen_test_dispatchAdd1(
        global,
        &argA,
        &argB,
        &out
    )) {
        return {};
    }
    return JSC::JSValue::encode(WebCore::toJS<WebCore::IDLLong>(*global, out));
}

// Dispatch for "fn requiredAndOptionalArg(...)" in "src/bun.js/bindgen_test.zig"
extern "C" bool bindgen_Bindgen_test_dispatchRequiredAndOptionalArg1(JSC::JSGlobalObject*, const bool*, const int32_t*, BindgenTestRequiredAndOptionalArgArguments*, int32_t*);
extern "C" SYSV_ABI JSC::EncodedJSValue bindgen_Bindgen_test_jsRequiredAndOptionalArg(JSC::JSGlobalObject* global, JSC::CallFrame* callFrame)
{
    auto& vm = JSC::getVM(global);
    auto throwScope = DECLARE_THROW_SCOPE(vm);
    size_t argumentCount = callFrame->argumentCount();
    if (argumentCount < 1) {
        return JSC::throwVMError(global, throwScope, createNotEnoughArgumentsError(global));
    }
    BindgenTestRequiredAndOptionalArgArguments buf;
    JSC::EnsureStillAliveScope arg0 = callFrame->uncheckedArgument(0);
    bool argA = WebCore::convert<WebCore::IDLBoolean>(*global, arg0.value());
    RETURN_IF_EXCEPTION(throwScope, {});
    JSC::EnsureStillAliveScope arg1 = callFrame->argument(1);
    if ((buf.bSet = !arg1.value().isUndefinedOrNull())) {
        buf.bValue = WebCore::convert<WebCore::IDLUnsignedLongLong>(*global, arg1.value());
        RETURN_IF_EXCEPTION(throwScope, {});
    }
    JSC::EnsureStillAliveScope arg2 = callFrame->argument(2);
    int32_t argC;
    if (!arg2.value().isUndefinedOrNull()) {
        argC = WebCore::convert<Bun::BindgenCustomEnforceRange<int32_t, 0, 100, Bun::BindgenCustomEnforceRangeKind::Web>>(*global, arg2.value());
        RETURN_IF_EXCEPTION(throwScope, {});
    } else {
        argC = 42;
    }
    JSC::EnsureStillAliveScope arg3 = callFrame->argument(3);
    if ((buf.dSet = !arg3.value().isUndefinedOrNull())) {
        buf.dValue = WebCore::convert<WebCore::IDLOctet>(*global, arg3.value());
        RETURN_IF_EXCEPTION(throwScope, {});
    }
    int32_t out;
    if (!bindgen_Bindgen_test_dispatchRequiredAndOptionalArg1(
        global,
        &argA,
        &argC,
        &buf,
        &out
    )) {
        return {};
    }
    return JSC::JSValue::encode(WebCore::toJS<WebCore::IDLLong>(*global, out));
}

// Dispatch for "fn _stat(...)" in "src/bun.js/bindings/NodeModuleModule.zig"
extern "C" bool bindgen_NodeModuleModule_dispatch_stat1(JSC::JSGlobalObject*, const BunString*, int32_t*);
extern "C" SYSV_ABI JSC::EncodedJSValue bindgen_NodeModuleModule_js_stat(JSC::JSGlobalObject* global, JSC::CallFrame* callFrame)
{
    auto& vm = JSC::getVM(global);
    auto throwScope = DECLARE_THROW_SCOPE(vm);
    size_t argumentCount = callFrame->argumentCount();
    if (argumentCount < 1) {
        return JSC::throwVMError(global, throwScope, createNotEnoughArgumentsError(global));
    }
    WTF::String wtfString_0;
    JSC::EnsureStillAliveScope arg0 = callFrame->uncheckedArgument(0);
    wtfString_0 = WebCore::convert<WebCore::IDLDOMString>(*global, arg0.value());
    RETURN_IF_EXCEPTION(throwScope, {});
    BunString argStr = Bun::toString(wtfString_0);
    int32_t out;
    if (!bindgen_NodeModuleModule_dispatch_stat1(
        global,
        &argStr,
        &out
    )) {
        return {};
    }
    return JSC::JSValue::encode(WebCore::toJS<WebCore::IDLLong>(*global, out));
}

// Dispatch for "fn cpus(...)" in "src/bun.js/node/node_os.zig"
extern "C" JSC::EncodedJSValue bindgen_Node_os_dispatchCpus1(JSC::JSGlobalObject*);
extern "C" SYSV_ABI JSC::EncodedJSValue bindgen_Node_os_jsCpus(JSC::JSGlobalObject* global, JSC::CallFrame* callFrame)
{
    auto& vm = JSC::getVM(global);
    auto throwScope = DECLARE_THROW_SCOPE(vm);
    return bindgen_Node_os_dispatchCpus1(
        global);
}

// Dispatch for "fn freemem(...)" in "src/bun.js/node/node_os.zig"
extern "C" bool bindgen_Node_os_dispatchFreemem1(JSC::JSGlobalObject*, uint64_t*);
extern "C" SYSV_ABI JSC::EncodedJSValue bindgen_Node_os_jsFreemem(JSC::JSGlobalObject* global, JSC::CallFrame* callFrame)
{
    auto& vm = JSC::getVM(global);
    auto throwScope = DECLARE_THROW_SCOPE(vm);
    uint64_t out;
    if (!bindgen_Node_os_dispatchFreemem1(
        global,
        &out
    )) {
        return {};
    }
    return JSC::JSValue::encode(WebCore::toJS<WebCore::IDLUnsignedLongLong>(*global, out));
}

// Dispatch for "fn getPriority(...)" in "src/bun.js/node/node_os.zig"
extern "C" bool bindgen_Node_os_dispatchGetPriority1(JSC::JSGlobalObject*, const int32_t*, int32_t*);
extern "C" SYSV_ABI JSC::EncodedJSValue bindgen_Node_os_jsGetPriority(JSC::JSGlobalObject* global, JSC::CallFrame* callFrame)
{
    auto& vm = JSC::getVM(global);
    auto throwScope = DECLARE_THROW_SCOPE(vm);
    JSC::EnsureStillAliveScope arg0 = callFrame->argument(0);
    int32_t argPid;
    if (!arg0.value().isUndefined()) {
        argPid = WebCore::convert<Bun::BindgenCustomEnforceRange<int32_t, -2147483648, 2147483647, Bun::BindgenCustomEnforceRangeKind::Node>>(*global, arg0.value(), []() { return "pid"_s; });
        RETURN_IF_EXCEPTION(throwScope, {});
    } else {
        argPid = 0;
    }
    int32_t out;
    if (!bindgen_Node_os_dispatchGetPriority1(
        global,
        &argPid,
        &out
    )) {
        return {};
    }
    return JSC::JSValue::encode(WebCore::toJS<WebCore::IDLLong>(*global, out));
}

// Dispatch for "fn homedir(...)" in "src/bun.js/node/node_os.zig"
extern "C" bool bindgen_Node_os_dispatchHomedir1(JSC::JSGlobalObject*, BunString*);
extern "C" SYSV_ABI JSC::EncodedJSValue bindgen_Node_os_jsHomedir(JSC::JSGlobalObject* global, JSC::CallFrame* callFrame)
{
    auto& vm = JSC::getVM(global);
    auto throwScope = DECLARE_THROW_SCOPE(vm);
    BunString out;
    if (!bindgen_Node_os_dispatchHomedir1(
        global,
        &out
    )) {
        return {};
    }
    return JSC::JSValue::encode(WebCore::toJS<WebCore::IDLDOMString>(*global, out.toWTFString()));
}

// Dispatch for "fn hostname(...)" in "src/bun.js/node/node_os.zig"
extern "C" JSC::EncodedJSValue bindgen_Node_os_dispatchHostname1(JSC::JSGlobalObject*);
extern "C" SYSV_ABI JSC::EncodedJSValue bindgen_Node_os_jsHostname(JSC::JSGlobalObject* global, JSC::CallFrame* callFrame)
{
    auto& vm = JSC::getVM(global);
    auto throwScope = DECLARE_THROW_SCOPE(vm);
    return bindgen_Node_os_dispatchHostname1(
        global);
}

// Dispatch for "fn loadavg(...)" in "src/bun.js/node/node_os.zig"
extern "C" JSC::EncodedJSValue bindgen_Node_os_dispatchLoadavg1(JSC::JSGlobalObject*);
extern "C" SYSV_ABI JSC::EncodedJSValue bindgen_Node_os_jsLoadavg(JSC::JSGlobalObject* global, JSC::CallFrame* callFrame)
{
    auto& vm = JSC::getVM(global);
    auto throwScope = DECLARE_THROW_SCOPE(vm);
    return bindgen_Node_os_dispatchLoadavg1(
        global);
}

// Dispatch for "fn networkInterfaces(...)" in "src/bun.js/node/node_os.zig"
extern "C" JSC::EncodedJSValue bindgen_Node_os_dispatchNetworkInterfaces1(JSC::JSGlobalObject*);
extern "C" SYSV_ABI JSC::EncodedJSValue bindgen_Node_os_jsNetworkInterfaces(JSC::JSGlobalObject* global, JSC::CallFrame* callFrame)
{
    auto& vm = JSC::getVM(global);
    auto throwScope = DECLARE_THROW_SCOPE(vm);
    return bindgen_Node_os_dispatchNetworkInterfaces1(
        global);
}

// Dispatch for "fn release(...)" in "src/bun.js/node/node_os.zig"
extern "C" bool bindgen_Node_os_dispatchRelease1(JSC::JSGlobalObject*, BunString*);
extern "C" SYSV_ABI JSC::EncodedJSValue bindgen_Node_os_jsRelease(JSC::JSGlobalObject* global, JSC::CallFrame* callFrame)
{
    auto& vm = JSC::getVM(global);
    auto throwScope = DECLARE_THROW_SCOPE(vm);
    BunString out;
    if (!bindgen_Node_os_dispatchRelease1(
        global,
        &out
    )) {
        return {};
    }
    return JSC::JSValue::encode(WebCore::toJS<WebCore::IDLDOMString>(*global, out.toWTFString()));
}

// Dispatch for "fn totalmem(...)" in "src/bun.js/node/node_os.zig"
extern "C" bool bindgen_Node_os_dispatchTotalmem1(JSC::JSGlobalObject*, uint64_t*);
extern "C" SYSV_ABI JSC::EncodedJSValue bindgen_Node_os_jsTotalmem(JSC::JSGlobalObject* global, JSC::CallFrame* callFrame)
{
    auto& vm = JSC::getVM(global);
    auto throwScope = DECLARE_THROW_SCOPE(vm);
    uint64_t out;
    if (!bindgen_Node_os_dispatchTotalmem1(
        global,
        &out
    )) {
        return {};
    }
    return JSC::JSValue::encode(WebCore::toJS<WebCore::IDLUnsignedLongLong>(*global, out));
}

// Dispatch for "fn uptime(...)" in "src/bun.js/node/node_os.zig"
extern "C" bool bindgen_Node_os_dispatchUptime1(JSC::JSGlobalObject*, double*);
extern "C" SYSV_ABI JSC::EncodedJSValue bindgen_Node_os_jsUptime(JSC::JSGlobalObject* global, JSC::CallFrame* callFrame)
{
    auto& vm = JSC::getVM(global);
    auto throwScope = DECLARE_THROW_SCOPE(vm);
    double out;
    if (!bindgen_Node_os_dispatchUptime1(
        global,
        &out
    )) {
        return {};
    }
    return JSC::JSValue::encode(WebCore::toJS<WebCore::IDLUnrestrictedDouble>(*global, out));
}

// Dispatch for "fn userInfo(...)" in "src/bun.js/node/node_os.zig"
extern "C" JSC::EncodedJSValue bindgen_Node_os_dispatchUserInfo1(JSC::JSGlobalObject*, const node_os::UserInfoOptions*);
extern "C" SYSV_ABI JSC::EncodedJSValue bindgen_Node_os_jsUserInfo(JSC::JSGlobalObject* global, JSC::CallFrame* callFrame)
{
    auto& vm = JSC::getVM(global);
    auto throwScope = DECLARE_THROW_SCOPE(vm);
    WTF::String wtfString_0;
    JSC::EnsureStillAliveScope arg0 = callFrame->argument(0);
    node_os::UserInfoOptions argOptions;
    if (!arg0.value().isUndefinedOrNull()) {
        auto did_convert = convertnode_osUserInfoOptions(&argOptions, global, arg0.value(), wtfString_0);
        RETURN_IF_EXCEPTION(throwScope, {});
        if (!did_convert) return {};
    } else {
        argOptions = node_os::UserInfoOptions {
            .encoding = Bun::BunStringEmpty,
        };
    }
    return bindgen_Node_os_dispatchUserInfo1(
        global,
        &argOptions);
}

// Dispatch for "fn version(...)" in "src/bun.js/node/node_os.zig"
extern "C" bool bindgen_Node_os_dispatchVersion1(JSC::JSGlobalObject*, BunString*);
extern "C" SYSV_ABI JSC::EncodedJSValue bindgen_Node_os_jsVersion(JSC::JSGlobalObject* global, JSC::CallFrame* callFrame)
{
    auto& vm = JSC::getVM(global);
    auto throwScope = DECLARE_THROW_SCOPE(vm);
    BunString out;
    if (!bindgen_Node_os_dispatchVersion1(
        global,
        &out
    )) {
        return {};
    }
    return JSC::JSValue::encode(WebCore::toJS<WebCore::IDLDOMString>(*global, out.toWTFString()));
}

// Dispatch for "fn setPriority(...)" in "src/bun.js/node/node_os.zig"
extern "C" bool bindgen_Node_os_dispatchSetPriority1(JSC::JSGlobalObject*, const int32_t*, const int32_t*);
extern "C" SYSV_ABI JSC::EncodedJSValue bindgen_Node_os_jsSetPriority_v1(JSC::JSGlobalObject* global, JSC::CallFrame* callFrame)
{
    auto& vm = JSC::getVM(global);
    auto throwScope = DECLARE_THROW_SCOPE(vm);
    size_t argumentCount = callFrame->argumentCount();
    if (argumentCount < 2) {
        return JSC::throwVMError(global, throwScope, createNotEnoughArgumentsError(global));
    }
    JSC::EnsureStillAliveScope arg0 = callFrame->uncheckedArgument(0);
    int32_t argPid = WebCore::convert<Bun::BindgenCustomEnforceRange<int32_t, -2147483648, 2147483647, Bun::BindgenCustomEnforceRangeKind::Node>>(*global, arg0.value(), []() { return "pid"_s; });
    RETURN_IF_EXCEPTION(throwScope, {});
    JSC::EnsureStillAliveScope arg1 = callFrame->uncheckedArgument(1);
    int32_t argPriority = WebCore::convert<Bun::BindgenCustomEnforceRange<int32_t, -20, 19, Bun::BindgenCustomEnforceRangeKind::Node>>(*global, arg1.value(), []() { return "priority"_s; });
    RETURN_IF_EXCEPTION(throwScope, {});
    if (!bindgen_Node_os_dispatchSetPriority1(
        global,
        &argPid,
        &argPriority)) {
        return {};
    }
    return JSC::JSValue::encode(JSC::jsUndefined());
}
extern "C" bool bindgen_Node_os_dispatchSetPriority2(JSC::JSGlobalObject*, const int32_t*);
extern "C" SYSV_ABI JSC::EncodedJSValue bindgen_Node_os_jsSetPriority_v2(JSC::JSGlobalObject* global, JSC::CallFrame* callFrame)
{
    auto& vm = JSC::getVM(global);
    auto throwScope = DECLARE_THROW_SCOPE(vm);
    size_t argumentCount = callFrame->argumentCount();
    if (argumentCount < 1) {
        return JSC::throwVMError(global, throwScope, createNotEnoughArgumentsError(global));
    }
    JSC::EnsureStillAliveScope arg0 = callFrame->uncheckedArgument(0);
    int32_t argPriority = WebCore::convert<Bun::BindgenCustomEnforceRange<int32_t, -20, 19, Bun::BindgenCustomEnforceRangeKind::Node>>(*global, arg0.value(), []() { return "priority"_s; });
    RETURN_IF_EXCEPTION(throwScope, {});
    if (!bindgen_Node_os_dispatchSetPriority2(
        global,
        &argPriority)) {
        return {};
    }
    return JSC::JSValue::encode(JSC::jsUndefined());
}
extern "C" SYSV_ABI JSC::EncodedJSValue bindgen_Node_os_jsSetPriority(JSC::JSGlobalObject* global, JSC::CallFrame* callFrame)
{
    auto& vm = JSC::getVM(global);
    auto throwScope = DECLARE_THROW_SCOPE(vm);
    size_t argumentCount = std::min<size_t>(callFrame->argumentCount(), 3);
    if (argumentCount < 1) {
        return JSC::throwVMError(global, throwScope, createNotEnoughArgumentsError(global));
    }
    if (argumentCount >= 2) {
        RELEASE_AND_RETURN(throwScope, bindgen_Node_os_jsSetPriority_v1(global, callFrame));
    }
    RELEASE_AND_RETURN(throwScope, bindgen_Node_os_jsSetPriority_v2(global, callFrame));
}

// Dispatch for "fn fmtString(...)" in "src/fmt.zig"
extern "C" bool bindgen_Fmt_dispatchFmtString1(JSC::JSGlobalObject*, const BunString*, const fmt::Formatter*, BunString*);
extern "C" SYSV_ABI JSC::EncodedJSValue bindgen_Fmt_jsFmtString(JSC::JSGlobalObject* global, JSC::CallFrame* callFrame)
{
    auto& vm = JSC::getVM(global);
    auto throwScope = DECLARE_THROW_SCOPE(vm);
    size_t argumentCount = callFrame->argumentCount();
    if (argumentCount < 2) {
        return JSC::throwVMError(global, throwScope, createNotEnoughArgumentsError(global));
    }
    WTF::String wtfString_0;
    JSC::EnsureStillAliveScope arg0 = callFrame->uncheckedArgument(0);
    wtfString_0 = WebCore::convert<WebCore::IDLDOMString>(*global, arg0.value());
    RETURN_IF_EXCEPTION(throwScope, {});
    BunString argCode = Bun::toString(wtfString_0);
    JSC::EnsureStillAliveScope arg1 = callFrame->uncheckedArgument(1);
    fmt::Formatter argFormatter = WebCore::convert<WebCore::IDLEnumeration<fmt::Formatter>>(*global, arg1.value(), [](JSC::JSGlobalObject& global, JSC::ThrowScope& scope) { WebCore::throwArgumentMustBeEnumError(global, scope, 1, "formatter"_s, "Formatter"_s, "fmtString"_s, WebCore::expectedEnumerationValues<fmt::Formatter>()); });
    RETURN_IF_EXCEPTION(throwScope, {});
    BunString out;
    if (!bindgen_Fmt_dispatchFmtString1(
        global,
        &argCode,
        &argFormatter,
        &out
    )) {
        return {};
    }
    return JSC::JSValue::encode(WebCore::toJS<WebCore::IDLDOMString>(*global, out.toWTFString()));
}

} // namespace Generated

namespace WebCore {

String convertEnumerationToString(Generated::fmt::Formatter enumerationValue) {
        static const NeverDestroyed<String> values[] = {
                MAKE_STATIC_STRING_IMPL("escape-powershell"),
                MAKE_STATIC_STRING_IMPL("highlight-javascript"),
        };
        return values[static_cast<size_t>(enumerationValue)];
}

template<> JSString* convertEnumerationToJS(JSC::JSGlobalObject& global, Generated::fmt::Formatter enumerationValue) {
    return jsStringWithCache(global.vm(), convertEnumerationToString(enumerationValue));
}

template<> std::optional<Generated::fmt::Formatter> parseEnumerationFromString<Generated::fmt::Formatter>(const String& stringValue)
{
    static constexpr SortedArrayMap enumerationMapping { std::to_array<std::pair<ComparableASCIILiteral, Generated::fmt::Formatter>>({
        { "escape-powershell"_s, Generated::fmt::Formatter::EscapePowershell },
        { "highlight-javascript"_s, Generated::fmt::Formatter::HighlightJavascript },
    }) };
    if (auto* enumerationValue = enumerationMapping.tryGet(stringValue); enumerationValue) [[likely]]
        return *enumerationValue;
    return std::nullopt;
}

template<> std::optional<Generated::fmt::Formatter> parseEnumeration<Generated::fmt::Formatter>(JSGlobalObject& lexicalGlobalObject, JSValue value)
{
    return parseEnumerationFromString<Generated::fmt::Formatter>(value.toWTFString(&lexicalGlobalObject));
}

template<> ASCIILiteral expectedEnumerationValues<Generated::fmt::Formatter>()
{
    return "\"escape-powershell\", \"highlight-javascript\""_s;
}

} // namespace WebCore
