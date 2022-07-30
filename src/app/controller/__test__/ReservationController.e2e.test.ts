
import { HttpMethod } from "aws-cdk-lib/aws-events";
import { ApiRequest } from "../../../core/type/ApiRequest";
import { 방탈출Controller } from "../방탈출Controller";

function createMockRequest({
  headers = {},
  httpMethod = HttpMethod.GET,
  body = "{}",
  queryStringParameters = {},
  pathParameters = {},
}: {
  headers?: Record<string, any>;
  httpMethod?: HttpMethod;
  body?: string | Record<string, any>;
  queryStringParameters?: Record<string, any>;
  pathParameters?: Record<string, any>;
}) {
  body = typeof body === "string" ? body : JSON.stringify(body);

  return new ApiRequest({
    headers,
    httpMethod,
    body,
    queryStringParameters,
    pathParameters,
  });
}

describe("ReservationController TEST", () => {
  const controller = new 방탈출Controller();

  it("방 정보를 잘 불러와야 한다", async () => {
    const request = createMockRequest({
      httpMethod: HttpMethod.GET,
    });
    const result = await controller.getRoomInfo(request);

    console.log(result);
  })

  it("예약 가능 정보를 잘 불러와야 한다", async () => {
    const request = createMockRequest({
      httpMethod: HttpMethod.GET,
      queryStringParameters: {
        date: "2022-07-30",
      },
    });
    const result = await controller.getReservationInfoByCode(request);

    console.log("====================================");
    console.log(JSON.stringify(result));
    console.log("====================================");
  });
  it("건대 솔버 방탈출 카페를 성공적으로 예약해야 한다", async () => {
    const request = createMockRequest({
      httpMethod: HttpMethod.POST,
      body: {
        // 1호점 : S1 , 2호점 : S2
        officeCode: "S2",
        roomCode: "A",
        date: "2022-07-29",
        time: "18:00",
        username: "김희재",
        phone: "01089140886",
        playerSize: "2",
      },
    });
    const result = await controller.reserve(request);

    console.log("====================================");
    console.log(result);
    console.log("====================================");
  });
});
