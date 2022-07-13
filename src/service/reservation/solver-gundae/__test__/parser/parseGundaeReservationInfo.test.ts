import fs from "fs";
import { parseGundaeReservationInfo } from "../../parser/parseGundaeReservationInfo";

describe("parseGundaeReservationInfo TEST", () => {
  const parser = parseGundaeReservationInfo;
  it("성공적인 응답이 온 경우, 방 정보를 올바르게 파싱해야 한다", async () => {
    const html = fs
      .readFileSync(`${__dirname}/../data/Gundae1ReservationInfo_성공.txt`)
      .toString();

    const parsed = parser(html);

    console.log(JSON.stringify(parsed));
  });
});
