import { Construct } from "constructs";
import * as apigw from "aws-cdk-lib/aws-apigateway";
import { CORS_ORIGINS } from "../constant/cors";

export class ApiGateway {
  private _instance: apigw.RestApi;
  constructor(scope: Construct, name: string) {
    this._instance = new apigw.RestApi(scope, name, {
      defaultCorsPreflightOptions: {
        allowOrigins: CORS_ORIGINS,
        allowMethods: apigw.Cors.ALL_METHODS,
      },
    });
  }

  get instance() {
    return this._instance;
  }
}
