import { ApiRequest } from "../core";

type LambdaHandler = (apiRequest: ApiRequest) => any;

export function withLambdaHandler(event: any, handler: LambdaHandler) {
  const apiRequest = new ApiRequest(event);

  return handler(apiRequest);
}
