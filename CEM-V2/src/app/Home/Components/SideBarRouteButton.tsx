import { Link } from "react-router";

export default function SideBarRouteButton(props: {
  route: string;
  name: string;
  icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}) {
  return (
    <button className="btn btn-ghost">
      {props.icon ? <props.icon className="fill-primary" /> : undefined}
      <Link to={props.route}>{props.name}</Link>
    </button>
  );
}
