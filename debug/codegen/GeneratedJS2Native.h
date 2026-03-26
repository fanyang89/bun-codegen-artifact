#pragma once
#include "root.h"
#include "JSSQLStatement.h"
#include "JSX509Certificate.h"
#include "NodeHTTP.h"
#include "JSFetchHeaders.h"
#include "JSNodePerformanceHooksHistogramPrototype.h"
#include "ReadableStream.h"
#include "JSMIMEParams.h"
#include "NodeValidator.h"
#include "NodeAsyncHooks.h"
#include "node_crypto_binding.h"
#include "JSEventTargetNode.h"
#include "JSEventTarget.h"
#include "JSInspectorProfiler.h"
#include "Path.h"
#include "JSNodePerformanceHooksHistogram.h"
#include "NodeTLS.h"
#include "ProcessBindingTTYWrap.h"
#include "NodeURL.h"
#include "NodeUtilTypesModule.h"
#include "NodeVM.h"
#include "Worker.h"
#include "ZigGlobalObject.h"
#include "NodeFetch.h"
#include "Undici.h"
#include "JSWebSocket.h"
#include "JSCTestingHelpers.h"
#include "CallSite.h"
#include "NodeModuleModule.h"
#include "NoOpForTesting.h"
#include "InternalForTesting.h"
#include "decodeURIComponentSIMD.h"
#include "StructuredClone.h"
#include "BakeAdditionsToGlobalObject.h"
extern "C" SYSV_ABI JSC::EncodedJSValue JS2Zig___src_bun_js_node_node_assert_binding_zig__generate_workaround(Zig::GlobalObject*);

extern "C" SYSV_ABI JSC::EncodedJSValue JS2Zig___src_sql_mysql_zig__createBinding_workaround(Zig::GlobalObject*);

extern "C" SYSV_ABI JSC::EncodedJSValue JS2Zig___src_sql_postgres_zig__createBinding_workaround(Zig::GlobalObject*);

extern "C" SYSV_ABI JSC::EncodedJSValue JS2Zig___src_bun_js_node_node_crypto_binding_zig__createNodeCryptoBindingZig_workaround(Zig::GlobalObject*);

extern "C" SYSV_ABI JSC::EncodedJSValue JS2Zig___src_bun_js_node_node_fs_binding_zig__createBinding_workaround(Zig::GlobalObject*);

extern "C" SYSV_ABI JSC::EncodedJSValue JS2Zig___src_bun_js_api_bun_h__frame_parser_zig__H_FrameParserConstructor_workaround(Zig::GlobalObject*);

extern "C" SYSV_ABI JSC::EncodedJSValue JS2Zig___src_bun_js_node_node_net_binding_zig__getDefaultAutoSelectFamily_workaround(Zig::GlobalObject*);

extern "C" SYSV_ABI JSC::EncodedJSValue JS2Zig___src_bun_js_node_node_net_binding_zig__setDefaultAutoSelectFamily_workaround(Zig::GlobalObject*);

extern "C" SYSV_ABI JSC::EncodedJSValue JS2Zig___src_bun_js_node_node_net_binding_zig__getDefaultAutoSelectFamilyAttemptTimeout_workaround(Zig::GlobalObject*);

extern "C" SYSV_ABI JSC::EncodedJSValue JS2Zig___src_bun_js_node_node_net_binding_zig__setDefaultAutoSelectFamilyAttemptTimeout_workaround(Zig::GlobalObject*);

extern "C" SYSV_ABI JSC::EncodedJSValue JS2Zig___src_bun_js_node_node_net_binding_zig__SocketAddress_workaround(Zig::GlobalObject*);

extern "C" SYSV_ABI JSC::EncodedJSValue JS2Zig___src_bun_js_node_node_net_binding_zig__BlockList_workaround(Zig::GlobalObject*);

extern "C" SYSV_ABI JSC::EncodedJSValue JS2Zig___src_bun_js_node_node_os_zig__createNodeOsBinding_workaround(Zig::GlobalObject*);

extern "C" SYSV_ABI JSC::EncodedJSValue JS2Zig___src_bun_js_node_node_zlib_binding_zig__NativeZlib_workaround(Zig::GlobalObject*);

extern "C" SYSV_ABI JSC::EncodedJSValue JS2Zig___src_bun_js_node_node_zlib_binding_zig__NativeBrotli_workaround(Zig::GlobalObject*);

extern "C" SYSV_ABI JSC::EncodedJSValue JS2Zig___src_bun_js_node_node_zlib_binding_zig__NativeZstd_workaround(Zig::GlobalObject*);

extern "C" SYSV_ABI JSC::EncodedJSValue JS2Zig___src_crash_handler_zig__js_bindings_generate_workaround(Zig::GlobalObject*);

extern "C" SYSV_ABI JSC::EncodedJSValue JS2Zig___src_cli_upgrade_command_zig__upgrade_js_bindings_generate_workaround(Zig::GlobalObject*);

extern "C" SYSV_ABI JSC::EncodedJSValue JS2Zig___src_install_install_binding_zig__bun_install_js_bindings_generate_workaround(Zig::GlobalObject*);

extern "C" SYSV_ABI JSC::EncodedJSValue JS2Zig___src_install_npm_zig__PackageManifest_bindings_generate_workaround(Zig::GlobalObject*);

extern "C" SYSV_ABI JSC::EncodedJSValue JS2Zig___src_bake_FrameworkRouter_zig__JSFrameworkRouter_getBindings_workaround(Zig::GlobalObject*);

extern "C" SYSV_ABI JSC::EncodedJSValue JS2Zig___src_bun_js_bindgen_test_zig__getBindgenTestFunctions_workaround(Zig::GlobalObject*);

