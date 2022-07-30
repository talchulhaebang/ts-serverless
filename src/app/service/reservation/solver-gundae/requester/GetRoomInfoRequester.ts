import { HttpTemplate, OriginalCharset } from "@mipong/utils/http";
import { parseGetRoomInfo } from "../parser/parseGetRoomInfo";

export class GetRoomInfoRequester {
  private parser = parseGetRoomInfo;
  constructor(private httpTemplate: HttpTemplate) {}

  async execute() {
    const { body } = await this.request();

    console.log(body);
    return this.parser(body);
  }
  private async request() {
    return await this.httpTemplate.get("http://solver-gd.com/sub/02.html", {
      headers: {
        Referer: "http://solver-gd.com/main.html",
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.115 Safari/537.36",
      },
      originalCharset: OriginalCharset.EUC_KR,
    });
  }
}
