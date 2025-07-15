import { Config } from "@/src/types/config";
import { ReactNode, useEffect, useState } from "react";
import useLocal from "./useLocal";

const getUrlParamiters = (parameters: Record<string, string>) => {
  const params = new URLSearchParams();

  for (const key in parameters) {
    if (parameters.hasOwnProperty(key)) {
      params.append(key, parameters[key]);
    }
  }

  return params.toString();
};

const getUrl = (
  config: Config,
  endpoint: string,
  parameters?: Record<string, string>
) => {
  const urlParams = parameters ? getUrlParamiters(parameters) : "";

  return `https://${config.ip}:${config.port}/${endpoint}?${urlParams}`;
};

type useServerEndpointProps<T> = {
  urlEndpoint: string;
  params?: Record<string, string>;
  context: React.Context<T | undefined>;
};

export default function useServerEndpoint<T>(props: useServerEndpointProps<T>) {
  const { config } = useLocal();
  const context = props.context;
  const url = getUrl(config, props.urlEndpoint, props.params);

  const [state, setState] = useState<T>();

  const Component = (props: { children: ReactNode }) => (
    <context.Provider value={state}>{props.children}</context.Provider>
  );

  const update = async () => {
    const response = await fetch(url);
    setState(await response.json());
  };

  useEffect(() => {
    update();
  }, []);

  return { update, Component };
}
