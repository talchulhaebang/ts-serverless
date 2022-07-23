import { Stack, StackProps } from "aws-cdk-lib";
import * as ApiGw from "aws-cdk-lib/aws-apigateway";
import { Construct } from "constructs";
import { ApiGatewayWithLambda } from "../core/type/ApiGatewayWithLambda";
import { getOrCreateTalchulHaebangApiGateway } from "./api-gateway/talchul-haebang-api-gateway";
import { LambdaWithApiGatewayStack } from "../core/iac/lambda-with-api-gateway";
import { S3 } from "../core/iac/s3";
import { S3WithApiGateway } from "../core/iac/s3-with-api-gateway";

export class TalchulHaebangScrapingStack extends LambdaWithApiGatewayStack {
  constructor(
    scope: Construct,
    id: string,
    resources: ApiGatewayWithLambda[],
    props?: StackProps
  ) {
    super(scope, id, resources, props);

    // const lambdaWithApiGateway = new LambdaWithApiGatewayStack(
    //   scope,
    //   resources
    // );

    this.addSwagger(getOrCreateTalchulHaebangApiGateway(this));
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
