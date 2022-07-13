import { HttpTemplate, OriginalCharset, Parameter } from "@mipong/utils/http";
import { parseGundae1ReservationInfo } from "../parser/parseGundae1ReservationInfo";

export class Gundae1ReservationInfoRequester {
  private parse = parseGundae1ReservationInfo;
  constructor(private httpTemplate: HttpTemplate) {}

  async execute(yyyyMMdd: string) {
    const payload = this.makePayload(yyyyMMdd);
    const { body } = await this.request(payload);

    return this.parse(body);
  }
  private makePayload(yyyyMMdd: string) {
    return new Parameter()
      .put("JIJEM", "S2")
      .put("H_Date", yyyyMMdd)
      .toString(true);
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
