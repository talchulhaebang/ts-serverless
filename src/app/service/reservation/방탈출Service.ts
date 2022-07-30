import { SolverGundae방탈출Service } from "./solver-gundae/SolverGundae방탈출Service";
import { REGION } from "../../constant";
import { ScrapingError } from "../../../core/error/ScrapingError";

export interface I방탈출Service {
  getRoomInfo(): any;
  getReservationInfoByDate(yyyyMMdd: string): any;
}
export class 방탈출ServiceFactory {
  static getService(code: string) {
    if (code === REGION.SOLVER_GUNDAE) {
      return SolverGundae방탈출Service.create();
    }

    throw new ScrapingError({
      statusCode: 500,
      message: `Invalid Region : ${code}`,
      errorCode: "INVALID_REGION",
    });
  }
}
