import useLocal from "@/src/Hooks/useLocal";
import useServer from "@/src/Hooks/useServer";
import StatusButton from "./StatusButton";

//TODO: Update dropdown so it closes on state change
//TODO: and make it also close on button press again as well as css unfocus

export default function Status() {
  const { config, updateConfig } = useLocal();
  const { pmcIds } = useServer();

  console.log(pmcIds);

  if (!pmcIds) return <></>;

  return (
    <div className="rounded-box bg-base-200">
      <div className="dropdown dropdown-top ">
        <StatusButton />
        <div className="menu dropdown-content gap-2 w-full ">
          {pmcIds.map((profile) => (
            <button
              className="btn"
              onClick={() => {
                updateConfig({ profile: profile });
              }}
            >
              {profile?.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
