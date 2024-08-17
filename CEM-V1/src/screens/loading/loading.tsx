import { getPing } from "@/data/serverWrapper";
import Settings from "@/settings/settings";
import { AppConfig } from "@/types/config/appConfig";
import { useEffect, useState } from "react";

export default function Loading(props: {
  onSettingsChange: (s: AppConfig) => void;
}) {
  const [pingResponse, setPingResponse] = useState<Response | null>(null);

  useEffect(() => {
    getPing().then((res) => {
      setPingResponse(res);
    });
  }, []);

  if (!pingResponse) {
    return (
      <div className="rounded-lg border-2 border-base-300 h-full flex items-center justify-center gap-4">
        <h1>Loading</h1>
        <div className="loading loading-dots loading-lg" />
      </div>
    );
  }

  if (!pingResponse.ok) {
    return (
      <div className="flex flex-col gap-8 items-center justify-center h-full p-16 overflow-y-scroll">
        <h1>Unable To connect. Check settings</h1>
        <div className="w-full">
          <Settings onSettingChange={props.onSettingsChange} />
        </div>
        <button
          className="w-full btn btn-primary"
          onClick={() => window.location.reload()}
        >
          Refresh
        </button>
      </div>
    );
  }

  return <p></p>;
}
