import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "../Home/Home";
import Quests from "../Home/Quests/Quests";
import Items from "../Home/Items/Items";

export default function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      children: [
        {
          path: "quests",
          element: <Quests />,
        },
        {
          path: "items",
          element: <Items />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}
