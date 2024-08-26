import { AppConfig } from "@/types/config/appConfig";
import { appConfigDir, BaseDirectory } from "@tauri-apps/api/path";
import { fs } from "@tauri-apps/api";

export const getAppConfig = async (): Promise<AppConfig> => {
  const defaultConfig: AppConfig = {
    ip: "127.0.0.1",
    port: 6969,
    profile: undefined,
    theme: "default",
  };

  const fileName = "appConfig.json";

  if (await fs.exists(fileName, { dir: BaseDirectory.AppConfig })) {
    // Added in development to fix missing config fields from previous config versions
    const config = Object.assign(
      {},
      defaultConfig,
      JSON.parse(
        await fs.readTextFile(fileName, { dir: BaseDirectory.AppConfig })
      )
    );

    return config;
  }

  fs.createDir("", { dir: BaseDirectory.AppConfig });

  fs.writeFile(fileName, JSON.stringify(defaultConfig), {
    dir: BaseDirectory.AppConfig,
  });

  return defaultConfig;
};

export const saveAppConfig = async (settings: AppConfig) => {
  const filePath = (await appConfigDir()) + "appConfig.json";

  fs.writeTextFile(filePath, JSON.stringify(settings));
};
