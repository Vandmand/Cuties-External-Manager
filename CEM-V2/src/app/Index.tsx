import Router from "./Components/Router";
import usePing from "@/src/Hooks/usePing";

export default function Index() {
  const serverResponse = usePing();

  if (!serverResponse || serverResponse !== 200) {
    return <></>;
  }

  return (
    <div className="h-[100vh] w-[100vw] overflow-hidden">
      <Router />
    </div>
  );
}
