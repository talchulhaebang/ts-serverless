import { pipeWith, tap } from "ramda";
import { MockController } from "../controller/MockController";
import { convertEventToHttpRequest } from "../util";
import { handleErrorResponse } from "../util/handleErrorResponse";
import { handleSuccessJsonResponse } from "../util/handleSuccessJsonResponse";
import { then } from "../util/then";
import { withTryCatch } from "../util/withTryCatch";

export const handler = withTryCatch(
  pipeWith(then, [
    tap(console.log),
    // Lambda Handler 형태로 변환
    convertEventToHttpRequest,
    // 실질적인 비즈니스 로직 수행
    new MockController().execute,
    // JSON 형태로 반환
    handleSuccessJsonResponse,
  ]),
  handleErrorResponse
);
