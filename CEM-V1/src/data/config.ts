import { AppConfig } from "@/types/config/appConfig";
import { appConfigDir } from "@tauri-apps/api/path";
import { fs } from "@tauri-apps/api";

export const getAppConfig = async (): Promise<AppConfig> => {
  const defaultConfig: AppConfig = {
    ip: "127.0.0.1",
    port: 6969,
    profile: undefined,
    theme: "default",
  };

  const filePath = (await appConfigDir()) + "appConfig.json";

  if (await fs.exists(filePath)) {
    // Added in development to fix missing config fields from previous config versions
    const config = Object.assign(
      {},
      defaultConfig,
      JSON.parse(await fs.readTextFile(filePath))
    );

    return config;
  }

  fs.writeFile(filePath, JSON.stringify(defaultConfig));
  return defaultConfig;
};

export const saveAppConfig = async (settings: AppConfig) => {
  const filePath = (await appConfigDir()) + "appConfig.json";

  fs.writeTextFile(filePath, JSON.stringify(settings));
};
