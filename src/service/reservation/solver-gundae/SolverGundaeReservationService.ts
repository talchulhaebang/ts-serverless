import { createCommonHttpTemplate, HttpTemplate } from "@mipong/utils/http";
import { IReservationService } from "../ReservationService";
import { ReservationInfoRequester } from "./requester/ReservationInfoRequester";

export class SolverGundaeReservationService implements IReservationService {
  constructor(
    private gundae1ReservationInfoRequester: ReservationInfoRequester
  ) {}

  static create(httpTemplate = createCommonHttpTemplate()) {
    const gundae1ReservationInfoRequester = new ReservationInfoRequester(
      httpTemplate
    );

    return new this(gundae1ReservationInfoRequester);
  }

  async getRoomInfoByDate(yyyyMMdd: string) {
    return Promise.all(
      ["1", "2"].map((지점) =>
        this.gundae1ReservationInfoRequester.execute(지점, yyyyMMdd)
      )
    );
  }
}
