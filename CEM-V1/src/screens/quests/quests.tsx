import { useState } from "react";
import { IQuest } from "@/types/models/eft/common/tables/IQuest";
import QuestCard from "./questCard";
import QuestFilter from "./questFilter";
import { useQuery } from "@tanstack/react-query";
import { getQuests } from "@/queries";
import PageSkeleton from "@/dummyComponents/pageSkeleton";

export default function Quests() {
  const { data: quests } = useQuery(getQuests());

  const [questFilter, setQuestFilter] = useState(
    () => (quests: IQuest[]) => quests
  );

  if (!quests) return <PageSkeleton />;

  const renderQuests = () => {
    const questsQuery = questFilter(quests);

    return questsQuery.map((quest) => (
      <QuestCard quest={quest} id={quest._id} />
    ));
  };

  return (
    <div className="flex flex-col gap-16 p-4">
      <QuestFilter
        onFilterFunctionChange={(func) => setQuestFilter(() => func)}
      />
      <ul className="flex flex-col gap-8 w-full items-center">
        {renderQuests()}
      </ul>
    </div>
  );
}
