import { useEffect, useState } from "react";
import useLocal from "./useLocal";

export default function usePing() {
  const { config } = useLocal();
  const [res, setRes] = useState<number | null>(null);

  const ping = async () => {
    const url = `https://${config.ip}:${config.port}/cem/ping`;
    const response = await fetch(url);

    return response.status;
  };

  useEffect(() => {
    const a = async () => {
      setRes(await ping());
    };

    a();
  });

  return res;
}
