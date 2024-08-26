import Spacer from "@/dummyComponents/spacer";
import { Link } from "react-router-dom";
import questIcon from "@/assets/icons/quest_icon.svg";
import itemIcon from "@/assets/icons/item_icon.svg";
import inventoryIcon from "@/assets/icons/inventory_icon.svg";
import hideoutIcon from "@/assets/icons/hideout_icon.svg";
import settingIcons from "@/assets/icons/settings_icon.svg";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getAppConfigMutation,
  getAppConfigQuery,
  getProfileIds,
} from "@/queries";

export default function SideBar() {
  const { data: profileIds } = useQuery(getProfileIds());
  const { data: appConfig } = useQuery(getAppConfigQuery());
  const { mutate: setAppConfig } = useMutation(getAppConfigMutation());

  const renderProfileIds = () => {
    return profileIds?.map((profile) => (
      <button
        className="btn"
        onClick={() =>
          appConfig ? setAppConfig({ ...appConfig, profile: profile }) : null
        }
      >
        {profile?.name}
      </button>
    ));
  };

  return (
    <div className="flex flex-col border-2 border-base-300 rounded-lg p-2 items-center gap-8 shadow-sm min-w-fit">
      <div className="">tabs</div>
      <div className="flex flex-col gap-4 items-center justify-center flex-1">
        <Link
          className="btn shadow-none w-full flex items-center gap-2"
          to={"quests"}
        >
          <img src={questIcon} alt="" />{" "}
          <p className="flex-grow text-left">Quests</p>
        </Link>
        <Spacer.Horizontal />
        <Link
          className="btn shadow-none w-full flex items-center gap-2"
          to={"hideout"}
        >
          <img src={hideoutIcon} alt="" />{" "}
          <p className="flex-grow text-left">Hideout</p>
        </Link>
        <Spacer.Horizontal />
        <Link className="btn shadow-none w-full flex items-center" to={"items"}>
          <img src={itemIcon} alt="" />{" "}
          <p className="flex-grow text-left">Items</p>
        </Link>
        <Spacer.Horizontal />
        <Link
          className="btn shadow-none w-full flex items-center"
          to={"inventory"}
        >
          <img src={inventoryIcon} alt="" />{" "}
          <p className="flex-grow text-left">Inventory</p>
        </Link>
        <Spacer.Horizontal />
        <Link
          className="btn shadow-none w-full flex items-center"
          to={"settings"}
        >
          <img src={settingIcons} alt="Settings" />
          <p className="flex-grow text-left">Settings</p>
        </Link>
      </div>
      <div className="flex items-center gap-2 w-full">
        <div className="dropdown dropdown-top w-full">
          <button className="btn btn-outline w-full ">
            <p className="flex-grow">{appConfig?.profile?.name ?? "Profile"}</p>
            <div className="rounded-full h-3 w-3 bg-green-500"></div>
          </button>
          <div className="dropdown-content">{renderProfileIds()}</div>
        </div>
      </div>
    </div>
  );
}
