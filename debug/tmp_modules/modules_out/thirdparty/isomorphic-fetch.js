// @bun
// build/debug/tmp_modules/thirdparty/isomorphic-fetch.ts
var $;
var bunFetch = Bun.fetch;
var fetch = (...args) => bunFetch(...args);
fetch.default = fetch;
fetch.fetch = fetch;
$ = fetch;
$$EXPORT$$($).$$EXPORT_END$$;
