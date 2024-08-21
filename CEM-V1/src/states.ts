import { atom, selector } from "recoil";
import { getProfile } from "./data/apiWrapper";
import { AppConfig } from "./types/config/appConfig";
import { getAppConfig } from "./data/config";
import { IPmcData } from "./types/models/eft/common/IPmcData";

const cache: Record<string, any> = {};

export const profileSelector = selector<IPmcData>({
  key: "profileData",
  get: async ({ get }) => {
    const config = get(appConfigState);

    if()

    return await getProfile(config.profile.id);
  },
});

export const questState = atom({
  key: "questData",
  default: [],
});

export const localeDbState = atom({
  key: "localeDb",
  default: {},
});

export const fleaState = atom({
  key: "fleaData",
  default: {},
});

export const appConfigState = selector<AppConfig>({
  key: "appConfigData",
  get: async () => {
    return getAppConfig();
  },
});
