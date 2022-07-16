import { HttpTemplate, Parameter } from "@mipong/utils/http";

export class SendSmsRequester {
  constructor(private httpTemplate: HttpTemplate) {}
  async execute(form: Record<string, string>) {
    const payload = this.makePayload(form);
    const { body } = await this.request(payload);
    return body;
  }

  private makePayload(form: Record<string, string>) {
    return new Parameter().putObject(form).toString(false);
  }

  private async request(payload: string) {
    return await this.httpTemplate.post(
      "http://sslsms.cafe24.com/sms_sender.php",
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
