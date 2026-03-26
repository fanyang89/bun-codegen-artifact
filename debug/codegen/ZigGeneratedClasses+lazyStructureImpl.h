ALWAYS_INLINE void GlobalObject::initGeneratedLazyClasses() {
    m_JSArchive.initLater(
              [](LazyClassStructure::Initializer& init) {
                 init.setPrototype(WebCore::JSArchive::createPrototype(init.vm, reinterpret_cast<Zig::GlobalObject*>(init.global)));
                 init.setStructure(WebCore::JSArchive::createStructure(init.vm, init.global, init.prototype));
                 init.setConstructor(WebCore::JSArchive::createConstructor(init.vm, init.global, init.prototype));
              });
    m_JSAttributeIterator.initLater(
              [](LazyClassStructure::Initializer& init) {
                 init.setPrototype(WebCore::JSAttributeIterator::createPrototype(init.vm, reinterpret_cast<Zig::GlobalObject*>(init.global)));
                 init.setStructure(WebCore::JSAttributeIterator::createStructure(init.vm, init.global, init.prototype));
                 
              });
    m_JSBlob.initLater(
              [](LazyClassStructure::Initializer& init) {
                 init.setPrototype(WebCore::JSBlob::createPrototype(init.vm, reinterpret_cast<Zig::GlobalObject*>(init.global)));
                 init.setStructure(WebCore::JSBlob::createStructure(init.vm, init.global, init.prototype));
                 init.setConstructor(WebCore::JSBlob::createConstructor(init.vm, init.global, init.prototype));
              });
    m_JSBlobInternalReadableStreamSource.initLater(
              [](LazyClassStructure::Initializer& init) {
                 init.setPrototype(WebCore::JSBlobInternalReadableStreamSource::createPrototype(init.vm, reinterpret_cast<Zig::GlobalObject*>(init.global)));
                 init.setStructure(WebCore::JSBlobInternalReadableStreamSource::createStructure(init.vm, init.global, init.prototype));
                 
              });
    m_JSBlockList.initLater(
              [](LazyClassStructure::Initializer& init) {
                 init.setPrototype(WebCore::JSBlockList::createPrototype(init.vm, reinterpret_cast<Zig::GlobalObject*>(init.global)));
                 init.setStructure(WebCore::JSBlockList::createStructure(init.vm, init.global, init.prototype));
                 init.setConstructor(WebCore::JSBlockList::createConstructor(init.vm, init.global, init.prototype));
              });
    m_JSBuildArtifact.initLater(
              [](LazyClassStructure::Initializer& init) {
                 init.setPrototype(WebCore::JSBuildArtifact::createPrototype(init.vm, reinterpret_cast<Zig::GlobalObject*>(init.global)));
                 init.setStructure(WebCore::JSBuildArtifact::createStructure(init.vm, init.global, init.prototype));
                 
              });
    m_JSBuildMessage.initLater(
              [](LazyClassStructure::Initializer& init) {
                 init.setPrototype(WebCore::JSBuildMessage::createPrototype(init.vm, reinterpret_cast<Zig::GlobalObject*>(init.global)));
                 init.setStructure(WebCore::JSBuildMessage::createStructure(init.vm, init.global, init.prototype));
                 init.setConstructor(WebCore::JSBuildMessage::createConstructor(init.vm, init.global, init.prototype));
              });
    m_JSBytesInternalReadableStreamSource.initLater(
              [](LazyClassStructure::Initializer& init) {
                 init.setPrototype(WebCore::JSBytesInternalReadableStreamSource::createPrototype(init.vm, reinterpret_cast<Zig::GlobalObject*>(init.global)));
                 init.setStructure(WebCore::JSBytesInternalReadableStreamSource::createStructure(init.vm, init.global, init.prototype));
                 
              });
    m_JSComment.initLater(
              [](LazyClassStructure::Initializer& init) {
                 init.setPrototype(WebCore::JSComment::createPrototype(init.vm, reinterpret_cast<Zig::GlobalObject*>(init.global)));
                 init.setStructure(WebCore::JSComment::createStructure(init.vm, init.global, init.prototype));
                 
              });
    m_JSCrypto.initLater(
              [](LazyClassStructure::Initializer& init) {
                 init.setPrototype(WebCore::JSCrypto::createPrototype(init.vm, reinterpret_cast<Zig::GlobalObject*>(init.global)));
                 init.setStructure(WebCore::JSCrypto::createStructure(init.vm, init.global, init.prototype));
                 init.setConstructor(WebCore::JSCrypto::createConstructor(init.vm, init.global, init.prototype));
              });
    m_JSCryptoHasher.initLater(
              [](LazyClassStructure::Initializer& init) {
                 init.setPrototype(WebCore::JSCryptoHasher::createPrototype(init.vm, reinterpret_cast<Zig::GlobalObject*>(init.global)));
                 init.setStructure(WebCore::JSCryptoHasher::createStructure(init.vm, init.global, init.prototype));
                 init.setConstructor(WebCore::JSCryptoHasher::createConstructor(init.vm, init.global, init.prototype));
              });
    m_JSDNSResolver.initLater(
              [](LazyClassStructure::Initializer& init) {
                 init.setPrototype(WebCore::JSDNSResolver::createPrototype(init.vm, reinterpret_cast<Zig::GlobalObject*>(init.global)));
                 init.setStructure(WebCore::JSDNSResolver::createStructure(init.vm, init.global, init.prototype));
                 
              });
    m_JSDebugHTTPSServer.initLater(
              [](LazyClassStructure::Initializer& init) {
                 init.setPrototype(WebCore::JSDebugHTTPSServer::createPrototype(init.vm, reinterpret_cast<Zig::GlobalObject*>(init.global)));
                 init.setStructure(WebCore::JSDebugHTTPSServer::createStructure(init.vm, init.global, init.prototype));
                 
              });
    m_JSDebugHTTPServer.initLater(
              [](LazyClassStructure::Initializer& init) {
                 init.setPrototype(WebCore::JSDebugHTTPServer::createPrototype(init.vm, reinterpret_cast<Zig::GlobalObject*>(init.global)));
                 init.setStructure(WebCore::JSDebugHTTPServer::createStructure(init.vm, init.global, init.prototype));
                 
              });
    m_JSDocEnd.initLater(
              [](LazyClassStructure::Initializer& init) {
                 init.setPrototype(WebCore::JSDocEnd::createPrototype(init.vm, reinterpret_cast<Zig::GlobalObject*>(init.global)));
                 init.setStructure(WebCore::JSDocEnd::createStructure(init.vm, init.global, init.prototype));
                 
              });
    m_JSDocType.initLater(
              [](LazyClassStructure::Initializer& init) {
                 init.setPrototype(WebCore::JSDocType::createPrototype(init.vm, reinterpret_cast<Zig::GlobalObject*>(init.global)));
                 init.setStructure(WebCore::JSDocType::createStructure(init.vm, init.global, init.prototype));
                 
              });
    m_JSDoneCallback.initLater(
              [](LazyClassStructure::Initializer& init) {
                 init.setPrototype(WebCore::JSDoneCallback::createPrototype(init.vm, reinterpret_cast<Zig::GlobalObject*>(init.global)));
                 init.setStructure(WebCore::JSDoneCallback::createStructure(init.vm, init.global, init.prototype));
                 
              });
    m_JSElement.initLater(
              [](LazyClassStructure::Initializer& init) {
                 init.setPrototype(WebCore::JSElement::createPrototype(init.vm, reinterpret_cast<Zig::GlobalObject*>(init.global)));
                 init.setStructure(WebCore::JSElement::createStructure(init.vm, init.global, init.prototype));
                 
              });
    m_JSEndTag.initLater(
              [](LazyClassStructure::Initializer& init) {
                 init.setPrototype(WebCore::JSEndTag::createPrototype(init.vm, reinterpret_cast<Zig::GlobalObject*>(init.global)));
                 init.setStructure(WebCore::JSEndTag::createStructure(init.vm, init.global, init.prototype));
                 
              });
    m_JSExpect.initLater(
              [](LazyClassStructure::Initializer& init) {
                 init.setPrototype(WebCore::JSExpect::createPrototype(init.vm, reinterpret_cast<Zig::GlobalObject*>(init.global)));
                 init.setStructure(WebCore::JSExpect::createStructure(init.vm, init.global, init.prototype));
                 init.setConstructor(WebCore::JSExpect::createConstructor(init.vm, init.global, init.prototype));
              });
    m_JSExpectAny.initLater(
              [](LazyClassStructure::Initializer& init) {
                 init.setPrototype(WebCore::JSExpectAny::createPrototype(init.vm, reinterpret_cast<Zig::GlobalObject*>(init.global)));
                 init.setStructure(WebCore::JSExpectAny::createStructure(init.vm, init.global, init.prototype));
                 
              });
    m_JSExpectAnything.initLater(
              [](LazyClassStructure::Initializer& init) {
                 init.setPrototype(WebCore::JSExpectAnything::createPrototype(init.vm, reinterpret_cast<Zig::GlobalObject*>(init.global)));
                 init.setStructure(WebCore::JSExpectAnything::createStructure(init.vm, init.global, init.prototype));
                 
              });
    m_JSExpectArrayContaining.initLater(
              [](LazyClassStructure::Initializer& init) {
                 init.setPrototype(WebCore::JSExpectArrayContaining::createPrototype(init.vm, reinterpret_cast<Zig::GlobalObject*>(init.global)));
                 init.setStructure(WebCore::JSExpectArrayContaining::createStructure(init.vm, init.global, init.prototype));
                 
              });
    m_JSExpectCloseTo.initLater(
              [](LazyClassStructure::Initializer& init) {
                 init.setPrototype(WebCore::JSExpectCloseTo::createPrototype(init.vm, reinterpret_cast<Zig::GlobalObject*>(init.global)));
                 init.setStructure(WebCore::JSExpectCloseTo::createStructure(init.vm, init.global, init.prototype));
                 
              });
    m_JSExpectCustomAsymmetricMatcher.initLater(
              [](LazyClassStructure::Initializer& init) {
                 init.setPrototype(WebCore::JSExpectCustomAsymmetricMatcher::createPrototype(init.vm, reinterpret_cast<Zig::GlobalObject*>(init.global)));
                 init.setStructure(WebCore::JSExpectCustomAsymmetricMatcher::createStructure(init.vm, init.global, init.prototype));
                 
              });
    m_JSExpectMatcherContext.initLater(
              [](LazyClassStructure::Initializer& init) {
                 init.setPrototype(WebCore::JSExpectMatcherContext::createPrototype(init.vm, reinterpret_cast<Zig::GlobalObject*>(init.global)));
                 init.setStructure(WebCore::JSExpectMatcherContext::createStructure(init.vm, init.global, init.prototype));
                 
              });
    m_JSExpectMatcherUtils.initLater(
              [](LazyClassStructure::Initializer& init) {
                 init.setPrototype(WebCore::JSExpectMatcherUtils::createPrototype(init.vm, reinterpret_cast<Zig::GlobalObject*>(init.global)));
                 init.setStructure(WebCore::JSExpectMatcherUtils::createStructure(init.vm, init.global, init.prototype));
                 
              });
    m_JSExpectObjectContaining.initLater(
              [](LazyClassStructure::Initializer& init) {
                 init.setPrototype(WebCore::JSExpectObjectContaining::createPrototype(init.vm, reinterpret_cast<Zig::GlobalObject*>(init.global)));
                 init.setStructure(WebCore::JSExpectObjectContaining::createStructure(init.vm, init.global, init.prototype));
                 
              });
    m_JSExpectStatic.initLater(
              [](LazyClassStructure::Initializer& init) {
                 init.setPrototype(WebCore::JSExpectStatic::createPrototype(init.vm, reinterpret_cast<Zig::GlobalObject*>(init.global)));
                 init.setStructure(WebCore::JSExpectStatic::createStructure(init.vm, init.global, init.prototype));
                 
              });
    m_JSExpectStringContaining.initLater(
              [](LazyClassStructure::Initializer& init) {
                 init.setPrototype(WebCore::JSExpectStringContaining::createPrototype(init.vm, reinterpret_cast<Zig::GlobalObject*>(init.global)));
                 init.setStructure(WebCore::JSExpectStringContaining::createStructure(init.vm, init.global, init.prototype));
                 
              });
    m_JSExpectStringMatching.initLater(
              [](LazyClassStructure::Initializer& init) {
                 init.setPrototype(WebCore::JSExpectStringMatching::createPrototype(init.vm, reinterpret_cast<Zig::GlobalObject*>(init.global)));
                 init.setStructure(WebCore::JSExpectStringMatching::createStructure(init.vm, init.global, init.prototype));
                 
              });
    m_JSExpectTypeOf.initLater(
              [](LazyClassStructure::Initializer& init) {
                 init.setPrototype(WebCore::JSExpectTypeOf::createPrototype(init.vm, reinterpret_cast<Zig::GlobalObject*>(init.global)));
                 init.setStructure(WebCore::JSExpectTypeOf::createStructure(init.vm, init.global, init.prototype));
                 init.setConstructor(WebCore::JSExpectTypeOf::createConstructor(init.vm, init.global, init.prototype));
              });
    m_JSFFI.initLater(
              [](LazyClassStructure::Initializer& init) {
                 init.setPrototype(WebCore::JSFFI::createPrototype(init.vm, reinterpret_cast<Zig::GlobalObject*>(init.global)));
                 init.setStructure(WebCore::JSFFI::createStructure(init.vm, init.global, init.prototype));
                 
              });
    m_JSFSWatcher.initLater(
              [](LazyClassStructure::Initializer& init) {
                 init.setPrototype(WebCore::JSFSWatcher::createPrototype(init.vm, reinterpret_cast<Zig::GlobalObject*>(init.global)));
                 init.setStructure(WebCore::JSFSWatcher::createStructure(init.vm, init.global, init.prototype));
                 
              });
    m_JSFileInternalReadableStreamSource.initLater(
              [](LazyClassStructure::Initializer& init) {
                 init.setPrototype(WebCore::JSFileInternalReadableStreamSource::createPrototype(init.vm, reinterpret_cast<Zig::GlobalObject*>(init.global)));
                 init.setStructure(WebCore::JSFileInternalReadableStreamSource::createStructure(init.vm, init.global, init.prototype));
                 
              });
    m_JSFileSystemRouter.initLater(
              [](LazyClassStructure::Initializer& init) {
                 init.setPrototype(WebCore::JSFileSystemRouter::createPrototype(init.vm, reinterpret_cast<Zig::GlobalObject*>(init.global)));
                 init.setStructure(WebCore::JSFileSystemRouter::createStructure(init.vm, init.global, init.prototype));
                 init.setConstructor(WebCore::JSFileSystemRouter::createConstructor(init.vm, init.global, init.prototype));
              });
    m_JSFrameworkFileSystemRouter.initLater(
              [](LazyClassStructure::Initializer& init) {
                 init.setPrototype(WebCore::JSFrameworkFileSystemRouter::createPrototype(init.vm, reinterpret_cast<Zig::GlobalObject*>(init.global)));
                 init.setStructure(WebCore::JSFrameworkFileSystemRouter::createStructure(init.vm, init.global, init.prototype));
                 init.setConstructor(WebCore::JSFrameworkFileSystemRouter::createConstructor(init.vm, init.global, init.prototype));
              });
    m_JSGlob.initLater(
              [](LazyClassStructure::Initializer& init) {
                 init.setPrototype(WebCore::JSGlob::createPrototype(init.vm, reinterpret_cast<Zig::GlobalObject*>(init.global)));
                 init.setStructure(WebCore::JSGlob::createStructure(init.vm, init.global, init.prototype));
                 init.setConstructor(WebCore::JSGlob::createConstructor(init.vm, init.global, init.prototype));
              });
    m_JSH2FrameParser.initLater(
              [](LazyClassStructure::Initializer& init) {
                 init.setPrototype(WebCore::JSH2FrameParser::createPrototype(init.vm, reinterpret_cast<Zig::GlobalObject*>(init.global)));
                 init.setStructure(WebCore::JSH2FrameParser::createStructure(init.vm, init.global, init.prototype));
                 init.setConstructor(WebCore::JSH2FrameParser::createConstructor(init.vm, init.global, init.prototype));
              });
    m_JSHTMLBundle.initLater(
              [](LazyClassStructure::Initializer& init) {
                 init.setPrototype(WebCore::JSHTMLBundle::createPrototype(init.vm, reinterpret_cast<Zig::GlobalObject*>(init.global)));
                 init.setStructure(WebCore::JSHTMLBundle::createStructure(init.vm, init.global, init.prototype));
                 
              });
    m_JSHTMLRewriter.initLater(
              [](LazyClassStructure::Initializer& init) {
                 init.setPrototype(WebCore::JSHTMLRewriter::createPrototype(init.vm, reinterpret_cast<Zig::GlobalObject*>(init.global)));
                 init.setStructure(WebCore::JSHTMLRewriter::createStructure(init.vm, init.global, init.prototype));
                 init.setConstructor(WebCore::JSHTMLRewriter::createConstructor(init.vm, init.global, init.prototype));
              });
    m_JSHTTPSServer.initLater(
              [](LazyClassStructure::Initializer& init) {
                 init.setPrototype(WebCore::JSHTTPSServer::createPrototype(init.vm, reinterpret_cast<Zig::GlobalObject*>(init.global)));
                 init.setStructure(WebCore::JSHTTPSServer::createStructure(init.vm, init.global, init.prototype));
                 
              });
    m_JSHTTPServer.initLater(
              [](LazyClassStructure::Initializer& init) {
                 init.setPrototype(WebCore::JSHTTPServer::createPrototype(init.vm, reinterpret_cast<Zig::GlobalObject*>(init.global)));
                 init.setStructure(WebCore::JSHTTPServer::createStructure(init.vm, init.global, init.prototype));
                 
              });
    m_JSImmediate.initLater(
              [](LazyClassStructure::Initializer& init) {
                 init.setPrototype(WebCore::JSImmediate::createPrototype(init.vm, reinterpret_cast<Zig::GlobalObject*>(init.global)));
                 init.setStructure(WebCore::JSImmediate::createStructure(init.vm, init.global, init.prototype));
                 init.setConstructor(WebCore::JSImmediate::createConstructor(init.vm, init.global, init.prototype));
              });
    m_JSListener.initLater(
              [](LazyClassStructure::Initializer& init) {
                 init.setPrototype(WebCore::JSListener::createPrototype(init.vm, reinterpret_cast<Zig::GlobalObject*>(init.global)));
                 init.setStructure(WebCore::JSListener::createStructure(init.vm, init.global, init.prototype));
                 
              });
    m_JSMD4.initLater(
              [](LazyClassStructure::Initializer& init) {
                 init.setPrototype(WebCore::JSMD4::createPrototype(init.vm, reinterpret_cast<Zig::GlobalObject*>(init.global)));
                 init.setStructure(WebCore::JSMD4::createStructure(init.vm, init.global, init.prototype));
                 init.setConstructor(WebCore::JSMD4::createConstructor(init.vm, init.global, init.prototype));
              });
    m_JSMD5.initLater(
              [](LazyClassStructure::Initializer& init) {
                 init.setPrototype(WebCore::JSMD5::createPrototype(init.vm, reinterpret_cast<Zig::GlobalObject*>(init.global)));
                 init.setStructure(WebCore::JSMD5::createStructure(init.vm, init.global, init.prototype));
                 init.setConstructor(WebCore::JSMD5::createConstructor(init.vm, init.global, init.prototype));
              });
    m_JSMatchedRoute.initLater(
              [](LazyClassStructure::Initializer& init) {
                 init.setPrototype(WebCore::JSMatchedRoute::createPrototype(init.vm, reinterpret_cast<Zig::GlobalObject*>(init.global)));
                 init.setStructure(WebCore::JSMatchedRoute::createStructure(init.vm, init.global, init.prototype));
                 
              });
    m_JSMySQLConnection.initLater(
              [](LazyClassStructure::Initializer& init) {
                 init.setPrototype(WebCore::JSMySQLConnection::createPrototype(init.vm, reinterpret_cast<Zig::GlobalObject*>(init.global)));
                 init.setStructure(WebCore::JSMySQLConnection::createStructure(init.vm, init.global, init.prototype));
                 init.setConstructor(WebCore::JSMySQLConnection::createConstructor(init.vm, init.global, init.prototype));
              });
    m_JSMySQLQuery.initLater(
              [](LazyClassStructure::Initializer& init) {
                 init.setPrototype(WebCore::JSMySQLQuery::createPrototype(init.vm, reinterpret_cast<Zig::GlobalObject*>(init.global)));
                 init.setStructure(WebCore::JSMySQLQuery::createStructure(init.vm, init.global, init.prototype));
                 init.setConstructor(WebCore::JSMySQLQuery::createConstructor(init.vm, init.global, init.prototype));
              });
    m_JSNativeBrotli.initLater(
              [](LazyClassStructure::Initializer& init) {
                 init.setPrototype(WebCore::JSNativeBrotli::createPrototype(init.vm, reinterpret_cast<Zig::GlobalObject*>(init.global)));
                 init.setStructure(WebCore::JSNativeBrotli::createStructure(init.vm, init.global, init.prototype));
                 init.setConstructor(WebCore::JSNativeBrotli::createConstructor(init.vm, init.global, init.prototype));
              });
    m_JSNativeZlib.initLater(
              [](LazyClassStructure::Initializer& init) {
                 init.setPrototype(WebCore::JSNativeZlib::createPrototype(init.vm, reinterpret_cast<Zig::GlobalObject*>(init.global)));
                 init.setStructure(WebCore::JSNativeZlib::createStructure(init.vm, init.global, init.prototype));
                 init.setConstructor(WebCore::JSNativeZlib::createConstructor(init.vm, init.global, init.prototype));
              });
    m_JSNativeZstd.initLater(
              [](LazyClassStructure::Initializer& init) {
                 init.setPrototype(WebCore::JSNativeZstd::createPrototype(init.vm, reinterpret_cast<Zig::GlobalObject*>(init.global)));
                 init.setStructure(WebCore::JSNativeZstd::createStructure(init.vm, init.global, init.prototype));
                 init.setConstructor(WebCore::JSNativeZstd::createConstructor(init.vm, init.global, init.prototype));
              });
    m_JSNodeHTTPResponse.initLater(
              [](LazyClassStructure::Initializer& init) {
                 init.setPrototype(WebCore::JSNodeHTTPResponse::createPrototype(init.vm, reinterpret_cast<Zig::GlobalObject*>(init.global)));
                 init.setStructure(WebCore::JSNodeHTTPResponse::createStructure(init.vm, init.global, init.prototype));
                 
              });
    m_JSNodeJSFS.initLater(
              [](LazyClassStructure::Initializer& init) {
                 init.setPrototype(WebCore::JSNodeJSFS::createPrototype(init.vm, reinterpret_cast<Zig::GlobalObject*>(init.global)));
                 init.setStructure(WebCore::JSNodeJSFS::createStructure(init.vm, init.global, init.prototype));
                 
              });
    m_JSParsedShellScript.initLater(
              [](LazyClassStructure::Initializer& init) {
                 init.setPrototype(WebCore::JSParsedShellScript::createPrototype(init.vm, reinterpret_cast<Zig::GlobalObject*>(init.global)));
                 init.setStructure(WebCore::JSParsedShellScript::createStructure(init.vm, init.global, init.prototype));
                 
              });
    m_JSPostgresSQLConnection.initLater(
              [](LazyClassStructure::Initializer& init) {
                 init.setPrototype(WebCore::JSPostgresSQLConnection::createPrototype(init.vm, reinterpret_cast<Zig::GlobalObject*>(init.global)));
                 init.setStructure(WebCore::JSPostgresSQLConnection::createStructure(init.vm, init.global, init.prototype));
                 init.setConstructor(WebCore::JSPostgresSQLConnection::createConstructor(init.vm, init.global, init.prototype));
              });
    m_JSPostgresSQLQuery.initLater(
              [](LazyClassStructure::Initializer& init) {
                 init.setPrototype(WebCore::JSPostgresSQLQuery::createPrototype(init.vm, reinterpret_cast<Zig::GlobalObject*>(init.global)));
                 init.setStructure(WebCore::JSPostgresSQLQuery::createStructure(init.vm, init.global, init.prototype));
                 init.setConstructor(WebCore::JSPostgresSQLQuery::createConstructor(init.vm, init.global, init.prototype));
              });
    m_JSRedisClient.initLater(
              [](LazyClassStructure::Initializer& init) {
                 init.setPrototype(WebCore::JSRedisClient::createPrototype(init.vm, reinterpret_cast<Zig::GlobalObject*>(init.global)));
                 init.setStructure(WebCore::JSRedisClient::createStructure(init.vm, init.global, init.prototype));
                 init.setConstructor(WebCore::JSRedisClient::createConstructor(init.vm, init.global, init.prototype));
              });
    m_JSRequest.initLater(
              [](LazyClassStructure::Initializer& init) {
                 init.setPrototype(WebCore::JSRequest::createPrototype(init.vm, reinterpret_cast<Zig::GlobalObject*>(init.global)));
                 init.setStructure(WebCore::JSRequest::createStructure(init.vm, init.global, init.prototype));
                 init.setConstructor(WebCore::JSRequest::createConstructor(init.vm, init.global, init.prototype));
              });
    m_JSResolveMessage.initLater(
              [](LazyClassStructure::Initializer& init) {
                 init.setPrototype(WebCore::JSResolveMessage::createPrototype(init.vm, reinterpret_cast<Zig::GlobalObject*>(init.global)));
                 init.setStructure(WebCore::JSResolveMessage::createStructure(init.vm, init.global, init.prototype));
                 init.setConstructor(WebCore::JSResolveMessage::createConstructor(init.vm, init.global, init.prototype));
              });
    m_JSResourceUsage.initLater(
              [](LazyClassStructure::Initializer& init) {
                 init.setPrototype(WebCore::JSResourceUsage::createPrototype(init.vm, reinterpret_cast<Zig::GlobalObject*>(init.global)));
                 init.setStructure(WebCore::JSResourceUsage::createStructure(init.vm, init.global, init.prototype));
                 
              });
    m_JSResponse.initLater(
              [](LazyClassStructure::Initializer& init) {
                 init.setPrototype(WebCore::JSResponse::createPrototype(init.vm, reinterpret_cast<Zig::GlobalObject*>(init.global)));
                 init.setStructure(WebCore::JSResponse::createStructure(init.vm, init.global, init.prototype));
                 init.setConstructor(WebCore::JSResponse::createConstructor(init.vm, init.global, init.prototype));
              });
    m_JSResumableFetchSink.initLater(
              [](LazyClassStructure::Initializer& init) {
                 init.setPrototype(WebCore::JSResumableFetchSink::createPrototype(init.vm, reinterpret_cast<Zig::GlobalObject*>(init.global)));
                 init.setStructure(WebCore::JSResumableFetchSink::createStructure(init.vm, init.global, init.prototype));
                 init.setConstructor(WebCore::JSResumableFetchSink::createConstructor(init.vm, init.global, init.prototype));
              });
    m_JSResumableS3UploadSink.initLater(
              [](LazyClassStructure::Initializer& init) {
                 init.setPrototype(WebCore::JSResumableS3UploadSink::createPrototype(init.vm, reinterpret_cast<Zig::GlobalObject*>(init.global)));
                 init.setStructure(WebCore::JSResumableS3UploadSink::createStructure(init.vm, init.global, init.prototype));
                 init.setConstructor(WebCore::JSResumableS3UploadSink::createConstructor(init.vm, init.global, init.prototype));
              });
    m_JSS3Client.initLater(
              [](LazyClassStructure::Initializer& init) {
                 init.setPrototype(WebCore::JSS3Client::createPrototype(init.vm, reinterpret_cast<Zig::GlobalObject*>(init.global)));
                 init.setStructure(WebCore::JSS3Client::createStructure(init.vm, init.global, init.prototype));
                 init.setConstructor(WebCore::JSS3Client::createConstructor(init.vm, init.global, init.prototype));
              });
    m_JSS3Stat.initLater(
              [](LazyClassStructure::Initializer& init) {
                 init.setPrototype(WebCore::JSS3Stat::createPrototype(init.vm, reinterpret_cast<Zig::GlobalObject*>(init.global)));
                 init.setStructure(WebCore::JSS3Stat::createStructure(init.vm, init.global, init.prototype));
                 init.setConstructor(WebCore::JSS3Stat::createConstructor(init.vm, init.global, init.prototype));
              });
    m_JSSHA1.initLater(
              [](LazyClassStructure::Initializer& init) {
                 init.setPrototype(WebCore::JSSHA1::createPrototype(init.vm, reinterpret_cast<Zig::GlobalObject*>(init.global)));
                 init.setStructure(WebCore::JSSHA1::createStructure(init.vm, init.global, init.prototype));
                 init.setConstructor(WebCore::JSSHA1::createConstructor(init.vm, init.global, init.prototype));
              });
    m_JSSHA224.initLater(
              [](LazyClassStructure::Initializer& init) {
                 init.setPrototype(WebCore::JSSHA224::createPrototype(init.vm, reinterpret_cast<Zig::GlobalObject*>(init.global)));
                 init.setStructure(WebCore::JSSHA224::createStructure(init.vm, init.global, init.prototype));
                 init.setConstructor(WebCore::JSSHA224::createConstructor(init.vm, init.global, init.prototype));
              });
    m_JSSHA256.initLater(
              [](LazyClassStructure::Initializer& init) {
                 init.setPrototype(WebCore::JSSHA256::createPrototype(init.vm, reinterpret_cast<Zig::GlobalObject*>(init.global)));
                 init.setStructure(WebCore::JSSHA256::createStructure(init.vm, init.global, init.prototype));
                 init.setConstructor(WebCore::JSSHA256::createConstructor(init.vm, init.global, init.prototype));
              });
    m_JSSHA384.initLater(
              [](LazyClassStructure::Initializer& init) {
                 init.setPrototype(WebCore::JSSHA384::createPrototype(init.vm, reinterpret_cast<Zig::GlobalObject*>(init.global)));
                 init.setStructure(WebCore::JSSHA384::createStructure(init.vm, init.global, init.prototype));
                 init.setConstructor(WebCore::JSSHA384::createConstructor(init.vm, init.global, init.prototype));
              });
    m_JSSHA512.initLater(
              [](LazyClassStructure::Initializer& init) {
                 init.setPrototype(WebCore::JSSHA512::createPrototype(init.vm, reinterpret_cast<Zig::GlobalObject*>(init.global)));
                 init.setStructure(WebCore::JSSHA512::createStructure(init.vm, init.global, init.prototype));
                 init.setConstructor(WebCore::JSSHA512::createConstructor(init.vm, init.global, init.prototype));
              });
    m_JSSHA512_256.initLater(
              [](LazyClassStructure::Initializer& init) {
                 init.setPrototype(WebCore::JSSHA512_256::createPrototype(init.vm, reinterpret_cast<Zig::GlobalObject*>(init.global)));
                 init.setStructure(WebCore::JSSHA512_256::createStructure(init.vm, init.global, init.prototype));
                 init.setConstructor(WebCore::JSSHA512_256::createConstructor(init.vm, init.global, init.prototype));
              });
    m_JSScopeFunctions.initLater(
              [](LazyClassStructure::Initializer& init) {
                 init.setPrototype(WebCore::JSScopeFunctions::createPrototype(init.vm, reinterpret_cast<Zig::GlobalObject*>(init.global)));
                 init.setStructure(WebCore::JSScopeFunctions::createStructure(init.vm, init.global, init.prototype));
                 
              });
    m_JSServerWebSocket.initLater(
              [](LazyClassStructure::Initializer& init) {
                 init.setPrototype(WebCore::JSServerWebSocket::createPrototype(init.vm, reinterpret_cast<Zig::GlobalObject*>(init.global)));
                 init.setStructure(WebCore::JSServerWebSocket::createStructure(init.vm, init.global, init.prototype));
                 init.setConstructor(WebCore::JSServerWebSocket::createConstructor(init.vm, init.global, init.prototype));
              });
    m_JSShellInterpreter.initLater(
              [](LazyClassStructure::Initializer& init) {
                 init.setPrototype(WebCore::JSShellInterpreter::createPrototype(init.vm, reinterpret_cast<Zig::GlobalObject*>(init.global)));
                 init.setStructure(WebCore::JSShellInterpreter::createStructure(init.vm, init.global, init.prototype));
                 
              });
    m_JSSocketAddress.initLater(
              [](LazyClassStructure::Initializer& init) {
                 init.setPrototype(WebCore::JSSocketAddress::createPrototype(init.vm, reinterpret_cast<Zig::GlobalObject*>(init.global)));
                 init.setStructure(WebCore::JSSocketAddress::createStructure(init.vm, init.global, init.prototype));
                 init.setConstructor(WebCore::JSSocketAddress::createConstructor(init.vm, init.global, init.prototype));
              });
    m_JSSourceMap.initLater(
              [](LazyClassStructure::Initializer& init) {
                 init.setPrototype(WebCore::JSSourceMap::createPrototype(init.vm, reinterpret_cast<Zig::GlobalObject*>(init.global)));
                 init.setStructure(WebCore::JSSourceMap::createStructure(init.vm, init.global, init.prototype));
                 init.setConstructor(WebCore::JSSourceMap::createConstructor(init.vm, init.global, init.prototype));
              });
    m_JSStatWatcher.initLater(
              [](LazyClassStructure::Initializer& init) {
                 init.setPrototype(WebCore::JSStatWatcher::createPrototype(init.vm, reinterpret_cast<Zig::GlobalObject*>(init.global)));
                 init.setStructure(WebCore::JSStatWatcher::createStructure(init.vm, init.global, init.prototype));
                 
              });
    m_JSSubprocess.initLater(
              [](LazyClassStructure::Initializer& init) {
                 init.setPrototype(WebCore::JSSubprocess::createPrototype(init.vm, reinterpret_cast<Zig::GlobalObject*>(init.global)));
                 init.setStructure(WebCore::JSSubprocess::createStructure(init.vm, init.global, init.prototype));
                 
              });
    m_JSTCPSocket.initLater(
              [](LazyClassStructure::Initializer& init) {
                 init.setPrototype(WebCore::JSTCPSocket::createPrototype(init.vm, reinterpret_cast<Zig::GlobalObject*>(init.global)));
                 init.setStructure(WebCore::JSTCPSocket::createStructure(init.vm, init.global, init.prototype));
                 
              });
    m_JSTLSSocket.initLater(
              [](LazyClassStructure::Initializer& init) {
                 init.setPrototype(WebCore::JSTLSSocket::createPrototype(init.vm, reinterpret_cast<Zig::GlobalObject*>(init.global)));
                 init.setStructure(WebCore::JSTLSSocket::createStructure(init.vm, init.global, init.prototype));
                 
              });
    m_JSTerminal.initLater(
              [](LazyClassStructure::Initializer& init) {
                 init.setPrototype(WebCore::JSTerminal::createPrototype(init.vm, reinterpret_cast<Zig::GlobalObject*>(init.global)));
                 init.setStructure(WebCore::JSTerminal::createStructure(init.vm, init.global, init.prototype));
                 init.setConstructor(WebCore::JSTerminal::createConstructor(init.vm, init.global, init.prototype));
              });
    m_JSTextChunk.initLater(
              [](LazyClassStructure::Initializer& init) {
                 init.setPrototype(WebCore::JSTextChunk::createPrototype(init.vm, reinterpret_cast<Zig::GlobalObject*>(init.global)));
                 init.setStructure(WebCore::JSTextChunk::createStructure(init.vm, init.global, init.prototype));
                 
              });
    m_JSTextDecoder.initLater(
              [](LazyClassStructure::Initializer& init) {
                 init.setPrototype(WebCore::JSTextDecoder::createPrototype(init.vm, reinterpret_cast<Zig::GlobalObject*>(init.global)));
                 init.setStructure(WebCore::JSTextDecoder::createStructure(init.vm, init.global, init.prototype));
                 init.setConstructor(WebCore::JSTextDecoder::createConstructor(init.vm, init.global, init.prototype));
              });
    m_JSTextEncoderStreamEncoder.initLater(
              [](LazyClassStructure::Initializer& init) {
                 init.setPrototype(WebCore::JSTextEncoderStreamEncoder::createPrototype(init.vm, reinterpret_cast<Zig::GlobalObject*>(init.global)));
                 init.setStructure(WebCore::JSTextEncoderStreamEncoder::createStructure(init.vm, init.global, init.prototype));
                 init.setConstructor(WebCore::JSTextEncoderStreamEncoder::createConstructor(init.vm, init.global, init.prototype));
              });
    m_JSTimeout.initLater(
              [](LazyClassStructure::Initializer& init) {
                 init.setPrototype(WebCore::JSTimeout::createPrototype(init.vm, reinterpret_cast<Zig::GlobalObject*>(init.global)));
                 init.setStructure(WebCore::JSTimeout::createStructure(init.vm, init.global, init.prototype));
                 init.setConstructor(WebCore::JSTimeout::createConstructor(init.vm, init.global, init.prototype));
              });
    m_JSTranspiler.initLater(
              [](LazyClassStructure::Initializer& init) {
                 init.setPrototype(WebCore::JSTranspiler::createPrototype(init.vm, reinterpret_cast<Zig::GlobalObject*>(init.global)));
                 init.setStructure(WebCore::JSTranspiler::createStructure(init.vm, init.global, init.prototype));
                 init.setConstructor(WebCore::JSTranspiler::createConstructor(init.vm, init.global, init.prototype));
              });
    m_JSUDPSocket.initLater(
              [](LazyClassStructure::Initializer& init) {
                 init.setPrototype(WebCore::JSUDPSocket::createPrototype(init.vm, reinterpret_cast<Zig::GlobalObject*>(init.global)));
                 init.setStructure(WebCore::JSUDPSocket::createStructure(init.vm, init.global, init.prototype));
                 
              });
}
template<typename Visitor>
void GlobalObject::visitGeneratedLazyClasses(GlobalObject *thisObject, Visitor& visitor)
{
      thisObject->m_JSArchive.visit(visitor);
      thisObject->m_JSAttributeIterator.visit(visitor);
      thisObject->m_JSBlob.visit(visitor);
      thisObject->m_JSBlobInternalReadableStreamSource.visit(visitor);
      thisObject->m_JSBlockList.visit(visitor);
      thisObject->m_JSBuildArtifact.visit(visitor);
      thisObject->m_JSBuildMessage.visit(visitor);
      thisObject->m_JSBytesInternalReadableStreamSource.visit(visitor);
      thisObject->m_JSComment.visit(visitor);
      thisObject->m_JSCrypto.visit(visitor);
      thisObject->m_JSCryptoHasher.visit(visitor);
      thisObject->m_JSDNSResolver.visit(visitor);
      thisObject->m_JSDebugHTTPSServer.visit(visitor);
      thisObject->m_JSDebugHTTPServer.visit(visitor);
      thisObject->m_JSDocEnd.visit(visitor);
      thisObject->m_JSDocType.visit(visitor);
      thisObject->m_JSDoneCallback.visit(visitor);
      thisObject->m_JSElement.visit(visitor);
      thisObject->m_JSEndTag.visit(visitor);
      thisObject->m_JSExpect.visit(visitor);
      thisObject->m_JSExpectAny.visit(visitor);
      thisObject->m_JSExpectAnything.visit(visitor);
      thisObject->m_JSExpectArrayContaining.visit(visitor);
      thisObject->m_JSExpectCloseTo.visit(visitor);
      thisObject->m_JSExpectCustomAsymmetricMatcher.visit(visitor);
      thisObject->m_JSExpectMatcherContext.visit(visitor);
      thisObject->m_JSExpectMatcherUtils.visit(visitor);
      thisObject->m_JSExpectObjectContaining.visit(visitor);
      thisObject->m_JSExpectStatic.visit(visitor);
      thisObject->m_JSExpectStringContaining.visit(visitor);
      thisObject->m_JSExpectStringMatching.visit(visitor);
      thisObject->m_JSExpectTypeOf.visit(visitor);
      thisObject->m_JSFFI.visit(visitor);
      thisObject->m_JSFSWatcher.visit(visitor);
      thisObject->m_JSFileInternalReadableStreamSource.visit(visitor);
      thisObject->m_JSFileSystemRouter.visit(visitor);
      thisObject->m_JSFrameworkFileSystemRouter.visit(visitor);
      thisObject->m_JSGlob.visit(visitor);
      thisObject->m_JSH2FrameParser.visit(visitor);
      thisObject->m_JSHTMLBundle.visit(visitor);
      thisObject->m_JSHTMLRewriter.visit(visitor);
      thisObject->m_JSHTTPSServer.visit(visitor);
      thisObject->m_JSHTTPServer.visit(visitor);
      thisObject->m_JSImmediate.visit(visitor);
      thisObject->m_JSListener.visit(visitor);
      thisObject->m_JSMD4.visit(visitor);
      thisObject->m_JSMD5.visit(visitor);
      thisObject->m_JSMatchedRoute.visit(visitor);
      thisObject->m_JSMySQLConnection.visit(visitor);
      thisObject->m_JSMySQLQuery.visit(visitor);
      thisObject->m_JSNativeBrotli.visit(visitor);
      thisObject->m_JSNativeZlib.visit(visitor);
      thisObject->m_JSNativeZstd.visit(visitor);
      thisObject->m_JSNodeHTTPResponse.visit(visitor);
      thisObject->m_JSNodeJSFS.visit(visitor);
      thisObject->m_JSParsedShellScript.visit(visitor);
      thisObject->m_JSPostgresSQLConnection.visit(visitor);
      thisObject->m_JSPostgresSQLQuery.visit(visitor);
      thisObject->m_JSRedisClient.visit(visitor);
      thisObject->m_JSRequest.visit(visitor);
      thisObject->m_JSResolveMessage.visit(visitor);
      thisObject->m_JSResourceUsage.visit(visitor);
      thisObject->m_JSResponse.visit(visitor);
      thisObject->m_JSResumableFetchSink.visit(visitor);
      thisObject->m_JSResumableS3UploadSink.visit(visitor);
      thisObject->m_JSS3Client.visit(visitor);
      thisObject->m_JSS3Stat.visit(visitor);
      thisObject->m_JSSHA1.visit(visitor);
      thisObject->m_JSSHA224.visit(visitor);
      thisObject->m_JSSHA256.visit(visitor);
      thisObject->m_JSSHA384.visit(visitor);
      thisObject->m_JSSHA512.visit(visitor);
      thisObject->m_JSSHA512_256.visit(visitor);
      thisObject->m_JSScopeFunctions.visit(visitor);
      thisObject->m_JSServerWebSocket.visit(visitor);
      thisObject->m_JSShellInterpreter.visit(visitor);
      thisObject->m_JSSocketAddress.visit(visitor);
      thisObject->m_JSSourceMap.visit(visitor);
      thisObject->m_JSStatWatcher.visit(visitor);
      thisObject->m_JSSubprocess.visit(visitor);
      thisObject->m_JSTCPSocket.visit(visitor);
      thisObject->m_JSTLSSocket.visit(visitor);
      thisObject->m_JSTerminal.visit(visitor);
      thisObject->m_JSTextChunk.visit(visitor);
      thisObject->m_JSTextDecoder.visit(visitor);
      thisObject->m_JSTextEncoderStreamEncoder.visit(visitor);
      thisObject->m_JSTimeout.visit(visitor);
      thisObject->m_JSTranspiler.visit(visitor);
      thisObject->m_JSUDPSocket.visit(visitor);
}
