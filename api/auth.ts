// api/auth.ts
import { Handler } from "@netlify/functions";
import { auth } from "../src/lib/auth";

export const handler: Handler = async (event, context) => {
  const url = new URL(event.rawUrl);
  const request = new Request(url.toString(), {
    method: event.httpMethod,
    headers: event.headers as HeadersInit,
    body: event.body ? event.body : undefined,
  });

  const response = await auth.handler(request);
  
  const responseHeaders: Record<string, string> = {};
  response.headers.forEach((value, key) => {
    responseHeaders[key] = value;
  });

  return {
    statusCode: response.status,
    headers: responseHeaders,
    body: await response.text(),
  };
};