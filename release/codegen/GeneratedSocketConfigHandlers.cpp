#include "root.h"
#include "GeneratedSocketConfigHandlers.h"
#include "Bindgen/IDLConvert.h"
#include <JavaScriptCore/Identifier.h>

template<> Bun::Bindgen::Generated::SocketConfigHandlers
WebCore::convertDictionary<Bun::Bindgen::Generated::SocketConfigHandlers>(
    JSC::JSGlobalObject& globalObject,
    JSC::JSValue value)
{
    ::JSC::VM& vm = globalObject.vm();
    auto throwScope = DECLARE_THROW_SCOPE(vm);
    auto ctx = Bun::Bindgen::LiteralConversionContext { "SocketHandler"_s };
    auto* object = value.getObject();
    if (!object) [[unlikely]] {
        ctx.throwNotObject(globalObject, throwScope);
        return {};
    }
    ::Bun::Bindgen::Generated::SocketConfigHandlers result;
    {
        ::JSC::JSValue value0;
        auto ctx0 = Bun::Bindgen::LiteralConversionContext { "SocketHandler.open"_s };
        do {
            value0 = object->get(
                &globalObject,
                ::JSC::Identifier::fromString(vm, "open"_s));
            RETURN_IF_EXCEPTION(throwScope, {});
        } while (false);
        result.onOpen = Bun::convertIDL<::Bun::IDLRawAny>(globalObject, value0, ctx0);
        RETURN_IF_EXCEPTION(throwScope, {});
    }
    {
        ::JSC::JSValue value1;
        auto ctx1 = Bun::Bindgen::LiteralConversionContext { "SocketHandler.close"_s };
        do {
            value1 = object->get(
                &globalObject,
                ::JSC::Identifier::fromString(vm, "close"_s));
            RETURN_IF_EXCEPTION(throwScope, {});
        } while (false);
        result.onClose = Bun::convertIDL<::Bun::IDLRawAny>(globalObject, value1, ctx1);
        RETURN_IF_EXCEPTION(throwScope, {});
    }
    {
        ::JSC::JSValue value2;
        auto ctx2 = Bun::Bindgen::LiteralConversionContext { "SocketHandler.error"_s };
        do {
            value2 = object->get(
                &globalObject,
                ::JSC::Identifier::fromString(vm, "error"_s));
            RETURN_IF_EXCEPTION(throwScope, {});
        } while (false);
        result.onError = Bun::convertIDL<::Bun::IDLRawAny>(globalObject, value2, ctx2);
        RETURN_IF_EXCEPTION(throwScope, {});
    }
    {
        ::JSC::JSValue value3;
        auto ctx3 = Bun::Bindgen::LiteralConversionContext { "SocketHandler.data"_s };
        do {
            value3 = object->get(
                &globalObject,
                ::JSC::Identifier::fromString(vm, "data"_s));
            RETURN_IF_EXCEPTION(throwScope, {});
        } while (false);
        result.onData = Bun::convertIDL<::Bun::IDLRawAny>(globalObject, value3, ctx3);
        RETURN_IF_EXCEPTION(throwScope, {});
    }
    {
        ::JSC::JSValue value4;
        auto ctx4 = Bun::Bindgen::LiteralConversionContext { "SocketHandler.drain"_s };
        do {
            value4 = object->get(
                &globalObject,
                ::JSC::Identifier::fromString(vm, "drain"_s));
            RETURN_IF_EXCEPTION(throwScope, {});
        } while (false);
        result.onWritable = Bun::convertIDL<::Bun::IDLRawAny>(globalObject, value4, ctx4);
        RETURN_IF_EXCEPTION(throwScope, {});
    }
    {
        ::JSC::JSValue value5;
        auto ctx5 = Bun::Bindgen::LiteralConversionContext { "SocketHandler.handshake"_s };
        do {
            value5 = object->get(
                &globalObject,
                ::JSC::Identifier::fromString(vm, "handshake"_s));
            RETURN_IF_EXCEPTION(throwScope, {});
        } while (false);
        result.onHandshake = Bun::convertIDL<::Bun::IDLRawAny>(globalObject, value5, ctx5);
        RETURN_IF_EXCEPTION(throwScope, {});
    }
    {
        ::JSC::JSValue value6;
        auto ctx6 = Bun::Bindgen::LiteralConversionContext { "SocketHandler.end"_s };
        do {
            value6 = object->get(
                &globalObject,
                ::JSC::Identifier::fromString(vm, "end"_s));
            RETURN_IF_EXCEPTION(throwScope, {});
        } while (false);
        result.onEnd = Bun::convertIDL<::Bun::IDLRawAny>(globalObject, value6, ctx6);
        RETURN_IF_EXCEPTION(throwScope, {});
    }
    {
        ::JSC::JSValue value7;
        auto ctx7 = Bun::Bindgen::LiteralConversionContext { "SocketHandler.connectError"_s };
        do {
            value7 = object->get(
                &globalObject,
                ::JSC::Identifier::fromString(vm, "connectError"_s));
            RETURN_IF_EXCEPTION(throwScope, {});
        } while (false);
        result.onConnectError = Bun::convertIDL<::Bun::IDLRawAny>(globalObject, value7, ctx7);
        RETURN_IF_EXCEPTION(throwScope, {});
    }
    {
        ::JSC::JSValue value8;
        auto ctx8 = Bun::Bindgen::LiteralConversionContext { "SocketHandler.timeout"_s };
        do {
            value8 = object->get(
                &globalObject,
                ::JSC::Identifier::fromString(vm, "timeout"_s));
            RETURN_IF_EXCEPTION(throwScope, {});
        } while (false);
        result.onTimeout = Bun::convertIDL<::Bun::IDLRawAny>(globalObject, value8, ctx8);
        RETURN_IF_EXCEPTION(throwScope, {});
    }
    {
        ::JSC::JSValue value9;
        auto ctx9 = Bun::Bindgen::LiteralConversionContext { "SocketHandler.binaryType"_s };
        do {
            value9 = object->get(
                &globalObject,
                ::JSC::Identifier::fromString(vm, "binaryType"_s));
            RETURN_IF_EXCEPTION(throwScope, {});
        } while (false);
        if (value9.isUndefined()) {
            result.binary_type = ::Bun::Bindgen::Generated::SocketConfigBinaryType::kBuffer;
        } else {
            result.binary_type = Bun::convertIDL<::Bun::Bindgen::Generated::IDLSocketConfigBinaryType>(globalObject, value9, ctx9);
            RETURN_IF_EXCEPTION(throwScope, {});
        }
    }
    return result;
}

namespace Bun::Bindgen::Generated {
extern "C" bool bindgenConvertJSToSocketConfigHandlers(
    ::JSC::JSGlobalObject* globalObject,
    ::JSC::EncodedJSValue value,
    ExternSocketConfigHandlers* result)
{
    ::JSC::VM& vm = globalObject->vm();
    auto throwScope = DECLARE_THROW_SCOPE(vm);
    SocketConfigHandlers convertedValue = ::WebCore::convert<IDLDictionary<SocketConfigHandlers>>(
        *globalObject,
        JSC::JSValue::decode(value)
    );
    RETURN_IF_EXCEPTION(throwScope, false);
    *result = ExternTraits<SocketConfigHandlers>::convertToExtern(::std::move(convertedValue));
    return true;
}
}
