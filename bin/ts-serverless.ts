#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { MockLambdaWithApiGatewayStack } from "../lib/ts-serverless-stack";

const app = new cdk.App();
new MockLambdaWithApiGatewayStack(app, "MockLambdaWithApiGateway", {});
