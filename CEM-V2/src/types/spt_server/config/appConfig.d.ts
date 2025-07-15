export type themeOptions = "default" | "light" | "retro" | "lemonade" | "nord";
export interface AppConfig {
  ip: string;
  port: number;
  theme: themeOptions;
  profile:
    | {
        id: string;
        name: string;
      }
    | undefined;
}
