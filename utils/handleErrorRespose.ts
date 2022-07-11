import { toResponse } from "./toResponse";

export async function handleErrorResponse(e: Error) {
  return toResponse({
    statusCode: 500,
    body: e.message,
  });
}
