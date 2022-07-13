import { SolverGundaeReservationService } from "../SolverGundaeReservationService";

describe("SolverGundaeReservationService TEST", () => {
  const service = SolverGundaeReservationService.create();

  it("SolverGundaeReservationService e2e TEST", async () => {
    await service.getRoomInfoByDate("2022-07-14");
  });
});
