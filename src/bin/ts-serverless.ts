#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { TalchulHaebangScrapingStack } from "../stack/talchul-haebang-scraping-stack";
import { apiGatewayWithLambda_ReservationInfo } from "../stack/lambda/reservation-info-lambda";
import { apiGatewayWithLambda_Reservation } from "../stack/lambda/reservation-lambda";

const app = new cdk.App();
new TalchulHaebangScrapingStack(app, "TalchulHaebangScrapingStack", [
  apiGatewayWithLambda_ReservationInfo,
  apiGatewayWithLambda_Reservation,
]);
