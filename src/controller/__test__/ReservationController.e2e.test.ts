import { HttpMethod } from "aws-cdk-lib/aws-events";
import { ApiRequest } from "../../core";

function createMockRequest(request: {
  headers: Record<string, any>;
  httpMethod: HttpMethod;
  body: string | Record<string, any>;
  queryStringParameters: Record<string, any>;
  pathParameters: Record<string, any>;
}) {
  const { body } = request;
  if (typeof body === "object") {
    return new ApiRequest({
      ...request,
      body: JSON.stringify(body),
    });
  }
  return new ApiRequest(request);
}

describe("ReservationController TEST", () => {
  it("예약 저보를 ");
});
