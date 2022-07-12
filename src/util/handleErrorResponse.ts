import { ScrapingError } from "../error/ScrapingError";
import { ApiFailResponse } from "../type/ApiResponse";
import { toResponse } from "./toResponse";

export function handleErrorResponse(e: Error) {
  if (e instanceof ScrapingError) {
    const failResponse: ApiFailResponse = {
      success: false,
      error: {
        errorCode: e.errorCode,
        errorMessage: e.message,
      },
    };
    return toResponse({
      statusCode: e.statusCode,
      body: JSON.stringify(failResponse),
    });
  }
  throw e;
}
