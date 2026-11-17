type JobCardSkeletonProps = {
  count?: number;
};

function SkeletonCard() {
  return (
    <div className="bg-surface border border-border rounded-card p-card-padding flex flex-col h-full animate-pulse">
      <div className="flex items-start gap-3 mb-3">
        <div className="w-10 h-10 rounded-md bg-border/50 shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-3/4 bg-border/50 rounded" />
          <div className="h-3 w-1/2 bg-border/40 rounded" />
        </div>
      </div>

      <div className="flex gap-1.5 mb-3">
        <div className="h-6 w-16 bg-border/40 rounded-badge" />
        <div className="h-6 w-14 bg-border/40 rounded-badge" />
        <div className="h-6 w-12 bg-border/40 rounded-badge" />
      </div>

      <div className="space-y-2 mb-4 flex-1">
        <div className="h-3 w-full bg-border/40 rounded" />
        <div className="h-3 w-5/6 bg-border/40 rounded" />
        <div className="h-3 w-4/6 bg-border/40 rounded" />
      </div>

      <div className="flex justify-between pt-4 border-t border-border">
        <div className="h-5 w-20 bg-border/50 rounded" />
        <div className="h-5 w-16 bg-border/40 rounded" />
      </div>
    </div>
  );
}

export function JobCardSkeleton({ count = 6 }: JobCardSkeletonProps) {
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
      aria-busy="true"
      aria-label="Loading jobs"
    >
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}