export default function PageSkeleton() {
  return (
    <div className="flex flex-col p-8 gap-16 items-center">
      <div className="flex items-center justify-center gap-8 w-4/5 bg-base-100 rounded-md p-4">
        <div className="skeleton w-1/12 h-10 rounded-md" />
        <div className="skeleton w-1/12 h-10 rounded-md" />
        <div className="skeleton w-1/12 h-10 rounded-md" />
      </div>
      <div className="flex flex-col flex-grow gap-8 w-4/5">
        <div className="flex flex-col gap-4 bg-base-100 p-8 rounded-md shadow">
          <div className="skeleton w-3/5 h-4 bg-base-200" />
          <div className="skeleton w-full h-16 bg-base-200" />
        </div>
        <div className="flex flex-col gap-4 bg-base-100 p-8 rounded-md shadow">
          <div className="skeleton w-3/5 h-4 bg-base-200" />
          <div className="skeleton w-full h-16 bg-base-200" />
        </div>
        <div className="flex flex-col gap-4 bg-base-100 p-8 rounded-md shadow">
          <div className="skeleton w-3/5 h-4 bg-base-200" />
          <div className="skeleton w-full h-16 bg-base-200" />
        </div>
        <div className="flex flex-col gap-4 bg-base-100 p-8 rounded-md shadow">
          <div className="skeleton w-3/5 h-4 bg-base-200" />
          <div className="skeleton w-full h-16 bg-base-200" />
        </div>
      </div>
    </div>
  );
}
