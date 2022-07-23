import * as s3 from "aws-cdk-lib/aws-s3";
import * as s3Deploy from "aws-cdk-lib/aws-s3-deployment";
import { Construct } from "constructs";

export class S3 {
  private _scope: Construct;
  private _bucket: s3.Bucket;

  constructor(scope: Construct, name: string, props?: s3.BucketProps) {
    this._scope = scope;
    this._bucket = new s3.Bucket(scope, name, props ?? {});
  }

  deployDirectory(path: string, id: string) {
    new s3Deploy.BucketDeployment(this._scope, id, {
      sources: [s3Deploy.Source.asset(path)],
      destinationBucket: this._bucket,
    });
  }

  get bucketName() {
    return this._bucket.bucketName;
  }
}
