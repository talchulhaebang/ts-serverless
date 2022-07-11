import { ScrapingError } from "../error/ScrapingError";
import { ApiFailResponse } from "../type/ApiResponse";
import { toResponse } from "./toResponse";

export async function handleErrorResponse(e: Error) {
  if (e instanceof ScrapingError) {
    return toResponse<ApiFailResponse>({
      statusCode: e.statusCode,
      body: {
        success: false,
        error: {
          errorCode: e.errorCode,
          errorMessage: e.message,
        },
      },
    });
  }
  throw e;
}
