import { getAppConfigMutation, getAppConfigQuery } from "@/queries";
import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";

const themeOptions = [
  "carbon",
  "light",
  "retro",
  "lemonade",
  "nord",
  "black",
  "coffee",
];

export default function Settings() {
  const { data: appConfig } = useQuery(getAppConfigQuery());
  const { mutate: setAppConfig } = useMutation(getAppConfigMutation());

  const [appConfigState, setAppConfigState] = useState(appConfig);

  if (!appConfig || !appConfigState) return <p>Loading</p>;

  const renderThemeOptions = () => {
    //TODO Fix types to reflect the types defined in appConfig
    return themeOptions.map((type) => (
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
      <button
        className="btn-primary btn"
        onClick={() => setAppConfig(appConfigState)}
      >
        Save Config
      </button>
    </div>
  );
}
