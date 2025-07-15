interface Profile {
  id: string;
  name: string;
}

export interface Config {
  ip: string;
  port: string;
  profile: Profile | null;
}
