import * as apigw from "aws-cdk-lib/aws-apigateway";
import {CORS_ORIGINS} from "../../core/constant/cors";
import {Construct} from "constructs";

export function createTalchulHaebangApiGateway(scope: Construct, name: string) {
    return new apigw.RestApi(
        scope,
        name,
        {
            defaultCorsPreflightOptions: {
                allowOrigins: CORS_ORIGINS,
                allowMethods: apigw.Cors.ALL_METHODS, // this is also the default
            },
        }
    );
}