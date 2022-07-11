export class ScrapingError extends Error {
  private _statusCode: number;
  private _errorCode: string;
  constructor(params: {
    statusCode: number;
    message: string;
    errorCode: string;
  }) {
    const { statusCode, message, errorCode } = params;
    super(message);

    this._statusCode = statusCode;
    this._errorCode = errorCode;
  }

  get statusCode() {
    return this._statusCode;
  }
  get errorCode() {
    return this._errorCode;
  }
}
