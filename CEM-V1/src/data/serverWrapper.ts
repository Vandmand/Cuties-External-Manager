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

async function fetchEndpoint(endpoint: string, ...params: [string, string][]) {
  const urlParams =
    "?" + params.map((param) => param[0] + "=" + param[1]).join();

  const response = await fetch(getEndpoint() + endpoint + urlParams);

  return response.json();
}

export const fetchQuests = async (): Promise<IQuest[]> =>
  fetchEndpoint("/cem/quests", ["test", "test1"]);

export const fetchLocaleDb = async (): Promise<Record<string, string>> =>
  fetchEndpoint("/cem/localeDb");

export const fetchPmcIds = async (): Promise<[{ id: string; name: string }]> =>
  fetchEndpoint("/cem/profile/ids");

export const fetchProfile = (id: string): Promise<IPmcData> =>
  fetchEndpoint("/cem/profile", ["id", id]);

export async function getFleaPrices(): Promise<Record<string, string>> {
  return (await fetch(getEndpoint() + "/cem/flea")).json();
}

export async function getItems(): Promise<string[]> {
  return (await fetch(getEndpoint() + "/cem/items")).json();
}

export async function getItem(id: string): Promise<ITemplateItem> {
  return (await fetch(getEndpoint() + "/cem/item?id=" + id)).json();
}

export async function getHideout(): Promise<IHideout> {
  return (await fetch(getEndpoint() + "/cem/hideout")).json();
}

export async function getPing(): Promise<Response> {
  try {
    return await fetch(getEndpoint() + "/cem/ping", {
      signal: AbortSignal.timeout(10000),
    });
  } catch (error) {
    return new Response(null, { status: 404 });
  }
}
