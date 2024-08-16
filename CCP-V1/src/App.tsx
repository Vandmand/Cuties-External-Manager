import "./App.css";
import { useEffect } from "react";
import TitleBar from "./titlebar/titlebar";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Main from "./screens/main/main";
import Quests from "./screens/quests/quests";
import Hideout from "./screens/hideout/hideout";
import { AppConfig } from "./types/config/appConfig";
import Settings from "./settings/settings";
import { Theme } from "react-daisyui";
import FleaMarket from "./screens/fleaMarket/fleaMarket";
import Item from "./screens/items/item";
import Items from "./screens/items/items";
import { getAppConfig, saveAppConfig } from "./config/config";
import useCache from "./hooks/useCache";
import Inventory from "./screens/inventory/inventory";

function App() {
  const [appConfig, setAppConfig] = useCache("appConfig", {} as AppConfig);

  useEffect(() => {
    getAppConfig().then((config) => setAppConfig(config));
  }, []);

  const handleSettingChange = async (settings: AppConfig) => {
    await saveAppConfig(settings);
    setAppConfig(settings);
    window.location.reload();
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Main
          appConfig={appConfig}
          onSettingChange={(s) => handleSettingChange(s)}
        />
      ),
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
  ]);

  return (
    <Theme dataTheme={appConfig.theme}>
      <div className="p-2 flex flex-col gap-2 border-4 border-base-300 bg-base-200 shadow-inner h-screen overflow-hidden">
        <TitleBar />
        {Object.keys(appConfig).length === 0 ? (
          <></>
        ) : (
          <RouterProvider router={router} />
        )}
      </div>
    </Theme>
  );
}

export default App;
