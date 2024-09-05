import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getItems, getLocaleDb } from "@/queries";
import PageSkeleton from "@/dummyComponents/pageSkeleton";

function ItemLink(props: { itemId: string }) {
  const { data: localeDb } = useQuery(getLocaleDb());

  if (!localeDb) return <p>link</p>;

  return (
    <Link
      to={"../item/" + props.itemId}
      key={props.itemId}
      className="my-8 py-6 px-8 shadow-sm flex items-center rounded-lg bg-base-100 "
    >
      <h5 className="flex-grow">{localeDb[props.itemId + " Name"]}</h5>
      <h6 className="italic">
        {"(" + localeDb[props.itemId + " ShortName"] + ")"}
      </h6>
    </Link>
  );
}

export default function Items() {
  const { p } = useParams();
  const page = p ? parseInt(p) : 1;
  const itemsPrPage = 50;

  const { data: items } = useQuery(getItems());

  //TODO fix this
  //TODO Still need to fix this bug
  window.scrollTo(0, 0);

  if (!items) {
    return <PageSkeleton />;
  }

  const renderItems = () => {
    const newItems = items
      .slice(itemsPrPage * (page - 1), itemsPrPage * page)
      .map((itemId) => {
        return <ItemLink itemId={itemId} />;
      });

    return newItems;
  };

  return (
    <div className="px-4 flex flex-col items-center gap-8">
      <div className="w-4/5">{renderItems()}</div>
      <div className="join">
        <Link className="btn join-item" to={"../items/" + (page - 1)}>
          «
        </Link>
        <button className="join-item btn">Page 22</button>
        <Link className="btn  join-item" to={"../items/" + (page + 1)}>
          »
        </Link>
      </div>
    </div>
  );
}
