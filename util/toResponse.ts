import { ApiResponse } from "../type/ApiResponse";

export const toResponse = <T>({
  statusCode = 200,
  headers = {
    "Content-Type": "application/json;charset=UTF-8",
  },
  body,
}: {
  statusCode?: number;
  headers?: Record<string, any>;
  body: string | ApiResponse<T>;
}) => ({
  statusCode,
  headers,
  body: JSON.stringify(body),
});
