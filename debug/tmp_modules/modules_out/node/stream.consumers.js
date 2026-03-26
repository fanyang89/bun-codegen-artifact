// @bun
// build/debug/tmp_modules/node/stream.consumers.ts
var $;
var JSONParse = JSON.parse;
async function blob(stream) {
  if (__intrinsic__inherits(1, stream))
    return Bun.readableStreamToBlob(stream);
  const chunks = [];
  for await (const chunk of stream)
    chunks.push(chunk);
  return new Blob(chunks);
}
async function arrayBuffer(stream) {
  if (__intrinsic__inherits(1, stream))
    return Bun.readableStreamToArrayBuffer(stream);
  const ret = await blob(stream);
  return ret.arrayBuffer();
}
async function bytes(stream) {
  if (__intrinsic__inherits(1, stream))
    return Bun.readableStreamToBytes(stream);
  const ret = await blob(stream);
  return ret.bytes();
}
async function buffer(stream) {
  return __intrinsic__Buffer.from(await arrayBuffer(stream));
}
async function text(stream) {
  if (__intrinsic__inherits(1, stream))
    return Bun.readableStreamToText(stream);
  const dec = new TextDecoder;
  let str = "";
  for await (const chunk of stream) {
    if (typeof chunk === "string")
      str += chunk;
    else
      str += dec.decode(chunk, { stream: true });
  }
  str += dec.decode(__intrinsic__undefined, { stream: false });
  return str;
}
async function json(stream) {
  if (__intrinsic__inherits(1, stream))
    return Bun.readableStreamToJSON(stream);
  const str = await text(stream);
  return JSONParse(str);
}
$ = {
  arrayBuffer,
  bytes,
  text,
  json,
  buffer,
  blob
};
$$EXPORT$$($).$$EXPORT_END$$;
