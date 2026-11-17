import { Link } from "react-router-dom";
import { SearchX, ArrowLeft } from "lucide-react";

export function NotFoundPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-16">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 mx-auto rounded-full bg-badge-neutral-bg flex items-center justify-center mb-6">
          <SearchX className="w-10 h-10 text-on-surface-muted" aria-hidden="true" />
        </div>

        <p className="font-mono text-[56px] leading-none font-bold text-primary mb-2">
          404
        </p>
        <h1 className="text-section-title font-bold text-on-surface mb-3">
          Page not found
        </h1>
        <p className="text-body-md text-on-surface-secondary mb-8">
          The page you're looking for doesn't exist or may have been moved.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-primary text-on-primary px-6 py-3 rounded-control font-medium hover:opacity-90 transition-opacity"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Back to Jobs
          </Link>
          <Link
            to="/saved"
            className="inline-flex items-center gap-2 border border-border bg-surface text-on-surface px-6 py-3 rounded-control font-medium hover:border-primary hover:text-primary transition-colors"
          >
            View Saved Jobs
          </Link>
        </div>
      </div>
    </div>
  );
}