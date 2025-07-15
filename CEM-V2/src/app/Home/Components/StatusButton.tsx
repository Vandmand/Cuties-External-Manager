import useLocal from "@/src/Hooks/useLocal";

export default function StatusButton() {
  const { config } = useLocal();

  return (
    <button className="p-6 m-0 text-left ">
      <p className="font-bold">{config.profile?.name ?? "Select Profile"}</p>
      <p className="text-sm text-nowrap">In raid - Customs</p>
    </button>
  );
}
