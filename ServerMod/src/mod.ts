import { DependencyContainer } from "tsyringe";

import { HttpListenerModService } from "@spt/services/mod/httpListener/HttpListenerModService";
import { QuestHelper } from "@spt/helpers/QuestHelper";
import { ProfileHelper } from "@spt/helpers/ProfileHelper";
import { StaticRouterModService } from "@spt/services/mod/staticRouter/StaticRouterModService";
import { IPreSptLoadMod } from "@spt/models/external/IPreSptLoadMod";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { LocaleService } from "@spt/services/LocaleService";
import { ItemHelper } from "@spt/helpers/ItemHelper";
import { getUrlParameters, registerEndpoint } from "./httpHelper";
import { RagfairPriceService } from "@spt/services/RagfairPriceService";
import { DatabaseService } from "@spt/services/DatabaseService";

class Mod implements IPreSptLoadMod {
  public preSptLoad(container: DependencyContainer): void {
    const httpListenerService = container.resolve<HttpListenerModService>(
      "HttpListenerModService"
    );
    const staticRouterModService = container.resolve<StaticRouterModService>(
      "StaticRouterModService"
    );
    const logger = container.resolve<ILogger>("WinstonLogger");
    const questHelper = container.resolve<QuestHelper>("QuestHelper");
    const profileHelper = container.resolve<ProfileHelper>("ProfileHelper");
    const localeService = container.resolve<LocaleService>("LocaleService");
    const itemHelper = container.resolve<ItemHelper>("ItemHelper");
    const databaseService =
      container.resolve<DatabaseService>("DatabaseService");
    const ragfairPriceService = container.resolve<RagfairPriceService>(
      "RagfairPriceService"
    );

    registerEndpoint(httpListenerService, "getQuests", "/cem/quests", () => {
      return questHelper.getQuestsFromDb();
    });

    registerEndpoint(httpListenerService, "flea", "/cem/flea", () => {
      return ragfairPriceService.getAllFleaPrices();
    });

    registerEndpoint(httpListenerService, "localeDbFull", "/cem/localeDb", () =>
      localeService.getLocaleDb()
    );

    registerEndpoint(httpListenerService, "hideout", "/cem/hideout", () =>
      databaseService.getHideout()
    );

    registerEndpoint(httpListenerService, "allItems", "/cem/items", () =>
      itemHelper.getItems().map((item) => item._id)
    );

    registerEndpoint(httpListenerService, "item", "/cem/item", (_, req) => {
      const { id } = getUrlParameters(req.url);
      const item = itemHelper.getItem(id);
      if (!item[0]) return null;
      return item[1];
    });

    registerEndpoint(
      httpListenerService,
      "profiles",
      "/cem/profile/ids",
      () => {
        const profiles = profileHelper.getProfiles();
        const profileIds = [];

        for (const key in profiles) {
          if (Object.prototype.hasOwnProperty.call(profiles, key)) {
            const profile = profiles[key];
            profileIds.push({
              id: profile.characters.pmc._id,
              name: profile.characters.pmc.Info.Nickname,
            });
          }
        }
        return profileIds;
      }
    );

    registerEndpoint(
      httpListenerService,
      "getProfile",
      "/cem/profile",
      (_, req) => {
        const { id } = getUrlParameters(req.url);

        return profileHelper.getProfileByPmcId(id);
      }
    );

    registerEndpoint(httpListenerService, "ping", "/cem/ping", () => "pong");
  }
}

export const mod = new Mod();
