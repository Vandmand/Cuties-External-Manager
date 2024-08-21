import SideBar from "@/sidebar/sideBar";
import { Outlet, useLoaderData, useLocation } from "react-router-dom";
import ContextWrapper from "@/contextWrapper/contextWrapper";
import { useEffect } from "react";
import { IPmcData } from "@/types/models/eft/common/IPmcData";
import { IQuest } from "@/types/models/eft/common/tables/IQuest";
import { AppConfig } from "@/types/config/appConfig";
import { getFleaPrices } from "@/data/serverWrapper";
import { getLocalDb, getProfile, getQuests } from "@/data/apiWrapper";
import useCache from "@/hooks/useCache";

//TODO abstract to separate file
interface ServerData {
  profile: IPmcData;
  quests: IQuest[];
  localeDb: Record<string, string>;
  fleaPrices: Record<string, string>;
  appConfig: AppConfig;
}

const isServerDataFailed = (serverData: ServerData) => {
  if (Object.keys(serverData).length === 0) return true;

  return (
    Object.keys(serverData.profile).length === 0 ||
    Object.keys(serverData.localeDb).length === 0 ||
    Object.keys(serverData.fleaPrices).length === 0 ||
    serverData.quests.length === 0
  );
};

export default function Main() {
  const serverData = useLoaderData() as ServerData;
  const href = useLocation().pathname;

  useEffect(() => {
    window.dispatchEvent(new Event("locationChange"));
  }, [href]);

  return (
    <ContextWrapper
      appConfig={serverData.appConfig}
      pmcData={serverData.profile}
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
