import { ApiSuccessResponse } from "../type/ApiResponse";
import { toResponse } from "./toResponse";

export function handleSuccessPlainTextResponse(result: string) {
  return toResponse({
    statusCode: 200,
    headers: {
      "Content-Type": "text/plain;charset=UTF-8",
    },
    body: result,
  });
}
