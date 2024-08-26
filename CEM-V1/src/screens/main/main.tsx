import SideBar from "@/sidebar/sideBar";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function Main() {
  const href = useLocation().pathname;

  useEffect(() => {
    window.dispatchEvent(new Event("locationChange"));
  }, [href]);

  return (
    <div className="flex gap-4 flex-1 overflow-auto">
      <SideBar />
      <div className="relative overflow-auto flex-grow rounded-lg border-base-300 border-2 p-2 shadow-sm">
        <Outlet />
      </div>
    </div>
  );
}
