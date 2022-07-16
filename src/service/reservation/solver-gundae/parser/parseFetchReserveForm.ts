import { extractForm } from "../../../../util/extractForm";
import { ReserveForm } from "../../../../type/solver-gundae";

export function parseFetchReserveForm(html: string): ReserveForm {
  return extractForm<ReserveForm>(html, ['<FORM name="SMSFORM">'], "</form>");
}
