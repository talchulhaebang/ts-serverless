import { ApiRequest } from "../core";
import { ReservationServiceFactory } from "../service/reservation/ReservationService";

type GetRoomInfoByCodePayload = {
  date: string;
};

export class ReservationController {
  async getRoomInfoByCode(request: ApiRequest) {
    console.log(`REQUEST`);
    console.log(request);
    const payload = request.parseJsonBody<GetRoomInfoByCodePayload>();
    const reservationService = ReservationServiceFactory.getService("");

    console.log(`payload !`);
    console.log(payload);

    const result = await reservationService.getRoomInfoByDate(
      payload?.date ?? request.queryStringParameters.date
    );

    console.log(`result !`);
    console.log(result);

    return result;
  }
}
