import { createCommonHttpTemplate } from "@mipong/utils/http";
import { pipe, tryCatch } from "ramda";
import { ApiRequest } from "../../core";
import { toResponse, withLambdaHandler } from "../../utils";

export const handler = pipe(
  withLambdaHandler,
  tryCatch(handleLambda, () => undefined)
);

async function handleLambda(apiRequest: ApiRequest) {
  console.log("request:", JSON.stringify(apiRequest, undefined, 2));

  const httpTemplate = createCommonHttpTemplate();

  const response = await httpTemplate.get("https://kim.heejae.info");
  console.log(response);

  return toResponse({
    statusCode: 200,
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    body: JSON.stringify({
      data: response.body,
      message: "안녕하세요",
    }),
  });
}
