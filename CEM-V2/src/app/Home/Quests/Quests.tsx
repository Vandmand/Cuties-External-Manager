import useServer from "@/src/Hooks/useServer";
import QuestCard from "./Components/QuestCard";

export default function Quests() {
  const { quests } = useServer();

  if (!quests) {
    return "loading";
  }

  return (
    <div className="p-2">
      <div className="flex flex-col gap-6">
        {quests.map((quest) => (
          <QuestCard quest={quest} />
        ))}
      </div>
    </div>
  );
}
