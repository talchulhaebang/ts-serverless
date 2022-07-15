import iconv from "iconv-lite";

/**
 * encodeURIWithCharset, encodeURIComponentWithCharset 둘은 encodeURI, encodeURIComponent와 같은 문자열을 변환하여 표준을 따르지만 표준을 따르지않은 경우 이걸 사용합니다
 */
export function encodeEucKrUri(content: string) {
  const allowList =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ;,/?:@&=+$-_.!~*'()#";
  const buf = iconv.encode(content, "euc-kr");

  let encodeStr = "";
  let ch = "";
  for (let i = 0; i < buf.length; i++) {
    if (allowList.includes(String.fromCharCode(buf[i]))) {
      encodeStr += String.fromCharCode(buf[i]);
      continue;
    }
    ch = buf[i].toString(16);
    if (ch.length === 1) {
      ch = "0" + ch;
    }
    encodeStr += "%" + ch.toUpperCase();
  }
  return encodeStr;
}
