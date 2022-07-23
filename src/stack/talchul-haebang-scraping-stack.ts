import { Stack, StackProps } from "aws-cdk-lib";
import * as ApiGw from "aws-cdk-lib/aws-apigateway";
import { Construct } from "constructs";
import { ApiGatewayWithLambda } from "../core/type/ApiGatewayWithLambda";
import { LambdaWithApiGatewayStack } from "../core/iac/lambda-with-api-gateway";
import { S3 } from "../core/iac/s3";
import { S3WithApiGateway } from "../core/iac/s3-with-api-gateway";
import * as apigw from "aws-cdk-lib/aws-apigateway";
import { CORS_ORIGINS } from "../core/constant/cors";

export class TalchulHaebangScrapingStack extends Stack {
  constructor(
    scope: Construct,
    id: string,
    lambdaIntegrations: ApiGatewayWithLambda[],
    props?: StackProps
  ) {
    super(scope, id, props);

    const apiGateway = new apigw.RestApi(this, "TalchulHaebangApiGateway", {
      defaultCorsPreflightOptions: {
        allowOrigins: CORS_ORIGINS,
        allowMethods: apigw.Cors.ALL_METHODS,
      },
    });

    const lambdaWithApiGateway = new LambdaWithApiGatewayStack(
      this,
      apiGateway,
      lambdaIntegrations
    );

    this.addSwagger(apiGateway);
  }

  private addSwagger(api: ApiGw.RestApi) {
    const s3Bucket = new S3(this, "talchulhaebang-swagger", {
      websiteIndexDocument: "index.html",
      publicReadAccess: true,
    });
    s3Bucket.deployDirectory(
      `${__dirname}/s3/swagger`,
      "DeployTalchulHaebangSwagger"
    );
    const s3WithApiGateway = new S3WithApiGateway({
      scope: this,
      s3: s3Bucket,
      roleName: `apigw-s3-readonly-role-talchulhaebang-swagger`,
      apiGateway: api,
      path: "swagger",
    });
  }
}
