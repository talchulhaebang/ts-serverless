import { Duration, Stack, StackProps } from "aws-cdk-lib";
import * as apigw from "aws-cdk-lib/aws-apigateway";
import { HttpMethod } from "aws-cdk-lib/aws-events";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as iam from "aws-cdk-lib/aws-iam";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as s3Deploy from "aws-cdk-lib/aws-s3-deployment";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import * as path from "path";
import { CORS_ORIGINS } from "../core/constant/cors";
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
              `./lambda/reservation-info-lambda.ts`
            ),
            handler: "handler",
            timeout: Duration.minutes(14),
          }),
          methods: [HttpMethod.GET],
        },
        {
          lambda: new NodejsFunction(this, "ReservationLambdaHandler", {
            runtime: lambda.Runtime.NODEJS_16_X,
            entry: path.join(__dirname, `./lambda/reservation-lambda.ts`),
            handler: "handler",
            timeout: Duration.minutes(14),
          }),
          methods: [HttpMethod.POST],
        },
      ],
      resourceName: "reservation",
    });

    this.addSwagger(talchulHaebangApiGateway);
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

  private addSwagger(api: apigw.RestApi) {
    const role = new iam.Role(this, "apigw-s3-readonly-role", {
      roleName: "ApiGw-S3-ReadOnly",
      assumedBy: new iam.ServicePrincipal("apigateway.amazonaws.com"),
    });

    role.addToPolicy(
      new iam.PolicyStatement({
        resources: ["arn:aws:s3:::scraping-swagger.haebang.world/*"],
        actions: ["s3:GetObject"],
      })
    );
    const bucket = new s3.Bucket(this, "talchulahebang-swagger", {
      websiteIndexDocument: 'index.html',
      publicReadAccess: true,
    });
    new s3Deploy.BucketDeployment(this, "DeployFiles", {
      sources: [s3Deploy.Source.asset(`${__dirname}/s3/swagger`)],
      destinationBucket: bucket,
    });

    const swaggerResource = api.root.addResource("swagger");


    swaggerResource.addResource("{file}").addMethod(
      "GET",
      new apigw.AwsIntegration({
        service: "s3",
        integrationHttpMethod: "GET",
        path: `${bucket.bucketName}/{file}`,
        options: {
          credentialsRole: role,
          requestParameters: {
            "integration.request.path.file": "method.request.path.file",
          },
          integrationResponses: [
            {
              statusCode: "200",
              selectionPattern: "2..",
              responseParameters: {
                "method.response.header.Content-Type":
                  "integration.response.header.Content-Type",
              },
            },
            {
              statusCode: "403",
              selectionPattern: "4..",
            },
          ],
        },
      }),
      {
        requestParameters: {
          "method.request.path.file": true,
        },
        methodResponses: [
          {
            statusCode: "200",
            responseParameters: {
              "method.response.header.Content-Type": true,
            },
          },
          {
            statusCode: "404",
          },
        ],
      }
      // new apigw.AwsIntegration({
      //   service: "s3",
      //   action: "GetObject",
      //   actionParameters: {
      //     Bucket: "scraping-swagger.haebang.world",
      //     Key: "file",
      //   },
      // })
    );
  }
}
