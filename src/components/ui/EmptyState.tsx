import { SearchX } from "lucide-react";

type EmptyStateProps = {
  onReset: () => void;
  title?: string;
  message?: string;
  resetLabel?: string;
};

export function EmptyState({
  onReset,
  title = "No jobs match your filters",
  message = "Try widening your search or clearing filters to see more results.",
  resetLabel = "Clear all filters",
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-6 text-center bg-surface border border-border rounded-card">
      <div className="w-14 h-14 rounded-full bg-badge-neutral-bg flex items-center justify-center mb-5">
        <SearchX className="w-7 h-7 text-on-surface-muted" />
      </div>

      <h3 className="text-lg font-semibold text-on-surface mb-2">{title}</h3>
      <p className="text-meta text-on-surface-secondary mb-6 max-w-sm">
        {message}
      </p>

      <button
        onClick={onReset}
        className="text-sm font-semibold text-primary hover:underline"
      >
        {resetLabel}
      </button>
    </div>
  );
}