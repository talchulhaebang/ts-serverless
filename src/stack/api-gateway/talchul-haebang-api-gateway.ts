import * as apigw from "aws-cdk-lib/aws-apigateway";
import { CORS_ORIGINS } from "../../core/constant/cors";
import { Construct } from "constructs";
import { ApiGateway } from "../../core/iac/api-gateway";

function talchulHaebangApiGatewayFactory() {
  let apiGateway: apigw.RestApi | undefined = undefined;

  return function (scope: Construct) {
    if (!apiGateway) {
      apiGateway = new ApiGateway(scope, "TalchulHaebangApiGateway").instance;
    }
    return apiGateway;
  };
}

export const getOrCreateTalchulHaebangApiGateway = talchulHaebangApiGatewayFactory();
