import * as Iam from "aws-cdk-lib/aws-iam";
import * as ApiGw from "aws-cdk-lib/aws-apigateway";
import { S3 } from "./s3";
import { Construct } from "constructs";

export class S3WithApiGateway {
  private _scope: Construct;
  private _s3: S3;
  private _apiGateway: ApiGw.RestApi;
  private _path: string;
  constructor({
    scope,
    s3,
    roleName,
    apiGateway,
    path,
  }: {
    scope: Construct;
    s3: S3;
    roleName: string;
    apiGateway: ApiGw.RestApi;
    path: string;
  }) {
    this._scope = scope;
    this._s3 = s3;
    this._apiGateway = apiGateway;
    this._path = path;

    const role = new Iam.Role(scope, roleName, {
      roleName: roleName,
      assumedBy: new Iam.ServicePrincipal("apigateway.amazonaws.com"),
    });

    role.addToPolicy(
      new Iam.PolicyStatement({
        resources: [`arn:aws:s3:::${s3.bucketName}/*`],
        actions: ["s3:GetObject"],
      })
    );

    const basePath = apiGateway.root.addResource(path);
    basePath.addResource("{file}").addMethod(
      "GET",
      new ApiGw.AwsIntegration({
        service: "s3",
        integrationHttpMethod: "GET",
        path: `${s3.bucketName}/{file}`,
        options: {
          credentialsRole: role,
          requestParameters: {
            "integration.request.path.file": "method.request.path.file",
          },
          integrationResponses: [
            {
              statusCode: "200",
              selectionPattern: "2..",
              responseParameters: {
                "method.response.header.Content-Type":
                  "integration.response.header.Content-Type",
              },
            },
            {
              statusCode: "403",
              selectionPattern: "4..",
            },
          ],
        },
      }),
      {
        requestParameters: {
          "method.request.path.file": true,
        },
        methodResponses: [
          {
            statusCode: "200",
            responseParameters: {
              "method.response.header.Content-Type": true,
            },
          },
          {
            statusCode: "404",
          },
        ],
      }
    );
  }
}
