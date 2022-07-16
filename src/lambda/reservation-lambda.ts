import { pipeWith } from "ramda";
import { ReservationController } from "../controller/ReservationController";
import { convertEventToHttpRequest } from "../util";
import { createAsyncContext } from "../util/createAsyncContext";
import { handleErrorResponse } from "../util/handleErrorResponse";
import { handleSuccessJsonResponse } from "../util/handleSuccessJsonResponse";
import { then } from "../util/then";
import { withTryCatch } from "../util/withTryCatch";

export const handler = withTryCatch(
  pipeWith(then, [
    createAsyncContext,
    // Lambda Handler 형태로 변환
    convertEventToHttpRequest,
    // 실질적인 비즈니스 로직 수행
    new ReservationController().reserve,
    // JSON 형태로 반환
    handleSuccessJsonResponse,
  ]),
  handleErrorResponse
);
