#include "root.h"
#include "GeneratedFakeTimersConfig.h"
#include "Bindgen/IDLConvert.h"
#include <JavaScriptCore/Identifier.h>

template<> Bun::Bindgen::Generated::FakeTimersConfig
WebCore::convertDictionary<Bun::Bindgen::Generated::FakeTimersConfig>(
    JSC::JSGlobalObject& globalObject,
    JSC::JSValue value)
{
    ::JSC::VM& vm = globalObject.vm();
    auto throwScope = DECLARE_THROW_SCOPE(vm);
    auto ctx = Bun::Bindgen::LiteralConversionContext { "FakeTimersOptions"_s };
    auto* object = value.getObject();
    if (!object) [[unlikely]] {
        ctx.throwNotObject(globalObject, throwScope);
        return {};
    }
    ::Bun::Bindgen::Generated::FakeTimersConfig result;
    {
        ::JSC::JSValue value0;
        auto ctx0 = Bun::Bindgen::LiteralConversionContext { "FakeTimersOptions.now"_s };
        do {
            value0 = object->get(
                &globalObject,
                ::JSC::Identifier::fromString(vm, "now"_s));
            RETURN_IF_EXCEPTION(throwScope, {});
        } while (false);
        result.now = Bun::convertIDL<::Bun::IDLRawAny>(globalObject, value0, ctx0);
        RETURN_IF_EXCEPTION(throwScope, {});
    }
    return result;
}

namespace Bun::Bindgen::Generated {
extern "C" bool bindgenConvertJSToFakeTimersConfig(
    ::JSC::JSGlobalObject* globalObject,
    ::JSC::EncodedJSValue value,
    ExternFakeTimersConfig* result)
{
    ::JSC::VM& vm = globalObject->vm();
    auto throwScope = DECLARE_THROW_SCOPE(vm);
    FakeTimersConfig convertedValue = ::WebCore::convert<IDLDictionary<FakeTimersConfig>>(
        *globalObject,
        JSC::JSValue::decode(value)
    );
    RETURN_IF_EXCEPTION(throwScope, false);
    *result = ExternTraits<FakeTimersConfig>::convertToExtern(::std::move(convertedValue));
    return true;
}
}
