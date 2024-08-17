import { useContext, useState } from "react";
import { IQuest } from "@/types/models/eft/common/tables/IQuest";
import QuestCard from "./questCard";
import { QuestDataContext } from "@/contextWrapper/contextWrapper";
import QuestFilter from "./questFilter";

export default function Quests() {
  const quests = useContext(QuestDataContext);

  const [questFilter, setQuestFilter] = useState(() => (quests: IQuest[]) => {
    return quests;
  });

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
