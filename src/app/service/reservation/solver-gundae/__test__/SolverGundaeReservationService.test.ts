import { encodeEucKrUri } from "../../../../../core/util/encodeURI";
import { SolverGundae방탈출Service } from "../SolverGundae방탈출Service";

describe("SolverGundaeReservationService TEST", () => {
  const service = SolverGundae방탈출Service.create();

  it("SolverGundaeReservationService e2e TEST", async () => {
    const result = encodeEucKrUri("평일");
    console.log(result);
  });
});
