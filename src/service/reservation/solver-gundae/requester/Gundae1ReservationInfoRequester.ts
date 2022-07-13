import { HttpTemplate, OriginalCharset, Parameter } from "@mipong/utils/http";

export class Gundae1ReservationInfoRequester {
  constructor(private httpTemplate: HttpTemplate) {}

  async execute(yyyyMMdd: string) {
    const payload = this.makePayload(yyyyMMdd);
    const { body } = await this.request(payload);
    console.log(`body !!`);
    console.log(body);

    return body;
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
