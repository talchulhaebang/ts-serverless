import { ApiRequest } from "../core";
import { ReservationServiceFactory } from "../service/reservation/ReservationService";
import { ReserveRoomPayload } from "../type/RserveRoomPayload";

type GetRoomInfoByCodePayload = {
  date: string;
};

export class ReservationController {
  async getRoomInfoByCode(request: ApiRequest) {
    console.log(`REQUEST`);
    console.log(request);
    const reservationService = ReservationServiceFactory.getService("");

    const result = await reservationService.getRoomInfoByDate(
      request.queryStringParameters.date
    );

    console.log(`result !`);
    console.log(result);

    return result;
  }

  async reserve(request: ApiRequest) {
    const params = request.parseJsonBody<ReserveRoomPayload>();
    const reservationService = ReservationServiceFactory.getService("");

    console.log(`payload !`);
    console.log(params);

    const result = await reservationService.reserve(params);
  }
}
