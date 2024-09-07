import SideBar from "@/sidebar/sideBar";
import { Outlet, useLocation } from "react-router-dom";
import { createContext, useEffect, useRef } from "react";

export default function Main() {
  const href = useLocation().pathname;
  const scrollElementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.dispatchEvent(new Event("locationChange"));
  }, [href]);

  const scrollTo = (h: number) => {
    console.log("hi");
    if (!scrollElementRef.current) return;

    scrollElementRef.current.scroll({
      top: h,
    });
  };

  return (
    <div className="flex gap-4 flex-1 overflow-auto">
      <SideBar />
      <scrollContext.Provider value={scrollTo}>
        <div
          className="relative overflow-auto flex-grow "
          ref={scrollElementRef}
        >
          <Outlet />
        </div>
      </scrollContext.Provider>
    </div>
  );
}

export const scrollContext = createContext((h: number) => {});
