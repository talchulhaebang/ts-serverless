import { createCommonHttpTemplate } from "@mipong/utils/http";
import { pipeWith, tryCatch } from "ramda";
import { MockController } from "../../../controller/MockController";
import { ApiRequest } from "../../core";
import { BadRequestScrapingError } from "../../error/BadRequestScrapingError";
import { ApiResponse } from "../../type/ApiResponse";
import { withLambdaHandler } from "../../util";
import { handleErrorResponse } from "../../util/handleErrorResponse";
import { handleSuccessJsonResponse } from "../../util/handleSuccessJsonResponse";
import { then } from "../../util/then";
import { withTryCatch } from "../../util/withTryCatch";

export const handler = withTryCatch(
  pipeWith(then, [
    // Lambda Handler 형태로 변환
    withLambdaHandler,
    // 실질적인 비즈니스 로직 수행
    new MockController().execute,
    // JSON 형태로 반환
    handleSuccessJsonResponse,
  ]),
  handleErrorResponse
);
