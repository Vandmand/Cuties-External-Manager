import { ReactNode } from "react";
import { TreeType } from "@/helpers/itemQuery";
import { useQuery } from "@tanstack/react-query";
import { getLocaleDb } from "@/queries";

export default function RootItem(props: {
  item: TreeType;
  depth: number;
  childRender: (i: TreeType[], d: number) => ReactNode | null;
}) {
  const { data: localeDb } = useQuery(getLocaleDb());

  if (!localeDb) return;

  return (
    <div
      tabIndex={0}
      className="collapse collapse-arrow bg-base-100 rounded-lg shadow-sm border-2 border-base-300 p-4"
    >
      <input type="checkbox" />
      <h5 className="collapse-title font-bold">
        {localeDb[props.item.data._tpl + " Name"]}
      </h5>
      <div className="collapse-content">
        {props.childRender(props.item.children, 1 + props.depth)}
      </div>
    </div>
  );
}
