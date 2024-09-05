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
import useHref from "@/hooks/useHref";

export default function SideBar() {
  const { data: profileIds } = useQuery(getProfileIds());
  const { data: appConfig } = useQuery(getAppConfigQuery());
  const { mutate: setAppConfig } = useMutation(getAppConfigMutation());
  const href = useHref();

  const renderRouteTabs = () => {
    const routes = [
      {
        name: "Quests",
        icon: questIcon,
        to: "quests",
      },
      {
        name: "Hideout",
        icon: hideoutIcon,
        to: "hideout",
      },
      {
        name: "Inventory",
        icon: inventoryIcon,
        to: "inventory",
      },
      {
        name: "Items",
        icon: itemIcon,
        to: "items",
      },
      {
        name: "Settings",
        icon: settingIcons,
        to: "settings",
      },
    ];

    return routes.map((route) => {
      const current = href.split("/")[1] === route.name.toLowerCase();

      return (
        <Link
          key={route.name}
          className={`btn ${
            current ? "btn-primary" : "btn-ghost"
          } w-full flex items-center gap-2`}
          to={route.to}
        >
          <img src={route.icon} alt="" />{" "}
          <p className="flex-grow text-left">{route.name}</p>
        </Link>
      );
    });
  };

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
    <div className="flex flex-col rounded-lg p-2 items-center gap-8 shadow bg-neutral text-base-100">
      <button className="input text-base-content flex items-center gap-4">
        Search
        <div className="flex gap-1">
          <div className="kbd kbd-sm">ctrl</div>+
          <div className="kbd kbd-sm">k</div>
        </div>
      </button>
      <div className="flex flex-col gap-4 items-center justify-center flex-1 w-full">
        {renderRouteTabs()}
      </div>
      <div className="flex items-center gap-2 w-full">
        <div className="dropdown dropdown-top w-full">
          <button className="btn w-full ">
            <p className="flex-grow text-left">
              {appConfig?.profile?.name ?? "Profile"}
            </p>
            <div className="rounded-full h-3 w-3 bg-green-500 shadow" />
          </button>
          <div className="menu dropdown-content w-full gap-2 ">
            {renderProfileIds()}
          </div>
        </div>
      </div>
    </div>
  );
}
