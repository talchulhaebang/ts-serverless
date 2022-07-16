import { ScrapingError } from "./ScrapingError";

export class ParseError extends ScrapingError {
  constructor(message = "스크래핑 파싱 과정에서 에러가 발생하였습니다") {
    super({
      statusCode: 500,
      message,
      errorCode: "PARSE_ERROR",
    });
  }
}
