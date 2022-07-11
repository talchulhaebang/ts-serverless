import { HttpMethod } from "aws-cdk-lib/aws-events";

export class ApiRequest {
  private _httpMethod: HttpMethod;
  private _headers: Record<string, string>;
  private _body: string;

  constructor(e: any) {
    const { headers, httpMethod, body } = e;

    this._httpMethod = httpMethod;
    this._headers = headers;
    this._body = body;
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
}
