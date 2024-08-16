import { LocaleDbContext } from "@/contextWrapper/contextWrapper";
import { ReactNode, useContext } from "react";
import { TreeType } from "./inventory";
import { Link } from "react-router-dom";

export default function ParentItem(props: {
  item: TreeType;
  depth: number;
  childRender: (i: TreeType[], d: number) => ReactNode | null;
}) {
  const localeDb = useContext(LocaleDbContext);

  return (
    <div
      tabIndex={0}
      className="collapse collapse-arrow border-l-2 border-base-200 rounded-none shadow-sm"
    >
      <input type="checkbox" />
      <div className="collapse-title flex items-center gap-2">
        <p>{localeDb[props.item.data._tpl + " Name"]}</p>
        <div className="relative">
          <Link
            className="absolute z-10 -translate-y-1/2 h-fit rounded-full text-sm font-bold btn-outline btn btn-circle btn-sm"
            to={"../item/" + props.item.data._tpl}
          >
            ↗
          </Link>
        </div>
      </div>
      <div className="collapse-content">
        {props.childRender(props.item.children, 1 + props.depth)}
      </div>
    </div>
  );
}
