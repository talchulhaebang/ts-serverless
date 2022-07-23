import { pipeWith } from "ramda";
import { ReservationController } from "../../app/controller/ReservationController";
import { convertEventToHttpRequest } from "../../core/util";
import { createAsyncContext } from "../../core/util/createAsyncContext";
import { handleErrorResponse } from "../../core/util/handleErrorResponse";
import { handleSuccessJsonResponse } from "../../core/util/handleSuccessJsonResponse";
import { then } from "../../core/util/then";
import { withTryCatch } from "../../core/util/withTryCatch";
import { ApiGatewayWithLambda } from "../../core/type/ApiGatewayWithLambda";
import { HttpMethod } from "aws-cdk-lib/aws-events";
import { getOrCreateTalchulHaebangApiGateway } from "../api-gateway/talchul-haebang-api-gateway";

export const handler = withTryCatch(
  pipeWith(then, [
    createAsyncContext,
    // Lambda Handler 형태로 변환
    convertEventToHttpRequest,
    // 실질적인 비즈니스 로직 수행
    new ReservationController().getRoomInfoByCode,
    // JSON 형태로 반환
    handleSuccessJsonResponse,
  ]),
  handleErrorResponse
);

export const apiGatewayWithLambda_ReservationInfo: ApiGatewayWithLambda = {
  apiGatewayFactory: getOrCreateTalchulHaebangApiGateway,
  lambda: {
    name: "ReservationInfoLambdaHandler",
    option: {
      entry: __filename,
    },
  },
  path: "reservation",
  methods: [HttpMethod.GET],
};
