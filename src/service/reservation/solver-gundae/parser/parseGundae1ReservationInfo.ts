import { extractInnerText, extractInnerTexts } from "@mipong/utils/string";

export function parseGundae1ReservationInfo(html: string) {
  const rooms = extractInnerTexts(html, '<div class="reservTime">', "</div>");

  console.log(rooms);
  console.log(rooms.length);
  return rooms.map(parseRoom);
}
function parseRoom(html: string) {
  const roomName = extractInnerText(html, ["<h3 >"], "<b style=");
  const theme = extractInnerText(
    html,
    ['<b style="color:#A92024; font-size:14pt">'],
    "</b>"
  );
  const playSize = extractInnerText(html, ["<p >"], "&nbsp;");
  const difficulty = extractInnerText(
    html,
    ['난이도<span style="font-size:24px;color:#05AF84;"> '],
    "</p>"
  );

  const isAvailable = extractInnerText(
    html,
    [
      '<li style="border: 1px solid #777; ">',
      '<span class="possibility" style=" color: #05AF84;font-weight: bold; font-size:18px;" >',
    ],
    "</span>"
  );

  return {
    roomName,
    theme,
    playSize,
    difficulty,
    isAvailable,
  };
}
