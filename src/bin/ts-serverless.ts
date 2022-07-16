#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { LambdaWithApiGatewayStack } from "../stack/lambda-with-api-gateway-stack";

const app = new cdk.App();
new LambdaWithApiGatewayStack(app, "LambdaWithApiGateway");
