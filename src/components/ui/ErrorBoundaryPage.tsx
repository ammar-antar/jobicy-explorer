import { isRouteErrorResponse, useRouteError, Link } from "react-router-dom";
import { AlertCircle, ArrowLeft } from "lucide-react";

export function ErrorBoundaryPage() {
  const error = useRouteError();

  const is404 = isRouteErrorResponse(error) && error.status === 404;
  const isDev = import.meta.env.DEV;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16 bg-background">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 mx-auto rounded-full bg-danger/10 flex items-center justify-center mb-6">
          <AlertCircle className="w-8 h-8 text-danger" aria-hidden="true" />
        </div>

        <h1 className="text-section-title font-bold text-on-surface mb-3">
          {is404 ? "Page not found" : "Something went wrong"}
        </h1>

        <p className="text-body-md text-on-surface-secondary mb-8">
          {is404
            ? "The page you're looking for doesn't exist or has been moved."
            : "An unexpected error occurred. Try refreshing the page, or go back home."}
        </p>

        {isDev && error instanceof Error && (
          <pre className="text-left text-xs bg-surface border border-border rounded-control p-3 mb-6 overflow-auto text-danger">
            {error.message}
          </pre>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center gap-2 border border-border bg-surface text-on-surface px-6 py-3 rounded-control font-medium hover:border-primary hover:text-primary transition-colors"
          >
            Refresh page
          </button>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-primary text-on-primary px-6 py-3 rounded-control font-medium hover:opacity-90 transition-opacity"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Back to Jobs
          </Link>
        </div>
      </div>
    </div>
  );
}