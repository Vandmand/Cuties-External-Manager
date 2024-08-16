import { StaticRouterModService } from "@spt/services/mod/staticRouter/StaticRouterModService";

export const createInjectionHook = (
  staticRouterModService: StaticRouterModService
) => {
  return new Promise<string>((resolve) => {
    staticRouterModService.registerStaticRouter(
      "StaticRoutePeekingSpt",
      [
        {
          url: "/launcher/profile/info",
          action: (url, info, sessionId, output) => {
            resolve(sessionId);
            return output;
          },
        },
      ],
      "spt"
    );
  });
};
