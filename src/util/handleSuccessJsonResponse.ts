import { ApiSuccessResponse } from "../type/ApiResponse";
import { toResponse } from "./toResponse";

export function handleSuccessJsonResponse<T>(result: T) {
  const successResponse: ApiSuccessResponse<T> = {
    success: true,
    data: result,
  };
  return toResponse({
    statusCode: 200,
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify(successResponse),
  });
}
