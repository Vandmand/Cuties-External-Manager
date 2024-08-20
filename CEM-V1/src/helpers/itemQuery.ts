import { Item } from "@/types/models/eft/common/tables/IItem";

export type TreeType = { data: Item; children: TreeType[] };

export const itemList = (items: Item[]) => {
  const itemList: Record<string, number> = {};

  items.forEach((item) => {
    const count = item.upd?.StackObjectsCount ?? 1;

    if (itemList[item._tpl]) {
      itemList[item._tpl] += count;
      return;
    }

    itemList[item._tpl] = count;
  });

  return itemList;
};
