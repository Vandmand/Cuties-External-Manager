import "./App.css";
import TitleBar from "./titlebar/titlebar";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Main from "./screens/main/main";
import Quests from "./screens/quests/quests";
import Hideout from "./screens/hideout/hideout";
import Settings from "./settings/settings";
import { Theme } from "react-daisyui";
import Item from "./screens/items/item";
import Items from "./screens/items/items";
import Inventory from "./screens/inventory/inventory";
import { useQuery } from "@tanstack/react-query";
import { getAppConfigQuery } from "./queries";
import { setIp, setPort } from "./data/serverWrapper";

function App() {
  const { data: appConfig } = useQuery(getAppConfigQuery());

  if (appConfig) {
    setIp(appConfig.ip);
    setPort(appConfig.port);
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
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
          element: <Settings />,
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
      element: <Settings />,
    },
  ]);

  return (
    <Theme dataTheme={appConfig?.theme ?? "carbon"}>
      <div className="p-2 flex flex-col gap-2 border-4 border-base-300 bg-base-200 shadow-inner h-screen overflow-hidden">
        <TitleBar />
        <RouterProvider router={router} />
      </div>
    </Theme>
  );
}

export default App;
