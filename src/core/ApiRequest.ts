import { HttpMethod } from "aws-cdk-lib/aws-events";

export class ApiRequest {
  private _httpMethod: HttpMethod;
  private _headers: Record<string, string>;
  private _body: string;
  private _queryStringParameters: Record<string, string>;
  private _pathParameters: Record<string, string>;

  constructor(e: any) {
    const event = Array.isArray(e) ? e[0] : e;
    const { headers, httpMethod, body, queryStringParameters, pathParameters } =
      event;

    this._httpMethod = httpMethod;
    this._headers = headers;
    this._body = body;
    this._queryStringParameters = queryStringParameters ?? {};
    this._pathParameters = pathParameters ?? {};
  }

  parseJsonBody<T extends Record<string, any>>(): T {
    return JSON.parse(this._body);
  }

  getHeader(key: string) {
    return this._headers[key];
  }

  get body() {
    return this._body;
  }

  get httpMethod() {
    return this._httpMethod;
  }

  get contentType() {
    return this.getHeader("Content-Type") ?? this.getHeader("content-type");
  }

  get queryStringParameters() {
    return this._queryStringParameters;
  }

  get pathParameters() {
    return this._pathParameters;
  }
}
