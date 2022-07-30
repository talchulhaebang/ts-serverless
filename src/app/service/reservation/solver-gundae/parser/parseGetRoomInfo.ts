import { extractInnerTexts, extractInnerText } from "@mipong/utils/string";

export function parseGetRoomInfo(html: string) {
  const rooms = extractInnerTexts(
    html,
    '<div class="img_box">',
    "</div><!--// img_box -->"
  );

  return rooms.map((room) => ({
    title: extractInnerText(room, ['<span class="tit">'], "</span>"),
    difficulty: extractInnerText(
      room,
      [
        '<span  class="span1">난이도</span>',
        '<span class="span3" style="font-size:25px;color:#05AF84">',
      ],
      "</span>"
    ),
    theme: extractInnerText(
      room,
      [
        '<div style="width:100%;font-size:18px;color:#05AF84;text-align:center;">',
      ],
      "</div>"
    ),
    reservationMetadata: {
      roomCode: extractInnerText(room, ["D_ROOM="], "&"),
      officeCode: extractInnerText(room, ["JIJEM="], "'>예약하기"),
    },
  }));
}
