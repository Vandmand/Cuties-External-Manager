import { SerializableError } from "@/types/custom/SerializableError";
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

export async function getReady(): Promise<boolean> {
  return (await fetch(getEndpoint() + "/ccp/ready")).json();
}

export async function getQuests(): Promise<IQuest[]> {
  return (await fetch(getEndpoint() + "/ccp/quests")).json();
}

export async function getLocaleDb(): Promise<Record<string, string>> {
  return (await fetch(getEndpoint() + "/ccp/localeDb")).json();
}

export async function getPmcProfileIds(): Promise<
  [{ id: string; name: string }]
> {
  return (await fetch(getEndpoint() + "/ccp/profile/ids")).json();
}

export async function getPmcProfile(id: string): Promise<IPmcData> {
  return (await fetch(getEndpoint() + "/ccp/profile?id=" + id)).json();
}

export async function getFleaPrices(): Promise<Record<string, string>> {
  return (await fetch(getEndpoint() + "/ccp/flea")).json();
}

export async function getItems(): Promise<string[]> {
  return (await fetch(getEndpoint() + "/ccp/items")).json();
}

export async function getItem(id: string): Promise<ITemplateItem> {
  return (await fetch(getEndpoint() + "/ccp/item?id=" + id)).json();
}

export async function getHideout(): Promise<IHideout> {
  return (await fetch(getEndpoint() + "/ccp/hideout")).json();
}

export async function getPing(): Promise<Response> {
  try {
    return await fetch(getEndpoint() + "/ccp/ping", {
      signal: AbortSignal.timeout(10000),
    });
  } catch (error) {
    return new Response(null, { status: 404 });
  }
}
