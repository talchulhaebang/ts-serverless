import { createCommonHttpTemplate, HttpTemplate } from "@mipong/utils/http";
import { ReserveRoomPayload } from "../../../controller/ReservationController";
import { IReservationService } from "../ReservationService";
import { FetchReserveFormRequester } from "./requester/FetchReserveFormRequester";
import { ReservationInfoRequester } from "./requester/ReservationInfoRequester";

export class SolverGundaeReservationService implements IReservationService {
  constructor(
    private reservationInfoRequester: ReservationInfoRequester,
    private fetchReserveFormRequester: FetchReserveFormRequester
  ) {}

  static create(httpTemplate = createCommonHttpTemplate()) {
    const reservationInfoRequester = new ReservationInfoRequester(httpTemplate);
    const fetchReserveFormRequester = new FetchReserveFormRequester(
      httpTemplate
    );

    return new this(reservationInfoRequester, fetchReserveFormRequester);
  }

  async getRoomInfoByDate(yyyyMMdd: string) {
    return Promise.all(
      ["1", "2"].map((지점) =>
        this.reservationInfoRequester.execute(지점, yyyyMMdd)
      )
    );
  }

  async reserve(params: ReserveRoomPayload) {
    await this.fetchReserveFormRequester.execute(params);
  }
}