BUN_DECLARE_HOST_FUNCTION(JS2Zig___src_bun_js_api_ffi_zig__Bun__FFI__cc);
BUN_DECLARE_HOST_FUNCTION(JS2Zig___src_bun_js_node_node_cluster_binding_zig__sendHelperPrimary);
BUN_DECLARE_HOST_FUNCTION(JS2Zig___src_bun_js_node_node_cluster_binding_zig__sendHelperChild);
BUN_DECLARE_HOST_FUNCTION(JS2Zig___src_bun_js_node_node_cluster_binding_zig__onInternalMessageChild);
BUN_DECLARE_HOST_FUNCTION(JS2Zig___src_bun_js_node_node_cluster_binding_zig__channelIgnoreOneDisconnectEventListener);
BUN_DECLARE_HOST_FUNCTION(JS2Zig___src_bun_js_node_node_cluster_binding_zig__onInternalMessagePrimary);
BUN_DECLARE_HOST_FUNCTION(JS2Zig___src_bun_js_node_node_http_binding_zig__setMaxHTTPHeaderSize);
BUN_DECLARE_HOST_FUNCTION(JS2Zig___src_bun_js_node_node_http_binding_zig__getMaxHTTPHeaderSize);
BUN_DECLARE_HOST_FUNCTION(JS2Zig___src_bun_js_node_node_util_binding_zig__extractedSplitNewLinesFastPathStringsOnly);
BUN_DECLARE_HOST_FUNCTION(JS2Zig___src_string_zig__String_jsGetStringWidth);
BUN_DECLARE_HOST_FUNCTION(JS2Zig___src_bun_js_node_node_util_binding_zig__normalizeEncoding);
BUN_DECLARE_HOST_FUNCTION(JS2Zig___src_bun_js_api_bun_socket_zig__jsUpgradeDuplexToTLS);
BUN_DECLARE_HOST_FUNCTION(JS2Zig___src_bun_js_webcore_fetch_zig__nodeHttpClient);
BUN_DECLARE_HOST_FUNCTION(JS2Zig___src_bun_js_node_node_http_binding_zig__getBunServerAllClosedPromise);
BUN_DECLARE_HOST_FUNCTION(JS2Zig___src_bun_js_node_node_util_binding_zig__etimedoutErrorCode);
BUN_DECLARE_HOST_FUNCTION(JS2Zig___src_bun_js_node_node_util_binding_zig__enobufsErrorCode);
BUN_DECLARE_HOST_FUNCTION(JS2Zig___src_bun_js_api_bun_udp_socket_zig__UDPSocket_jsConnect);
BUN_DECLARE_HOST_FUNCTION(JS2Zig___src_bun_js_api_bun_udp_socket_zig__UDPSocket_jsDisconnect);
BUN_DECLARE_HOST_FUNCTION(JS2Zig___src_bun_js_api_bun_dns_zig__Resolver_getRuntimeDefaultResultOrderOption);
BUN_DECLARE_HOST_FUNCTION(JS2Zig___src_bun_js_api_bun_dns_zig__Resolver_newResolver);
BUN_DECLARE_HOST_FUNCTION(JS2Zig___src_bun_js_node_types_zig__jsAssertEncodingValid);
BUN_DECLARE_HOST_FUNCTION(JS2Zig___src_bun_js_api_bun_h__frame_parser_zig__jsAssertSettings);
BUN_DECLARE_HOST_FUNCTION(JS2Zig___src_bun_js_node_node_net_binding_zig__newDetachedSocket);
BUN_DECLARE_HOST_FUNCTION(JS2Zig___src_bun_js_node_node_net_binding_zig__doConnect);
BUN_DECLARE_HOST_FUNCTION(JS2Zig___src_bun_js_api_bun_socket_Listener_zig__jsAddServerName);
BUN_DECLARE_HOST_FUNCTION(JS2Zig___src_bun_js_api_bun_socket_zig__jsIsNamedPipeSocket);
BUN_DECLARE_HOST_FUNCTION(JS2Zig___src_bun_js_api_bun_socket_zig__jsGetBufferedAmount);
BUN_DECLARE_HOST_FUNCTION(JS2Zig___src_bun_zig__getUseSystemCA);
BUN_DECLARE_HOST_FUNCTION(JS2Zig___src_bun_js_node_node_util_binding_zig__internalErrorName);
BUN_DECLARE_HOST_FUNCTION(JS2Zig___src_bun_js_node_node_util_binding_zig__parseEnv);
BUN_DECLARE_HOST_FUNCTION(JS2Zig___src_bun_js_node_util_parse_args_zig__parseArgs);
BUN_DECLARE_HOST_FUNCTION(JS2Zig___src_bun_js_node_node_zlib_binding_zig__crc__);
BUN_DECLARE_HOST_FUNCTION(JS2Zig___src_patch_zig__TestingAPIs_parse);
BUN_DECLARE_HOST_FUNCTION(JS2Zig___src_patch_zig__TestingAPIs_apply);
BUN_DECLARE_HOST_FUNCTION(JS2Zig___src_patch_zig__TestingAPIs_makeDiff);
BUN_DECLARE_HOST_FUNCTION(JS2Zig___src_shell_shell_zig__TestingAPIs_shellLex);
BUN_DECLARE_HOST_FUNCTION(JS2Zig___src_shell_shell_zig__TestingAPIs_shellParse);
BUN_DECLARE_HOST_FUNCTION(JS2Zig___src_string_escapeRegExp_zig__jsEscapeRegExp);
BUN_DECLARE_HOST_FUNCTION(JS2Zig___src_string_escapeRegExp_zig__jsEscapeRegExpForPackageNameMatching);
BUN_DECLARE_HOST_FUNCTION(JS2Zig___src_shell_shell_zig__TestingAPIs_disabledOnThisPlatform);
BUN_DECLARE_HOST_FUNCTION(JS2Zig___src_ini_zig__IniTestingAPIs_parse);
BUN_DECLARE_HOST_FUNCTION(JS2Zig___src_ini_zig__IniTestingAPIs_loadNpmrcFromJS);
BUN_DECLARE_HOST_FUNCTION(JS2Zig___src_css_css_internals_zig__minifyTestWithOptions);
BUN_DECLARE_HOST_FUNCTION(JS2Zig___src_css_css_internals_zig__minifyErrorTestWithOptions);
BUN_DECLARE_HOST_FUNCTION(JS2Zig___src_css_css_internals_zig__testWithOptions);
BUN_DECLARE_HOST_FUNCTION(JS2Zig___src_css_css_internals_zig__prefixTestWithOptions);
BUN_DECLARE_HOST_FUNCTION(JS2Zig___src_css_css_internals_zig__minifyTest);
BUN_DECLARE_HOST_FUNCTION(JS2Zig___src_css_css_internals_zig__prefixTest);
BUN_DECLARE_HOST_FUNCTION(JS2Zig___src_css_css_internals_zig___test);
BUN_DECLARE_HOST_FUNCTION(JS2Zig___src_css_css_internals_zig__attrTest);
BUN_DECLARE_HOST_FUNCTION(JS2Zig___src_bun_js_node_node_fs_binding_zig__createMemfdForTesting);
BUN_DECLARE_HOST_FUNCTION(JS2Zig___src_bun_js_virtual_machine_exports_zig__Bun__setSyntheticAllocationLimitForTesting);
BUN_DECLARE_HOST_FUNCTION(JS2Zig___src_install_dependency_zig__fromJS);
BUN_DECLARE_HOST_FUNCTION(JS2Zig___src_install_dependency_zig__Version_Tag_inferFromJS);
BUN_DECLARE_HOST_FUNCTION(JS2Zig___src_cli_pack_command_zig__bindings_jsReadTarball);
BUN_DECLARE_HOST_FUNCTION(JS2Zig___src_install_npm_zig__Architecture_jsFunctionArchitectureIsMatch);
BUN_DECLARE_HOST_FUNCTION(JS2Zig___src_install_npm_zig__OperatingSystem_jsFunctionOperatingSystemIsMatch);
BUN_DECLARE_HOST_FUNCTION(JS2Zig___src_bun_js_api_bun_socket_zig__jsCreateSocketPair);
BUN_DECLARE_HOST_FUNCTION(JS2Zig___src_bun_js_api_Timer_zig__internal_bindings_timerClockMs);
BUN_DECLARE_HOST_FUNCTION(JS2Zig___src_bun_js_Counters_zig__createCountersObject);
BUN_DECLARE_HOST_FUNCTION(JS2Zig___src_bun_js_api_bun_socket_zig__jsSetSocketOptions);
BUN_DECLARE_HOST_FUNCTION(JS2Zig___src_bun_js_event_loop_zig__getActiveTasks);
BUN_DECLARE_HOST_FUNCTION(JS2Zig___src_install_hosted_git_info_zig__TestingAPIs_jsParseUrl);
BUN_DECLARE_HOST_FUNCTION(JS2Zig___src_install_hosted_git_info_zig__TestingAPIs_jsFromUrl);
BUN_DECLARE_HOST_FUNCTION(JS2Zig___src_bun_js_ipc_zig__emitHandleIPCMessage);
BUN_DECLARE_HOST_FUNCTION(JS2Zig___src_bun_js_node_node_cluster_binding_zig__setRef);

