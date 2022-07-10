import { createCommonHttpTemplate } from "@mipong/utils/http";

export const handler = async function (event: any) {
  console.log("request:", JSON.stringify(event, undefined, 2));

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
};

export const toResponse = ({
  statusCode,
  headers,
  body,
}: {
  statusCode: number;
  headers: Record<string, any>;
  body: string;
}) => ({
  statusCode,
  headers,
  body,
});
