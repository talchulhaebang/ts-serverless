import { toResponse } from "./toResponse";

export function handleSuccessJsonResponse(result: any) {
  return toResponse({
    statusCode: 200,
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify(result),
  });
}
