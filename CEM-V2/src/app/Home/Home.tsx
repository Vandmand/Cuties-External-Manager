import { Outlet } from "react-router";
import SideBar from "./Components/SideBar";
import ServerProvider from "../Components/ServerProvider";

export default function Home() {
  return (
    <ServerProvider>
      <div className="flex h-full w-full">
        <SideBar />
        <div className="overflow-y-scroll w-full no-scrollbar">
          <Outlet />
        </div>
      </div>
    </ServerProvider>
  );
}
