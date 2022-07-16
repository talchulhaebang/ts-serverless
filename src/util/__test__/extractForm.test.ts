import fs from "fs";
import { extractForm } from "../extractForm";
describe("extractForm TEST", () => {
  it("form 에서 정상적으로 input 값들을 파싱해야 한다", async () => {
    const html = fs.readFileSync(`${__dirname}/data/mock-form.txt`).toString();

    const parsed = extractForm(html, ['<FORM name="SMSFORM">'], "</form>");

    console.log(parsed);

    expect(parsed).toMatchInlineSnapshot(`
Object {
  "CHA": "on",
  "CHOIS_DATE": "2022-07-20",
  "HP1": "",
  "HP2": "",
  "HP3": "",
  "IDX": "5",
  "JIJEM_BANK": "",
  "JIJEM_CODE": "S1",
  "JIJEM_NAME": "건대1호점",
  "JIJEM_TEL": "",
  "P_CH": "현장결제",
  "ROOM_CODE": "C",
  "ROOM_NAME": "THE CAGE (케이지)",
  "ROOM_TIME": "13:40",
  "action": "go",
  "name": "",
  "smsType": "L",
  "sms_id": "knowbody88",
  "sms_in": "04d0ad3a5506752c596f853ec5a97699",
  "sphone1": "02",
  "sphone2": "498",
  "sphone3": "3737",
  "subject": "SOLVER",
}
`);
  });

  it("Form 을 정상적으로 파싱해야 한다", async () => {
    const html = fs.readFileSync(`${__dirname}/data/mock-form2.txt`).toString();
    const parsed = extractForm(html, ["<form id='frmSendsms'"], "</form>");

    expect(parsed).toMatchInlineSnapshot(`
Object {
  "CHOIS": "",
  "destination": "",
  "encoderurl": "Y",
  "lang": "asp",
  "mode": "MQ==",
  "msg": "KlNPTFZFUiogWyCx6MjxwOcgXbTUIDIwMjItMDctMjDAzyBbIFRIRSBDQUdFICjEycDMwfYpXSAxMzo0MMW4wNMyuO0gv7m+4L/Pt+Eu",
  "nointeractive": "",
  "rdate": "",
  "repeatFlag": "",
  "repeatNum": "",
  "repeatTime": "",
  "reserveTime": "",
  "returnurl": "",
  "rphone": "MDEwLTg5MTQtMDg4Ng==",
  "rtime": "",
  "secure": "MDRkMGFkM2E1NTA2NzUyYzU5NmY4NTNlYzVhOTc2OTk=",
  "sendurl": "http://solver-gd.com/sub/03_3.html",
  "smsType": "TA==",
  "sphone1": "MDI=",
  "sphone2": "NDk4",
  "sphone3": "MzczNw==",
  "subject": "U09MVkVS",
  "testflag": "",
  "user_id": "a25vd2JvZHk4OA==",
}
`);
  });
});
