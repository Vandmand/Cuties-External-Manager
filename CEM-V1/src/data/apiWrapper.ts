import { fs } from "@tauri-apps/api";
import * as server from "./serverWrapper";
import { appConfigDir } from "@tauri-apps/api/path";

const cachedData: Record<string, string> = {};

const getMemory = async <T>(cacheKey: string, backupFetchFunction: () => T) => {
  const cacheItem = cachedData[cacheKey];

  if (cacheItem) return JSON.parse(cacheItem) as T;

  const fetchResponse = await backupFetchFunction();

  cachedData[cacheKey] = JSON.stringify(fetchResponse);

  return fetchResponse;
};

const getFile = async <T>(fileName: string, backupFetchFunction: () => T) => {
  const path = (await appConfigDir()) + fileName;
  const fileExists = await fs.exists(path);

  if (fileExists) return JSON.parse(await fs.readTextFile(path)) as T;

  const fetchResponse = await backupFetchFunction();

  fs.writeTextFile(path, JSON.stringify(fetchResponse));

  return fetchResponse as T;
};

export const deleteFile = async (fileName: string) => {
  const path = (await appConfigDir()) + fileName;
  fs.removeFile(path);
};

export const deleteCache = () => {
  localStorage.clear();
};

export const isReady = async () => {
  getMemory("ready", async () => "yes");
};

export const getQuests = async () =>
  getMemory("Quests", async () => server.fetchQuests());

export const getLocalDb = async () =>
  getFile("localDb.json", async () => server.fetchLocaleDb());

export const getPmcIds = async () =>
  getMemory("PmcIds", async () => server.fetchPmcIds());

export const getProfile = async (id: string) =>
  getMemory("profile", async () => server.fetchProfile(id));
