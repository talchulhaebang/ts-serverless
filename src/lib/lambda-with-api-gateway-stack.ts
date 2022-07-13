import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import * as path from "path";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as apigw from "aws-cdk-lib/aws-apigateway";
import { HttpMethod } from "aws-cdk-lib/aws-events";
import { Integration, IntegrationType } from "aws-cdk-lib/aws-apigateway";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

type LambdaInfo = {
  lambda: NodejsFunction;
  methods: HttpMethod[];
};

export class LambdaWithApiGatewayStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    this.addLambdaToApiGateway({
      api: new apigw.RestApi(this, "MockApiGateWay", {}),
      lambdaInfos: [
        {
          lambda: new NodejsFunction(this, "MockLambdaHandler", {
            runtime: lambda.Runtime.NODEJS_16_X,
            entry: path.join(__dirname, `/../lambda/mock-lambda.ts`),
            handler: "handler",
          }),
          methods: [HttpMethod.GET, HttpMethod.POST],
        },
      ],
      resourceName: "mock",
    });

    this.addLambdaToApiGateway({
      api: new apigw.RestApi(this, "TalchulHaebangApiGateway", {}),
      lambdaInfos: [
        {
          lambda: new NodejsFunction(this, "ReservationInfoLambdaHandler", {
            runtime: lambda.Runtime.NODEJS_16_X,
            entry: path.join(
              __dirname,
              `/../lambda/reservation-info-lambda.ts`
            ),
            handler: "handler",
          }),
          methods: [HttpMethod.POST, HttpMethod.GET],
        },
      ],
      resourceName: "reservation",
    });

    // new NodejsFunction(this, "MockLambdaHandler", {
    //   runtime: lambda.Runtime.NODEJS_16_X,
    //   entry: path.join(__dirname, `/../lambda/mock-lambda.ts`),
    //   handler: "handler",
    // })

    // const mockLambda = ;

    // // const api = ;

    // const mockResource = api.root.addResource("mock");

    // mockResource.addMethod(
    //   HttpMethod.GET,
    //   new apigw.LambdaIntegration(mockLambda)
    // );

    // mockResource.addMethod(
    //   HttpMethod.POST,
    //   new apigw.LambdaIntegration(mockLambda)
    // );
  }

  private addLambdaToApiGateway(param: {
    api: apigw.RestApi;
    lambdaInfos: LambdaInfo[];
    // lambdas: NodejsFunction[];
    resourceName: string;
    // methods: HttpMethod[];
  }) {
    const { api, lambdaInfos, resourceName } = param;

    const resource = api.root.addResource(resourceName, {
      // defaultIntegration: new Integration({
      //   type: IntegrationType.,
      // }),
    });
    lambdaInfos.forEach((lambdaInfo) => {
      lambdaInfo.methods.forEach((method) => {
        resource.addMethod(
          method,
          new apigw.LambdaIntegration(lambdaInfo.lambda, {
            proxy: true,
          })
        );
      });
    });
  }
}
