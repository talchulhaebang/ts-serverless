import { pipeWith } from "ramda";
import { 방탈출Controller } from "../../app/controller/방탈출Controller";
import { convertEventToHttpRequest } from "../../core/util";
import { createAsyncContext } from "../../core/util/createAsyncContext";
import { handleErrorResponse } from "../../core/util/handleErrorResponse";
import { handleSuccessJsonResponse } from "../../core/util/handleSuccessJsonResponse";
import { then } from "../../core/util/then";
import { withTryCatch } from "../../core/util/withTryCatch";
import { ApiGatewayWithLambda } from "../../core/type/ApiGatewayWithLambda";
import { HttpMethod } from "aws-cdk-lib/aws-events";

export const handler = withTryCatch(
  pipeWith(then, [
    createAsyncContext,
    // Lambda Handler 형태로 변환
    convertEventToHttpRequest,
    // 실질적인 비즈니스 로직 수행
    new 방탈출Controller().getRoomInfo,
    // JSON 형태로 반환
    handleSuccessJsonResponse,
  ]),
  handleErrorResponse
);

export const apiGatewayWithLambda_GetRoomInfo: ApiGatewayWithLambda = {
  lambda: {
    name: "GetRoomInfoLambdaHandler",
    option: {
      entry: __filename,
    },
  },
  path: "room",
  methods: [HttpMethod.GET],
};
