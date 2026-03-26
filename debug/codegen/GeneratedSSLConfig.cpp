#include "root.h"
#include "GeneratedSSLConfig.h"
#include "Bindgen/IDLConvert.h"
#include <JavaScriptCore/Identifier.h>

template<> Bun::Bindgen::Generated::SSLConfig
WebCore::convertDictionary<Bun::Bindgen::Generated::SSLConfig>(
    JSC::JSGlobalObject& globalObject,
    JSC::JSValue value)
{
    ::JSC::VM& vm = globalObject.vm();
    auto throwScope = DECLARE_THROW_SCOPE(vm);
    auto ctx = Bun::Bindgen::LiteralConversionContext { "TLSOptions"_s };
    auto* object = value.getObject();
    if (!object) [[unlikely]] {
        ctx.throwNotObject(globalObject, throwScope);
        return {};
    }
    ::Bun::Bindgen::Generated::SSLConfig result;
    {
        ::JSC::JSValue value0;
        auto ctx0 = Bun::Bindgen::LiteralConversionContext { "TLSOptions.passphrase"_s };
        do {
            value0 = object->get(
                &globalObject,
                ::JSC::Identifier::fromString(vm, "passphrase"_s));
            RETURN_IF_EXCEPTION(throwScope, {});
        } while (false);
        result.passphrase = Bun::convertIDL<::WebCore::IDLNullable<::Bun::IDLStrictString>>(globalObject, value0, ctx0);
        RETURN_IF_EXCEPTION(throwScope, {});
    }
    {
        ::JSC::JSValue value1;
        auto ctx1 = Bun::Bindgen::LiteralConversionContext { "TLSOptions.dhParamsFile"_s };
        do {
            value1 = object->get(
                &globalObject,
                ::JSC::Identifier::fromString(vm, "dhParamsFile"_s));
            RETURN_IF_EXCEPTION(throwScope, {});
        } while (false);
        result.dh_params_file = Bun::convertIDL<::WebCore::IDLNullable<::Bun::IDLStrictString>>(globalObject, value1, ctx1);
        RETURN_IF_EXCEPTION(throwScope, {});
    }
    {
        ::JSC::JSValue value2;
        auto ctx2 = Bun::Bindgen::LiteralConversionContext { "TLSOptions.serverName"_s };
        do {
            value2 = object->get(
                &globalObject,
                ::JSC::Identifier::fromString(vm, "serverName"_s));
            RETURN_IF_EXCEPTION(throwScope, {});
            if (!value2.isUndefined()) break;
            value2 = object->get(
                &globalObject,
                ::JSC::Identifier::fromString(vm, "servername"_s));
            RETURN_IF_EXCEPTION(throwScope, {});
        } while (false);
        result.server_name = Bun::convertIDL<::WebCore::IDLNullable<::Bun::IDLStrictString>>(globalObject, value2, ctx2);
        RETURN_IF_EXCEPTION(throwScope, {});
    }
    {
        ::JSC::JSValue value3;
        auto ctx3 = Bun::Bindgen::LiteralConversionContext { "TLSOptions.lowMemoryMode"_s };
        do {
            value3 = object->get(
                &globalObject,
                ::JSC::Identifier::fromString(vm, "lowMemoryMode"_s));
            RETURN_IF_EXCEPTION(throwScope, {});
        } while (false);
        if (value3.isUndefined()) {
            result.low_memory_mode = false;
        } else {
            result.low_memory_mode = Bun::convertIDL<::Bun::IDLStrictBoolean>(globalObject, value3, ctx3);
            RETURN_IF_EXCEPTION(throwScope, {});
        }
    }
    {
        ::JSC::JSValue value4;
        auto ctx4 = Bun::Bindgen::LiteralConversionContext { "TLSOptions.rejectUnauthorized"_s };
        do {
            value4 = object->get(
                &globalObject,
                ::JSC::Identifier::fromString(vm, "rejectUnauthorized"_s));
            RETURN_IF_EXCEPTION(throwScope, {});
        } while (false);
        result.reject_unauthorized = Bun::convertIDL<::WebCore::IDLNullable<::Bun::IDLStrictBoolean>>(globalObject, value4, ctx4);
        RETURN_IF_EXCEPTION(throwScope, {});
    }
    {
        ::JSC::JSValue value5;
        auto ctx5 = Bun::Bindgen::LiteralConversionContext { "TLSOptions.requestCert"_s };
        do {
            value5 = object->get(
                &globalObject,
                ::JSC::Identifier::fromString(vm, "requestCert"_s));
            RETURN_IF_EXCEPTION(throwScope, {});
        } while (false);
        if (value5.isUndefined()) {
            result.request_cert = false;
        } else {
            result.request_cert = Bun::convertIDL<::Bun::IDLStrictBoolean>(globalObject, value5, ctx5);
            RETURN_IF_EXCEPTION(throwScope, {});
        }
    }
    {
        ::JSC::JSValue value6;
        auto ctx6 = Bun::Bindgen::LiteralConversionContext { "TLSOptions.ca"_s };
        do {
            value6 = object->get(
                &globalObject,
                ::JSC::Identifier::fromString(vm, "ca"_s));
            RETURN_IF_EXCEPTION(throwScope, {});
        } while (false);
        result.ca = Bun::convertIDL<::Bun::Bindgen::Generated::IDLSSLConfigFile>(globalObject, value6, ctx6);
        RETURN_IF_EXCEPTION(throwScope, {});
    }
    {
        ::JSC::JSValue value7;
        auto ctx7 = Bun::Bindgen::LiteralConversionContext { "TLSOptions.cert"_s };
        do {
            value7 = object->get(
                &globalObject,
                ::JSC::Identifier::fromString(vm, "cert"_s));
            RETURN_IF_EXCEPTION(throwScope, {});
        } while (false);
        result.cert = Bun::convertIDL<::Bun::Bindgen::Generated::IDLSSLConfigFile>(globalObject, value7, ctx7);
        RETURN_IF_EXCEPTION(throwScope, {});
    }
    {
        ::JSC::JSValue value8;
        auto ctx8 = Bun::Bindgen::LiteralConversionContext { "TLSOptions.key"_s };
        do {
            value8 = object->get(
                &globalObject,
                ::JSC::Identifier::fromString(vm, "key"_s));
            RETURN_IF_EXCEPTION(throwScope, {});
        } while (false);
        result.key = Bun::convertIDL<::Bun::Bindgen::Generated::IDLSSLConfigFile>(globalObject, value8, ctx8);
        RETURN_IF_EXCEPTION(throwScope, {});
    }
    {
        ::JSC::JSValue value9;
        auto ctx9 = Bun::Bindgen::LiteralConversionContext { "TLSOptions.secureOptions"_s };
        do {
            value9 = object->get(
                &globalObject,
                ::JSC::Identifier::fromString(vm, "secureOptions"_s));
            RETURN_IF_EXCEPTION(throwScope, {});
        } while (false);
        if (value9.isUndefined()) {
            result.secure_options = 0;
        } else {
            result.secure_options = Bun::convertIDL<::Bun::IDLStrictInteger<::std::uint32_t>>(globalObject, value9, ctx9);
            RETURN_IF_EXCEPTION(throwScope, {});
        }
    }
    {
        ::JSC::JSValue value10;
        auto ctx10 = Bun::Bindgen::LiteralConversionContext { "TLSOptions.keyFile"_s };
        do {
            value10 = object->get(
                &globalObject,
                ::JSC::Identifier::fromString(vm, "keyFile"_s));
            RETURN_IF_EXCEPTION(throwScope, {});
        } while (false);
        result.key_file = Bun::convertIDL<::WebCore::IDLNullable<::Bun::IDLStrictString>>(globalObject, value10, ctx10);
        RETURN_IF_EXCEPTION(throwScope, {});
    }
    {
        ::JSC::JSValue value11;
        auto ctx11 = Bun::Bindgen::LiteralConversionContext { "TLSOptions.certFile"_s };
        do {
            value11 = object->get(
                &globalObject,
                ::JSC::Identifier::fromString(vm, "certFile"_s));
            RETURN_IF_EXCEPTION(throwScope, {});
        } while (false);
        result.cert_file = Bun::convertIDL<::WebCore::IDLNullable<::Bun::IDLStrictString>>(globalObject, value11, ctx11);
        RETURN_IF_EXCEPTION(throwScope, {});
    }
    {
        ::JSC::JSValue value12;
        auto ctx12 = Bun::Bindgen::LiteralConversionContext { "TLSOptions.caFile"_s };
        do {
            value12 = object->get(
                &globalObject,
                ::JSC::Identifier::fromString(vm, "caFile"_s));
            RETURN_IF_EXCEPTION(throwScope, {});
        } while (false);
        result.ca_file = Bun::convertIDL<::WebCore::IDLNullable<::Bun::IDLStrictString>>(globalObject, value12, ctx12);
        RETURN_IF_EXCEPTION(throwScope, {});
    }
    {
        ::JSC::JSValue value13;
        auto ctx13 = Bun::Bindgen::LiteralConversionContext { "TLSOptions.ALPNProtocols"_s };
        do {
            value13 = object->get(
                &globalObject,
                ::JSC::Identifier::fromString(vm, "ALPNProtocols"_s));
            RETURN_IF_EXCEPTION(throwScope, {});
        } while (false);
        result.alpn_protocols = Bun::convertIDL<::Bun::Bindgen::Generated::IDLALPNProtocols>(globalObject, value13, ctx13);
        RETURN_IF_EXCEPTION(throwScope, {});
    }
    {
        ::JSC::JSValue value14;
        auto ctx14 = Bun::Bindgen::LiteralConversionContext { "TLSOptions.ciphers"_s };
        do {
            value14 = object->get(
                &globalObject,
                ::JSC::Identifier::fromString(vm, "ciphers"_s));
            RETURN_IF_EXCEPTION(throwScope, {});
        } while (false);
        result.ciphers = Bun::convertIDL<::WebCore::IDLNullable<::Bun::IDLStrictString>>(globalObject, value14, ctx14);
        RETURN_IF_EXCEPTION(throwScope, {});
    }
    {
        ::JSC::JSValue value15;
        auto ctx15 = Bun::Bindgen::LiteralConversionContext { "TLSOptions.clientRenegotiationLimit"_s };
        do {
            value15 = object->get(
                &globalObject,
                ::JSC::Identifier::fromString(vm, "clientRenegotiationLimit"_s));
            RETURN_IF_EXCEPTION(throwScope, {});
        } while (false);
        if (value15.isUndefined()) {
            result.client_renegotiation_limit = 0;
        } else {
            result.client_renegotiation_limit = Bun::convertIDL<::Bun::IDLStrictInteger<::std::uint32_t>>(globalObject, value15, ctx15);
            RETURN_IF_EXCEPTION(throwScope, {});
        }
    }
    {
        ::JSC::JSValue value16;
        auto ctx16 = Bun::Bindgen::LiteralConversionContext { "TLSOptions.clientRenegotiationWindow"_s };
        do {
            value16 = object->get(
                &globalObject,
                ::JSC::Identifier::fromString(vm, "clientRenegotiationWindow"_s));
            RETURN_IF_EXCEPTION(throwScope, {});
        } while (false);
        if (value16.isUndefined()) {
            result.client_renegotiation_window = 0;
        } else {
            result.client_renegotiation_window = Bun::convertIDL<::Bun::IDLStrictInteger<::std::uint32_t>>(globalObject, value16, ctx16);
            RETURN_IF_EXCEPTION(throwScope, {});
        }
    }
    return result;
}

namespace Bun::Bindgen::Generated {
extern "C" bool bindgenConvertJSToSSLConfig(
    ::JSC::JSGlobalObject* globalObject,
    ::JSC::EncodedJSValue value,
    ExternSSLConfig* result)
{
    ::JSC::VM& vm = globalObject->vm();
    auto throwScope = DECLARE_THROW_SCOPE(vm);
    SSLConfig convertedValue = ::WebCore::convert<IDLDictionary<SSLConfig>>(
        *globalObject,
        JSC::JSValue::decode(value)
    );
    RETURN_IF_EXCEPTION(throwScope, false);
    *result = ExternTraits<SSLConfig>::convertToExtern(::std::move(convertedValue));
    return true;
}
}
