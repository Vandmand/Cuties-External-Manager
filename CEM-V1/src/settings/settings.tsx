import { AppConfigContext } from "@/contextWrapper/contextWrapper";
import useCache from "@/hooks/useCache";
import { getPmcIds } from "@/data/apiWrapper";
import { AppConfig } from "@/types/config/appConfig";
import { useContext, useEffect, useState } from "react";

export default function Settings(props: {
  onSettingChange: (config: AppConfig) => void;
}) {
  const appConfig = useContext(AppConfigContext);

  const [appConfigState, setAppConfigState] = useState<AppConfig>(appConfig);
  const [allProfiles, setAllProfiles] = useCache<
    { id: string; name: string }[]
  >("profileList", []);

  useEffect(() => {
    getPmcIds().then((profiles) => setAllProfiles(profiles));
  }, []);

  const renderThemeOptions = () => {
    //TODO Fix types to reflect the types defined in appConfig
    return [
      "carbon",
      "light",
      "retro",
      "lemonade",
      "nord",
      "black",
      "luxury",
      "coffee",
    ].map((type) => (
      <button
        className="btn btn-ghost"
        key={type}
        onClick={() =>
          setAppConfigState(Object.assign({}, appConfigState, { theme: type }))
        }
      >
        {type}
      </button>
    ));
  };

  const renderProfileOptions = () => {
    return allProfiles.map((profile) => (
      <button
        className="btn btn-ghost"
        onClick={() =>
          setAppConfigState(
            Object.assign({}, appConfigState, { profile: profile })
          )
        }
      >
        {profile.name}
      </button>
    ));
  };

  return (
    <div className="flex flex-col justify-center gap-4">
      <label className="label label-text">Server ip:</label>
      <input
        className="input input-bordered"
        type="text"
        value={appConfigState.ip}
        placeholder="127.0.0.1"
        onChange={(val) =>
          setAppConfigState(
            Object.assign({}, appConfigState, { ip: val.target.value })
          )
        }
      />
      <label className="label label-text">Server port:</label>
      <input
        className="input input-bordered"
        placeholder="6969"
        type="number"
        onChange={(val) =>
          setAppConfigState(
            Object.assign({}, appConfigState, { port: val.target.value })
          )
        }
        value={appConfigState.port}
      />
      <label className="label label-text">Theme:</label>
      <details className="dropdown">
        <summary className="btn btn-outline shadow-sm">
          {appConfigState.theme}
        </summary>
        <ul className="dropdown-content rounded-md bg-base-100 shadow flex flex-col gap-4 p-4">
          {renderThemeOptions()}
        </ul>
      </details>
      <label className="label label-text">Profile:</label>
      <details className="dropdown">
        <summary className="btn btn-outline shadow-sm">
          {appConfigState.profile.name}
        </summary>
        <ul className="dropdown-content rounded-md bg-base-100 shadow flex flex-col gap-4 p-4">
          {renderProfileOptions()}
        </ul>
      </details>
      <button
        className="btn-primary btn"
        onClick={() => props.onSettingChange(appConfigState)}
      >
        Save Config
      </button>
    </div>
  );
}
