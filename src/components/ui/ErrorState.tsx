import { AlertCircle, RefreshCw } from "lucide-react";

type ErrorStateProps = {
  onRetry: () => void;
  title?: string;
  message?: string;
};

export function ErrorState({
  onRetry,
  title = "Couldn't load jobs",
  message = "Something went wrong while fetching jobs. Check your connection and try again.",
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-6 text-center bg-surface border border-border rounded-card">
      <div className="w-14 h-14 rounded-full bg-danger/10 flex items-center justify-center mb-5">
        <AlertCircle className="w-7 h-7 text-danger" />
      </div>

      <h3 className="text-lg font-semibold text-on-surface mb-2">{title}</h3>
      <p className="text-meta text-on-surface-secondary mb-6 max-w-sm">
        {message}
      </p>

      <button
        onClick={onRetry}
        className="inline-flex items-center gap-2 bg-primary text-on-primary px-5 py-2.5 rounded-control font-medium hover:opacity-90 transition-opacity cursor-pointer"
      >
        <RefreshCw className="w-4 h-4" />
        Try Again
      </button>
    </div>
  );
}