import { HttpTemplate, OriginalCharset, Parameter } from "@mipong/utils/http";
import { parseGundaeReservationInfo } from "../parser/parseGundaeReservationInfo";

export class ReservationInfoRequester {
  private parse = parseGundaeReservationInfo;
  constructor(private httpTemplate: HttpTemplate) {}

  async execute(지점: string, yyyyMMdd: string) {
    const payload = this.makePayload(지점, yyyyMMdd);
    const { body } = await this.request(payload);

    return this.parse(body);
  }
  private makePayload(지점: string, yyyyMMdd: string) {
    return (
      new Parameter()
        // S1 OR S2
        .put("JIJEM", `S${지점}`)
        .put("H_Date", yyyyMMdd)
        .toString(true)
    );
  }
  private async request(payload: string) {
    return this.httpTemplate.post(
      "http://solver-gd.com/sub/03_1.html",
      payload,
      {
        originalCharset: OriginalCharset.EUC_KR,
      }
    );
  }
}
