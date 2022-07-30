import { ApiRequest } from "../../core/type/ApiRequest";
import { 방탈출ServiceFactory } from "../service/reservation/방탈출Service";
import { ReserveRoomPayload } from "../../core/type/ReserveRoomPayload";
import { REGION } from "../constant";

type GetRoomInfoByCodePayload = {
  date: string;
};

export class 방탈출Controller {

  async getRoomInfo(request: ApiRequest) {
    const region = request.queryStringParameters.region ?? REGION.SOLVER_GUNDAE;
    const reservationService = 방탈출ServiceFactory.getService(region);

    return await reservationService.getRoomInfo();
  }

  async getReservationInfoByCode(request: ApiRequest) {
    console.log(`REQUEST`);
    console.log(request);

    const region = request.queryStringParameters.region ?? REGION.SOLVER_GUNDAE;

    const reservationService = 방탈출ServiceFactory.getService(region);

    const result = await reservationService.getReservationInfoByDate(
      request.queryStringParameters.date
    );

    console.log(`result !`);
    console.log(result);

    return result;
  }

  async reserve(request: ApiRequest) {
    const params = request.parseJsonBody<ReserveRoomPayload>();
    const reservationService = 방탈출ServiceFactory.getService("");

    console.log(`payload !`);
    console.log(params);

    const result = await reservationService.reserve(params);
  }
}
