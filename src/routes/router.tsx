import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import { PageFallback } from "@/components/ui/PageFallback";
import { ErrorBoundaryPage } from "@/components/ui/ErrorBoundaryPage";
/* eslint-disable react-refresh/only-export-components */
// Lazy-load pages — each route becomes its own chunk
const JobsListPage = lazy(() =>
  import("@/pages/JobsListPage").then((m) => ({ default: m.JobsListPage })),
);
const JobDetailPage = lazy(() =>
  import("@/pages/JobDetailPage").then((m) => ({ default: m.JobDetailPage })),
);
const SavedJobsPage = lazy(() =>
  import("@/pages/SavedJobsPage").then((m) => ({ default: m.SavedJobsPage })),
);
const NotFoundPage = lazy(() =>
  import("@/pages/NotFoundPage").then((m) => ({ default: m.NotFoundPage })),
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorBoundaryPage />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<PageFallback />}>
            <JobsListPage />
          </Suspense>
        ),
      },
      {
        path: "jobs/:slug",
        element: (
          <Suspense fallback={<PageFallback />}>
            <JobDetailPage />
          </Suspense>
        ),
      },
      {
        path: "saved",
        element: (
          <Suspense fallback={<PageFallback />}>
            <SavedJobsPage />
          </Suspense>
        ),
      },
      {
        path: "*",
        element: (
          <Suspense fallback={<PageFallback />}>
            <NotFoundPage />
          </Suspense>
        ),
      },
    ],
  },
]);