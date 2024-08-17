import {
  LocaleDbContext,
  PmcDataContext,
} from "@/contextWrapper/contextWrapper";
import { convertToWikiLink } from "@/helpers/links";
import {
  IQuest,
  IQuestConditionTypes,
} from "@/types/models/eft/common/tables/IQuest";
import { HTMLProps, useContext } from "react";
import { Link } from "react-router-dom";
import locationIcon from "@/assets/icons/location_icon.svg";
import traderIcon from "@/assets/icons/trader_icon.svg";
import linkIcon from "@/assets/icons/link_icon.svg";
interface QuestItemInterface extends HTMLProps<HTMLDivElement> {
  quest: IQuest;
}

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
}

export default function QuestCard(props: QuestItemInterface) {
  const localeDb = useContext(LocaleDbContext);
  const pmcQuests = useContext(PmcDataContext).Quests;

  const pmcQuestItem = pmcQuests.find((quest) => quest.qid === props.quest._id);

  const renderConditions = (questConditions: IQuestConditionTypes) => {
    const questFinishConditions = questConditions.AvailableForFinish.map(
      (condition) => {
        return (
          <div className=" flex flex-col">
            <p className="flex items-center gap-2">
              {localeDb[condition.id]}
              {condition.target ? (
                <Link
                  className="font-bold btn btn-circle btn-ghost btn-sm"
                  to={"../item/" + condition.target}
                >
                  <img src={linkIcon} alt="" />
                </Link>
              ) : null}
            </p>
            <progress className="progress" value={0} max={condition.value} />
          </div>
        );
      }
    );

    return questFinishConditions.map((text, i) => (
      <p id={i.toString()}>{text}</p>
    ));
  };

  const cardTitle = props.quest.QuestName ?? "";

  return (
    <div className="card bg-base-100 w-4/5">
      <div className="card-body gap-8">
        <div className="card-title">{cardTitle}</div>
        <div className="flex items-center gap-4">
          <div className="flex flex-grow gap-2 justify-center">
            <img src={traderIcon} alt="" />{" "}
            {localeDb[props.quest.traderId + " Nickname"]}
          </div>
          <div className="flex flex-grow gap-2 justify-center">
            <img src={locationIcon} alt="" />{" "}
            {localeDb[props.quest.location + " Name"]}
          </div>
          <div className="flex flex-grow gap-2 justify-center">
            <img src={locationIcon} alt="" />
            {pmcQuestItem ? QuestStatus[pmcQuestItem.status] : "Unavailable"}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          {renderConditions(props.quest.conditions)}
        </div>
        <div className="card-actions justify-end">
          <a
            className="btn btn-primary"
            href={convertToWikiLink(cardTitle)}
            target="_blank"
          >
            Go to Wiki
          </a>
        </div>
        <p className="w-full text-sm text-right">{props.quest._id}</p>
      </div>
    </div>
  );
}
