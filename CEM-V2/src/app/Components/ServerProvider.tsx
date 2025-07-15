import useLocal from "@/src/Hooks/useLocal";
import useServerEndpoint from "@/src/Hooks/useServerEndpoint";
import { Config } from "@/src/types/config";
import { IPmcData } from "@/src/types/spt_server/models/eft/common/IPmcData";
import { IQuest } from "@/src/types/spt_server/models/eft/common/tables/IQuest";
import { createContext, ReactNode } from "react";

// Shhhh. Don't look at the any types
export const contexts = {
  pmcIds: createContext<any>(undefined),
  quests: createContext<any>(undefined),
  items: createContext<any>(undefined),
  localeDb: createContext<any>(undefined),
  pmc: createContext<any>(undefined),
};

export default function ServerProvider(props: { children: ReactNode }) {
  const { config } = useLocal();

  const pmcIds = useServerEndpoint<Config["profile"][]>({
    urlEndpoint: "cem/profile/ids",
    context: contexts.pmcIds,
  });

  const quest = useServerEndpoint<IQuest[]>({
    urlEndpoint: "cem/quests",
    context: contexts.quests,
  });

  const items = useServerEndpoint<string[]>({
    urlEndpoint: "cem/items",
    context: contexts.items,
  });

  const localeDb = useServerEndpoint<Record<string, string>>({
    urlEndpoint: "cem/localeDb",
    context: contexts.localeDb,
  });

  const pmc = useServerEndpoint<IPmcData>({
    urlEndpoint: "cem/profile",
    context: contexts.pmc,
    params: { id: config.profile?.id ?? "" },
  });

  //TODO: Fix the maybe pmc return
  return (
    <>
      <pmcIds.Component>
        <quest.Component>
          <items.Component>
            <localeDb.Component>
              <pmc.Component>{props.children}</pmc.Component>
            </localeDb.Component>
          </items.Component>
        </quest.Component>
      </pmcIds.Component>
    </>
  );
}
