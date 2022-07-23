import { StackProps } from "aws-cdk-lib";
import * as apigw from "aws-cdk-lib/aws-apigateway";
import * as Iam from "aws-cdk-lib/aws-iam";
import * as S3 from "aws-cdk-lib/aws-s3";
import * as S3Deploy from "aws-cdk-lib/aws-s3-deployment";
import { Construct } from "constructs";
import { ApiGatewayWithLambda } from "../core/type/ApiGatewayWithLambda";
import { getOrCreateTalchulHaebangApiGateway } from "./api-gateway/talchul-haebang-api-gateway";
import { LambdaWithApiGatewayStack } from "../core/iac/lambda-with-api-gateway";

export class TalchulHaebangScrapingStack extends LambdaWithApiGatewayStack {
  constructor(
    scope: Construct,
    id: string,
    resources: ApiGatewayWithLambda[],
    props?: StackProps
  ) {
    super(scope, id, resources, props);

    this.addSwagger(getOrCreateTalchulHaebangApiGateway(this));
  }

  private addSwagger(api: apigw.RestApi) {
    const role = new Iam.Role(this, "apigw-s3-readonly-role", {
      roleName: "ApiGw-S3-ReadOnly",
      assumedBy: new Iam.ServicePrincipal("apigateway.amazonaws.com"),
    });

    role.addToPolicy(
      new Iam.PolicyStatement({
        resources: ["arn:aws:s3:::scraping-swagger.haebang.world/*"],
        actions: ["s3:GetObject"],
      })
    );
    const bucket = new S3.Bucket(this, "talchulahebang-swagger", {
      websiteIndexDocument: "index.html",
      publicReadAccess: true,
    });
    new S3Deploy.BucketDeployment(this, "DeployFiles", {
      sources: [S3Deploy.Source.asset(`${__dirname}/s3/swagger`)],
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
    );
  }
}
