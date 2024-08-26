import { itemList } from "@/helpers/itemQuery";
import { getAppConfigQuery, getLocaleDb, getProfile } from "@/queries";
import { HideoutArea } from "@/types/models/eft/common/tables/IBotBase";
import { IHideoutArea } from "@/types/models/eft/hideout/IHideoutArea";
import { useQuery } from "@tanstack/react-query";

export default function HideoutCard(props: { area: IHideoutArea }) {
  const { data: localeDb } = useQuery(getLocaleDb());
  const { data: appConfig } = useQuery(getAppConfigQuery());
  const { data: profile } = useQuery(getProfile(appConfig?.profile?.id ?? ""));

  if (!localeDb || !profile) return;

  const name = localeDb[`hideout_area_${props.area.type}_name`];
  const pmcHideoutArea = profile.Hideout.Areas.find(
    (pmcArea) => pmcArea.type == props.area.type
  ) as HideoutArea;

  const renderUpgradeCosts = () => {
    const currentStage = props.area.stages[pmcHideoutArea.level + 1];

    if (!currentStage) return <></>;

    const currentStageComponents = currentStage.requirements.map((req) => {
      if (req.type !== "Item") return null;

      const itemMatch =
        itemList(profile.Inventory.items)[req.templateId ?? ""] ?? 0;

      const itemName = localeDb[(req.templateId as string) + " Name"];

      return (
        <div className="flex flex-col">
          <div className="flex items-center">
            <p>{itemName}</p>
            <p className="flex-grow-0">{`${itemMatch}/${req.count}`}</p>
          </div>
          <progress className="progress" value={itemMatch} max={req.count} />
        </div>
      );
    });

    return currentStageComponents;
  };

  return (
    <div className="card bg-base-100 shadow">
      <div className="card-body">
        <div className="card-title flex">
          <h3>{name}</h3>
        </div>
        <h5>Next upgrade:</h5>
        <div className="flex flex-col gap-4">{renderUpgradeCosts()}</div>
      </div>
    </div>
  );
}
