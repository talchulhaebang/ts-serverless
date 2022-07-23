import { NodejsFunctionProps } from "aws-cdk-lib/aws-lambda-nodejs";
import { HttpMethod } from "aws-cdk-lib/aws-events";

export type ApiGatewayWithLambda = {
  lambda: {
    name: string;
    option: NodejsFunctionProps;
  };
  path: string;
  methods: HttpMethod[];
};
