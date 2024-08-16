import { AppConfig } from "@/types/config/appConfig";
import { IPmcData } from "@/types/models/eft/common/IPmcData";
import { IQuest } from "@/types/models/eft/common/tables/IQuest";
import { createContext } from "react";

export const LocaleDbContext = createContext<Record<string, string>>(
  {} as Record<string, string>
);
export const PmcDataContext = createContext<IPmcData>({} as IPmcData);
export const QuestDataContext = createContext<IQuest[]>([] as IQuest[]);
export const AppConfigContext = createContext<AppConfig>({} as AppConfig);
export const FleaMarketContext = createContext<Record<string, string>>({});

export default function ContextWrapper(props: {
  localeDb: Record<string, string>;
  pmcData: IPmcData;
  questData: IQuest[];
  appConfig: AppConfig;
  children?: React.ReactNode;
  fleaMarket: Record<string, string>;
}) {
  return (
    <LocaleDbContext.Provider value={props.localeDb}>
      <PmcDataContext.Provider value={props.pmcData}>
        <QuestDataContext.Provider value={props.questData}>
          <AppConfigContext.Provider value={props.appConfig}>
            <FleaMarketContext.Provider value={props.fleaMarket}>
              {props.children}
            </FleaMarketContext.Provider>
          </AppConfigContext.Provider>
        </QuestDataContext.Provider>
      </PmcDataContext.Provider>
    </LocaleDbContext.Provider>
  );
}
