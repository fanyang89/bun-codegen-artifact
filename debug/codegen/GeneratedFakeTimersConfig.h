#pragma once
#include "Bindgen.h"
#include "JSDOMConvertDictionary.h"

namespace Bun {
namespace Bindgen {
namespace Generated {
struct FakeTimersConfig {
    using MemberType0 = ::Bun::IDLRawAny::ImplementationType;
    MemberType0 now;
};
using IDLFakeTimersConfig = ::WebCore::IDLDictionary<FakeTimersConfig>;
struct ExternFakeTimersConfig {
    using MemberType0 = ExternTraits<FakeTimersConfig::MemberType0>::ExternType;
    MemberType0 now;
};
extern "C" bool bindgenConvertJSToFakeTimersConfig(
    ::JSC::JSGlobalObject* globalObject,
    ::JSC::EncodedJSValue value,
    ExternFakeTimersConfig* result);
}

template<> struct ExternTraits<Generated::FakeTimersConfig> {
    using ExternType = Generated::ExternFakeTimersConfig;
    static ExternType convertToExtern(Generated::FakeTimersConfig&& cppValue)
    {
        return ExternType {
            .now = ExternTraits<Generated::FakeTimersConfig::MemberType0>::convertToExtern(::std::move(cppValue.now)),
        };
    }
};
}

template<>
struct IDLHumanReadableName<::WebCore::IDLDictionary<Bindgen::Generated::FakeTimersConfig>>
    : BaseIDLHumanReadableName {
    static constexpr auto humanReadableName
        = ::std::to_array("FakeTimersOptions");
};
}

template<> Bun::Bindgen::Generated::FakeTimersConfig
WebCore::convertDictionary<Bun::Bindgen::Generated::FakeTimersConfig>(
    JSC::JSGlobalObject& globalObject,
    JSC::JSValue value);

template<> struct WebCore::IDLDictionary<::Bun::Bindgen::Generated::FakeTimersConfig>
    : ::Bun::Bindgen::IDLStackOnlyDictionary<::Bun::Bindgen::Generated::FakeTimersConfig> {};