namespace JS2NativeGenerated {
using namespace Bun;
using namespace JSC;
using namespace WebCore;

static ALWAYS_INLINE JSC::JSValue JS2Zig___src_bun_js_node_node_assert_binding_zig__generate(Zig::GlobalObject* global) {
    return JSValue::decode(JS2Zig___src_bun_js_node_node_assert_binding_zig__generate_workaround(global));
}


static ALWAYS_INLINE JSC::JSValue JS2Zig___src_sql_mysql_zig__createBinding(Zig::GlobalObject* global) {
    return JSValue::decode(JS2Zig___src_sql_mysql_zig__createBinding_workaround(global));
}


static ALWAYS_INLINE JSC::JSValue JS2Zig___src_sql_postgres_zig__createBinding(Zig::GlobalObject* global) {
    return JSValue::decode(JS2Zig___src_sql_postgres_zig__createBinding_workaround(global));
}


static ALWAYS_INLINE JSC::JSValue JS2Zig___src_bun_js_node_node_crypto_binding_zig__createNodeCryptoBindingZig(Zig::GlobalObject* global) {
    return JSValue::decode(JS2Zig___src_bun_js_node_node_crypto_binding_zig__createNodeCryptoBindingZig_workaround(global));
}


static ALWAYS_INLINE JSC::JSValue JS2Zig___src_bun_js_node_node_fs_binding_zig__createBinding(Zig::GlobalObject* global) {
    return JSValue::decode(JS2Zig___src_bun_js_node_node_fs_binding_zig__createBinding_workaround(global));
}


static ALWAYS_INLINE JSC::JSValue JS2Zig___src_bun_js_api_bun_h__frame_parser_zig__H_FrameParserConstructor(Zig::GlobalObject* global) {
    return JSValue::decode(JS2Zig___src_bun_js_api_bun_h__frame_parser_zig__H_FrameParserConstructor_workaround(global));
}


static ALWAYS_INLINE JSC::JSValue JS2Zig___src_bun_js_node_node_net_binding_zig__getDefaultAutoSelectFamily(Zig::GlobalObject* global) {
    return JSValue::decode(JS2Zig___src_bun_js_node_node_net_binding_zig__getDefaultAutoSelectFamily_workaround(global));
}


static ALWAYS_INLINE JSC::JSValue JS2Zig___src_bun_js_node_node_net_binding_zig__setDefaultAutoSelectFamily(Zig::GlobalObject* global) {
    return JSValue::decode(JS2Zig___src_bun_js_node_node_net_binding_zig__setDefaultAutoSelectFamily_workaround(global));
}


static ALWAYS_INLINE JSC::JSValue JS2Zig___src_bun_js_node_node_net_binding_zig__getDefaultAutoSelectFamilyAttemptTimeout(Zig::GlobalObject* global) {
    return JSValue::decode(JS2Zig___src_bun_js_node_node_net_binding_zig__getDefaultAutoSelectFamilyAttemptTimeout_workaround(global));
}


static ALWAYS_INLINE JSC::JSValue JS2Zig___src_bun_js_node_node_net_binding_zig__setDefaultAutoSelectFamilyAttemptTimeout(Zig::GlobalObject* global) {
    return JSValue::decode(JS2Zig___src_bun_js_node_node_net_binding_zig__setDefaultAutoSelectFamilyAttemptTimeout_workaround(global));
}


static ALWAYS_INLINE JSC::JSValue JS2Zig___src_bun_js_node_node_net_binding_zig__SocketAddress(Zig::GlobalObject* global) {
    return JSValue::decode(JS2Zig___src_bun_js_node_node_net_binding_zig__SocketAddress_workaround(global));
}


static ALWAYS_INLINE JSC::JSValue JS2Zig___src_bun_js_node_node_net_binding_zig__BlockList(Zig::GlobalObject* global) {
    return JSValue::decode(JS2Zig___src_bun_js_node_node_net_binding_zig__BlockList_workaround(global));
}


static ALWAYS_INLINE JSC::JSValue JS2Zig___src_bun_js_node_node_os_zig__createNodeOsBinding(Zig::GlobalObject* global) {
    return JSValue::decode(JS2Zig___src_bun_js_node_node_os_zig__createNodeOsBinding_workaround(global));
}


static ALWAYS_INLINE JSC::JSValue JS2Zig___src_bun_js_node_node_zlib_binding_zig__NativeZlib(Zig::GlobalObject* global) {
    return JSValue::decode(JS2Zig___src_bun_js_node_node_zlib_binding_zig__NativeZlib_workaround(global));
}


static ALWAYS_INLINE JSC::JSValue JS2Zig___src_bun_js_node_node_zlib_binding_zig__NativeBrotli(Zig::GlobalObject* global) {
    return JSValue::decode(JS2Zig___src_bun_js_node_node_zlib_binding_zig__NativeBrotli_workaround(global));
}


static ALWAYS_INLINE JSC::JSValue JS2Zig___src_bun_js_node_node_zlib_binding_zig__NativeZstd(Zig::GlobalObject* global) {
    return JSValue::decode(JS2Zig___src_bun_js_node_node_zlib_binding_zig__NativeZstd_workaround(global));
}


static ALWAYS_INLINE JSC::JSValue JS2Zig___src_crash_handler_zig__js_bindings_generate(Zig::GlobalObject* global) {
    return JSValue::decode(JS2Zig___src_crash_handler_zig__js_bindings_generate_workaround(global));
}


static ALWAYS_INLINE JSC::JSValue JS2Zig___src_cli_upgrade_command_zig__upgrade_js_bindings_generate(Zig::GlobalObject* global) {
    return JSValue::decode(JS2Zig___src_cli_upgrade_command_zig__upgrade_js_bindings_generate_workaround(global));
}


static ALWAYS_INLINE JSC::JSValue JS2Zig___src_install_install_binding_zig__bun_install_js_bindings_generate(Zig::GlobalObject* global) {
    return JSValue::decode(JS2Zig___src_install_install_binding_zig__bun_install_js_bindings_generate_workaround(global));
}


static ALWAYS_INLINE JSC::JSValue JS2Zig___src_install_npm_zig__PackageManifest_bindings_generate(Zig::GlobalObject* global) {
    return JSValue::decode(JS2Zig___src_install_npm_zig__PackageManifest_bindings_generate_workaround(global));
}


static ALWAYS_INLINE JSC::JSValue JS2Zig___src_bake_FrameworkRouter_zig__JSFrameworkRouter_getBindings(Zig::GlobalObject* global) {
    return JSValue::decode(JS2Zig___src_bake_FrameworkRouter_zig__JSFrameworkRouter_getBindings_workaround(global));
}


static ALWAYS_INLINE JSC::JSValue JS2Zig___src_bun_js_bindgen_test_zig__getBindgenTestFunctions(Zig::GlobalObject* global) {
    return JSValue::decode(JS2Zig___src_bun_js_bindgen_test_zig__getBindgenTestFunctions_workaround(global));
}



static ALWAYS_INLINE JSC::JSValue js2native_wrap_Bun__FFI__cc(Zig::GlobalObject* globalObject) {
  return JSC::JSFunction::create(globalObject->vm(), globalObject, 1, "cc"_s, JS2Zig___src_bun_js_api_ffi_zig__Bun__FFI__cc, JSC::ImplementationVisibility::Public);
}

static ALWAYS_INLINE JSC::JSValue js2native_wrap_sendHelperPrimary(Zig::GlobalObject* globalObject) {
  return JSC::JSFunction::create(globalObject->vm(), globalObject, 4, "sendHelperPrimary"_s, JS2Zig___src_bun_js_node_node_cluster_binding_zig__sendHelperPrimary, JSC::ImplementationVisibility::Public);
}

static ALWAYS_INLINE JSC::JSValue js2native_wrap_sendHelperChild(Zig::GlobalObject* globalObject) {
  return JSC::JSFunction::create(globalObject->vm(), globalObject, 3, "sendHelperChild"_s, JS2Zig___src_bun_js_node_node_cluster_binding_zig__sendHelperChild, JSC::ImplementationVisibility::Public);
}

static ALWAYS_INLINE JSC::JSValue js2native_wrap_onInternalMessageChild(Zig::GlobalObject* globalObject) {
  return JSC::JSFunction::create(globalObject->vm(), globalObject, 2, "onInternalMessageChild"_s, JS2Zig___src_bun_js_node_node_cluster_binding_zig__onInternalMessageChild, JSC::ImplementationVisibility::Public);
}

static ALWAYS_INLINE JSC::JSValue js2native_wrap_channelIgnoreOneDisconnectEventListener(Zig::GlobalObject* globalObject) {
  return JSC::JSFunction::create(globalObject->vm(), globalObject, 0, "channelIgnoreOneDisconnectEventListener"_s, JS2Zig___src_bun_js_node_node_cluster_binding_zig__channelIgnoreOneDisconnectEventListener, JSC::ImplementationVisibility::Public);
}

static ALWAYS_INLINE JSC::JSValue js2native_wrap_onInternalMessagePrimary(Zig::GlobalObject* globalObject) {
  return JSC::JSFunction::create(globalObject->vm(), globalObject, 3, "onInternalMessagePrimary"_s, JS2Zig___src_bun_js_node_node_cluster_binding_zig__onInternalMessagePrimary, JSC::ImplementationVisibility::Public);
}

static ALWAYS_INLINE JSC::JSValue js2native_wrap_jsIsX___Certificate(Zig::GlobalObject* globalObject) {
  return JSC::JSFunction::create(globalObject->vm(), globalObject, 1, "jsIsX509Certificate"_s, jsIsX509Certificate, JSC::ImplementationVisibility::Public);
}

static ALWAYS_INLINE JSC::JSValue js2native_wrap_jsFetchHeaders_getRawKeys(Zig::GlobalObject* globalObject) {
  return JSC::JSFunction::create(globalObject->vm(), globalObject, 0, "getRawKeys"_s, jsFetchHeaders_getRawKeys, JSC::ImplementationVisibility::Public);
}

static ALWAYS_INLINE JSC::JSValue js2native_wrap_setMaxHTTPHeaderSize(Zig::GlobalObject* globalObject) {
  return JSC::JSFunction::create(globalObject->vm(), globalObject, 1, "setMaxHTTPHeaderSize"_s, JS2Zig___src_bun_js_node_node_http_binding_zig__setMaxHTTPHeaderSize, JSC::ImplementationVisibility::Public);
}

static ALWAYS_INLINE JSC::JSValue js2native_wrap_getMaxHTTPHeaderSize(Zig::GlobalObject* globalObject) {
  return JSC::JSFunction::create(globalObject->vm(), globalObject, 0, "getMaxHTTPHeaderSize"_s, JS2Zig___src_bun_js_node_node_http_binding_zig__getMaxHTTPHeaderSize, JSC::ImplementationVisibility::Public);
}

static ALWAYS_INLINE JSC::JSValue js2native_wrap_jsFunction_monitorEventLoopDelay(Zig::GlobalObject* globalObject) {
  return JSC::JSFunction::create(globalObject->vm(), globalObject, 1, "monitorEventLoopDelay"_s, jsFunction_monitorEventLoopDelay, JSC::ImplementationVisibility::Public);
}

static ALWAYS_INLINE JSC::JSValue js2native_wrap_jsFunction_enableEventLoopDelay(Zig::GlobalObject* globalObject) {
  return JSC::JSFunction::create(globalObject->vm(), globalObject, 2, "enableEventLoopDelay"_s, jsFunction_enableEventLoopDelay, JSC::ImplementationVisibility::Public);
}

static ALWAYS_INLINE JSC::JSValue js2native_wrap_jsFunction_disableEventLoopDelay(Zig::GlobalObject* globalObject) {
  return JSC::JSFunction::create(globalObject->vm(), globalObject, 1, "disableEventLoopDelay"_s, jsFunction_disableEventLoopDelay, JSC::ImplementationVisibility::Public);
}

static ALWAYS_INLINE JSC::JSValue js2native_wrap_jsFunctionTransferToNativeReadableStream(Zig::GlobalObject* globalObject) {
  return JSC::JSFunction::create(globalObject->vm(), globalObject, 1, "jsFunctionTransferToNativeReadableStream"_s, jsFunctionTransferToNativeReadableStream, JSC::ImplementationVisibility::Public);
}

static ALWAYS_INLINE JSC::JSValue js2native_wrap_extractedSplitNewLinesFastPathStringsOnly(Zig::GlobalObject* globalObject) {
  return JSC::JSFunction::create(globalObject->vm(), globalObject, 1, "extractedSplitNewLinesFastPathStringsOnly"_s, JS2Zig___src_bun_js_node_node_util_binding_zig__extractedSplitNewLinesFastPathStringsOnly, JSC::ImplementationVisibility::Public);
}

static ALWAYS_INLINE JSC::JSValue js2native_wrap_String_jsGetStringWidth(Zig::GlobalObject* globalObject) {
  return JSC::JSFunction::create(globalObject->vm(), globalObject, 1, "jsGetStringWidth"_s, JS2Zig___src_string_zig__String_jsGetStringWidth, JSC::ImplementationVisibility::Public);
}

static ALWAYS_INLINE JSC::JSValue js2native_wrap_jsFunction_validateObject(Zig::GlobalObject* globalObject) {
  return JSC::JSFunction::create(globalObject->vm(), globalObject, 2, "validateObject"_s, jsFunction_validateObject, JSC::ImplementationVisibility::Public);
}

static ALWAYS_INLINE JSC::JSValue js2native_wrap_jsFunction_validateInteger(Zig::GlobalObject* globalObject) {
  return JSC::JSFunction::create(globalObject->vm(), globalObject, 0, "validateInteger"_s, jsFunction_validateInteger, JSC::ImplementationVisibility::Public);
}

static ALWAYS_INLINE JSC::JSValue js2native_wrap_jsFunction_validateNumber(Zig::GlobalObject* globalObject) {
  return JSC::JSFunction::create(globalObject->vm(), globalObject, 0, "validateNumber"_s, jsFunction_validateNumber, JSC::ImplementationVisibility::Public);
}

static ALWAYS_INLINE JSC::JSValue js2native_wrap_jsFunction_validateFiniteNumber(Zig::GlobalObject* globalObject) {
  return JSC::JSFunction::create(globalObject->vm(), globalObject, 0, "validateFiniteNumber"_s, jsFunction_validateFiniteNumber, JSC::ImplementationVisibility::Public);
}

static ALWAYS_INLINE JSC::JSValue js2native_wrap_jsFunction_checkRangesOrGetDefault(Zig::GlobalObject* globalObject) {
  return JSC::JSFunction::create(globalObject->vm(), globalObject, 0, "checkRangesOrGetDefault"_s, jsFunction_checkRangesOrGetDefault, JSC::ImplementationVisibility::Public);
}

static ALWAYS_INLINE JSC::JSValue js2native_wrap_jsFunction_validatePort(Zig::GlobalObject* globalObject) {
  return JSC::JSFunction::create(globalObject->vm(), globalObject, 0, "validatePort"_s, jsFunction_validatePort, JSC::ImplementationVisibility::Public);
}

static ALWAYS_INLINE JSC::JSValue js2native_wrap_jsFunction_validateAbortSignal(Zig::GlobalObject* globalObject) {
  return JSC::JSFunction::create(globalObject->vm(), globalObject, 0, "validateAbortSignal"_s, jsFunction_validateAbortSignal, JSC::ImplementationVisibility::Public);
}

static ALWAYS_INLINE JSC::JSValue js2native_wrap_jsFunction_validateArray(Zig::GlobalObject* globalObject) {
  return JSC::JSFunction::create(globalObject->vm(), globalObject, 0, "validateArray"_s, jsFunction_validateArray, JSC::ImplementationVisibility::Public);
}

static ALWAYS_INLINE JSC::JSValue js2native_wrap_jsFunction_validateInt__(Zig::GlobalObject* globalObject) {
  return JSC::JSFunction::create(globalObject->vm(), globalObject, 0, "validateInt32"_s, jsFunction_validateInt32, JSC::ImplementationVisibility::Public);
}

static ALWAYS_INLINE JSC::JSValue js2native_wrap_jsFunction_validateUint__(Zig::GlobalObject* globalObject) {
  return JSC::JSFunction::create(globalObject->vm(), globalObject, 0, "validateUint32"_s, jsFunction_validateUint32, JSC::ImplementationVisibility::Public);
}

static ALWAYS_INLINE JSC::JSValue js2native_wrap_jsFunction_validateSignalName(Zig::GlobalObject* globalObject) {
  return JSC::JSFunction::create(globalObject->vm(), globalObject, 0, "validateSignalName"_s, jsFunction_validateSignalName, JSC::ImplementationVisibility::Public);
}

static ALWAYS_INLINE JSC::JSValue js2native_wrap_jsFunction_validateEncoding(Zig::GlobalObject* globalObject) {
  return JSC::JSFunction::create(globalObject->vm(), globalObject, 0, "validateEncoding"_s, jsFunction_validateEncoding, JSC::ImplementationVisibility::Public);
}

static ALWAYS_INLINE JSC::JSValue js2native_wrap_jsFunction_validatePlainFunction(Zig::GlobalObject* globalObject) {
  return JSC::JSFunction::create(globalObject->vm(), globalObject, 0, "validatePlainFunction"_s, jsFunction_validatePlainFunction, JSC::ImplementationVisibility::Public);
}

static ALWAYS_INLINE JSC::JSValue js2native_wrap_jsFunction_validateBuffer(Zig::GlobalObject* globalObject) {
  return JSC::JSFunction::create(globalObject->vm(), globalObject, 0, "validateBuffer"_s, jsFunction_validateBuffer, JSC::ImplementationVisibility::Public);
}

static ALWAYS_INLINE JSC::JSValue js2native_wrap_jsFunction_validateOneOf(Zig::GlobalObject* globalObject) {
  return JSC::JSFunction::create(globalObject->vm(), globalObject, 0, "validateOneOf"_s, jsFunction_validateOneOf, JSC::ImplementationVisibility::Public);
}

static ALWAYS_INLINE JSC::JSValue js2native_wrap_normalizeEncoding(Zig::GlobalObject* globalObject) {
  return JSC::JSFunction::create(globalObject->vm(), globalObject, 1, "normalizeEncoding"_s, JS2Zig___src_bun_js_node_node_util_binding_zig__normalizeEncoding, JSC::ImplementationVisibility::Public);
}

static ALWAYS_INLINE JSC::JSValue js2native_wrap_jsUpgradeDuplexToTLS(Zig::GlobalObject* globalObject) {
  return JSC::JSFunction::create(globalObject->vm(), globalObject, 2, "jsUpgradeDuplexToTLS"_s, JS2Zig___src_bun_js_api_bun_socket_zig__jsUpgradeDuplexToTLS, JSC::ImplementationVisibility::Public);
}

static ALWAYS_INLINE JSC::JSValue js2native_wrap_nodeHttpClient(Zig::GlobalObject* globalObject) {
  return JSC::JSFunction::create(globalObject->vm(), globalObject, 2, "nodeHttpClient"_s, JS2Zig___src_bun_js_webcore_fetch_zig__nodeHttpClient, JSC::ImplementationVisibility::Public);
}

static ALWAYS_INLINE JSC::JSValue js2native_wrap_getBunServerAllClosedPromise(Zig::GlobalObject* globalObject) {
  return JSC::JSFunction::create(globalObject->vm(), globalObject, 1, "getBunServerAllClosedPromise"_s, JS2Zig___src_bun_js_node_node_http_binding_zig__getBunServerAllClosedPromise, JSC::ImplementationVisibility::Public);
}

static ALWAYS_INLINE JSC::JSValue js2native_wrap_jsSetAsyncHooksEnabled(Zig::GlobalObject* globalObject) {
  return JSC::JSFunction::create(globalObject->vm(), globalObject, 1, "jsSetAsyncHooksEnabled"_s, jsSetAsyncHooksEnabled, JSC::ImplementationVisibility::Public);
}

static ALWAYS_INLINE JSC::JSValue js2native_wrap_jsCleanupLater(Zig::GlobalObject* globalObject) {
  return JSC::JSFunction::create(globalObject->vm(), globalObject, 0, "jsCleanupLater"_s, jsCleanupLater, JSC::ImplementationVisibility::Public);
}

static ALWAYS_INLINE JSC::JSValue js2native_wrap_etimedoutErrorCode(Zig::GlobalObject* globalObject) {
  return JSC::JSFunction::create(globalObject->vm(), globalObject, 0, "etimedoutErrorCode"_s, JS2Zig___src_bun_js_node_node_util_binding_zig__etimedoutErrorCode, JSC::ImplementationVisibility::Public);
}

static ALWAYS_INLINE JSC::JSValue js2native_wrap_enobufsErrorCode(Zig::GlobalObject* globalObject) {
  return JSC::JSFunction::create(globalObject->vm(), globalObject, 0, "enobufsErrorCode"_s, JS2Zig___src_bun_js_node_node_util_binding_zig__enobufsErrorCode, JSC::ImplementationVisibility::Public);
}

static ALWAYS_INLINE JSC::JSValue js2native_wrap_UDPSocket_jsConnect(Zig::GlobalObject* globalObject) {
  return JSC::JSFunction::create(globalObject->vm(), globalObject, 2, "jsConnect"_s, JS2Zig___src_bun_js_api_bun_udp_socket_zig__UDPSocket_jsConnect, JSC::ImplementationVisibility::Public);
}

static ALWAYS_INLINE JSC::JSValue js2native_wrap_UDPSocket_jsDisconnect(Zig::GlobalObject* globalObject) {
  return JSC::JSFunction::create(globalObject->vm(), globalObject, 0, "jsDisconnect"_s, JS2Zig___src_bun_js_api_bun_udp_socket_zig__UDPSocket_jsDisconnect, JSC::ImplementationVisibility::Public);
}

static ALWAYS_INLINE JSC::JSValue js2native_wrap_Resolver_getRuntimeDefaultResultOrderOption(Zig::GlobalObject* globalObject) {
  return JSC::JSFunction::create(globalObject->vm(), globalObject, 0, "getRuntimeDefaultResultOrderOption"_s, JS2Zig___src_bun_js_api_bun_dns_zig__Resolver_getRuntimeDefaultResultOrderOption, JSC::ImplementationVisibility::Public);
}

static ALWAYS_INLINE JSC::JSValue js2native_wrap_Resolver_newResolver(Zig::GlobalObject* globalObject) {
  return JSC::JSFunction::create(globalObject->vm(), globalObject, 1, "newResolver"_s, JS2Zig___src_bun_js_api_bun_dns_zig__Resolver_newResolver, JSC::ImplementationVisibility::Public);
}

static ALWAYS_INLINE JSC::JSValue js2native_wrap_jsFunctionNodeEventsGetEventListeners(Zig::GlobalObject* globalObject) {
  return JSC::JSFunction::create(globalObject->vm(), globalObject, 1, "jsFunctionNodeEventsGetEventListeners"_s, jsFunctionNodeEventsGetEventListeners, JSC::ImplementationVisibility::Public);
}

static ALWAYS_INLINE JSC::JSValue js2native_wrap_jsEventTargetGetEventListenersCount(Zig::GlobalObject* globalObject) {
  return JSC::JSFunction::create(globalObject->vm(), globalObject, 2, "jsEventTargetGetEventListenersCount"_s, jsEventTargetGetEventListenersCount, JSC::ImplementationVisibility::Public);
}

static ALWAYS_INLINE JSC::JSValue js2native_wrap_jsAssertEncodingValid(Zig::GlobalObject* globalObject) {
  return JSC::JSFunction::create(globalObject->vm(), globalObject, 1, "jsAssertEncodingValid"_s, JS2Zig___src_bun_js_node_types_zig__jsAssertEncodingValid, JSC::ImplementationVisibility::Public);
}

static ALWAYS_INLINE JSC::JSValue js2native_wrap_jsAssertSettings(Zig::GlobalObject* globalObject) {
  return JSC::JSFunction::create(globalObject->vm(), globalObject, 1, "jsAssertSettings"_s, JS2Zig___src_bun_js_api_bun_h__frame_parser_zig__jsAssertSettings, JSC::ImplementationVisibility::Public);
}

static ALWAYS_INLINE JSC::JSValue js2native_wrap_jsFunction_startCPUProfiler(Zig::GlobalObject* globalObject) {
  return JSC::JSFunction::create(globalObject->vm(), globalObject, 0, "startCPUProfiler"_s, jsFunction_startCPUProfiler, JSC::ImplementationVisibility::Public);
}

static ALWAYS_INLINE JSC::JSValue js2native_wrap_jsFunction_stopCPUProfiler(Zig::GlobalObject* globalObject) {
  return JSC::JSFunction::create(globalObject->vm(), globalObject, 0, "stopCPUProfiler"_s, jsFunction_stopCPUProfiler, JSC::ImplementationVisibility::Public);
}

static ALWAYS_INLINE JSC::JSValue js2native_wrap_jsFunction_setCPUSamplingInterval(Zig::GlobalObject* globalObject) {
  return JSC::JSFunction::create(globalObject->vm(), globalObject, 1, "setCPUSamplingInterval"_s, jsFunction_setCPUSamplingInterval, JSC::ImplementationVisibility::Public);
}

static ALWAYS_INLINE JSC::JSValue js2native_wrap_jsFunction_isCPUProfilerRunning(Zig::GlobalObject* globalObject) {
  return JSC::JSFunction::create(globalObject->vm(), globalObject, 0, "isCPUProfilerRunning"_s, jsFunction_isCPUProfilerRunning, JSC::ImplementationVisibility::Public);
}

static ALWAYS_INLINE JSC::JSValue js2native_wrap_newDetachedSocket(Zig::GlobalObject* globalObject) {
  return JSC::JSFunction::create(globalObject->vm(), globalObject, 1, "newDetachedSocket"_s, JS2Zig___src_bun_js_node_node_net_binding_zig__newDetachedSocket, JSC::ImplementationVisibility::Public);
}

static ALWAYS_INLINE JSC::JSValue js2native_wrap_doConnect(Zig::GlobalObject* globalObject) {
  return JSC::JSFunction::create(globalObject->vm(), globalObject, 2, "doConnect"_s, JS2Zig___src_bun_js_node_node_net_binding_zig__doConnect, JSC::ImplementationVisibility::Public);
}

static ALWAYS_INLINE JSC::JSValue js2native_wrap_jsAddServerName(Zig::GlobalObject* globalObject) {
  return JSC::JSFunction::create(globalObject->vm(), globalObject, 3, "jsAddServerName"_s, JS2Zig___src_bun_js_api_bun_socket_Listener_zig__jsAddServerName, JSC::ImplementationVisibility::Public);
}

static ALWAYS_INLINE JSC::JSValue js2native_wrap_jsIsNamedPipeSocket(Zig::GlobalObject* globalObject) {
  return JSC::JSFunction::create(globalObject->vm(), globalObject, 1, "jsIsNamedPipeSocket"_s, JS2Zig___src_bun_js_api_bun_socket_zig__jsIsNamedPipeSocket, JSC::ImplementationVisibility::Public);
}

static ALWAYS_INLINE JSC::JSValue js2native_wrap_jsGetBufferedAmount(Zig::GlobalObject* globalObject) {
  return JSC::JSFunction::create(globalObject->vm(), globalObject, 1, "jsGetBufferedAmount"_s, JS2Zig___src_bun_js_api_bun_socket_zig__jsGetBufferedAmount, JSC::ImplementationVisibility::Public);
}

static ALWAYS_INLINE JSC::JSValue js2native_wrap_jsFunction_createHistogram(Zig::GlobalObject* globalObject) {
  return JSC::JSFunction::create(globalObject->vm(), globalObject, 3, "createHistogram"_s, jsFunction_createHistogram, JSC::ImplementationVisibility::Public);
}

static ALWAYS_INLINE JSC::JSValue js2native_wrap_getBundledRootCertificates(Zig::GlobalObject* globalObject) {
  return JSC::JSFunction::create(globalObject->vm(), globalObject, 1, "getBundledRootCertificates"_s, getBundledRootCertificates, JSC::ImplementationVisibility::Public);
}

static ALWAYS_INLINE JSC::JSValue js2native_wrap_getExtraCACertificates(Zig::GlobalObject* globalObject) {
  return JSC::JSFunction::create(globalObject->vm(), globalObject, 1, "getExtraCACertificates"_s, getExtraCACertificates, JSC::ImplementationVisibility::Public);
}

static ALWAYS_INLINE JSC::JSValue js2native_wrap_getSystemCACertificates(Zig::GlobalObject* globalObject) {
  return JSC::JSFunction::create(globalObject->vm(), globalObject, 1, "getSystemCACertificates"_s, getSystemCACertificates, JSC::ImplementationVisibility::Public);
}

static ALWAYS_INLINE JSC::JSValue js2native_wrap_Bun__canonicalizeIP(Zig::GlobalObject* globalObject) {
  return JSC::JSFunction::create(globalObject->vm(), globalObject, 1, "canonicalizeIP"_s, Bun__canonicalizeIP, JSC::ImplementationVisibility::Public);
}

static ALWAYS_INLINE JSC::JSValue js2native_wrap_getDefaultCiphers(Zig::GlobalObject* globalObject) {
  return JSC::JSFunction::create(globalObject->vm(), globalObject, 0, "getDefaultCiphers"_s, getDefaultCiphers, JSC::ImplementationVisibility::Public);
}

static ALWAYS_INLINE JSC::JSValue js2native_wrap_setDefaultCiphers(Zig::GlobalObject* globalObject) {
  return JSC::JSFunction::create(globalObject->vm(), globalObject, 1, "setDefaultCiphers"_s, setDefaultCiphers, JSC::ImplementationVisibility::Public);
}

static ALWAYS_INLINE JSC::JSValue js2native_wrap_getUseSystemCA(Zig::GlobalObject* globalObject) {
  return JSC::JSFunction::create(globalObject->vm(), globalObject, 0, "getUseSystemCA"_s, JS2Zig___src_bun_zig__getUseSystemCA, JSC::ImplementationVisibility::Public);
}

static ALWAYS_INLINE JSC::JSValue js2native_wrap_internalErrorName(Zig::GlobalObject* globalObject) {
  return JSC::JSFunction::create(globalObject->vm(), globalObject, 1, "internalErrorName"_s, JS2Zig___src_bun_js_node_node_util_binding_zig__internalErrorName, JSC::ImplementationVisibility::Public);
}

static ALWAYS_INLINE JSC::JSValue js2native_wrap_parseEnv(Zig::GlobalObject* globalObject) {
  return JSC::JSFunction::create(globalObject->vm(), globalObject, 1, "parseEnv"_s, JS2Zig___src_bun_js_node_node_util_binding_zig__parseEnv, JSC::ImplementationVisibility::Public);
}

static ALWAYS_INLINE JSC::JSValue js2native_wrap_parseArgs(Zig::GlobalObject* globalObject) {
  return JSC::JSFunction::create(globalObject->vm(), globalObject, 1, "parseArgs"_s, JS2Zig___src_bun_js_node_util_parse_args_zig__parseArgs, JSC::ImplementationVisibility::Public);
}

static ALWAYS_INLINE JSC::JSValue js2native_wrap_jsFunctionIsError(Zig::GlobalObject* globalObject) {
  return JSC::JSFunction::create(globalObject->vm(), globalObject, 1, "jsFunctionIsError"_s, jsFunctionIsError, JSC::ImplementationVisibility::Public);
}

static ALWAYS_INLINE JSC::JSValue js2native_wrap_jsFunctionPostMessage(Zig::GlobalObject* globalObject) {
  return JSC::JSFunction::create(globalObject->vm(), globalObject, 1, "jsFunctionPostMessage"_s, jsFunctionPostMessage, JSC::ImplementationVisibility::Public);
}

static ALWAYS_INLINE JSC::JSValue js2native_wrap_crc__(Zig::GlobalObject* globalObject) {
  return JSC::JSFunction::create(globalObject->vm(), globalObject, 1, "crc32"_s, JS2Zig___src_bun_js_node_node_zlib_binding_zig__crc__, JSC::ImplementationVisibility::Public);
}

static ALWAYS_INLINE JSC::JSValue js2native_wrap_TestingAPIs_parse(Zig::GlobalObject* globalObject) {
  return JSC::JSFunction::create(globalObject->vm(), globalObject, 1, "parse"_s, JS2Zig___src_patch_zig__TestingAPIs_parse, JSC::ImplementationVisibility::Public);
}

static ALWAYS_INLINE JSC::JSValue js2native_wrap_TestingAPIs_apply(Zig::GlobalObject* globalObject) {
  return JSC::JSFunction::create(globalObject->vm(), globalObject, 2, "apply"_s, JS2Zig___src_patch_zig__TestingAPIs_apply, JSC::ImplementationVisibility::Public);
}

static ALWAYS_INLINE JSC::JSValue js2native_wrap_TestingAPIs_makeDiff(Zig::GlobalObject* globalObject) {
  return JSC::JSFunction::create(globalObject->vm(), globalObject, 2, "makeDiff"_s, JS2Zig___src_patch_zig__TestingAPIs_makeDiff, JSC::ImplementationVisibility::Public);
}

static ALWAYS_INLINE JSC::JSValue js2native_wrap_TestingAPIs_shellLex(Zig::GlobalObject* globalObject) {
  return JSC::JSFunction::create(globalObject->vm(), globalObject, 2, "shellLex"_s, JS2Zig___src_shell_shell_zig__TestingAPIs_shellLex, JSC::ImplementationVisibility::Public);
}

static ALWAYS_INLINE JSC::JSValue js2native_wrap_TestingAPIs_shellParse(Zig::GlobalObject* globalObject) {
  return JSC::JSFunction::create(globalObject->vm(), globalObject, 2, "shellParse"_s, JS2Zig___src_shell_shell_zig__TestingAPIs_shellParse, JSC::ImplementationVisibility::Public);
}

static ALWAYS_INLINE JSC::JSValue js2native_wrap_jsEscapeRegExp(Zig::GlobalObject* globalObject) {
  return JSC::JSFunction::create(globalObject->vm(), globalObject, 1, "jsEscapeRegExp"_s, JS2Zig___src_string_escapeRegExp_zig__jsEscapeRegExp, JSC::ImplementationVisibility::Public);
}

static ALWAYS_INLINE JSC::JSValue js2native_wrap_jsEscapeRegExpForPackageNameMatching(Zig::GlobalObject* globalObject) {
  return JSC::JSFunction::create(globalObject->vm(), globalObject, 1, "jsEscapeRegExpForPackageNameMatching"_s, JS2Zig___src_string_escapeRegExp_zig__jsEscapeRegExpForPackageNameMatching, JSC::ImplementationVisibility::Public);
}

static ALWAYS_INLINE JSC::JSValue js2native_wrap_TestingAPIs_disabledOnThisPlatform(Zig::GlobalObject* globalObject) {
  return JSC::JSFunction::create(globalObject->vm(), globalObject, 1, "disabledOnThisPlatform"_s, JS2Zig___src_shell_shell_zig__TestingAPIs_disabledOnThisPlatform, JSC::ImplementationVisibility::Public);
}

static ALWAYS_INLINE JSC::JSValue js2native_wrap_IniTestingAPIs_parse(Zig::GlobalObject* globalObject) {
  return JSC::JSFunction::create(globalObject->vm(), globalObject, 1, "parse"_s, JS2Zig___src_ini_zig__IniTestingAPIs_parse, JSC::ImplementationVisibility::Public);
}

static ALWAYS_INLINE JSC::JSValue js2native_wrap_IniTestingAPIs_loadNpmrcFromJS(Zig::GlobalObject* globalObject) {
  return JSC::JSFunction::create(globalObject->vm(), globalObject, 2, "loadNpmrcFromJS"_s, JS2Zig___src_ini_zig__IniTestingAPIs_loadNpmrcFromJS, JSC::ImplementationVisibility::Public);
}

static ALWAYS_INLINE JSC::JSValue js2native_wrap_minifyTestWithOptions(Zig::GlobalObject* globalObject) {
  return JSC::JSFunction::create(globalObject->vm(), globalObject, 3, "minifyTestWithOptions"_s, JS2Zig___src_css_css_internals_zig__minifyTestWithOptions, JSC::ImplementationVisibility::Public);
}

static ALWAYS_INLINE JSC::JSValue js2native_wrap_minifyErrorTestWithOptions(Zig::GlobalObject* globalObject) {
  return JSC::JSFunction::create(globalObject->vm(), globalObject, 3, "minifyErrorTestWithOptions"_s, JS2Zig___src_css_css_internals_zig__minifyErrorTestWithOptions, JSC::ImplementationVisibility::Public);
}

static ALWAYS_INLINE JSC::JSValue js2native_wrap_testWithOptions(Zig::GlobalObject* globalObject) {
  return JSC::JSFunction::create(globalObject->vm(), globalObject, 3, "testWithOptions"_s, JS2Zig___src_css_css_internals_zig__testWithOptions, JSC::ImplementationVisibility::Public);
}

static ALWAYS_INLINE JSC::JSValue js2native_wrap_prefixTestWithOptions(Zig::GlobalObject* globalObject) {
  return JSC::JSFunction::create(globalObject->vm(), globalObject, 3, "prefixTestWithOptions"_s, JS2Zig___src_css_css_internals_zig__prefixTestWithOptions, JSC::ImplementationVisibility::Public);
}

static ALWAYS_INLINE JSC::JSValue js2native_wrap_minifyTest(Zig::GlobalObject* globalObject) {
  return JSC::JSFunction::create(globalObject->vm(), globalObject, 3, "minifyTest"_s, JS2Zig___src_css_css_internals_zig__minifyTest, JSC::ImplementationVisibility::Public);
}

static ALWAYS_INLINE JSC::JSValue js2native_wrap_prefixTest(Zig::GlobalObject* globalObject) {
  return JSC::JSFunction::create(globalObject->vm(), globalObject, 3, "prefixTest"_s, JS2Zig___src_css_css_internals_zig__prefixTest, JSC::ImplementationVisibility::Public);
}

static ALWAYS_INLINE JSC::JSValue js2native_wrap__test(Zig::GlobalObject* globalObject) {
  return JSC::JSFunction::create(globalObject->vm(), globalObject, 3, "test"_s, JS2Zig___src_css_css_internals_zig___test, JSC::ImplementationVisibility::Public);
}

static ALWAYS_INLINE JSC::JSValue js2native_wrap_attrTest(Zig::GlobalObject* globalObject) {
  return JSC::JSFunction::create(globalObject->vm(), globalObject, 3, "attrTest"_s, JS2Zig___src_css_css_internals_zig__attrTest, JSC::ImplementationVisibility::Public);
}

static ALWAYS_INLINE JSC::JSValue js2native_wrap_createMemfdForTesting(Zig::GlobalObject* globalObject) {
  return JSC::JSFunction::create(globalObject->vm(), globalObject, 1, "createMemfdForTesting"_s, JS2Zig___src_bun_js_node_node_fs_binding_zig__createMemfdForTesting, JSC::ImplementationVisibility::Public);
}

static ALWAYS_INLINE JSC::JSValue js2native_wrap_Bun__setSyntheticAllocationLimitForTesting(Zig::GlobalObject* globalObject) {
  return JSC::JSFunction::create(globalObject->vm(), globalObject, 1, "setSyntheticAllocationLimitForTesting"_s, JS2Zig___src_bun_js_virtual_machine_exports_zig__Bun__setSyntheticAllocationLimitForTesting, JSC::ImplementationVisibility::Public);
}

static ALWAYS_INLINE JSC::JSValue js2native_wrap_fromJS(Zig::GlobalObject* globalObject) {
  return JSC::JSFunction::create(globalObject->vm(), globalObject, 1, "fromJS"_s, JS2Zig___src_install_dependency_zig__fromJS, JSC::ImplementationVisibility::Public);
}

static ALWAYS_INLINE JSC::JSValue js2native_wrap_Version_Tag_inferFromJS(Zig::GlobalObject* globalObject) {
  return JSC::JSFunction::create(globalObject->vm(), globalObject, 1, "inferFromJS"_s, JS2Zig___src_install_dependency_zig__Version_Tag_inferFromJS, JSC::ImplementationVisibility::Public);
}

static ALWAYS_INLINE JSC::JSValue js2native_wrap_bindings_jsReadTarball(Zig::GlobalObject* globalObject) {
  return JSC::JSFunction::create(globalObject->vm(), globalObject, 1, "jsReadTarball"_s, JS2Zig___src_cli_pack_command_zig__bindings_jsReadTarball, JSC::ImplementationVisibility::Public);
}

static ALWAYS_INLINE JSC::JSValue js2native_wrap_Architecture_jsFunctionArchitectureIsMatch(Zig::GlobalObject* globalObject) {
  return JSC::JSFunction::create(globalObject->vm(), globalObject, 1, "jsFunctionArchitectureIsMatch"_s, JS2Zig___src_install_npm_zig__Architecture_jsFunctionArchitectureIsMatch, JSC::ImplementationVisibility::Public);
}

static ALWAYS_INLINE JSC::JSValue js2native_wrap_OperatingSystem_jsFunctionOperatingSystemIsMatch(Zig::GlobalObject* globalObject) {
  return JSC::JSFunction::create(globalObject->vm(), globalObject, 1, "jsFunctionOperatingSystemIsMatch"_s, JS2Zig___src_install_npm_zig__OperatingSystem_jsFunctionOperatingSystemIsMatch, JSC::ImplementationVisibility::Public);
}

static ALWAYS_INLINE JSC::JSValue js2native_wrap_jsCreateSocketPair(Zig::GlobalObject* globalObject) {
  return JSC::JSFunction::create(globalObject->vm(), globalObject, 0, "jsCreateSocketPair"_s, JS2Zig___src_bun_js_api_bun_socket_zig__jsCreateSocketPair, JSC::ImplementationVisibility::Public);
}

static ALWAYS_INLINE JSC::JSValue js2native_wrap_jsFunctionIsModuleResolveFilenameSlowPathEnabled(Zig::GlobalObject* globalObject) {
  return JSC::JSFunction::create(globalObject->vm(), globalObject, 0, "jsFunctionIsModuleResolveFilenameSlowPathEnabled"_s, jsFunctionIsModuleResolveFilenameSlowPathEnabled, JSC::ImplementationVisibility::Public);
}

static ALWAYS_INLINE JSC::JSValue js2native_wrap_jsFunction_arrayBufferViewHasBuffer(Zig::GlobalObject* globalObject) {
  return JSC::JSFunction::create(globalObject->vm(), globalObject, 1, "arrayBufferViewHasBuffer"_s, jsFunction_arrayBufferViewHasBuffer, JSC::ImplementationVisibility::Public);
}

static ALWAYS_INLINE JSC::JSValue js2native_wrap_internal_bindings_timerClockMs(Zig::GlobalObject* globalObject) {
  return JSC::JSFunction::create(globalObject->vm(), globalObject, 0, "timerClockMs"_s, JS2Zig___src_bun_js_api_Timer_zig__internal_bindings_timerClockMs, JSC::ImplementationVisibility::Public);
}

static ALWAYS_INLINE JSC::JSValue js2native_wrap_jsFunctionDecodeURIComponentSIMD(Zig::GlobalObject* globalObject) {
  return JSC::JSFunction::create(globalObject->vm(), globalObject, 1, "jsFunctionDecodeURIComponentSIMD"_s, jsFunctionDecodeURIComponentSIMD, JSC::ImplementationVisibility::Public);
}

static ALWAYS_INLINE JSC::JSValue js2native_wrap_createCountersObject(Zig::GlobalObject* globalObject) {
  return JSC::JSFunction::create(globalObject->vm(), globalObject, 0, "createCountersObject"_s, JS2Zig___src_bun_js_Counters_zig__createCountersObject, JSC::ImplementationVisibility::Public);
}

static ALWAYS_INLINE JSC::JSValue js2native_wrap_jsFunction_hasReifiedStatic(Zig::GlobalObject* globalObject) {
  return JSC::JSFunction::create(globalObject->vm(), globalObject, 1, "hasReifiedStatic"_s, jsFunction_hasReifiedStatic, JSC::ImplementationVisibility::Public);
}

static ALWAYS_INLINE JSC::JSValue js2native_wrap_jsSetSocketOptions(Zig::GlobalObject* globalObject) {
  return JSC::JSFunction::create(globalObject->vm(), globalObject, 3, "jsSetSocketOptions"_s, JS2Zig___src_bun_js_api_bun_socket_zig__jsSetSocketOptions, JSC::ImplementationVisibility::Public);
}

static ALWAYS_INLINE JSC::JSValue js2native_wrap_jsFunctionStructuredCloneAdvanced(Zig::GlobalObject* globalObject) {
  return JSC::JSFunction::create(globalObject->vm(), globalObject, 5, "jsFunctionStructuredCloneAdvanced"_s, jsFunctionStructuredCloneAdvanced, JSC::ImplementationVisibility::Public);
}

static ALWAYS_INLINE JSC::JSValue js2native_wrap_jsFunction_lsanDoLeakCheck(Zig::GlobalObject* globalObject) {
  return JSC::JSFunction::create(globalObject->vm(), globalObject, 1, "lsanDoLeakCheck"_s, jsFunction_lsanDoLeakCheck, JSC::ImplementationVisibility::Public);
}

static ALWAYS_INLINE JSC::JSValue js2native_wrap_getActiveTasks(Zig::GlobalObject* globalObject) {
  return JSC::JSFunction::create(globalObject->vm(), globalObject, 0, "getActiveTasks"_s, JS2Zig___src_bun_js_event_loop_zig__getActiveTasks, JSC::ImplementationVisibility::Public);
}

static ALWAYS_INLINE JSC::JSValue js2native_wrap_TestingAPIs_jsParseUrl(Zig::GlobalObject* globalObject) {
  return JSC::JSFunction::create(globalObject->vm(), globalObject, 1, "jsParseUrl"_s, JS2Zig___src_install_hosted_git_info_zig__TestingAPIs_jsParseUrl, JSC::ImplementationVisibility::Public);
}

static ALWAYS_INLINE JSC::JSValue js2native_wrap_TestingAPIs_jsFromUrl(Zig::GlobalObject* globalObject) {
  return JSC::JSFunction::create(globalObject->vm(), globalObject, 1, "jsFromUrl"_s, JS2Zig___src_install_hosted_git_info_zig__TestingAPIs_jsFromUrl, JSC::ImplementationVisibility::Public);
}

static ALWAYS_INLINE JSC::JSValue js2native_wrap_jsFunctionBakeGetAsyncLocalStorage(Zig::GlobalObject* globalObject) {
  return JSC::JSFunction::create(globalObject->vm(), globalObject, 0, "jsFunctionBakeGetAsyncLocalStorage"_s, jsFunctionBakeGetAsyncLocalStorage, JSC::ImplementationVisibility::Public);
}

static ALWAYS_INLINE JSC::JSValue js2native_wrap_emitHandleIPCMessage(Zig::GlobalObject* globalObject) {
  return JSC::JSFunction::create(globalObject->vm(), globalObject, 3, "emitHandleIPCMessage"_s, JS2Zig___src_bun_js_ipc_zig__emitHandleIPCMessage, JSC::ImplementationVisibility::Public);
}

static ALWAYS_INLINE JSC::JSValue js2native_wrap_setRef(Zig::GlobalObject* globalObject) {
  return JSC::JSFunction::create(globalObject->vm(), globalObject, 1, "setRef"_s, JS2Zig___src_bun_js_node_node_cluster_binding_zig__setRef, JSC::ImplementationVisibility::Public);
}
extern "C" SYSV_ABI JSC::EncodedJSValue js2native_bindgen_fmt_fmtString(Zig::GlobalObject*);
extern "C" SYSV_ABI JSC::EncodedJSValue js2native_bindgen_DevServer_getDeinitCountForTesting(Zig::GlobalObject*);
typedef JSC::JSValue (*JS2NativeFunction)(Zig::GlobalObject*);
static ALWAYS_INLINE JSC::JSValue callJS2Native(int32_t index, Zig::GlobalObject* global) {
 switch(index) {
    case 0: return js2native_wrap_Bun__FFI__cc(global);
    case 1: return createJSSQLStatementConstructor(global);
    case 2: return JS2Zig___src_bun_js_node_node_assert_binding_zig__generate(global);
    case 3: return js2native_wrap_sendHelperPrimary(global);
    case 4: return js2native_wrap_sendHelperChild(global);
    case 5: return js2native_wrap_onInternalMessageChild(global);
    case 6: return js2native_wrap_channelIgnoreOneDisconnectEventListener(global);
    case 7: return js2native_wrap_onInternalMessagePrimary(global);
    case 8: return js2native_wrap_jsIsX___Certificate(global);
    case 9: return createNodeHTTPInternalBinding(global);
    case 10: return js2native_wrap_jsFetchHeaders_getRawKeys(global);
    case 11: return js2native_wrap_setMaxHTTPHeaderSize(global);
    case 12: return js2native_wrap_getMaxHTTPHeaderSize(global);
    case 13: return js2native_wrap_jsFunction_monitorEventLoopDelay(global);
    case 14: return js2native_wrap_jsFunction_enableEventLoopDelay(global);
    case 15: return js2native_wrap_jsFunction_disableEventLoopDelay(global);
    case 16: return JS2Zig___src_sql_mysql_zig__createBinding(global);
    case 17: return JS2Zig___src_sql_postgres_zig__createBinding(global);
    case 18: return js2native_wrap_jsFunctionTransferToNativeReadableStream(global);
    case 19: return js2native_wrap_extractedSplitNewLinesFastPathStringsOnly(global);
    case 20: return js2native_wrap_String_jsGetStringWidth(global);
    case 21: return createJSMIMEBinding(global);
    case 22: return js2native_wrap_jsFunction_validateObject(global);
    case 23: return js2native_wrap_jsFunction_validateInteger(global);
    case 24: return js2native_wrap_jsFunction_validateNumber(global);
    case 25: return js2native_wrap_jsFunction_validateFiniteNumber(global);
    case 26: return js2native_wrap_jsFunction_checkRangesOrGetDefault(global);
    case 27: return js2native_wrap_jsFunction_validatePort(global);
    case 28: return js2native_wrap_jsFunction_validateAbortSignal(global);
    case 29: return js2native_wrap_jsFunction_validateArray(global);
    case 30: return js2native_wrap_jsFunction_validateInt__(global);
    case 31: return js2native_wrap_jsFunction_validateUint__(global);
    case 32: return js2native_wrap_jsFunction_validateSignalName(global);
    case 33: return js2native_wrap_jsFunction_validateEncoding(global);
    case 34: return js2native_wrap_jsFunction_validatePlainFunction(global);
    case 35: return js2native_wrap_jsFunction_validateBuffer(global);
    case 36: return js2native_wrap_jsFunction_validateOneOf(global);
    case 37: return js2native_wrap_normalizeEncoding(global);
    case 38: return js2native_wrap_jsUpgradeDuplexToTLS(global);
    case 39: return js2native_wrap_nodeHttpClient(global);
    case 40: return js2native_wrap_getBunServerAllClosedPromise(global);
    case 41: return js2native_wrap_jsSetAsyncHooksEnabled(global);
    case 42: return js2native_wrap_jsCleanupLater(global);
    case 43: return js2native_wrap_etimedoutErrorCode(global);
    case 44: return js2native_wrap_enobufsErrorCode(global);
    case 45: return createNodeCryptoBinding(global);
    case 46: return JS2Zig___src_bun_js_node_node_crypto_binding_zig__createNodeCryptoBindingZig(global);
    case 47: return js2native_wrap_UDPSocket_jsConnect(global);
    case 48: return js2native_wrap_UDPSocket_jsDisconnect(global);
    case 49: return js2native_wrap_Resolver_getRuntimeDefaultResultOrderOption(global);
    case 50: return js2native_wrap_Resolver_newResolver(global);
    case 51: return js2native_wrap_jsFunctionNodeEventsGetEventListeners(global);
    case 52: return js2native_wrap_jsEventTargetGetEventListenersCount(global);
    case 53: return JS2Zig___src_bun_js_node_node_fs_binding_zig__createBinding(global);
    case 54: return js2native_wrap_jsAssertEncodingValid(global);
    case 55: return JS2Zig___src_bun_js_api_bun_h__frame_parser_zig__H_FrameParserConstructor(global);
    case 56: return js2native_wrap_jsAssertSettings(global);
    case 57: return js2native_wrap_jsFunction_startCPUProfiler(global);
    case 58: return js2native_wrap_jsFunction_stopCPUProfiler(global);
    case 59: return js2native_wrap_jsFunction_setCPUSamplingInterval(global);
    case 60: return js2native_wrap_jsFunction_isCPUProfilerRunning(global);
    case 61: return JS2Zig___src_bun_js_node_node_net_binding_zig__getDefaultAutoSelectFamily(global);
    case 62: return JS2Zig___src_bun_js_node_node_net_binding_zig__setDefaultAutoSelectFamily(global);
    case 63: return JS2Zig___src_bun_js_node_node_net_binding_zig__getDefaultAutoSelectFamilyAttemptTimeout(global);
    case 64: return JS2Zig___src_bun_js_node_node_net_binding_zig__setDefaultAutoSelectFamilyAttemptTimeout(global);
    case 65: return JS2Zig___src_bun_js_node_node_net_binding_zig__SocketAddress(global);
    case 66: return JS2Zig___src_bun_js_node_node_net_binding_zig__BlockList(global);
    case 67: return js2native_wrap_newDetachedSocket(global);
    case 68: return js2native_wrap_doConnect(global);
    case 69: return js2native_wrap_jsAddServerName(global);
    case 70: return js2native_wrap_jsIsNamedPipeSocket(global);
    case 71: return js2native_wrap_jsGetBufferedAmount(global);
    case 72: return JS2Zig___src_bun_js_node_node_os_zig__createNodeOsBinding(global);
    case 73: return createNodePathBinding(global);
    case 74: return js2native_wrap_jsFunction_createHistogram(global);
    case 75: return js2native_wrap_getBundledRootCertificates(global);
    case 76: return js2native_wrap_getExtraCACertificates(global);
    case 77: return js2native_wrap_getSystemCACertificates(global);
    case 78: return js2native_wrap_Bun__canonicalizeIP(global);
    case 79: return js2native_wrap_getDefaultCiphers(global);
    case 80: return js2native_wrap_setDefaultCiphers(global);
    case 81: return js2native_wrap_getUseSystemCA(global);
    case 82: return createBunTTYFunctions(global);
    case 83: return Bun::createNodeURLBinding(global);
    case 84: return js2native_wrap_internalErrorName(global);
    case 85: return js2native_wrap_parseEnv(global);
    case 86: return js2native_wrap_parseArgs(global);
    case 87: return js2native_wrap_jsFunctionIsError(global);
    case 88: return Bun::createNodeVMBinding(global);
    case 89: return createNodeWorkerThreadsBinding(global);
    case 90: return js2native_wrap_jsFunctionPostMessage(global);
    case 91: return js2native_wrap_crc__(global);
    case 92: return JS2Zig___src_bun_js_node_node_zlib_binding_zig__NativeZlib(global);
    case 93: return JS2Zig___src_bun_js_node_node_zlib_binding_zig__NativeBrotli(global);
    case 94: return JS2Zig___src_bun_js_node_node_zlib_binding_zig__NativeZstd(global);
    case 95: return createNodeFetchInternalBinding(global);
    case 96: return createUndiciInternalBinding(global);
    case 97: return getWebSocketConstructor(global);
    case 98: return JSC::JSValue::decode(js2native_bindgen_fmt_fmtString(global));
    case 99: return js2native_wrap_TestingAPIs_parse(global);
    case 100: return js2native_wrap_TestingAPIs_apply(global);
    case 101: return js2native_wrap_TestingAPIs_makeDiff(global);
    case 102: return js2native_wrap_TestingAPIs_shellLex(global);
    case 103: return js2native_wrap_TestingAPIs_shellParse(global);
    case 104: return js2native_wrap_jsEscapeRegExp(global);
    case 105: return js2native_wrap_jsEscapeRegExpForPackageNameMatching(global);
    case 106: return js2native_wrap_TestingAPIs_disabledOnThisPlatform(global);
    case 107: return js2native_wrap_IniTestingAPIs_parse(global);
    case 108: return js2native_wrap_IniTestingAPIs_loadNpmrcFromJS(global);
    case 109: return js2native_wrap_minifyTestWithOptions(global);
    case 110: return js2native_wrap_minifyErrorTestWithOptions(global);
    case 111: return js2native_wrap_testWithOptions(global);
    case 112: return js2native_wrap_prefixTestWithOptions(global);
    case 113: return js2native_wrap_minifyTest(global);
    case 114: return js2native_wrap_prefixTest(global);
    case 115: return js2native_wrap__test(global);
    case 116: return js2native_wrap_attrTest(global);
    case 117: return JS2Zig___src_crash_handler_zig__js_bindings_generate(global);
    case 118: return JS2Zig___src_cli_upgrade_command_zig__upgrade_js_bindings_generate(global);
    case 119: return JS2Zig___src_install_install_binding_zig__bun_install_js_bindings_generate(global);
    case 120: return createJSCTestingHelpers(global);
    case 121: return createNativeFrameForTesting(global);
    case 122: return js2native_wrap_createMemfdForTesting(global);
    case 123: return js2native_wrap_Bun__setSyntheticAllocationLimitForTesting(global);
    case 124: return JS2Zig___src_install_npm_zig__PackageManifest_bindings_generate(global);
    case 125: return js2native_wrap_fromJS(global);
    case 126: return js2native_wrap_Version_Tag_inferFromJS(global);
    case 127: return js2native_wrap_bindings_jsReadTarball(global);
    case 128: return js2native_wrap_Architecture_jsFunctionArchitectureIsMatch(global);
    case 129: return js2native_wrap_OperatingSystem_jsFunctionOperatingSystemIsMatch(global);
    case 130: return js2native_wrap_jsCreateSocketPair(global);
    case 131: return js2native_wrap_jsFunctionIsModuleResolveFilenameSlowPathEnabled(global);
    case 132: return JS2Zig___src_bake_FrameworkRouter_zig__JSFrameworkRouter_getBindings(global);
    case 133: return JS2Zig___src_bun_js_bindgen_test_zig__getBindgenTestFunctions(global);
    case 134: return createNoOpForTesting(global);
    case 135: return js2native_wrap_jsFunction_arrayBufferViewHasBuffer(global);
    case 136: return js2native_wrap_internal_bindings_timerClockMs(global);
    case 137: return js2native_wrap_jsFunctionDecodeURIComponentSIMD(global);
    case 138: return JSC::JSValue::decode(js2native_bindgen_DevServer_getDeinitCountForTesting(global));
    case 139: return js2native_wrap_createCountersObject(global);
    case 140: return js2native_wrap_jsFunction_hasReifiedStatic(global);
    case 141: return js2native_wrap_jsSetSocketOptions(global);
    case 142: return js2native_wrap_jsFunctionStructuredCloneAdvanced(global);
    case 143: return js2native_wrap_jsFunction_lsanDoLeakCheck(global);
    case 144: return js2native_wrap_getActiveTasks(global);
    case 145: return js2native_wrap_TestingAPIs_jsParseUrl(global);
    case 146: return js2native_wrap_TestingAPIs_jsFromUrl(global);
    case 147: return js2native_wrap_jsFunctionBakeGetAsyncLocalStorage(global);
    case 148: return js2native_wrap_emitHandleIPCMessage(global);
    case 149: return js2native_wrap_setRef(global);
    default:
      __builtin_unreachable();
  }
}
#define JS2NATIVE_COUNT 150
}
