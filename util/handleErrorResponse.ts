import { ScrapingError } from "../error/ScrapingError";
import { toResponse } from "./toResponse";

export function handleErrorResponse(e: Error) {
  if (e instanceof ScrapingError) {
    return toResponse({
      statusCode: e.statusCode,
      body: JSON.stringify({
        error: {
          errorCode: e.errorCode,
          errorMessage: e.message,
        },
      }),
    });
  }
  throw e;
}
