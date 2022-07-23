import { SolverGundaeReservationService } from "./solver-gundae/SolverGundaeReservationService";
import { REGION } from "../../constant";
import { ScrapingError } from "../../../core/error/ScrapingError";

export interface IReservationService {
  getRoomInfoByDate(yyyyMMdd: string): any;
}
export class ReservationServiceFactory {
  static getService(code: string) {
    if (code === REGION.SOLVER_GUNDAE) {
      return SolverGundaeReservationService.create();
    }

    throw new ScrapingError({
      statusCode: 500,
      message: `Invalid Region : ${code}`,
      errorCode: "INVALID_REGION",
    });
  }
}
