import { HttpRequest } from "@mipong/utils/http";
import { ApiRequest } from "../core";
import { ReservationServiceFactory } from "../service/reservation/ReservationService";

type GetRoomInfoByCodePayload = {
  date: string;
};
type ReserveRoomPayload = {
  officeCode: string;
  roomCode: string;
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

  async reserve(request: ApiRequest) {
    const payload = request.parseJsonBody<ReserveRoomPayload>();
    const reservationService = ReservationServiceFactory.getService("");

    console.log(`payload !`);
    console.log(payload);
  }
}
