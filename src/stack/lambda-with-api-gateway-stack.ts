import { Duration, Stack, StackProps } from "aws-cdk-lib";
import * as apigw from "aws-cdk-lib/aws-apigateway";
import { HttpMethod } from "aws-cdk-lib/aws-events";
import * as lambda from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import * as path from "path";
import { CORS_ORIGINS } from "../constant/cors";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

type LambdaInfo = {
  lambda: NodejsFunction;
  methods: HttpMethod[];
};

export class LambdaWithApiGatewayStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const talchulHaebangApiGateway = new apigw.RestApi(
      this,
      "TalchulHaebangApiGateway",
      {
        defaultCorsPreflightOptions: {
          allowOrigins: CORS_ORIGINS,
          allowMethods: apigw.Cors.ALL_METHODS, // this is also the default
        },
      }
    );

    this.addLambdaToApiGateway({
      api: talchulHaebangApiGateway,
      lambdaInfos: [
        {
          lambda: new NodejsFunction(this, "ReservationInfoLambdaHandler", {
            runtime: lambda.Runtime.NODEJS_16_X,
            entry: path.join(
              __dirname,
              `/../lambda/reservation-info-lambda.ts`
            ),
            handler: "handler",
            timeout: Duration.minutes(14),
          }),
          methods: [HttpMethod.GET],
        },
        {
          lambda: new NodejsFunction(this, "ReservationLambdaHandler", {
            runtime: lambda.Runtime.NODEJS_16_X,
            entry: path.join(__dirname, `/../lambda/reservation-lambda.ts`),
            handler: "handler",
            timeout: Duration.minutes(14),
          }),
          methods: [HttpMethod.POST],
        },
      ],
      resourceName: "reservation",
    });
  }

  private addLambdaToApiGateway(param: {
    api: apigw.RestApi;
    lambdaInfos: LambdaInfo[];
    resourceName: string;
  }) {
    const { api, lambdaInfos, resourceName } = param;

    const resource = api.root.addResource(resourceName, {});
    lambdaInfos.forEach((lambdaInfo) => {
      lambdaInfo.methods.forEach((method) => {
        resource.addMethod(
          method,
          new apigw.LambdaIntegration(lambdaInfo.lambda, {
            proxy: true,
            timeout: Duration.seconds(29),
          })
        );
      });
    });
  }
}
