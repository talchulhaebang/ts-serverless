import { ApiRequest } from "../type/ApiRequest";

export function convertEventToHttpRequest(event: any) {
  console.log(`ConvertEventToHttpRequest`);
  console.log(event);
  console.log(JSON.stringify(event));
  const apiRequest = new ApiRequest(event);

  return apiRequest;
}
