import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getItems, getLocaleDb } from "@/queries";
import PageSkeleton from "@/dummyComponents/pageSkeleton";
import { useContext, useState } from "react";
import { scrollContext } from "../main/main";

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
  const [page, setPage] = useState(1);
  const scrollTop = useContext(scrollContext);
  const ITEMS_PR_PAGE = 50;

  const { data: items } = useQuery(getItems());

  if (!items) {
    return <PageSkeleton />;
  }

  const changePage = (n: number) => {
    setPage(n);
    scrollTop(0);
  };

  const renderItems = () => {
    const newItems = items
      .slice(ITEMS_PR_PAGE * (page - 1), ITEMS_PR_PAGE * page)
      .map((itemId) => {
        return <ItemLink itemId={itemId} key={itemId} />;
      });

    return newItems;
  };

  return (
    <div className="px-4 flex flex-col items-center gap-8">
      <div className="w-4/5">{renderItems()}</div>
      <div className="join">
        <button className="btn join-item" onClick={() => changePage(page - 1)}>
          «
        </button>
        <button className="join-item btn">Page {page}</button>
        <button className="btn  join-item" onClick={() => changePage(page + 1)}>
          »
        </button>
      </div>
    </div>
  );
}
