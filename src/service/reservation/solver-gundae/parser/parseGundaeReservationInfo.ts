import {
  extractInnerText,
  extractInnerTexts,
  extractOuterTexts,
} from "@mipong/utils/string";

export function parseGundaeReservationInfo(html: string) {
  const rooms = extractInnerTexts(html, '<div class="reservTime">', "</div>");

  console.log(rooms);
  console.log(rooms.length);
  return rooms.map(parseRoom);
}
function parseRoom(html: string) {
  const 지점명 = `솔버 건대점 ${extractInnerText(
    html,
    ["JIJEM_CODE=S"],
    "&"
  )}호점`;
  const 방이름 = extractInnerText(html, ["<h3 >"], "<b style=");
  const 테마 = extractInnerText(
    html,
    ['<b style="color:#A92024; font-size:14pt">'],
    "</b>"
  );
  const 인원 = extractInnerText(html, ["<p >"], "&nbsp;");
  const 난이도 = extractInnerText(
    html,
    ['난이도<span style="font-size:24px;color:#05AF84;"> '],
    "</p>"
  );

  const 예약정보Areas = extractOuterTexts(html, '<a href="', "</a>");

  console.log(예약정보Areas);

  return {
    지점명,
    방이름,
    테마,
    인원,
    난이도,
    예약정보: 예약정보Areas.map(parseTime),
  };
}
function parseTime(html: string) {
  const 시간 = extractInnerText(
    html,
    ["<li", '<span class="time"', ">"],
    "</span>"
  );

  const 예약가능여부 =
    extractInnerText(
      html,
      ['<li style="', '">', '<span class="possibility" ', ">"],
      "</span>"
    ) === "예약가능";

  return {
    시간,
    예약가능여부,
  };
}
