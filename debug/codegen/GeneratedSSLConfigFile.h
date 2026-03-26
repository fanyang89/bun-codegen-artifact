#pragma once
#include "Bindgen/IDLTypes.h"
#include <BunIDLConvertBlob.h>
#include <Bindgen/ExternVectorTraits.h>
#include <GeneratedSSLConfigSingleFile.h>

namespace Bun::Bindgen::Generated {
using IDLSSLConfigFile = ::Bun::IDLOrderedUnion<::Bun::IDLStrictNull, ::Bun::IDLStrictString, ::Bun::IDLArrayBufferRef, ::Bun::IDLBlobRef, ::Bun::IDLArray<::Bun::Bindgen::Generated::IDLSSLConfigSingleFile>>;
using SSLConfigFile = IDLSSLConfigFile::ImplementationType;
}
