import { createCommonHttpTemplate } from "@mipong/utils/http";

export const handler = async function (event: any) {
  console.log("request:", JSON.stringify(event, undefined, 2));

  const httpTemplate = createCommonHttpTemplate();

  const response = await httpTemplate.get("https://www.naver.com");

  return {
    statusCode: 200,
    headers: { "Content-Type": "text/plain" },
    body: response.body,
  };
};
