import { ApiRequest } from "../core";

type LambdaHandler = (apiRequest: ApiRequest) => any;

export function withLambdaHandler(event: any) {
  const apiRequest = new ApiRequest(event);

  return function (handler: LambdaHandler) {
    return handler(apiRequest);
  };
}
