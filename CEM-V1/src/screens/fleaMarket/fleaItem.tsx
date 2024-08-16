import { LocaleDbContext } from "@/contextWrapper/contextWrapper";
import { useContext } from "react";

export default function FleaItem(props: { id: string; price: number }) {
  const localeDb = useContext(LocaleDbContext);

  return (
    <div className="flex items-center py-2 border-t-2 border-base-300">
      <h5 className="flex-grow">{localeDb[props.id + " Name"]}</h5>
      <h4 className="font-bold">{props.price + " ₽"}</h4>
    </div>
  );
}
