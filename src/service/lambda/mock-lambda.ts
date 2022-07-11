import { createCommonHttpTemplate } from "@mipong/utils/http";
import { pipeWith, tryCatch } from "ramda";
import { ApiRequest } from "../../core";
import { BadRequestScrapingError } from "../../error/BadRequestScrapingError";
import { ApiResponse } from "../../type/ApiResponse";
import { withLambdaHandler } from "../../util";
import { handleErrorResponse } from "../../util/handleErrorResponse";
import { handleSuccessJsonResponse } from "../../util/handleSuccessJsonResponse";
import { then } from "../../util/then";
import { withTryCatch } from "../../util/withTryCatch";

export const handler = withTryCatch(
  pipeWith(then, [
    // Lambda Handler 형태로 변환
    withLambdaHandler,
    // 실질적인 비즈니스 로직 수행
    handleLambda,
    // JSON 형태로 반환
    handleSuccessJsonResponse,
  ]),
  handleErrorResponse
);

async function handleLambda(apiRequest: ApiRequest): Promise<{
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
