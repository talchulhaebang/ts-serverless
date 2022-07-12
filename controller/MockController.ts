import { createCommonHttpTemplate } from "@mipong/utils/http";
import { ApiRequest } from "../src/core";
import { BadRequestScrapingError } from "../src/error/BadRequestScrapingError";

export class MockController {
  async execute(apiRequest: ApiRequest): Promise<{
    foo: string;
  }> {
    console.log("request:", JSON.stringify(apiRequest, undefined, 2));

    const httpTemplate = createCommonHttpTemplate();

    const response = await httpTemplate.get("https://kim.heejae.info");
    console.log(response);

    const random = Math.floor(Math.random() * 10) % 2;
    if (random) {
      throw new BadRequestScrapingError("올바르지 않은 요청입니다");
    }

    return {
      foo: "bar",
    };
  }
}
