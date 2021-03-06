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
  const context = contexts[asyncHooks.executionAsyncId()];

  if (context) {
    const headers = context[0].headers;
    const origin = headers.origin ?? headers.Origin;

    if (origin) {
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
  }

  return {
    statusCode,
    headers,
    body: body,
  };
};
