import { getItems } from "@/data/serverWrapper";
import { useContext, useEffect } from "react";
import { LocaleDbContext } from "@/contextWrapper/contextWrapper";
import { Link, useParams } from "react-router-dom";
import useCache from "@/hooks/useCache";

function ItemLink(props: { itemId: string; localeDb: Record<string, string> }) {
  return (
    <Link
      to={"../item/" + props.itemId}
      key={props.itemId}
      className="my-8 py-6 px-8 shadow-sm flex items-center rounded-lg bg-base-100 "
    >
      <h5 className="flex-grow">{props.localeDb[props.itemId + " Name"]}</h5>
      <h6 className="italic">
        {"(" + props.localeDb[props.itemId + " ShortName"] + ")"}
      </h6>
    </Link>
  );
}

export default function Items() {
  const { p } = useParams();
  const page = p ? parseInt(p) : 1;
  const itemsPrPage = 50;

  const localeDb = useContext(LocaleDbContext);
  const [items, setItems] = useCache<string[]>("items", []);

  //TODO fix this
  window.scrollTo(0, 0);

  useEffect(() => {
    getItems().then((items) => setItems(items));
  }, []);

  const renderItems = () => {
    const newItems = items
      .slice(itemsPrPage * (page - 1), itemsPrPage * page)
      .map((itemId) => {
        return <ItemLink itemId={itemId} localeDb={localeDb} />;
      });

    return newItems;
  };

  if (items.length == 0) {
    console.log(items);
    return <p>Dummy Loading</p>;
  }

  return (
    <div className="px-4 flex flex-col items-center gap-8">
      <div className="w-4/5">{renderItems()}</div>
      <div className="flex gap-4">
        <Link className="btn btn-primary" to={"../items/" + (page - 1)}>
          Previous Page
        </Link>
        <Link className="btn btn-primary" to={"../items/" + (page + 1)}>
          Next page
        </Link>
      </div>
    </div>
  );
}
