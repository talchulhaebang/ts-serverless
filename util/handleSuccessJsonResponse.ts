import { ApiSuccessResponse } from "../type/ApiResponse";
import { toResponse } from "./toResponse";

export function handleSuccessJsonResponse<T>(result: T) {
  return toResponse<ApiSuccessResponse<T>>({
    statusCode: 200,
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify(result),
  });
}
