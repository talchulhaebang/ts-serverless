import asyncHooks from "async_hooks";
import { CORS_ORIGINS } from "../constant/cors";
import { contexts } from "./createAsyncContext";

export const toResponse = async ({
  statusCode = 200,
  headers = {
    "Content-Type": "application/json;charset=UTF-8",
  },
  body,
}: {
  statusCode?: number;
  headers?: Record<string, any>;
  body: string;
}) => {
  console.log("contexts!!!");
  console.log(contexts);
  const context = contexts[asyncHooks.executionAsyncId()];
  console.log(`context!!!!!!`);
  console.log(context);

  if (context) {
    const headers = context[0].headers;
    const origin = headers.origin ?? headers.Origin;
    const corsDomain = CORS_ORIGINS.find((domain) => origin.includes(domain));

    if (corsDomain) {
      return {
        statusCode,
        headers: {
          ...headers,
          "Access-Control-Allow-Origin": origin,
          "Access-Control-Allow-Credentials": true,
          "Access-Control-Allow-Methods": "OPTIONS,POST,GET,DELETE,PUT,PATCH",
        },
        body: body,
      };
    }
  }

  return {
    statusCode,
    headers,
    body: body,
  };
};
