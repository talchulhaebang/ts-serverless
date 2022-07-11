import { ScrapingError } from "./ScrapingError";

export class BadRequestScrapingError extends ScrapingError {
  constructor(message: string) {
    super({
      statusCode: 400,
      message,
      errorCode: "BAD_REQUEST",
    });
  }
}
