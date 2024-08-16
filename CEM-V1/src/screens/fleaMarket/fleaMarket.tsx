import {
  FleaMarketContext,
  LocaleDbContext,
} from "@/contextWrapper/contextWrapper";
import { useContext } from "react";
import { Input } from "react-daisyui";
import { useState } from "react";
import FleaItem from "./fleaItem";

export default function FleaMarket() {
  const fleaMarket = useContext(FleaMarketContext);
  const localeDb = useContext(LocaleDbContext);

  const [searchString, setSearchString] = useState("");

  const renderQuery = (query: Record<string, string>) => {
    //TODO separate filter to other function
    return Object.entries(query)
      .filter((entry) =>
        localeDb[entry[0] + " Name"].toLowerCase().includes(searchString)
      )
      .map((entry) => {
        return <FleaItem id={entry[0]} price={parseInt(entry[1])} />;
      });
  };

  return (
    <div className="p-4 flex flex-col gap-4">
      <Input
        color="primary"
        placeholder="Search for an item"
        className="w-full"
        onChange={(e) => setSearchString(e.target.value.toLowerCase())}
      />
      <div className="flex flex-col">{renderQuery(fleaMarket)}</div>
    </div>
  );
}
