import {
  LocaleDbContext,
  PmcDataContext,
} from "@/contextWrapper/contextWrapper";
import Card from "@/dummyComponents/card";
import { HideoutArea } from "@/types/models/eft/common/tables/IBotBase";
import { IHideoutArea } from "@/types/models/eft/hideout/IHideoutArea";
import { useContext } from "react";

export default function HideoutCard(props: { area: IHideoutArea }) {
  const localeDb = useContext(LocaleDbContext);
  const pmcData = useContext(PmcDataContext);

  const name = localeDb[`hideout_area_${props.area.type}_name`];
  const pmcHideoutArea = pmcData.Hideout.Areas.find(
    (pmcArea) => pmcArea.type == props.area.type
  ) as HideoutArea;

  const renderUpgradeCosts = () => {
    const currentStage = props.area.stages[pmcHideoutArea.level + 1];

    if (!currentStage) return <></>;

    const currentStageComponents = currentStage.requirements.map((req) => {
      if (req.type !== "Item") return null;

      const itemName = localeDb[(req.templateId as string) + " Name"];

      return (
        <div className="flex items-center gap-2">
          <p> - {req.count}</p>
          <p>{itemName}</p>
        </div>
      );
    });

    return currentStageComponents;
  };

  return (
    <Card title={name} alt={`Level: ${pmcHideoutArea.level}`}>
      <h5>Next upgrade:</h5>
      <div className="flex flex-col">{renderUpgradeCosts()}</div>
    </Card>
  );
}
