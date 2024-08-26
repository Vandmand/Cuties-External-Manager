import { IQuest } from "@/types/models/eft/common/tables/IQuest";
import { useEffect, useState } from "react";
import QuestFilterDropdown from "./questFilterDropdown";
import { useQuery } from "@tanstack/react-query";
import { getAppConfigQuery, getLocaleDb, getProfile } from "@/queries";

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

function isAllFiltersUnchecked(record: Record<string, boolean>) {
  return Object.entries(record).filter((entry) => entry[1]).length == 0;
}

export default function QuestFilter(props: {
  onFilterFunctionChange: (func: (q: IQuest[]) => IQuest[]) => void;
}) {
  const { data: appConfig } = useQuery(getAppConfigQuery());
  const { data: profileData } = useQuery(
    getProfile(appConfig?.profile?.id ?? "")
  );
  const { data: localeDb } = useQuery(getLocaleDb());

  const traderIds = Object.keys(profileData?.TradersInfo ?? {});

  const questDefaultState = Object.fromEntries(
    Object.values(QuestStatus)
      .slice(0, Object.values(QuestStatus).length / 2)
      .map((status) => [status, false])
  );

  const filterDefaultState = Object.fromEntries(
    traderIds.map((id) => [localeDb ? localeDb[id + " Nickname"] : "", false])
  );

  const [filterStatus, setFilterStatus] =
    useState<Record<string, boolean>>(questDefaultState);

  const [filterTrader, setFilterTrader] = useState(filterDefaultState);

  const traderFilter = (q: IQuest[]) => {
    if (isAllFiltersUnchecked(filterTrader)) return q;

    const traders = traderIds.filter(
      (trader) => filterTrader[localeDb ? localeDb[`${trader} Nickname`] : ""]
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

  if (!profileData || !localeDb) return <p>Filter</p>;

  const pmcQuests = profileData.Quests;

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
