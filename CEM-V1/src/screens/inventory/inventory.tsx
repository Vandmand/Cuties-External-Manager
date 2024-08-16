import {
  LocaleDbContext,
  PmcDataContext,
} from "@/contextWrapper/contextWrapper";
import { Item } from "@/types/models/eft/common/tables/IItem";
import { arrayToTree } from "performant-array-to-tree";
import { useContext } from "react";
import RootItem from "./rootItem";
import LeafItem from "./leafItem";
import ParentItem from "./parentItem";

export type TreeType = { data: Item; children: TreeType[] };

export default function Inventory() {
  const pmcData = useContext(PmcDataContext);

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

  const itemTree = arrayToTree(pmcData.Inventory.items, {
    id: "_id",
  }) as unknown as TreeType[];

  return (
    <div className="flex flex-col items-center gap-4 p-8">
      {renderInventory(itemTree)}
    </div>
  );
}
