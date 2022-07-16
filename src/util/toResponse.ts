import asyncHooks from "async_hooks";
import { contexts } from "./createAsyncContext";

const corsDomains = ["http://scraping-swagger.haebang.world"];

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
  console.log(context);

  if (context) {
    const origin = context[0].headers.origin;
    const corsDomain = corsDomains.find((domain) => origin.includes(domain));

    if (corsDomain) {
      return {
        statusCode,
        headers: {
          ...headers,
          "Access-Control-Allow-Origin": origin, // Required for CORS support to work
          "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
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
