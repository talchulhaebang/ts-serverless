import { extractInnerTexts } from "@mipong/utils/string";

export function parseGundae1ReservationInfo(html: string) {
  const rooms = extractInnerTexts(html, '<div class="reservTime">', "</div>");

  console.log(rooms);
  console.log(rooms.length);
}
