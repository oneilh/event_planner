export default function Loading() {
  return (
    <div className="py-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Skeleton */}
      <div className="flex flex-col mb-8 sm:mb-10 animate-pulse">
        <div className="h-8 sm:h-9 bg-[var(--border)] rounded w-48 mb-2"></div>
        <div className="h-4 bg-[var(--border)] rounded w-64"></div>
      </div>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
        {[...Array(8)].map((_, i) => (
          <div 
            key={i}
            className="rounded-sm p-6 sm:p-8 shadow-xl relative overflow-hidden flex flex-col h-full min-h-[340px] border-[1.5px] border-[var(--border)] bg-[var(--bg-card)] animate-pulse block"
          >
            {/* Top row: Date and Location */}
            <div className="flex items-start justify-between mb-auto z-10 gap-2">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                 <div className="bg-[var(--border)] rounded-2xl w-14 h-14 flex-shrink-0"></div>
                <div className="flex flex-col min-w-0 flex-1 gap-1">
                  <div className="h-4 bg-[var(--border)] rounded w-24"></div>
                  <div className="h-3 bg-[var(--border)] rounded w-16"></div>
                </div>
              </div>
              <div className="z-20 relative flex-shrink-0">
                <div className="w-16 h-8 bg-[var(--border)] rounded-sm"></div>
              </div>
            </div>

            {/* Middle row: Title and Organizer */}
            <div className="mt-8 mb-4 z-10 flex flex-col gap-2">
              <div className="h-3 bg-[var(--border)] rounded w-20"></div>
              <div className="h-8 bg-[var(--border)] rounded w-full mt-1 mb-2"></div>
              <div className="h-8 bg-[var(--border)] rounded w-3/4 mb-2"></div>
            </div>

            {/* Footer row: Attendees */}
            <div className="flex items-center justify-between z-10 mt-auto pt-4 border-t border-[var(--border)]">
              <div className="h-4 bg-[var(--border)] rounded w-12"></div>
              <div className="flex items-center">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-[var(--border)] shadow-sm ring-2 ring-[var(--bg-card)]"></div>
                  <div className="w-8 h-8 rounded-full bg-[var(--border)] shadow-sm ring-2 ring-[var(--bg-card)]"></div>
                </div>
                <div className="w-8 h-8 rounded-full bg-[var(--border)] -ml-2 z-10 border border-[var(--border)]"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
