import SideBar from "@/sidebar/sideBar";
import { Outlet, useLocation } from "react-router-dom";
import ContextWrapper from "@/contextWrapper/contextWrapper";
import { useState, useEffect } from "react";
import { IPmcData } from "@/types/models/eft/common/IPmcData";
import { IQuest } from "@/types/models/eft/common/tables/IQuest";
import { AppConfig } from "@/types/config/appConfig";
import { appConfigDir } from "@tauri-apps/api/path";
import { fs } from "@tauri-apps/api";
import Loading from "@/screens/loading/loading";
import {
  getFleaPrices,
  getLocaleDb,
  getPmcProfile,
  getQuests,
} from "@/serverWrapper/serverWrapper";
import useCache from "@/hooks/useCache";

const readLocaleDb = async (): Promise<Record<string, string>> => {
  const filePath = (await appConfigDir()) + "localeDb.json";

  if (await fs.exists(filePath)) {
    return JSON.parse(await fs.readTextFile(filePath));
  }

  const localeDb = await getLocaleDb();
  fs.writeTextFile(filePath, JSON.stringify(localeDb));
  return localeDb;
};

//TODO abstract to separate file
interface ServerData {
  pmcProfile: IPmcData;
  quests: IQuest[];
  localeDb: Record<string, string>;
  fleaPrices: Record<string, string>;
}

const isServerDataFailed = (serverData: ServerData) => {
  if (Object.keys(serverData).length === 0) return true;

  return (
    Object.keys(serverData.pmcProfile).length === 0 ||
    Object.keys(serverData.localeDb).length === 0 ||
    Object.keys(serverData.fleaPrices).length === 0 ||
    serverData.quests.length === 0
  );
};

const getServerDataCache = (): ServerData | null => {
  const serverDataCache = localStorage.getItem("serverData");

  if (!serverDataCache) return null;

  return JSON.parse(serverDataCache);
};

export default function Main(props: {
  appConfig: AppConfig;
  onSettingChange: (s: AppConfig) => void;
}) {
  const [connected, setConnected] = useState<boolean | null>(null);
  const [serverData, setServerData] = useCache<ServerData>(
    "serverData",
    {} as ServerData
  );
  const href = useLocation().pathname;

  useEffect(() => {
    // TODO Implement ready check

    const serverData = Promise.all([
      getPmcProfile(props.appConfig.profile.id),
      getQuests(),
      readLocaleDb(),
      getFleaPrices(),
    ]);

    //TODO fix this to be... smarter
    serverData.then((data) => {
      const mappedServerData = Object.fromEntries([
        ["pmcProfile", data[0]],
        ["quests", data[1]],
        ["localeDb", data[2]],
        ["fleaPrices", data[3]],
      ]) as ServerData;

      setServerData(mappedServerData);
    });
  }, []);

  useEffect(() => {
    window.dispatchEvent(new Event("locationChange"));
  }, [href]);

  // Exit conditions for loading
  if (isServerDataFailed(serverData)) {
    return <Loading onSettingsChange={props.onSettingChange} />;
  }

  return (
    <ContextWrapper
      appConfig={props.appConfig}
      pmcData={serverData.pmcProfile}
      questData={serverData.quests}
      localeDb={serverData.localeDb}
      fleaMarket={serverData.fleaPrices}
    >
      <div className="flex gap-4 flex-1 overflow-auto">
        <SideBar />
        <div className="relative overflow-auto flex-grow rounded-lg border-base-300 border-2 p-2 shadow-sm">
          <Outlet />
        </div>
      </div>
    </ContextWrapper>
  );
}
