import { SolverGundaeReservationService } from "./solver-gundae/SolverGundaeReservationService";

export interface IReservationService {
  getRoomInfoByDate(yyyyMMdd: string): any;
}
export class ReservationServiceFactory {
  static getService(code: string) {
    return SolverGundaeReservationService.create();
  }
}
