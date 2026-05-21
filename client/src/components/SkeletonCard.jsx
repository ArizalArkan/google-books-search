const SkeletonCard = () => (
  <div className="bg-white rounded-xl overflow-hidden shadow-sm flex flex-col">
    <div className="shimmer aspect-[2/3] w-full" />
    <div className="p-3 flex flex-col gap-2.5">
      <div className="space-y-1.5">
        <div className="shimmer h-3.5 rounded-md w-4/5" />
        <div className="shimmer h-3.5 rounded-md w-2/3" />
      </div>
      <div className="shimmer h-3 rounded-md w-1/2" />
      <div className="shimmer h-3 rounded-md w-1/3" />
      <div className="shimmer h-8 rounded-full w-full mt-1" />
    </div>
  </div>
)

export default SkeletonCard
