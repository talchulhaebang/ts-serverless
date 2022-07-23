import { HttpTemplate, Parameter } from "@mipong/utils/http";
import { ReserveRoomPayload } from "../../../../../core/type/ReserveRoomPayload";
import { ReserveForm } from "../../../../../core/type/solver-gundae";
import { parseReservation } from "../parser/parseReservation";
import { encodeEucKrUri } from "../../../../../core/util/encodeURI";

export class ReservationRequester {
  private parse = parseReservation;
  constructor(private httpTemplate: HttpTemplate) {}

  async execute(form: ReserveForm, params: ReserveRoomPayload) {
    const payload = this.makePayload(form, params);
    const { body } = await this.request(payload);

    return this.parse(body);
  }

  private makePayload(form: ReserveForm, params: ReserveRoomPayload): string {
    const { phone } = params;
    if (phone.length !== 11) {
      throw new Error("전화번호 형식이 올바르지 않습니다");
    }

    const mergedForm = Object.entries({
      ...form,
      name: params.username,
      HP1: params.phone.substring(0, 3),
      HP2: params.phone.substring(3, 7),
      HP3: params.phone.substring(7, 11),
      inwon: params.playerSize,
    }).reduce((ac, [key, value]) => {
      return {
        ...ac,
        [key]: encodeEucKrUri(value?.toString() ?? ""),
      };
    }, {} as Record<string, string>);

    return new Parameter().putObject(mergedForm).toString(false);
  }

  private async request(payload: string) {
    return await this.httpTemplate.post(
      "http://solver-gd.com/sub/03_3.html",
      payload,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Referer: "http://solver-gd.com/sub/03_2.html",
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.115 Safari/537.36",
        },
      }
    );
  }
}
