import Card from "@/dummyComponents/card";
import { Props } from "@/types/models/eft/common/tables/ITemplateItem";
import { useParams } from "react-router-dom";
import { convertToWikiLink } from "@/helpers/links";
import { useQuery } from "@tanstack/react-query";
import { getFleaPrices, getItem, getLocaleDb } from "@/queries";
import PageSkeleton from "@/dummyComponents/pageSkeleton";

export default function Item() {
  const { itemId } = useParams();

  const { data: localeDb } = useQuery(getLocaleDb());
  const { data: fleaMarket } = useQuery(getFleaPrices());
  const { data: itemData } = useQuery(getItem(itemId ?? ""));

  if (!itemData || !fleaMarket || !localeDb) {
    return <PageSkeleton />;
  }

  const renderProps = () => {
    const propRenderMethod: {
      propKey: keyof Props;
      renderCondition: (prop: any) => boolean;
      element: (prop: any, key: string) => JSX.Element;
    }[] = [
      {
        propKey: "Weight",
        renderCondition: (prop) => prop !== 0,
        element: (prop) => {
          return (
            <div className="flex gap-4 items-center">
              <p>Weight : </p>
              <p>{prop}</p>
            </div>
          );
        },
      },
      {
        propKey: "Durability",
        renderCondition: (prop) => prop !== 0,
        element: (prop) => (
          <div className="flex gap-4 items-center">
            <p>Durability : </p>
            <p>{prop}</p>
          </div>
        ),
      },
      {
        propKey: "Accuracy",
        renderCondition: (prop) => prop !== 0,
        element: (prop) => (
          <div className="flex gap-4 items-center">
            <p>Accuracy : </p>
            <p>{prop}</p>
          </div>
        ),
      },
      {
        propKey: "Recoil",
        renderCondition: (prop) => prop !== 0,
        element: (prop) => (
          <div className="flex gap-4 items-center">
            <p>Recoil : </p>
            <p>{prop}</p>
          </div>
        ),
      },
      {
        propKey: "Loudness",
        renderCondition: (prop) => prop !== 0,
        element: (prop) => (
          <div className="flex gap-4 items-center">
            <p>Loudness : </p>
            <p>{prop}</p>
          </div>
        ),
      },
      {
        propKey: "Recoil",
        renderCondition: (prop) => prop !== 0,
        element: (prop) => (
          <div className="flex gap-4 items-center">
            <p>Recoil : </p>
            <p>{prop}</p>
          </div>
        ),
      },
      {
        propKey: "EffectiveDistance",
        renderCondition: (prop) => prop !== 0,
        element: (prop) => (
          <div className="flex gap-4 items-center">
            <p>Effective Distance : </p>
            <p>{prop}</p>
          </div>
        ),
      },
      {
        propKey: "Velocity",
        renderCondition: (prop) => prop !== 0,
        element: (prop) => (
          <div className="flex gap-4 items-center">
            <p>Velocity : </p>
            <p>{prop}</p>
          </div>
        ),
      },
      {
        propKey: "ammoAccr",
        renderCondition: (prop) => prop !== 0,
        element: (prop) => (
          <div className="flex gap-4 items-center">
            <p>Ammo Accuracy : </p>
            <p>{prop}</p>
          </div>
        ),
      },
      {
        propKey: "ammoRec",
        renderCondition: (prop) => prop !== 0,
        element: (prop) => (
          <div className="flex gap-4 items-center">
            <p>Ammo Recoil : </p>
            <p>{prop}</p>
          </div>
        ),
      },
      {
        propKey: "ammoDist",
        renderCondition: (prop) => prop !== 0,
        element: (prop) => (
          <div className="flex gap-4 items-center">
            <p>Ammo Distance : </p>
            <p>{prop}</p>
          </div>
        ),
      },
      {
        propKey: "Damage",
        renderCondition: (prop) => prop !== 0,
        element: (prop) => (
          <div className="flex gap-4 items-center">
            <p>Damage : </p>
            <p>{prop}</p>
          </div>
        ),
      },
      {
        propKey: "PenetrationPower",
        renderCondition: (prop) => prop !== 0,
        element: (prop) => (
          <div className="flex gap-4 items-center">
            <p>Penetration Power : </p>
            <p>{prop}</p>
          </div>
        ),
      },
      {
        propKey: "HeatFactor",
        renderCondition: (prop) => prop !== 0,
        element: (prop) => (
          <div className="flex gap-4 items-center">
            <p>Heat Factor : </p>
            <p>{prop}</p>
          </div>
        ),
      },
      {
        propKey: "RaidModdable",
        renderCondition: (prop) => prop,
        element: () => (
          <div className="flex gap-4 items-center">
            <p>Raid Moddable :</p>
            <p>✓</p>
          </div>
        ),
      },
    ];

    return propRenderMethod.map((item) => {
      const prop = itemData._props[item.propKey];

      if (!prop) return null;
      if (!item.renderCondition(prop)) return null;

      return item.element(prop, item.propKey);
    });
  };

  const cardTitle = localeDb[itemData._id + " Name"];
  const altTitle = `(${localeDb[itemData._id + " ShortName"]})`;
  const fleaPrice = fleaMarket[itemData._id];

  return (
    <div className="flex h-full items-center justify-center">
      <div className="w-4/5">
        <Card title={cardTitle} alt={altTitle}>
          <p>Flea price {fleaPrice}</p>
          <p>{renderProps()}</p>
          <p className="italic">{localeDb[itemData._id + " Description"]}</p>
          <p className="w-full text-right text-sm">{itemData._id}</p>
          <a
            className="btn btn-primary"
            href={convertToWikiLink(cardTitle)}
            target="_blank"
          >
            Go to Wiki
          </a>
        </Card>
      </div>
    </div>
  );
}
