#include "root.h"
#include "GeneratedSocketConfig.h"
#include "Bindgen/IDLConvert.h"
#include <JavaScriptCore/Identifier.h>

template<> Bun::Bindgen::Generated::SocketConfig
WebCore::convertDictionary<Bun::Bindgen::Generated::SocketConfig>(
    JSC::JSGlobalObject& globalObject,
    JSC::JSValue value)
{
    ::JSC::VM& vm = globalObject.vm();
    auto throwScope = DECLARE_THROW_SCOPE(vm);
    auto ctx = Bun::Bindgen::LiteralConversionContext { "SocketOptions"_s };
    auto* object = value.getObject();
    if (!object) [[unlikely]] {
        ctx.throwNotObject(globalObject, throwScope);
        return {};
    }
    ::Bun::Bindgen::Generated::SocketConfig result;
    {
        ::JSC::JSValue value0;
        auto ctx0 = Bun::Bindgen::LiteralConversionContext { "SocketOptions.socket"_s };
        do {
            value0 = object->get(
                &globalObject,
                ::JSC::Identifier::fromString(vm, "socket"_s));
            RETURN_IF_EXCEPTION(throwScope, {});
        } while (false);
        if (value0.isUndefined()) {
            ctx0.throwRequired(globalObject, throwScope);
            return {};
        }
        result.handlers = Bun::convertIDL<::Bun::Bindgen::Generated::IDLSocketConfigHandlers>(globalObject, value0, ctx0);
        RETURN_IF_EXCEPTION(throwScope, {});
    }
    {
        ::JSC::JSValue value1;
        auto ctx1 = Bun::Bindgen::LiteralConversionContext { "SocketOptions.data"_s };
        do {
            value1 = object->get(
                &globalObject,
                ::JSC::Identifier::fromString(vm, "data"_s));
            RETURN_IF_EXCEPTION(throwScope, {});
        } while (false);
        result.data = Bun::convertIDL<::Bun::IDLRawAny>(globalObject, value1, ctx1);
        RETURN_IF_EXCEPTION(throwScope, {});
    }
    {
        ::JSC::JSValue value2;
        auto ctx2 = Bun::Bindgen::LiteralConversionContext { "SocketOptions.allowHalfOpen"_s };
        do {
            value2 = object->get(
                &globalObject,
                ::JSC::Identifier::fromString(vm, "allowHalfOpen"_s));
            RETURN_IF_EXCEPTION(throwScope, {});
        } while (false);
        if (value2.isUndefined()) {
            result.allow_half_open = false;
        } else {
            result.allow_half_open = Bun::convertIDL<::Bun::IDLStrictBoolean>(globalObject, value2, ctx2);
            RETURN_IF_EXCEPTION(throwScope, {});
        }
    }
    {
        ::JSC::JSValue value3;
        auto ctx3 = Bun::Bindgen::LiteralConversionContext { "SocketOptions.hostname"_s };
        do {
            value3 = object->get(
                &globalObject,
                ::JSC::Identifier::fromString(vm, "hostname"_s));
            RETURN_IF_EXCEPTION(throwScope, {});
            if (!value3.isUndefined()) break;
            value3 = object->get(
                &globalObject,
                ::JSC::Identifier::fromString(vm, "host"_s));
            RETURN_IF_EXCEPTION(throwScope, {});
        } while (false);
        result.hostname = Bun::convertIDL<::Bun::IDLLooseNullable<::Bun::IDLDOMString>>(globalObject, value3, ctx3);
        RETURN_IF_EXCEPTION(throwScope, {});
    }
    {
        ::JSC::JSValue value4;
        auto ctx4 = Bun::Bindgen::LiteralConversionContext { "SocketOptions.port"_s };
        do {
            value4 = object->get(
                &globalObject,
                ::JSC::Identifier::fromString(vm, "port"_s));
            RETURN_IF_EXCEPTION(throwScope, {});
        } while (false);
        result.port = Bun::convertIDL<::WebCore::IDLNullable<::Bun::IDLLooseInteger<::std::uint16_t>>>(globalObject, value4, ctx4);
        RETURN_IF_EXCEPTION(throwScope, {});
    }
    {
        ::JSC::JSValue value5;
        auto ctx5 = Bun::Bindgen::LiteralConversionContext { "SocketOptions.tls"_s };
        do {
            value5 = object->get(
                &globalObject,
                ::JSC::Identifier::fromString(vm, "tls"_s));
            RETURN_IF_EXCEPTION(throwScope, {});
        } while (false);
        result.tls = Bun::convertIDL<::Bun::Bindgen::Generated::IDLSocketConfigTLS>(globalObject, value5, ctx5);
        RETURN_IF_EXCEPTION(throwScope, {});
    }
    {
        ::JSC::JSValue value6;
        auto ctx6 = Bun::Bindgen::LiteralConversionContext { "SocketOptions.exclusive"_s };
        do {
            value6 = object->get(
                &globalObject,
                ::JSC::Identifier::fromString(vm, "exclusive"_s));
            RETURN_IF_EXCEPTION(throwScope, {});
        } while (false);
        if (value6.isUndefined()) {
            result.exclusive = false;
        } else {
            result.exclusive = Bun::convertIDL<::Bun::IDLStrictBoolean>(globalObject, value6, ctx6);
            RETURN_IF_EXCEPTION(throwScope, {});
        }
    }
    {
        ::JSC::JSValue value7;
        auto ctx7 = Bun::Bindgen::LiteralConversionContext { "SocketOptions.reusePort"_s };
        do {
            value7 = object->get(
                &globalObject,
                ::JSC::Identifier::fromString(vm, "reusePort"_s));
            RETURN_IF_EXCEPTION(throwScope, {});
        } while (false);
        if (value7.isUndefined()) {
            result.reuse_port = false;
        } else {
            result.reuse_port = Bun::convertIDL<::Bun::IDLStrictBoolean>(globalObject, value7, ctx7);
            RETURN_IF_EXCEPTION(throwScope, {});
        }
    }
    {
        ::JSC::JSValue value8;
        auto ctx8 = Bun::Bindgen::LiteralConversionContext { "SocketOptions.ipv6Only"_s };
        do {
            value8 = object->get(
                &globalObject,
                ::JSC::Identifier::fromString(vm, "ipv6Only"_s));
            RETURN_IF_EXCEPTION(throwScope, {});
        } while (false);
        if (value8.isUndefined()) {
            result.ipv6_only = false;
        } else {
            result.ipv6_only = Bun::convertIDL<::Bun::IDLStrictBoolean>(globalObject, value8, ctx8);
            RETURN_IF_EXCEPTION(throwScope, {});
        }
    }
    {
        ::JSC::JSValue value9;
        auto ctx9 = Bun::Bindgen::LiteralConversionContext { "SocketOptions.unix"_s };
        do {
            value9 = object->get(
                &globalObject,
                ::JSC::Identifier::fromString(vm, "unix"_s));
            RETURN_IF_EXCEPTION(throwScope, {});
        } while (false);
        result.unix_ = Bun::convertIDL<::Bun::IDLLooseNullable<::Bun::IDLStrictString>>(globalObject, value9, ctx9);
        RETURN_IF_EXCEPTION(throwScope, {});
    }
    {
        ::JSC::JSValue value10;
        auto ctx10 = Bun::Bindgen::LiteralConversionContext { "SocketOptions.fd"_s };
        do {
            value10 = object->get(
                &globalObject,
                ::JSC::Identifier::fromString(vm, "fd"_s));
            RETURN_IF_EXCEPTION(throwScope, {});
        } while (false);
        result.fd = Bun::convertIDL<::WebCore::IDLOptional<::Bun::IDLStrictInteger<::std::int32_t>>>(globalObject, value10, ctx10);
        RETURN_IF_EXCEPTION(throwScope, {});
    }
    return result;
}

namespace Bun::Bindgen::Generated {
extern "C" bool bindgenConvertJSToSocketConfig(
    ::JSC::JSGlobalObject* globalObject,
    ::JSC::EncodedJSValue value,
    ExternSocketConfig* result)
{
    ::JSC::VM& vm = globalObject->vm();
    auto throwScope = DECLARE_THROW_SCOPE(vm);
    SocketConfig convertedValue = ::WebCore::convert<IDLDictionary<SocketConfig>>(
        *globalObject,
        JSC::JSValue::decode(value)
    );
    RETURN_IF_EXCEPTION(throwScope, false);
    *result = ExternTraits<SocketConfig>::convertToExtern(::std::move(convertedValue));
    return true;
}
}
