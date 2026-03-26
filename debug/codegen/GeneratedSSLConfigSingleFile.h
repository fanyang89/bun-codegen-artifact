#pragma once
#include "Bindgen/IDLTypes.h"
#include <BunIDLConvertBlob.h>

namespace Bun::Bindgen::Generated {
using IDLSSLConfigSingleFile = ::Bun::IDLOrderedUnion<::Bun::IDLStrictString, ::Bun::IDLArrayBufferRef, ::Bun::IDLBlobRef>;
using SSLConfigSingleFile = IDLSSLConfigSingleFile::ImplementationType;
}
