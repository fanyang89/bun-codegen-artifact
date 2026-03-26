// @bun
// build/debug/tmp_modules/internal/net/isIP.ts
var $;
var v4Seg = "(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])";
var v4Str = `(?:${v4Seg}\\.){3}${v4Seg}`;
var IPv4Reg;
var v6Seg = "(?:[0-9a-fA-F]{1,4})";
var IPv6Reg;
function isIPv4(s) {
  return (IPv4Reg ??= new __intrinsic__RegExp(`^${v4Str}$`)).test(s);
}
function isIPv6(s) {
  return (IPv6Reg ??= new __intrinsic__RegExp("^(?:" + `(?:${v6Seg}:){7}(?:${v6Seg}|:)|` + `(?:${v6Seg}:){6}(?:${v4Str}|:${v6Seg}|:)|` + `(?:${v6Seg}:){5}(?::${v4Str}|(?::${v6Seg}){1,2}|:)|` + `(?:${v6Seg}:){4}(?:(?::${v6Seg}){0,1}:${v4Str}|(?::${v6Seg}){1,3}|:)|` + `(?:${v6Seg}:){3}(?:(?::${v6Seg}){0,2}:${v4Str}|(?::${v6Seg}){1,4}|:)|` + `(?:${v6Seg}:){2}(?:(?::${v6Seg}){0,3}:${v4Str}|(?::${v6Seg}){1,5}|:)|` + `(?:${v6Seg}:){1}(?:(?::${v6Seg}){0,4}:${v4Str}|(?::${v6Seg}){1,6}|:)|` + `(?::(?:(?::${v6Seg}){0,5}:${v4Str}|(?::${v6Seg}){1,7}|:))` + ")(?:%[0-9a-zA-Z-.:]{1,})?$")).test(s);
}
function isIP(s) {
  if (isIPv4(s))
    return 4;
  if (isIPv6(s))
    return 6;
  return 0;
}
$ = {
  isIPv4,
  isIPv6,
  isIP
};
$$EXPORT$$($).$$EXPORT_END$$;
