export type ApiResponse<T> = ApiSuccessResponse<T> | ApiFailResponse;
export type ApiSuccessResponse<T> = {
  success: true;
  data: T;
};
export type ApiFailResponse = {
  success: false;
  error: {
    errorCode: string;
    errorMessage: string;
  };
};
