import { Config } from "@/src/types/config";
import { useState } from "react";

const CONFIG_KEY = "Config";

const defaultConfig: Config = {
  ip: "127.0.0.1",
  port: "6969",
  profile: null,
};

export default function useLocal() {
  const getConfig = () => {
    const storedConfig = localStorage.getItem(CONFIG_KEY);

    if (!storedConfig) {
      localStorage.setItem(CONFIG_KEY, JSON.stringify(defaultConfig));
      return defaultConfig;
    }

    // Override field in default with stored
    // so that no expected field is left empty
    const parsed = JSON.parse(storedConfig);
    return Object.assign({}, defaultConfig, parsed);
  };

  const [config, setConfig] = useState<Config>(getConfig());

  const updateConfig = (partialConfig: Partial<Config>) => {
    const newConfig: Config = Object.assign({}, config, partialConfig);

    localStorage.setItem(CONFIG_KEY, JSON.stringify(newConfig));
    setConfig(newConfig);
  };

  return { config, updateConfig };
}
