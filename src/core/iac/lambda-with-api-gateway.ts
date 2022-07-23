import { Duration, Stack, StackProps } from "aws-cdk-lib";
import * as apigw from "aws-cdk-lib/aws-apigateway";
import * as Lambda from "aws-cdk-lib/aws-lambda";
import * as Iam from "aws-cdk-lib/aws-iam";
import * as S3 from "aws-cdk-lib/aws-s3";
import * as S3Deploy from "aws-cdk-lib/aws-s3-deployment";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import { ApiGatewayWithLambda } from "../type/ApiGatewayWithLambda";

export class LambdaWithApiGatewayStack {
  constructor(private stack: Stack, resources: ApiGatewayWithLambda[]) {
    this.addLambdaToApiGateway(resources);
  }

  private addLambdaToApiGateway(apiGatewayWithLambdas: ApiGatewayWithLambda[]) {
    apiGatewayWithLambdas.forEach((apiGatewayWithLambda) => {
      const { apiGatewayFactory, lambda, path, methods } = apiGatewayWithLambda;
      const apiGateway = apiGatewayFactory(this.stack);
      const nodejsFunction = new NodejsFunction(this.stack, lambda.name, {
        runtime: Lambda.Runtime.NODEJS_16_X,
        handler: "handler",
        timeout: Duration.minutes(14),
        ...lambda.option,
      });

      let resource = apiGateway.root.getResource(path);
      if (!resource) {
        resource = apiGateway.root.addResource(path, {});
      }
      methods.forEach((method) => {
        resource!.addMethod(
          method,
          new apigw.LambdaIntegration(nodejsFunction)
        );
      });
    });
  }
}
