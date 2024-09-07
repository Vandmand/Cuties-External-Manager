import {
  QueryClient,
  UseMutationOptions,
  UseQueryOptions,
} from "@tanstack/react-query";
import { getAppConfig, saveAppConfig } from "./data/config";
import * as server from "@/data/serverWrapper";
import { AppConfig } from "./types/config/appConfig";

export const queryClient = new QueryClient();

export const getAppConfigQuery = () => {
  return {
    queryFn: getAppConfig,
    queryKey: ["appConfig"],
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

export const getProfileIds = () => {
  return {
    queryFn: server.fetchPmcIds,
    queryKey: ["profileIds"],
  };
};

export const getProfile = (id: string) => {
  return {
    queryFn: () => server.fetchProfile(id),
    queryKey: ["profile-" + id],
  };
};

export const getItems = () => {
  return {
    queryFn: server.fetchItems,
    queryKey: ["items"],
  };
};

export const getItem = (id: string) => {
  return {
    queryFn: () => server.fetchItem(id),
    queryKey: ["item-" + id],
  };
};

export const getQuests = () => {
  return {
    queryFn: server.fetchQuests,
    queryKey: ["quests"],
  };
};

export const getLocaleDb = () => {
  return {
    queryFn: server.fetchLocaleDb,
    queryKey: ["localeDb"],
  };
};

export const getFleaPrices = () => {
  return {
    queryFn: server.fetchFleaPrices,
    queryKey: ["flea"],
  };
};

export const getHideout = () => {
  return {
    queryFn: server.fetchHideout,
    queryKey: ["hideout"],
  };
};
