import { appWindow } from "@tauri-apps/api/window";
import { useState } from "react";

export default function TitleBar() {
  const [href, setHref] = useState("");

  window.addEventListener("locationChange", () =>
    setHref(window.location.pathname)
  );

  return (
    <div className="w-full bg-base-300 flex gap-2 items-center p-1 rounded-lg justify-end shadow-sm">
      <div
        className="flex-1 h-full min-w-0 flex gap-4"
        onMouseDown={() => appWindow.startDragging()}
      >
        <p className="text-sm px-6">Cuties Coop Project - v 1.0</p>
        <p className="text-sm">{"home" + href}</p>
      </div>
      <button
        onClick={() => appWindow.minimize()}
        className="w-4 h-4 bg-green-600 rounded-full"
      />
      <button
        onClick={() => appWindow.maximize()}
        className="w-4 h-4 bg-yellow-500 rounded-full"
      />
      <button
        onClick={() => {
          localStorage.clear(), appWindow.close();
        }}
        className="w-4 h-4 bg-red-600 rounded-full"
      />
    </div>
  );
}
