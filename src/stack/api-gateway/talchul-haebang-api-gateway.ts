import * as apigw from "aws-cdk-lib/aws-apigateway";
import {CORS_ORIGINS} from "../../core/constant/cors";
import {Construct} from "constructs";

function talchulHaebangApiGatewayFactory() {
    let apiGateway: apigw.RestApi | undefined = undefined;
    return function(scope: Construct) {
        if(!apiGateway) {
            apiGateway = new apigw.RestApi(
                scope,
                'TalchulHaebangApiGateway',
                {
                    defaultCorsPreflightOptions: {
                        allowOrigins: CORS_ORIGINS,
                        allowMethods: apigw.Cors.ALL_METHODS, // this is also the default
                    },
                }
            );
        }
        return apiGateway;
    }
}

export const getOrCreateTalchulHaebangApiGateway = talchulHaebangApiGatewayFactory();