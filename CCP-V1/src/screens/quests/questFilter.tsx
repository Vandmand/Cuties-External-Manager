import {
  LocaleDbContext,
  PmcDataContext,
} from "@/contextWrapper/contextWrapper";
import { IPmcData } from "@/types/models/eft/common/IPmcData";
import { IQuest } from "@/types/models/eft/common/tables/IQuest";
import { useContext, useEffect, useState } from "react";
import QuestFilterDropdown from "./questFilterDropdown";

enum QuestStatus {
  Locked = 0,
  AvailableForStart = 1,
  Started = 2,
  AvailableForFinish = 3,
  Success = 4,
  Fail = 5,
  FailRestartable = 6,
  MarkedAsFailed = 7,
  Expired = 8,
  AvailableAfter = 9,
}

const getTraderIds = (pmcData: IPmcData) => {
  return Object.keys(pmcData.TradersInfo);
};

const questDefaultState = Object.fromEntries(
  Object.values(QuestStatus)
    .slice(0, Object.values(QuestStatus).length / 2)
    .map((status) => [status, false])
);

const getTraderDefaultState = (
  pmcData: IPmcData,
  localeDb: Record<string, string>
) => {
  return Object.fromEntries(
    getTraderIds(pmcData).map((key) => [localeDb[`${key} Nickname`], false])
  );
};

function isAllFiltersUnchecked(record: Record<string, boolean>) {
  return Object.entries(record).filter((entry) => entry[1]).length == 0;
}

export default function QuestFilter(props: {
  onFilterFunctionChange: (func: (q: IQuest[]) => IQuest[]) => void;
}) {
  const pmcData = useContext(PmcDataContext);
  const localeDb = useContext(LocaleDbContext);
  const pmcQuests = pmcData.Quests;

  const [filterStatus, setFilterStatus] =
    useState<Record<string, boolean>>(questDefaultState);

  const [filterTrader, setFilterTrader] = useState(
    getTraderDefaultState(pmcData, localeDb)
  );

  const traderFilter = (q: IQuest[]) => {
    if (isAllFiltersUnchecked(filterTrader)) return q;

    const traders = getTraderIds(pmcData).filter(
      (trader) => filterTrader[localeDb[`${trader} Nickname`]]
    );

    return q.filter((q) => traders.indexOf(q.traderId) != -1);
  };

  const statusFilter = (q: IQuest[]) => {
    if (isAllFiltersUnchecked(filterStatus)) return q;

    const statusTrue = Object.entries(filterStatus)
      .filter((entry) => entry[1])
      .map((entry) => entry[0]);

    const filteredQuests = q.filter((quest) => {
      const pmcQuestMatch = pmcQuests.find(
        (pmcQuest) => pmcQuest.qid === quest._id
      );

      if (!pmcQuestMatch) return false;

      if (statusTrue.indexOf(QuestStatus[pmcQuestMatch.status]) === -1)
        return false;

      return true;
    });

    return filteredQuests;
  };

  useEffect(() => {
    props.onFilterFunctionChange((q) => {
      //TODO make into const expression (maybe with array)
      let qMod = q;

      qMod = traderFilter(qMod);
      qMod = statusFilter(qMod);

      return qMod;
    });
  }, [filterStatus, filterTrader]);

  return (
    <div className="flex gap-4 flex-wrap justify-center items-center">
      <QuestFilterDropdown
        name="Mission Status"
        filterObject={filterStatus}
        onDropdownChange={(newFilter) =>
          setFilterStatus(Object.assign({}, newFilter))
        }
      />
      <QuestFilterDropdown
        name="Trader"
        filterObject={filterTrader}
        onDropdownChange={(newFilter) =>
          setFilterTrader(Object.assign({}, newFilter))
        }
      />
    </div>
  );
}
