import { createCommonHttpTemplate, HttpTemplate } from "@mipong/utils/http";
import { IReservationService } from "../ReservationService";
import { Gundae1ReservationInfoRequester } from "./requester/Gundae1ReservationInfoRequester";

export class SolverGundaeReservationService implements IReservationService {
  constructor(
    private gundae1ReservationInfoRequester: Gundae1ReservationInfoRequester
  ) {}

  static create(httpTemplate = createCommonHttpTemplate()) {
    const gundae1ReservationInfoRequester = new Gundae1ReservationInfoRequester(
      httpTemplate
    );

    return new this(gundae1ReservationInfoRequester);
  }

  async getRoomInfoByDate(yyyyMMdd: string) {
    return await this.gundae1ReservationInfoRequester.execute(yyyyMMdd);
  }
}
