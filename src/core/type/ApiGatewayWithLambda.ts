import {
  NodejsFunction,
  NodejsFunctionProps,
} from "aws-cdk-lib/aws-lambda-nodejs";
import { HttpMethod } from "aws-cdk-lib/aws-events";
import * as apigw from "aws-cdk-lib/aws-apigateway";
import { Construct } from "constructs";

export type ApiGatewayWithLambda = {
  apiGatewayFactory: (construct: Construct) => apigw.RestApi;
  lambda: {
    name: string;
    option: NodejsFunctionProps;
  };
  path: string;
  methods: HttpMethod[];
};
