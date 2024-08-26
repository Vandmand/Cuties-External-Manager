import { convertToWikiLink } from "@/helpers/links";
import {
  IQuest,
  IQuestConditionTypes,
} from "@/types/models/eft/common/tables/IQuest";
import { HTMLProps } from "react";
import { Link } from "react-router-dom";
import locationIcon from "@/assets/icons/location_icon.svg";
import traderIcon from "@/assets/icons/trader_icon.svg";
import linkIcon from "@/assets/icons/link_icon.svg";
import { useQuery } from "@tanstack/react-query";
import { getAppConfigQuery, getLocaleDb, getProfile } from "@/queries";
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
  const { data: localeDb } = useQuery(getLocaleDb());
  const { data: appConfig } = useQuery(getAppConfigQuery());
  const { data: profile } = useQuery(getProfile(appConfig?.profile?.id ?? ""));

  if (!profile || !localeDb) return;

  const pmcTaskConditions = profile.TaskConditionCounters;
  const pmcQuests = profile.Quests;

  const pmcQuestItem = pmcQuests.find((quest) => quest.qid === props.quest._id);

  const renderConditions = (questConditions: IQuestConditionTypes) => {
    const questFinishConditions = questConditions.AvailableForFinish.map(
      (condition) => {
        const pmcTaskCondition = pmcTaskConditions[condition.id];
        const currentProgress = pmcTaskCondition?.value ?? 0;
        const targetProgress = (condition.value as number) ?? 1;

        const linkElement = condition.target ? (
          <Link
            className="font-bold btn btn-circle btn-ghost btn-sm"
            to={"../item/" + condition.target}
          >
            <img src={linkIcon} alt="" />
          </Link>
        ) : null;

        return (
          <div className=" flex flex-col">
            <div className="flex items-center">
              <p className="flex flex-grow items-center gap-2">
                {localeDb[condition.id]}
                {linkElement}
              </p>
              <p className="flex-grow-0">{`${Math.min(
                currentProgress,
                targetProgress
              )}/${targetProgress}`}</p>
            </div>
            <progress
              className="progress"
              value={currentProgress}
              max={targetProgress}
            />
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
    <div className="card bg-base-100 shadow w-full">
      <div className="card-body gap-8">
        <div className="card-title">
          <h2>{cardTitle}</h2>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex flex-grow gap-2 justify-center">
            <img src={traderIcon} />{" "}
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
