import { Link } from "react-router-dom";
import questIcon from "@/assets/icons/quest_icon.svg?react";
import itemIcon from "@/assets/icons/item_icon.svg?react";
import inventoryIcon from "@/assets/icons/inventory_icon.svg?react";
import hideoutIcon from "@/assets/icons/hideout_icon.svg?react";
import settingIcons from "@/assets/icons/settings_icon.svg?react";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getAppConfigMutation,
  getAppConfigQuery,
  getProfileIds,
} from "@/queries";
import useHref from "@/hooks/useHref";
import { useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import Indicator from "./indicator";

export default function SideBar() {
  const { data: profileIds } = useQuery(getProfileIds());
  const { data: appConfig } = useQuery(getAppConfigQuery());
  const { mutate: setAppConfig } = useMutation(getAppConfigMutation());
  const href = useHref();
  const [modalState, setModalState] = useState<boolean>(true);
  const connectionStatus = <Indicator.Connected />;

  useHotkeys("ctrl+k", () => setModalState(!modalState));

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
          id={route.name}
          key={route.name}
          className={`btn ${
            current ? "btn-primary" : "btn-ghost"
          } w-full flex items-center gap-2`}
          to={route.to}
        >
          <route.icon />
          <p className="flex-grow text-left">{route.name}</p>
        </Link>
      );
    });
  };

  const renderProfileIds = () => {
    return profileIds?.map((profile, i) => (
      <button
        key={i.toString()}
        className="btn"
        onClick={() =>
          appConfig ? setAppConfig({ ...appConfig, profile: profile }) : null
        }
      >
        {profile?.name}
      </button>
    ));
  };

  const renderIndicators = () => {
    switch (connectionStatus) {
      case undefined:
        return <Indicator.Connecting />;
      case true:
        return <Indicator.Connected />;
      case false:
        return <Indicator.Failed />;
      default:
        return <Indicator.Connecting />;
    }
  };

  return (
    <div className="flex flex-col rounded-lg p-2 items-center gap-8 shadow bg-neutral text-base-100">
      <button
        className="input text-base-content flex items-center gap-4"
        onClick={() => setModalState(false)}
      >
        Search
        <div className="flex gap-1">
          <div className="kbd kbd-sm">ctrl</div>+
          <div className="kbd kbd-sm">k</div>
        </div>
      </button>
      <div
        hidden={modalState}
        className="left-0 top-0 w-screen h-screen backdrop-blur z-50 fixed"
      >
        <div className="flex items-center justify-center h-full w-full">
          <div className="modal-box w-4/5 h-3/5">
            <div className="flex items-center gap-4">
              <input
                type="text"
                className="input flex-grow input-primary"
                placeholder="Search anything"
              />
              <button
                className="btn btn-circle"
                onClick={() => setModalState(true)}
              >
                X
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 items-center justify-center flex-1 w-full">
        {renderRouteTabs()}
      </div>
      <div className="flex items-center gap-2 w-full">
        <div className="dropdown dropdown-top w-full">
          <button className="btn w-full ">
            <p className="flex-grow text-left">
              {appConfig?.profile?.name ?? "Profile"}
            </p>
            {renderIndicators()}
          </button>
          <div className="menu dropdown-content w-full gap-2 ">
            {renderProfileIds()}
          </div>
        </div>
      </div>
    </div>
  );
}
