import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import * as path from "path";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as apigw from "aws-cdk-lib/aws-apigateway";
import { HttpMethod } from "aws-cdk-lib/aws-events";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class LambdaWithApiGatewayStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const mockLambda = new NodejsFunction(this, "MockLambdaHandler", {
      runtime: lambda.Runtime.NODEJS_16_X,
      entry: path.join(__dirname, `/../service/lambda/mock-lambda.ts`),
      handler: "handler",
    });

    const api = new apigw.RestApi(this, "MockApiGateWay", {});

    api.root
      .addResource("mock")
      .addMethod(HttpMethod.POST, new apigw.LambdaIntegration(mockLambda));
  }
}
