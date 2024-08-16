export default function Card(props: {
  title: string;
  alt?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col p-2 gap-4 relative">
      <div className="flex gap-4 items-center absolute -translate-x-2 -translate-y-1/2 w-full backdrop-blur-sm">
        <h3 className="font-bold">{props.title}</h3>
        <div className="flex-1 h-1 bg-base-content rounded-lg" />
        <h3>{props.alt}</h3>
      </div>
      <div className="flex flex-col gap-4 px-8 py-8 border-2 border-base-300 rounded-md shadow-md bg-base-100">
        {props.children}
      </div>
    </div>
  );
}
