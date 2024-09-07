import { IHideout } from "@/types/models/spt/hideout/IHideout";
import HideoutCard from "./hideoutCard";
import { useQuery } from "@tanstack/react-query";
import { getHideout } from "@/queries";
import PageSkeleton from "@/dummyComponents/pageSkeleton";

export default function Hideout() {
  const { data: hideout } = useQuery(getHideout());

  if (!hideout) return <PageSkeleton />;

  const renderHideout = (hideout: IHideout) => {
    return hideout.areas.map((area) => {
      return <HideoutCard area={area} key={area._id} />;
    });
  };

  return (
    <div className="grid gap-8 grid-cols-3 p-8">{renderHideout(hideout)}</div>
  );
}
