import {
  QueryClient,
  UseMutationOptions,
  UseQueryOptions,
} from "@tanstack/react-query";
import { getAppConfig, saveAppConfig } from "./data/config";
import * as server from "@/data/serverWrapper";
import { AppConfig } from "./types/config/appConfig";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { fs } from "@tauri-apps/api";
import { BaseDirectory } from "@tauri-apps/api/fs";
import { IPmcData } from "./types/models/eft/common/IPmcData";
import { ITemplateItem } from "./types/models/eft/common/tables/ITemplateItem";
import { IQuest } from "./types/models/eft/common/tables/IQuest";
import { IHideout } from "./types/models/spt/hideout/IHideout";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 10, //10 minutes
      staleTime: 1000 * 60 * 5,
    },
  },
});

export const asyncStoragePersister = createAsyncStoragePersister({
  storage: {
    getItem(key) {
      return fs.readTextFile(key, { dir: BaseDirectory.AppData });
    },
    setItem(key, value) {
      return fs.writeTextFile(key, value, { dir: BaseDirectory.AppData });
    },
    removeItem(key) {
      return fs.removeFile(key, { dir: BaseDirectory.AppData });
    },
  },
});

//Typescript gymnastics really hits hard on this one
type Options<T> = UseQueryOptions<unknown, unknown, T>;

export const getAppConfigQuery = (): Options<AppConfig> => {
  return {
    queryFn: getAppConfig,
    queryKey: ["appConfig"],
    gcTime: 0,
    staleTime: 0,
  };
};

export const getAppConfigMutation = (): UseMutationOptions<
  unknown,
  unknown,
  AppConfig
> => {
  return {
    onMutate(appConfig) {
      saveAppConfig(appConfig);
      queryClient.invalidateQueries({ queryKey: ["appConfig"] });
    },
  };
};

export const getProfileIds = (): Options<
  | {
      id: string;
      name: string;
    }
  | undefined
> => {
  return {
    queryFn: server.fetchPmcIds,
    queryKey: ["profileIds"],
    staleTime: 0,
    gcTime: 0,
  };
};

export const getProfile = (id: string): Options<IPmcData> => {
  return {
    queryFn: () => server.fetchProfile(id),
    queryKey: ["profile-" + id],
  };
};

export const getItems = (): Options<string[]> => {
  return {
    queryFn: server.fetchItems,
    queryKey: ["items"],
  };
};

export const getItem = (id: string): Options<ITemplateItem> => {
  return {
    queryFn: () => server.fetchItem(id),
    queryKey: ["item-" + id],
  };
};

export const getQuests = (): Options<IQuest[]> => {
  return {
    queryFn: server.fetchQuests,
    queryKey: ["quests"],
  };
};

export const getLocaleDb = (): Options<Record<string, string>> => {
  return {
    queryFn: server.fetchLocaleDb,
    queryKey: ["localeDb"],
    staleTime: Infinity,
    gcTime: Infinity,
  };
};

export const getFleaPrices = (): Options<Record<string, string>> => {
  return {
    queryFn: server.fetchFleaPrices,
    queryKey: ["flea"],
  };
};

export const getHideout = (): Options<IHideout> => {
  return {
    queryFn: server.fetchHideout,
    queryKey: ["hideout"],
  };
};
