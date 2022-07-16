import { createCommonHttpTemplate, HttpTemplate } from "@mipong/utils/http";
import { ReserveRoomPayload } from "../../../type/RserveRoomPayload";
import { IReservationService } from "../ReservationService";
import { FetchReserveFormRequester } from "./requester/FetchReserveFormRequester";
import { ReservationInfoRequester } from "./requester/ReservationInfoRequester";
import { ReservationRequester } from "./requester/ReservationRequester";
import { SendSmsRequester } from "./requester/SendSmsRequester";

export class SolverGundaeReservationService implements IReservationService {
  constructor(
    private reservationInfoRequester: ReservationInfoRequester,
    private fetchReserveFormRequester: FetchReserveFormRequester,
    private reservationRequester: ReservationRequester,
    private sendSmsRequester: SendSmsRequester
  ) {}

  static create(httpTemplate = createCommonHttpTemplate()) {
    const reservationInfoRequester = new ReservationInfoRequester(httpTemplate);
    const fetchReserveFormRequester = new FetchReserveFormRequester(
      httpTemplate
    );
    const reservationRequester = new ReservationRequester(httpTemplate);
    const sendSmsRequester = new SendSmsRequester(httpTemplate);

    return new this(
      reservationInfoRequester,
      fetchReserveFormRequester,
      reservationRequester,
      sendSmsRequester
    );
  }

  async getRoomInfoByDate(yyyyMMdd: string) {
    return Promise.all(
      ["1", "2"].map((지점) =>
        this.reservationInfoRequester.execute(지점, yyyyMMdd)
      )
    );
  }

  async reserve(params: ReserveRoomPayload) {
    const reservationForm = await this.fetchReserveFormRequester.execute(
      params
    );
    const smsForm = await this.reservationRequester.execute(
      reservationForm,
      params
    );

    const result = await this.sendSmsRequester.execute(smsForm);

    console.log(`result !!`);
    console.log(result);
  }
}
