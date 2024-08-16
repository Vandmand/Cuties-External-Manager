import { IHideout } from "@/types/models/spt/hideout/IHideout";
import HideoutCard from "./hideoutCard";
import useCache from "@/hooks/useCache";
import { useEffect } from "react";
import { getHideout } from "@/serverWrapper/serverWrapper";

export default function Hideout() {
  const [hideout, setHideout] = useCache("Hideout", {} as IHideout);

  useEffect(() => {
    getHideout().then((hideout) => {
      setHideout(hideout);
    });
  }, []);

  if (Object.keys(hideout).length === 0) return <p>Dummy loading</p>;

  const renderHideout = (hideout: IHideout) => {
    return hideout.areas.map((area) => {
      return <HideoutCard area={area} />;
    });
  };

  return <div className="grid gap-8 grid-cols-3">{renderHideout(hideout)}</div>;
}
