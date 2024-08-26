import { AppConfig } from "@/types/config/appConfig";
import { IPmcData } from "@/types/models/eft/common/IPmcData";
import { IQuest } from "@/types/models/eft/common/tables/IQuest";
import { ITemplateItem } from "@/types/models/eft/common/tables/ITemplateItem";
import { IHideout } from "@/types/models/spt/hideout/IHideout";

const config = {
  ip: "127.0.0.1",
  port: 6969,
};

const getEndpoint = (): string => {
  return `http://${config.ip}:${config.port}`;
};

export function setIp(ip: string) {
  config.ip = ip;
}
export function setPort(port: number) {
  config.port = port;
}

export function isError(response: any) {
  return response.Error;
}

export async function fetchEndpoint<T>(
  endpoint: string,
  ...params: [string, string][]
): Promise<T> {
  const urlParams =
    "?" + params.map((param) => param[0] + "=" + param[1]).join();

  const response = await fetch(getEndpoint() + endpoint + urlParams);

  return response.json();
}

export const fetchQuests = async () =>
  fetchEndpoint<IQuest[]>("/cem/quests", ["test", "test1"]);

export const fetchLocaleDb = async () =>
  fetchEndpoint<Record<string, string>>("/cem/localeDb");

export const fetchPmcIds = async () =>
  fetchEndpoint<AppConfig["profile"][]>("/cem/profile/ids");

export const fetchProfile = (id: string) =>
  fetchEndpoint<IPmcData>("/cem/profile", ["id", id]);

export const fetchFleaPrices = async () =>
  fetchEndpoint<Record<string, string>>("/cem/flea");

export const fetchItems = async () => fetchEndpoint<string[]>("/cem/items");

export const fetchItem = async (id: string) =>
  fetchEndpoint<ITemplateItem>("/cem/item", ["id", id]);

export const fetchHideout = async () => fetchEndpoint<IHideout>("/cem/hideout");

export async function getPing(): Promise<Response> {
  try {
    return await fetch(getEndpoint() + "/cem/ping", {
      signal: AbortSignal.timeout(10000),
    });
  } catch (error) {
    return new Response(null, { status: 404 });
  }
}
