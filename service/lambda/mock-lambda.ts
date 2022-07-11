import { createCommonHttpTemplate } from "@mipong/utils/http";
import { pipe, pipeWith, tryCatch, andThen } from "ramda";
import { ApiRequest } from "../../core";
import { BadRequestScrapingError } from "../../error/BadRequestScrapingError";
import { ScrapingError } from "../../error/ScrapingError";
import { withLambdaHandler } from "../../util";
import { handleErrorResponse } from "../../util/handleErrorResponse";
import { handleSuccessPlainTextResponse } from "../../util/handlePlainTextResponse";
import { then } from "../../util/then";

export const handler = pipeWith(then, [
  withLambdaHandler,
  tryCatch(handleLambda, handleErrorResponse),
  handleSuccessPlainTextResponse,
]);

async function handleLambda(apiRequest: ApiRequest): Promise<any> {
  console.log("request:", JSON.stringify(apiRequest, undefined, 2));

  const httpTemplate = createCommonHttpTemplate();

  const response = await httpTemplate.get("https://kim.heejae.info");
  console.log(response);

  if (true) {
    throw new BadRequestScrapingError("올바르지 않은 요청입니다");
  }

  return response.body;
}
