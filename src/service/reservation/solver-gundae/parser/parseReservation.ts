import { extractForm } from "../../../../util/extractForm";

export function parseReservation(html: string) {
  return extractForm(html, ["<form id='frmSendsms'"], "</form>");
}
