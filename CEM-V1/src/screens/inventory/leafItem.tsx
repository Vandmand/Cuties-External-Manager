import { LocaleDbContext } from "@/contextWrapper/contextWrapper";
import { useContext } from "react";
import { TreeType } from "@/helpers/itemQuery";
import { Link } from "react-router-dom";

export default function LeafItem(props: { item: TreeType; depth: number }) {
  const localeDb = useContext(LocaleDbContext);
  const stackCount = props.item.data.upd?.StackObjectsCount;

  return (
    <div className="p-4 flex gap-2 items-center">
      <p>{localeDb[props.item.data._tpl + " Name"]}</p>
      {stackCount}
      <div className="relative">
        <Link
          className="absolute z-10 -translate-y-1/2 h-fit rounded-full text-sm font-bold btn-outline btn btn-circle btn-sm"
          to={"../item/" + props.item.data._tpl}
        >
          ↗
        </Link>
      </div>
    </div>
  );
}
