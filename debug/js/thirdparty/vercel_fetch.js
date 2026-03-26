(function (){"use strict";// build/debug/tmp_modules/thirdparty/vercel_fetch.ts
var $;
$ = (wrapper = Bun.fetch) => {
  async function vercelFetch(url, opts = {}) {
    if (opts.body && typeof opts.body === "object" && (!("buffer" in opts.body) || typeof opts.body.buffer !== "object" || !(opts.body.buffer instanceof @ArrayBuffer))) {
      opts.body = JSON.stringify(opts.body);
      if (!opts.headers)
        opts.headers = new Headers;
      opts.headers.set("Content-Type", "application/json");
    }
    try {
      return await wrapper(url, opts);
    } catch (error) {
      error.url = url;
      error.opts = opts;
      throw error;
    }
  }
  vercelFetch.default = vercelFetch;
  return vercelFetch;
};
return $})
