import {
  LocaleDbContext,
  PmcDataContext,
} from "@/contextWrapper/contextWrapper";
import Card from "@/dummyComponents/card";
import { convertToWikiLink } from "@/helpers/links";
import {
  IQuest,
  IQuestConditionTypes,
} from "@/types/models/eft/common/tables/IQuest";
import { HTMLProps, useContext } from "react";
import { Link } from "react-router-dom";

interface QuestItemInterface extends HTMLProps<HTMLDivElement> {
  quest: IQuest;
}

export default function QuestCard(props: QuestItemInterface) {
  const localeDb = useContext(LocaleDbContext);

  const renderConditions = (questConditions: IQuestConditionTypes) => {
    const questFinishConditions = questConditions.AvailableForFinish.map(
      (condition) => {
        return (
          <div className="flex items-center gap-2">
            <p>{localeDb[condition.id]}</p>
            {condition.target ? (
              <Link
                className="rounded-full text-sm font-bold btn-outline btn btn-circle btn-sm"
                to={"../item/" + condition.target}
              >
                ↗
              </Link>
            ) : null}
          </div>
        );
      }
    );

    return questFinishConditions.map((text, i) => (
      <p id={i.toString()}>{text}</p>
    ));
  };

  const cardTitle = props.quest.QuestName ?? "";
  const cardLocation =
    props.quest.location == "any"
      ? props.quest.location
      : localeDb[props.quest.location + " Name"];

  return (
    <Card title={cardTitle} alt={cardLocation}>
      <div className="flex">
        <h5 className="flex-1">
          {localeDb[props.quest.traderId + " Nickname"]}
        </h5>
        <h5>{props.quest.type}</h5>
      </div>
      {renderConditions(props.quest.conditions)}
      <a
        className="btn btn-primary"
        href={convertToWikiLink(cardTitle)}
        target="_blank"
      >
        Go to Wiki
      </a>
      <p className="w-full text-sm text-right">{props.quest._id}</p>
    </Card>
  );
}
