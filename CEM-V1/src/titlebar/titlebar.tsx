import useHref from "@/hooks/useHref";
import { appWindow } from "@tauri-apps/api/window";

export default function TitleBar() {
  const href = useHref();

  const renderBreadcrumbs = () => {
    return href
      .split("/")
      .map((crumb, i) => (crumb ? <li key={i}>{crumb}</li> : null));
  };

  return (
    <div className="w-full bg-neutral rounded-lg shadow px-2 flex items-center">
      <div
        className="flex-1 h-full min-w-0 flex gap-4 justify-center"
        onMouseDown={() => appWindow.startDragging()}
      >
        <div className="breadcrumbs text-base-100">
          <ul className="text-sm">
            <li>Home</li>
            {renderBreadcrumbs()}
          </ul>
        </div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => appWindow.minimize()}
          className="w-4 h-4 bg-green-600 rounded-full shadow"
        />
        <button
          onClick={() => appWindow.maximize()}
          className="w-4 h-4 bg-yellow-500 rounded-full shadow"
        />
        <button
          onClick={() => {
            localStorage.clear(), appWindow.close();
          }}
          className="w-4 h-4 bg-red-600 rounded-full shadow"
        />
      </div>
    </div>
  );
}
