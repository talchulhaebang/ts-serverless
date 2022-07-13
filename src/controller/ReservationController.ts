import { ApiRequest } from "../core";
import { ReservationServiceFactory } from "../service/reservation/ReservationService";

export class ReservationController {
  async getRoomInfoByCode(request: ApiRequest) {
    console.log(`REQUEST`);
    console.log(request);
    const payload = request.parseJsonBody();
    const reservationService = ReservationServiceFactory.getService("");

    console.log(`payload !`);
    console.log(payload);
    const result = await reservationService.getRoomInfoByDate(payload.date);

    console.log(`result !`);
    console.log(result);
  }
}
