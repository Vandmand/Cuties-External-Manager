import "./App.css";
import { useEffect } from "react";
import React from "react";
import TitleBar from "./titlebar/titlebar";
import {
  createBrowserRouter,
  Navigate,
  redirect,
  RouterProvider,
} from "react-router-dom";
import Main from "./screens/main/main";
import Quests from "./screens/quests/quests";
import Hideout from "./screens/hideout/hideout";
import Settings from "./settings/settings";
import { Theme } from "react-daisyui";
import FleaMarket from "./screens/fleaMarket/fleaMarket";
import Item from "./screens/items/item";
import Items from "./screens/items/items";
import { getAppConfig } from "./data/config";
import Inventory from "./screens/inventory/inventory";
import { RecoilRoot } from "recoil";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      loader: async () => {
        const appConfig = await getAppConfig();

        try {
          const fetchData = await Promise.all([]);

          const fetchDataObject = Object.fromEntries([
            ["profile", fetchData[0]],
            ["quests", fetchData[1]],
            ["localeDb", fetchData[2]],
            ["fleaPrices", fetchData[3]],
          ]);

          return Object.assign({}, fetchDataObject, { appConfig: appConfig });
        } catch (_) {
          redirect("settings");
          return null;
        }
      },
      children: [
        {
          path: "quests",
          element: <Quests />,
        },
        {
          path: "hideout",
          element: <Hideout />,
        },
        {
          path: "settings",
          element: (
            <Settings
              onSettingChange={(settings) => handleSettingChange(settings)}
            />
          ),
        },
        {
          path: "flea",
          element: <FleaMarket />,
        },
        {
          path: "inventory",
          element: <Inventory />,
        },
        {
          path: "items/:p",
          element: <Items />,
        },
        {
          path: "items",
          element: <Navigate to={"../items/1"} />,
        },
        {
          path: "item/:itemId",
          element: <Item />,
        },
      ],
    },
    {
      path: "*",
      element: <Navigate to={"../"} />,
    },
    {
      path: "settings",
      element: <Settings onSettingChange={() => ""} />,
    },
  ]);

  return (
    <RecoilRoot>
      <Theme dataTheme={appConfig.theme}>
        <div className="p-2 flex flex-col gap-2 border-4 border-base-300 bg-base-200 shadow-inner h-screen overflow-hidden">
          <TitleBar />
          <React.Suspense fallback={<p>loading</p>}>
            <RouterProvider router={router} />
          </React.Suspense>
        </div>
      </Theme>
    </RecoilRoot>
  );
}

export default App;
