import { extractForm } from "../../../../../core/util/extractForm";
import { ReserveForm } from "../../../../../core/type/solver-gundae";

export function parseFetchReserveForm(html: string): ReserveForm {
  return extractForm<ReserveForm>(html, ['<FORM name="SMSFORM">'], "</form>");
}
