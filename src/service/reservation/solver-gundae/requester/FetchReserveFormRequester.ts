import { HttpTemplate, OriginalCharset, Parameter } from "@mipong/utils/http";
import { ReserveRoomPayload } from "../../../../type/RserveRoomPayload";
import { encodeEucKrUri } from "../../../../util/encodeURI";
import { isWeekend } from "../../../../util/isWeekend";
import { parseFetchReserveForm } from "../parser/parseFetchReserveForm";

export class FetchReserveFormRequester {
  private parse = parseFetchReserveForm;
  constructor(private httpTemplate: HttpTemplate) {}

  async execute(params: ReserveRoomPayload) {
    const queryString = this.makeQueryString(params);

    const { body } = await this.request(queryString);

    return this.parse(body);
  }

  private makeQueryString(params: ReserveRoomPayload) {
    const roomWeek = isWeekend(new Date(params.date)) ? "주말" : "평일";

    encodeURIComponent;

    return new Parameter()
      .put("JIJEM_CODE", params.officeCode)
      .put("CHOIS_DATE", params.date)
      .put("ROOM_CODE", params.roomCode)
      .put("ROOM_TIME", params.time)
      .put("ROOM_WEEK", encodeEucKrUri(roomWeek))
      .toString(false);
  }

  private async request(queryString: string) {
    return await this.httpTemplate.get(
      `http://solver-gd.com/sub/03_2.html?${queryString}`,
      {
        originalCharset: OriginalCharset.EUC_KR,
      }
    );
  }
}
