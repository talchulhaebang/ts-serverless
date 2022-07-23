import { encodeEucKrUri } from "../../../../../core/util/encodeURI";
import { SolverGundaeReservationService } from "../SolverGundaeReservationService";

describe("SolverGundaeReservationService TEST", () => {
  const service = SolverGundaeReservationService.create();

  it("SolverGundaeReservationService e2e TEST", async () => {
    const result = encodeEucKrUri("평일");
    console.log(result);
  });
});
