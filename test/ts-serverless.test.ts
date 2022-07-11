// import * as cdk from 'aws-cdk-lib';
// import { Template } from 'aws-cdk-lib/assertions';
// import * as TsServerless from '../lib/ts-serverless-stack';
import { Result } from "aws-cdk-lib/aws-stepfunctions";
import R, { tryCatch } from "ramda";

it("tryCatch", () => {
  const result = R.pipe(
    process1,
    tryCatch(
      () => {
        throw new Error("ABCD");
      },
      (e: Error) => e.message
    ),
    process1
  )("STRING");
  console.log(result);
});
test("SQS Queue Created", async () => {
  //   const app = new cdk.App();
  //     // WHEN
  //   const stack = new TsServerless.TsServerlessStack(app, 'MyTestStack');
  //     // THEN
  //   const template = Template.fromStack(stack);
  //   template.hasResourceProperties('AWS::SQS::Queue', {
  //     VisibilityTimeout: 300
  //   });
  const result = await R.pipeWith(andThen, [process1, process2, process3])(
    "STRING"
  );
  console.log("!!!!!!");
  console.log(result);
});

function andThen(fn: any, res: any) {
  return isPromise(res) ? res.then(fn) : fn(res);
}

export function isPromise(target: any): target is Promise<any> {
  return (
    target instanceof Promise ||
    (typeof target?.then === "function" && typeof target?.catch === "function")
  );
}

function process1(str: string) {
  return str;
}
async function process2(str: string) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(str);
    }, 2000);
  });
}
function process3(str: string) {
  return `${str} TEST`;
}
