import { ParseError } from "../../../../error/ParseError";
import { extractForm } from "../../../../util/extractForm";

export function parseReservation(html: string) {
  if (!html.includes("<form id='frmSendsms'")) {
    throw new ParseError();
  }

  return extractForm(html, ["<form id='frmSendsms'"], "</form>");
}
