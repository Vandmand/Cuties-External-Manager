import QuestIcon from "@/src/assets/icons/quest_icon.svg?react";
import ItemIcon from "@/src/assets/icons/item_icon.svg?react";
import inventoryIcon from "@/assets/icons/inventory_icon.svg?react";
import hideoutIcon from "@/assets/icons/hideout_icon.svg?react";
import settingIcons from "@/assets/icons/settings_icon.svg?react";
import Status from "./Status";
import { Link } from "react-router";
import SideBarRouteButton from "./SideBarRouteButton";

//TODO make sidebar sticky
export default function SideBar() {
  return (
    <div className="flex flex-col h-full rounded-field p-2">
      <div className="flex flex-col justify-around grow p-2 items-center">
        <SideBarRouteButton route="/quests" icon={QuestIcon} name="Quests" />
        <SideBarRouteButton route="/items" icon={ItemIcon} name="Items" />
        <p>ppp</p>
      </div>
      <Status />
    </div>
  );
}
