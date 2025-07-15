import useServer from "@/src/Hooks/useServer";

export default function Items() {
  const { items } = useServer();

  if (!items) return "loading";

  return (
    <>
      <p>Hello </p>
    </>
  );
}
