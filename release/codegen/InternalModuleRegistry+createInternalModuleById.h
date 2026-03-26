// clang-format off
JSValue InternalModuleRegistry::createInternalModuleById(JSGlobalObject* globalObject, VM& vm, Field id)
{
  switch (id) {
    // JS internal modules
    case Field::BunFFI: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "bun:ffi"_s, "bun/ffi.js"_s, InternalModuleRegistryConstants::BunFFICode, "builtin://bun/ffi"_s);
    }
    case Field::BunSql: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "bun:sql"_s, "bun/sql.js"_s, InternalModuleRegistryConstants::BunSqlCode, "builtin://bun/sql"_s);
    }
    case Field::BunSqlite: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "bun:sqlite"_s, "bun/sqlite.js"_s, InternalModuleRegistryConstants::BunSqliteCode, "builtin://bun/sqlite"_s);
    }
    case Field::InternalAbortListener: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "internal:abort_listener"_s, "internal/abort_listener.js"_s, InternalModuleRegistryConstants::InternalAbortListenerCode, "builtin://internal/abort/listener"_s);
    }
    case Field::InternalAssertAssertionError: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "internal:assert/assertion_error"_s, "internal/assert/assertion_error.js"_s, InternalModuleRegistryConstants::InternalAssertAssertionErrorCode, "builtin://internal/assert/assertion/error"_s);
    }
    case Field::InternalAssertCalltracker: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "internal:assert/calltracker"_s, "internal/assert/calltracker.js"_s, InternalModuleRegistryConstants::InternalAssertCalltrackerCode, "builtin://internal/assert/calltracker"_s);
    }
    case Field::InternalAssertMyersDiff: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "internal:assert/myers_diff"_s, "internal/assert/myers_diff.js"_s, InternalModuleRegistryConstants::InternalAssertMyersDiffCode, "builtin://internal/assert/myers/diff"_s);
    }
    case Field::InternalAssertUtils: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "internal:assert/utils"_s, "internal/assert/utils.js"_s, InternalModuleRegistryConstants::InternalAssertUtilsCode, "builtin://internal/assert/utils"_s);
    }
    case Field::InternalBuffer: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "internal:buffer"_s, "internal/buffer.js"_s, InternalModuleRegistryConstants::InternalBufferCode, "builtin://internal/buffer"_s);
    }
    case Field::InternalClusterRoundRobinHandle: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "internal:cluster/RoundRobinHandle"_s, "internal/cluster/RoundRobinHandle.js"_s, InternalModuleRegistryConstants::InternalClusterRoundRobinHandleCode, "builtin://internal/cluster/RoundRobinHandle"_s);
    }
    case Field::InternalClusterWorker: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "internal:cluster/Worker"_s, "internal/cluster/Worker.js"_s, InternalModuleRegistryConstants::InternalClusterWorkerCode, "builtin://internal/cluster/Worker"_s);
    }
    case Field::InternalClusterChild: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "internal:cluster/child"_s, "internal/cluster/child.js"_s, InternalModuleRegistryConstants::InternalClusterChildCode, "builtin://internal/cluster/child"_s);
    }
    case Field::InternalClusterIsPrimary: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "internal:cluster/isPrimary"_s, "internal/cluster/isPrimary.js"_s, InternalModuleRegistryConstants::InternalClusterIsPrimaryCode, "builtin://internal/cluster/isPrimary"_s);
    }
    case Field::InternalClusterPrimary: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "internal:cluster/primary"_s, "internal/cluster/primary.js"_s, InternalModuleRegistryConstants::InternalClusterPrimaryCode, "builtin://internal/cluster/primary"_s);
    }
    case Field::InternalCryptoX509: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "internal:crypto/x509"_s, "internal/crypto/x509.js"_s, InternalModuleRegistryConstants::InternalCryptoX509Code, "builtin://internal/crypto/x509"_s);
    }
    case Field::InternalDebugger: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "internal:debugger"_s, "internal/debugger.js"_s, InternalModuleRegistryConstants::InternalDebuggerCode, "builtin://internal/debugger"_s);
    }
    case Field::InternalErrors: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "internal:errors"_s, "internal/errors.js"_s, InternalModuleRegistryConstants::InternalErrorsCode, "builtin://internal/errors"_s);
    }
    case Field::InternalFifo: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "internal:fifo"_s, "internal/fifo.js"_s, InternalModuleRegistryConstants::InternalFifoCode, "builtin://internal/fifo"_s);
    }
    case Field::InternalFixedQueue: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "internal:fixed_queue"_s, "internal/fixed_queue.js"_s, InternalModuleRegistryConstants::InternalFixedQueueCode, "builtin://internal/fixed/queue"_s);
    }
    case Field::InternalFreelist: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "internal:freelist"_s, "internal/freelist.js"_s, InternalModuleRegistryConstants::InternalFreelistCode, "builtin://internal/freelist"_s);
    }
    case Field::InternalFSCpSync: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "internal:fs/cp-sync"_s, "internal/fs/cp-sync.js"_s, InternalModuleRegistryConstants::InternalFSCpSyncCode, "builtin://internal/fs/cp/sync"_s);
    }
    case Field::InternalFSCp: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "internal:fs/cp"_s, "internal/fs/cp.js"_s, InternalModuleRegistryConstants::InternalFSCpCode, "builtin://internal/fs/cp"_s);
    }
    case Field::InternalFSGlob: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "internal:fs/glob"_s, "internal/fs/glob.js"_s, InternalModuleRegistryConstants::InternalFSGlobCode, "builtin://internal/fs/glob"_s);
    }
    case Field::InternalFSStreams: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "internal:fs/streams"_s, "internal/fs/streams.js"_s, InternalModuleRegistryConstants::InternalFSStreamsCode, "builtin://internal/fs/streams"_s);
    }
    case Field::InternalHtml: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "internal:html"_s, "internal/html.js"_s, InternalModuleRegistryConstants::InternalHtmlCode, "builtin://internal/html"_s);
    }
    case Field::InternalHttp: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "internal:http"_s, "internal/http.js"_s, InternalModuleRegistryConstants::InternalHttpCode, "builtin://internal/http"_s);
    }
    case Field::InternalHttpFakeSocket: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "internal:http/FakeSocket"_s, "internal/http/FakeSocket.js"_s, InternalModuleRegistryConstants::InternalHttpFakeSocketCode, "builtin://internal/http/FakeSocket"_s);
    }
    case Field::InternalLinkedlist: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "internal:linkedlist"_s, "internal/linkedlist.js"_s, InternalModuleRegistryConstants::InternalLinkedlistCode, "builtin://internal/linkedlist"_s);
    }
    case Field::InternalNetIsIP: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "internal:net/isIP"_s, "internal/net/isIP.js"_s, InternalModuleRegistryConstants::InternalNetIsIPCode, "builtin://internal/net/isIP"_s);
    }
    case Field::InternalPerfHooksMonitorEventLoopDelay: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "internal:perf_hooks/monitorEventLoopDelay"_s, "internal/perf_hooks/monitorEventLoopDelay.js"_s, InternalModuleRegistryConstants::InternalPerfHooksMonitorEventLoopDelayCode, "builtin://internal/perf/hooks/monitorEventLoopDelay"_s);
    }
    case Field::InternalPrimordials: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "internal:primordials"_s, "internal/primordials.js"_s, InternalModuleRegistryConstants::InternalPrimordialsCode, "builtin://internal/primordials"_s);
    }
    case Field::InternalPromisify: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "internal:promisify"_s, "internal/promisify.js"_s, InternalModuleRegistryConstants::InternalPromisifyCode, "builtin://internal/promisify"_s);
    }
    case Field::InternalShared: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "internal:shared"_s, "internal/shared.js"_s, InternalModuleRegistryConstants::InternalSharedCode, "builtin://internal/shared"_s);
    }
    case Field::InternalSqlErrors: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "internal:sql/errors"_s, "internal/sql/errors.js"_s, InternalModuleRegistryConstants::InternalSqlErrorsCode, "builtin://internal/sql/errors"_s);
    }
    case Field::InternalSqlMysql: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "internal:sql/mysql"_s, "internal/sql/mysql.js"_s, InternalModuleRegistryConstants::InternalSqlMysqlCode, "builtin://internal/sql/mysql"_s);
    }
    case Field::InternalSqlPostgres: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "internal:sql/postgres"_s, "internal/sql/postgres.js"_s, InternalModuleRegistryConstants::InternalSqlPostgresCode, "builtin://internal/sql/postgres"_s);
    }
    case Field::InternalSqlQuery: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "internal:sql/query"_s, "internal/sql/query.js"_s, InternalModuleRegistryConstants::InternalSqlQueryCode, "builtin://internal/sql/query"_s);
    }
    case Field::InternalSqlShared: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "internal:sql/shared"_s, "internal/sql/shared.js"_s, InternalModuleRegistryConstants::InternalSqlSharedCode, "builtin://internal/sql/shared"_s);
    }
    case Field::InternalSqlSqlite: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "internal:sql/sqlite"_s, "internal/sql/sqlite.js"_s, InternalModuleRegistryConstants::InternalSqlSqliteCode, "builtin://internal/sql/sqlite"_s);
    }
    case Field::InternalStreamPromises: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "internal:stream/promises"_s, "internal/stream.promises.js"_s, InternalModuleRegistryConstants::InternalStreamPromisesCode, "builtin://internal/stream/promises"_s);
    }
    case Field::InternalStream: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "internal:stream"_s, "internal/stream.js"_s, InternalModuleRegistryConstants::InternalStreamCode, "builtin://internal/stream"_s);
    }
    case Field::InternalStreamsAddAbortSignal: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "internal:streams/add-abort-signal"_s, "internal/streams/add-abort-signal.js"_s, InternalModuleRegistryConstants::InternalStreamsAddAbortSignalCode, "builtin://internal/streams/add/abort/signal"_s);
    }
    case Field::InternalStreamsCompose: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "internal:streams/compose"_s, "internal/streams/compose.js"_s, InternalModuleRegistryConstants::InternalStreamsComposeCode, "builtin://internal/streams/compose"_s);
    }
    case Field::InternalStreamsDestroy: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "internal:streams/destroy"_s, "internal/streams/destroy.js"_s, InternalModuleRegistryConstants::InternalStreamsDestroyCode, "builtin://internal/streams/destroy"_s);
    }
    case Field::InternalStreamsDuplex: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "internal:streams/duplex"_s, "internal/streams/duplex.js"_s, InternalModuleRegistryConstants::InternalStreamsDuplexCode, "builtin://internal/streams/duplex"_s);
    }
    case Field::InternalStreamsDuplexify: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "internal:streams/duplexify"_s, "internal/streams/duplexify.js"_s, InternalModuleRegistryConstants::InternalStreamsDuplexifyCode, "builtin://internal/streams/duplexify"_s);
    }
    case Field::InternalStreamsDuplexpair: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "internal:streams/duplexpair"_s, "internal/streams/duplexpair.js"_s, InternalModuleRegistryConstants::InternalStreamsDuplexpairCode, "builtin://internal/streams/duplexpair"_s);
    }
    case Field::InternalStreamsEndOfStream: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "internal:streams/end-of-stream"_s, "internal/streams/end-of-stream.js"_s, InternalModuleRegistryConstants::InternalStreamsEndOfStreamCode, "builtin://internal/streams/end/of/stream"_s);
    }
    case Field::InternalStreamsFrom: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "internal:streams/from"_s, "internal/streams/from.js"_s, InternalModuleRegistryConstants::InternalStreamsFromCode, "builtin://internal/streams/from"_s);
    }
    case Field::InternalStreamsLazyTransform: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "internal:streams/lazy_transform"_s, "internal/streams/lazy_transform.js"_s, InternalModuleRegistryConstants::InternalStreamsLazyTransformCode, "builtin://internal/streams/lazy/transform"_s);
    }
    case Field::InternalStreamsLegacy: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "internal:streams/legacy"_s, "internal/streams/legacy.js"_s, InternalModuleRegistryConstants::InternalStreamsLegacyCode, "builtin://internal/streams/legacy"_s);
    }
    case Field::InternalStreamsNativeReadable: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "internal:streams/native-readable"_s, "internal/streams/native-readable.js"_s, InternalModuleRegistryConstants::InternalStreamsNativeReadableCode, "builtin://internal/streams/native/readable"_s);
    }
    case Field::InternalStreamsOperators: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "internal:streams/operators"_s, "internal/streams/operators.js"_s, InternalModuleRegistryConstants::InternalStreamsOperatorsCode, "builtin://internal/streams/operators"_s);
    }
    case Field::InternalStreamsPassthrough: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "internal:streams/passthrough"_s, "internal/streams/passthrough.js"_s, InternalModuleRegistryConstants::InternalStreamsPassthroughCode, "builtin://internal/streams/passthrough"_s);
    }
    case Field::InternalStreamsPipeline: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "internal:streams/pipeline"_s, "internal/streams/pipeline.js"_s, InternalModuleRegistryConstants::InternalStreamsPipelineCode, "builtin://internal/streams/pipeline"_s);
    }
    case Field::InternalStreamsReadable: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "internal:streams/readable"_s, "internal/streams/readable.js"_s, InternalModuleRegistryConstants::InternalStreamsReadableCode, "builtin://internal/streams/readable"_s);
    }
    case Field::InternalStreamsState: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "internal:streams/state"_s, "internal/streams/state.js"_s, InternalModuleRegistryConstants::InternalStreamsStateCode, "builtin://internal/streams/state"_s);
    }
    case Field::InternalStreamsTransform: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "internal:streams/transform"_s, "internal/streams/transform.js"_s, InternalModuleRegistryConstants::InternalStreamsTransformCode, "builtin://internal/streams/transform"_s);
    }
    case Field::InternalStreamsUtils: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "internal:streams/utils"_s, "internal/streams/utils.js"_s, InternalModuleRegistryConstants::InternalStreamsUtilsCode, "builtin://internal/streams/utils"_s);
    }
    case Field::InternalStreamsWritable: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "internal:streams/writable"_s, "internal/streams/writable.js"_s, InternalModuleRegistryConstants::InternalStreamsWritableCode, "builtin://internal/streams/writable"_s);
    }
    case Field::InternalTimers: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "internal:timers"_s, "internal/timers.js"_s, InternalModuleRegistryConstants::InternalTimersCode, "builtin://internal/timers"_s);
    }
    case Field::InternalTLS: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "internal:tls"_s, "internal/tls.js"_s, InternalModuleRegistryConstants::InternalTLSCode, "builtin://internal/tls"_s);
    }
    case Field::InternalTty: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "internal:tty"_s, "internal/tty.js"_s, InternalModuleRegistryConstants::InternalTtyCode, "builtin://internal/tty"_s);
    }
    case Field::InternalUrl: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "internal:url"_s, "internal/url.js"_s, InternalModuleRegistryConstants::InternalUrlCode, "builtin://internal/url"_s);
    }
    case Field::InternalUtilColors: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "internal:util/colors"_s, "internal/util/colors.js"_s, InternalModuleRegistryConstants::InternalUtilColorsCode, "builtin://internal/util/colors"_s);
    }
    case Field::InternalUtilDeprecate: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "internal:util/deprecate"_s, "internal/util/deprecate.js"_s, InternalModuleRegistryConstants::InternalUtilDeprecateCode, "builtin://internal/util/deprecate"_s);
    }
    case Field::InternalUtilInspect: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "internal:util/inspect"_s, "internal/util/inspect.js"_s, InternalModuleRegistryConstants::InternalUtilInspectCode, "builtin://internal/util/inspect"_s);
    }
    case Field::InternalUtilMime: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "internal:util/mime"_s, "internal/util/mime.js"_s, InternalModuleRegistryConstants::InternalUtilMimeCode, "builtin://internal/util/mime"_s);
    }
    case Field::InternalValidators: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "internal:validators"_s, "internal/validators.js"_s, InternalModuleRegistryConstants::InternalValidatorsCode, "builtin://internal/validators"_s);
    }
    case Field::InternalWebstreamsAdapters: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "internal:webstreams_adapters"_s, "internal/webstreams_adapters.js"_s, InternalModuleRegistryConstants::InternalWebstreamsAdaptersCode, "builtin://internal/webstreams/adapters"_s);
    }
    case Field::NodeHttp2Upgrade: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "node:_http2_upgrade"_s, "node/_http2_upgrade.js"_s, InternalModuleRegistryConstants::NodeHttp2UpgradeCode, "builtin://node/http2/upgrade"_s);
    }
    case Field::NodeHttpAgent: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "node:_http_agent"_s, "node/_http_agent.js"_s, InternalModuleRegistryConstants::NodeHttpAgentCode, "builtin://node/http/agent"_s);
    }
    case Field::NodeHttpClient: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "node:_http_client"_s, "node/_http_client.js"_s, InternalModuleRegistryConstants::NodeHttpClientCode, "builtin://node/http/client"_s);
    }
    case Field::NodeHttpCommon: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "node:_http_common"_s, "node/_http_common.js"_s, InternalModuleRegistryConstants::NodeHttpCommonCode, "builtin://node/http/common"_s);
    }
    case Field::NodeHttpIncoming: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "node:_http_incoming"_s, "node/_http_incoming.js"_s, InternalModuleRegistryConstants::NodeHttpIncomingCode, "builtin://node/http/incoming"_s);
    }
    case Field::NodeHttpOutgoing: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "node:_http_outgoing"_s, "node/_http_outgoing.js"_s, InternalModuleRegistryConstants::NodeHttpOutgoingCode, "builtin://node/http/outgoing"_s);
    }
    case Field::NodeHttpServer: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "node:_http_server"_s, "node/_http_server.js"_s, InternalModuleRegistryConstants::NodeHttpServerCode, "builtin://node/http/server"_s);
    }
    case Field::NodeStreamDuplex: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "node:_stream_duplex"_s, "node/_stream_duplex.js"_s, InternalModuleRegistryConstants::NodeStreamDuplexCode, "builtin://node/stream/duplex"_s);
    }
    case Field::NodeStreamPassthrough: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "node:_stream_passthrough"_s, "node/_stream_passthrough.js"_s, InternalModuleRegistryConstants::NodeStreamPassthroughCode, "builtin://node/stream/passthrough"_s);
    }
    case Field::NodeStreamReadable: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "node:_stream_readable"_s, "node/_stream_readable.js"_s, InternalModuleRegistryConstants::NodeStreamReadableCode, "builtin://node/stream/readable"_s);
    }
    case Field::NodeStreamTransform: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "node:_stream_transform"_s, "node/_stream_transform.js"_s, InternalModuleRegistryConstants::NodeStreamTransformCode, "builtin://node/stream/transform"_s);
    }
    case Field::NodeStreamWrap: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "node:_stream_wrap"_s, "node/_stream_wrap.js"_s, InternalModuleRegistryConstants::NodeStreamWrapCode, "builtin://node/stream/wrap"_s);
    }
    case Field::NodeStreamWritable: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "node:_stream_writable"_s, "node/_stream_writable.js"_s, InternalModuleRegistryConstants::NodeStreamWritableCode, "builtin://node/stream/writable"_s);
    }
    case Field::NodeTLSCommon: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "node:_tls_common"_s, "node/_tls_common.js"_s, InternalModuleRegistryConstants::NodeTLSCommonCode, "builtin://node/tls/common"_s);
    }
    case Field::NodeAssertStrict: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "node:assert/strict"_s, "node/assert.strict.js"_s, InternalModuleRegistryConstants::NodeAssertStrictCode, "builtin://node/assert/strict"_s);
    }
    case Field::NodeAssert: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "node:assert"_s, "node/assert.js"_s, InternalModuleRegistryConstants::NodeAssertCode, "builtin://node/assert"_s);
    }
    case Field::NodeAsyncHooks: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "node:async_hooks"_s, "node/async_hooks.js"_s, InternalModuleRegistryConstants::NodeAsyncHooksCode, "builtin://node/async/hooks"_s);
    }
    case Field::NodeChildProcess: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "node:child_process"_s, "node/child_process.js"_s, InternalModuleRegistryConstants::NodeChildProcessCode, "builtin://node/child/process"_s);
    }
    case Field::NodeCluster: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "node:cluster"_s, "node/cluster.js"_s, InternalModuleRegistryConstants::NodeClusterCode, "builtin://node/cluster"_s);
    }
    case Field::NodeConsole: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "node:console"_s, "node/console.js"_s, InternalModuleRegistryConstants::NodeConsoleCode, "builtin://node/console"_s);
    }
    case Field::NodeCrypto: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "node:crypto"_s, "node/crypto.js"_s, InternalModuleRegistryConstants::NodeCryptoCode, "builtin://node/crypto"_s);
    }
    case Field::NodeDgram: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "node:dgram"_s, "node/dgram.js"_s, InternalModuleRegistryConstants::NodeDgramCode, "builtin://node/dgram"_s);
    }
    case Field::NodeDiagnosticsChannel: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "node:diagnostics_channel"_s, "node/diagnostics_channel.js"_s, InternalModuleRegistryConstants::NodeDiagnosticsChannelCode, "builtin://node/diagnostics/channel"_s);
    }
    case Field::NodeDNSPromises: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "node:dns/promises"_s, "node/dns.promises.js"_s, InternalModuleRegistryConstants::NodeDNSPromisesCode, "builtin://node/dns/promises"_s);
    }
    case Field::NodeDNS: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "node:dns"_s, "node/dns.js"_s, InternalModuleRegistryConstants::NodeDNSCode, "builtin://node/dns"_s);
    }
    case Field::NodeDomain: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "node:domain"_s, "node/domain.js"_s, InternalModuleRegistryConstants::NodeDomainCode, "builtin://node/domain"_s);
    }
    case Field::NodeEvents: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "node:events"_s, "node/events.js"_s, InternalModuleRegistryConstants::NodeEventsCode, "builtin://node/events"_s);
    }
    case Field::NodeFSPromises: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "node:fs/promises"_s, "node/fs.promises.js"_s, InternalModuleRegistryConstants::NodeFSPromisesCode, "builtin://node/fs/promises"_s);
    }
    case Field::NodeFS: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "node:fs"_s, "node/fs.js"_s, InternalModuleRegistryConstants::NodeFSCode, "builtin://node/fs"_s);
    }
    case Field::NodeHttp: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "node:http"_s, "node/http.js"_s, InternalModuleRegistryConstants::NodeHttpCode, "builtin://node/http"_s);
    }
    case Field::NodeHttp2: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "node:http2"_s, "node/http2.js"_s, InternalModuleRegistryConstants::NodeHttp2Code, "builtin://node/http2"_s);
    }
    case Field::NodeHttps: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "node:https"_s, "node/https.js"_s, InternalModuleRegistryConstants::NodeHttpsCode, "builtin://node/https"_s);
    }
    case Field::NodeInspectorPromises: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "node:inspector/promises"_s, "node/inspector.promises.js"_s, InternalModuleRegistryConstants::NodeInspectorPromisesCode, "builtin://node/inspector/promises"_s);
    }
    case Field::NodeInspector: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "node:inspector"_s, "node/inspector.js"_s, InternalModuleRegistryConstants::NodeInspectorCode, "builtin://node/inspector"_s);
    }
    case Field::NodeNet: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "node:net"_s, "node/net.js"_s, InternalModuleRegistryConstants::NodeNetCode, "builtin://node/net"_s);
    }
    case Field::NodeOS: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "node:os"_s, "node/os.js"_s, InternalModuleRegistryConstants::NodeOSCode, "builtin://node/os"_s);
    }
    case Field::NodePathPosix: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "node:path/posix"_s, "node/path.posix.js"_s, InternalModuleRegistryConstants::NodePathPosixCode, "builtin://node/path/posix"_s);
    }
    case Field::NodePath: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "node:path"_s, "node/path.js"_s, InternalModuleRegistryConstants::NodePathCode, "builtin://node/path"_s);
    }
    case Field::NodePathWin32: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "node:path/win32"_s, "node/path.win32.js"_s, InternalModuleRegistryConstants::NodePathWin32Code, "builtin://node/path/win32"_s);
    }
    case Field::NodePerfHooks: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "node:perf_hooks"_s, "node/perf_hooks.js"_s, InternalModuleRegistryConstants::NodePerfHooksCode, "builtin://node/perf/hooks"_s);
    }
    case Field::NodePunycode: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "node:punycode"_s, "node/punycode.js"_s, InternalModuleRegistryConstants::NodePunycodeCode, "builtin://node/punycode"_s);
    }
    case Field::NodeQuerystring: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "node:querystring"_s, "node/querystring.js"_s, InternalModuleRegistryConstants::NodeQuerystringCode, "builtin://node/querystring"_s);
    }
    case Field::NodeReadlinePromises: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "node:readline/promises"_s, "node/readline.promises.js"_s, InternalModuleRegistryConstants::NodeReadlinePromisesCode, "builtin://node/readline/promises"_s);
    }
    case Field::NodeReadline: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "node:readline"_s, "node/readline.js"_s, InternalModuleRegistryConstants::NodeReadlineCode, "builtin://node/readline"_s);
    }
    case Field::NodeRepl: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "node:repl"_s, "node/repl.js"_s, InternalModuleRegistryConstants::NodeReplCode, "builtin://node/repl"_s);
    }
    case Field::NodeStreamConsumers: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "node:stream/consumers"_s, "node/stream.consumers.js"_s, InternalModuleRegistryConstants::NodeStreamConsumersCode, "builtin://node/stream/consumers"_s);
    }
    case Field::NodeStreamPromises: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "node:stream/promises"_s, "node/stream.promises.js"_s, InternalModuleRegistryConstants::NodeStreamPromisesCode, "builtin://node/stream/promises"_s);
    }
    case Field::NodeStream: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "node:stream"_s, "node/stream.js"_s, InternalModuleRegistryConstants::NodeStreamCode, "builtin://node/stream"_s);
    }
    case Field::NodeStreamWeb: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "node:stream/web"_s, "node/stream.web.js"_s, InternalModuleRegistryConstants::NodeStreamWebCode, "builtin://node/stream/web"_s);
    }
    case Field::NodeTest: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "node:test"_s, "node/test.js"_s, InternalModuleRegistryConstants::NodeTestCode, "builtin://node/test"_s);
    }
    case Field::NodeTimersPromises: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "node:timers/promises"_s, "node/timers.promises.js"_s, InternalModuleRegistryConstants::NodeTimersPromisesCode, "builtin://node/timers/promises"_s);
    }
    case Field::NodeTimers: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "node:timers"_s, "node/timers.js"_s, InternalModuleRegistryConstants::NodeTimersCode, "builtin://node/timers"_s);
    }
    case Field::NodeTLS: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "node:tls"_s, "node/tls.js"_s, InternalModuleRegistryConstants::NodeTLSCode, "builtin://node/tls"_s);
    }
    case Field::NodeTraceEvents: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "node:trace_events"_s, "node/trace_events.js"_s, InternalModuleRegistryConstants::NodeTraceEventsCode, "builtin://node/trace/events"_s);
    }
    case Field::NodeTty: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "node:tty"_s, "node/tty.js"_s, InternalModuleRegistryConstants::NodeTtyCode, "builtin://node/tty"_s);
    }
    case Field::NodeUrl: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "node:url"_s, "node/url.js"_s, InternalModuleRegistryConstants::NodeUrlCode, "builtin://node/url"_s);
    }
    case Field::NodeUtil: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "node:util"_s, "node/util.js"_s, InternalModuleRegistryConstants::NodeUtilCode, "builtin://node/util"_s);
    }
    case Field::NodeV8: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "node:v8"_s, "node/v8.js"_s, InternalModuleRegistryConstants::NodeV8Code, "builtin://node/v8"_s);
    }
    case Field::NodeVM: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "node:vm"_s, "node/vm.js"_s, InternalModuleRegistryConstants::NodeVMCode, "builtin://node/vm"_s);
    }
    case Field::NodeWasi: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "node:wasi"_s, "node/wasi.js"_s, InternalModuleRegistryConstants::NodeWasiCode, "builtin://node/wasi"_s);
    }
    case Field::NodeWorkerThreads: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "node:worker_threads"_s, "node/worker_threads.js"_s, InternalModuleRegistryConstants::NodeWorkerThreadsCode, "builtin://node/worker/threads"_s);
    }
    case Field::NodeZlib: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "node:zlib"_s, "node/zlib.js"_s, InternalModuleRegistryConstants::NodeZlibCode, "builtin://node/zlib"_s);
    }
    case Field::ThirdpartyIsomorphicFetch: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "isomorphic-fetch"_s, "thirdparty/isomorphic-fetch.js"_s, InternalModuleRegistryConstants::ThirdpartyIsomorphicFetchCode, "builtin://thirdparty/isomorphic/fetch"_s);
    }
    case Field::ThirdpartyNodeFetch: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "node-fetch"_s, "thirdparty/node-fetch.js"_s, InternalModuleRegistryConstants::ThirdpartyNodeFetchCode, "builtin://thirdparty/node/fetch"_s);
    }
    case Field::ThirdpartyUndici: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "undici"_s, "thirdparty/undici.js"_s, InternalModuleRegistryConstants::ThirdpartyUndiciCode, "builtin://thirdparty/undici"_s);
    }
    case Field::ThirdpartyVercelFetch: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "vercel_fetch"_s, "thirdparty/vercel_fetch.js"_s, InternalModuleRegistryConstants::ThirdpartyVercelFetchCode, "builtin://thirdparty/vercel/fetch"_s);
    }
    case Field::ThirdpartyWS: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "ws"_s, "thirdparty/ws.js"_s, InternalModuleRegistryConstants::ThirdpartyWSCode, "builtin://thirdparty/ws"_s);
    }
    case Field::InternalForTesting: {
      INTERNAL_MODULE_REGISTRY_GENERATE(globalObject, vm, "bun:internal-for-testing"_s, "internal-for-testing.js"_s, InternalModuleRegistryConstants::InternalForTestingCode, "builtin://internal/for/testing"_s);
    }
    case Field::BunTest: {
      return generateNativeModule(globalObject, vm, generateNativeModule_BunTest);
    }
    case Field::BunJSC: {
      return generateNativeModule(globalObject, vm, generateNativeModule_BunJSC);
    }
    case Field::BunApp: {
      return generateNativeModule(globalObject, vm, generateNativeModule_BunApp);
    }
    case Field::NodeBuffer: {
      return generateNativeModule(globalObject, vm, generateNativeModule_NodeBuffer);
    }
    case Field::NodeConstants: {
      return generateNativeModule(globalObject, vm, generateNativeModule_NodeConstants);
    }
    case Field::NodeStringDecoder: {
      return generateNativeModule(globalObject, vm, generateNativeModule_NodeStringDecoder);
    }
    case Field::NodeUtilTypes: {
      return generateNativeModule(globalObject, vm, generateNativeModule_NodeUtilTypes);
    }
    case Field::Utf8Validate: {
      return generateNativeModule(globalObject, vm, generateNativeModule_UTF8Validate);
    }
    case Field::AbortController: {
      return generateNativeModule(globalObject, vm, generateNativeModule_AbortControllerModule);
    }
    case Field::NodeModule: {
      return generateNativeModule(globalObject, vm, generateNativeModule_NodeModule);
    }
    case Field::NodeProcess: {
      return generateNativeModule(globalObject, vm, generateNativeModule_NodeProcess);
    }
    case Field::Bun: {
      return generateNativeModule(globalObject, vm, generateNativeModule_BunObject);
    }
    default: {
      __builtin_unreachable();
    }
  }
  __builtin_unreachable();
}
