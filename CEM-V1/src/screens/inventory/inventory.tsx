import { arrayToTree } from "performant-array-to-tree";
import { useContext } from "react";
import RootItem from "./rootItem";
import LeafItem from "./leafItem";
import ParentItem from "./parentItem";
import { TreeType } from "@/helpers/itemQuery";
import { useQuery } from "@tanstack/react-query";
import { getAppConfigQuery, getProfile } from "@/queries";
import PageSkeleton from "@/dummyComponents/pageSkeleton";

export default function Inventory() {
  const { data: appConfig } = useQuery(getAppConfigQuery());
  const { data: profile } = useQuery(
    getProfile(appConfig?.profile?.name ?? "")
  );

  if (!profile) return <PageSkeleton />;

  const renderInventory = (inventoryList: TreeType[], depth = 1) => {
    const accordionItems = inventoryList.map((item) => {
      if (depth === 1)
        return (
          <RootItem
            item={item}
            depth={1 + depth}
            childRender={renderInventory}
          />
        );

      if (item.children.length === 0)
        return <LeafItem item={item} depth={1 + depth} />;

      return (
        <ParentItem
          item={item}
          depth={1 + depth}
          childRender={renderInventory}
        />
      );
    });

    return accordionItems;
  };

  const itemTree = arrayToTree(profile.Inventory.items, {
    id: "_id",
  }) as unknown as TreeType[];

  return (
    <div className="flex flex-col items-center gap-4 p-8">
      {renderInventory(itemTree)}
    </div>
  );
}
