import { AlertCircle, RefreshCw } from "lucide-react";

type InlineErrorProps = {
  message?: string;
  onRetry: () => void;
};

export function InlineError({
  message = "Couldn't load options",
  onRetry,
}: InlineErrorProps) {
  return (
    <div className="flex items-center gap-2 px-3 py-2 text-xs text-danger bg-danger/5 rounded-control">
      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
      <span className="flex-1">{message}</span>
      <button
        onClick={onRetry}
        className="flex items-center gap-1 font-semibold hover:underline shrink-0"
        aria-label="Retry"
      >
        <RefreshCw className="w-3 h-3" />
        Retry
      </button>
    </div>
  );
}