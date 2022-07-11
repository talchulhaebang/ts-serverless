import { createCommonHttpTemplate } from "@mipong/utils/http";
import { pipe, pipeWith, tryCatch, andThen } from "ramda";
import { ApiRequest } from "../../core";
import { withLambdaHandler } from "../../utils";
import { handleErrorResponse } from "../../utils/handleErrorRespose";
import { handleSuccessJsonResponse } from "../../utils/toSuccessResponse";

export const handler = pipeWith(andThen, [
  withLambdaHandler,
  tryCatch(handleLambda, handleErrorResponse),
  handleSuccessJsonResponse,
]);

async function handleLambda(apiRequest: ApiRequest): Promise<any> {
  console.log("request:", JSON.stringify(apiRequest, undefined, 2));

  const httpTemplate = createCommonHttpTemplate();

  const response = await httpTemplate.get("https://kim.heejae.info");
  console.log(response);

  return response;

  // return toResponse({
  //   statusCode: 200,
  //   headers: { "Content-Type": "application/json;charset=UTF-8" },
  //   body: JSON.stringify({
  //     data: response.body,
  //     message: "안녕하세요",
  //   }),
  // });
}
