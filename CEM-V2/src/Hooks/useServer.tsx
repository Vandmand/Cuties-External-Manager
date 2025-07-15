import { useContext } from "react";
import { contexts } from "../app/Components/ServerProvider";
import { Config } from "@/src/types/config";
import { IQuest } from "../types/spt_server/models/eft/common/tables/IQuest";
import { IPmcData } from "../types/spt_server/models/eft/common/IPmcData";

type valueTypes = {
  pmcIds?: Config["profile"][];
  quests?: IQuest[];
  items?: string[];
  localeDb?: Record<string, string>;
  pmc?: IPmcData;
};

export default function useServer() {
  const values = Object.fromEntries(
    Object.keys(contexts).map((key) => [
      key,
      useContext(contexts[key as keyof typeof contexts]),
    ])
  );

  return values as valueTypes;
}
