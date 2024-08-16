import { HttpListenerModService } from "@spt/services/mod/httpListener/HttpListenerModService";
import { IncomingMessage, ServerResponse } from "http";

export const getUrlParameters = (url: string): Record<string, string> => {
  const queryString: string = url.split("?")[1];
  if (queryString === url || !queryString) return { Error: "No query defined" };

  return JSON.parse(
    '{"' +
      decodeURI(queryString)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"') +
      '"}'
  );
};

export const registerEndpoint = (
  httpListenerService: HttpListenerModService,
  name: string,
  urlEndpoint: string,
  handleFunction: (
    sessionId: string,
    req: IncomingMessage,
    resp: ServerResponse
  ) => object | number | string | boolean
) => {
  const canHandleOverride = (
    sessionId: string,
    req: IncomingMessage
  ): boolean => {
    return req.method === "GET" && req.url?.includes(urlEndpoint);
  };

  const handleOverride = (
    sessionId: string,
    req: IncomingMessage,
    resp: ServerResponse
  ): void => {
    resp.writeHead(200, {
      expires: new Date().toString(),
      "access-control-allow-origin": "*",
    });
    resp.end(JSON.stringify(handleFunction(sessionId, req, resp)));
  };

  httpListenerService.registerHttpListener(
    name,
    canHandleOverride,
    handleOverride
  );
};
