# Welcome to your CDK TypeScript project

This is a blank project for CDK development with TypeScript.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

- `npm run build` compile typescript to js
- `npm run watch` watch for changes and compile
- `npm run test` perform the jest unit tests
- `cdk deploy` deploy this stack to your default AWS account/region
- `cdk diff` compare deployed stack with current state
- `cdk synth` emits the synthesized CloudFormation template

## 초기 세팅

다음과 같은 사전 작업이 필요합니다.

1. 로컬 PC 에 AWS 계정 설정

`~/.aws/credentials` 에 다음과 같은 파일이 존재해야 합니다.

```
[talchulhaebang]
aws_access_key_id=XXXXXX
aws_secret_access_key=XXXXXX
```

2. Docker 가 설치어 있어야 하고, 로컬에서 Run 상태여야 정상적으로 배포됩니다.

3. `npm run bootstrap` 를 통해 CDK 를 초기화합니다. 로컬 환경에서 최초 1번만 진행하면 됩니다.

4. `npm run deploy [STACK NAME]` 을 통해 배포를 진행합니다
