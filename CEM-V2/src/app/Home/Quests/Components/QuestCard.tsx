import useServer from "@/src/Hooks/useServer";
import { IQuest } from "@/src/types/spt_server/models/eft/common/tables/IQuest";

//TODO fix this import problem
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
  Unavailable = 10,
}

const QuestStatusColors = [
  "badge-error",
  "badge-primary",
  "badge-primary",
  "badge-success",
  "badge-success",
  "badge-error",
  "badge-error",
  "badge-error",
  "badge-error",
  "badge-warning",
];

export default function QuestCard(props: { quest: IQuest }) {
  const { pmc, localeDb } = useServer();

  if (!pmc || !localeDb) return "loading";

  const pmcTaskConditions = pmc.TaskConditionCounters;
  const pmcQuests = pmc.Quests;
  const pmcQuestItem = pmcQuests.find((quest) => quest.qid === props.quest._id);

  const conditions = props.quest.conditions.AvailableForFinish.map(
    (condition) => {
      const pmcTaskCondition = pmcTaskConditions[condition.id];

      return {
        currentProgress: pmcTaskCondition?.value ?? 0,
        targetProgress: (condition.value as number) ?? 1,
        conditionDescription: localeDb[condition.id],
      };
    }
  );

  const questStatusDescription = pmcQuestItem
    ? QuestStatus[pmcQuestItem?.status]
    : "Unavailable";
  const questStatusColor = QuestStatusColors[pmcQuestItem?.status];

  return (
    <div className="collapse collapse-arrow bg-base-200">
      <input type="checkbox" name="quest-list-accordion" />
      <div className="collapse-title flex gap-4 items-center">
        <p className="font-bold">{props.quest.QuestName}</p>
        <div className={`badge ${questStatusColor} badge-sm`}>
          {questStatusDescription}
        </div>
      </div>
      <div className="collapse-content">
        <div className="flex flex-col gap-2">
          {conditions.map((condition) => (
            <div className="">
              <div className="flex justify-between">
                <p>{condition.conditionDescription}</p>
                <p>{`${condition.currentProgress}/${condition.targetProgress}`}</p>
              </div>
              <progress
                className="progress"
                value={condition.currentProgress}
                max={condition.targetProgress}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
