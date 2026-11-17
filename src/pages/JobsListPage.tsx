import { useState, useEffect, useRef } from "react";
import { useJobs } from "@/hooks/useJobs";
import { useFilters } from "@/hooks/useFilters";
import { HeroSearch } from "@/components/jobs/HeroSearch";
import { FilterSidebar } from "@/components/filters/FilterSidebar";
import { JobCard } from "@/components/jobs/JobCard";
import { ChevronDown, X, SlidersHorizontal } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { JobCardSkeleton } from "@/components/ui/JobCardSkeleton";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";

export function JobsListPage() {
  const { filters, setFilter, resetFilters } = useFilters();
  const {
    data,
    isLoading,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useJobs(filters);

  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const openButtonRef = useRef<HTMLButtonElement>(null);

  // Lock body scroll + Escape to close while the drawer is open
useEffect(() => {
  if (!isMobileFiltersOpen) return;

  const originalOverflow = document.body.style.overflow;
  const button = openButtonRef.current; 

  document.body.style.overflow = "hidden";

  function handleEscape(event: KeyboardEvent) {
    if (event.key === "Escape") {
      setIsMobileFiltersOpen(false);
    }
  }
  document.addEventListener("keydown", handleEscape);

  return () => {
    document.body.style.overflow = originalOverflow;
    document.removeEventListener("keydown", handleEscape);
    button?.focus(); 
  };
}, [isMobileFiltersOpen]);

  const allJobs = data?.pages.flatMap((page) => page.jobs) ?? [];
  const hasActiveFilters = Boolean(
    filters.tag || filters.geo || filters.industry,
  );

  return (
    <div className="pb-20">
      <HeroSearch key={filters.tag || "empty"} />

      <Container className="pt-8">
        <div className="flex gap-8 items-start relative">
          {/* 1. Desktop Sidebar */}
          <div className="hidden lg:block w-68 shrink-0 sticky top-22">
            <FilterSidebar />
          </div>

          {/* 2. Main Content */}
          <div className="flex-1 min-w-0">
            {/* Mobile Filter Button */}
            <button
              ref={openButtonRef}
              onClick={() => setIsMobileFiltersOpen(true)}
              aria-expanded={isMobileFiltersOpen}
              aria-haspopup="dialog"
              className="lg:hidden flex items-center gap-2 bg-surface border border-border rounded-control px-4 py-2 text-label-md font-medium mb-6 w-full justify-center hover:bg-background transition-colors cursor-pointer"
            >
              <SlidersHorizontal className="w-4 h-4" aria-hidden="true" />
              Filters
              {hasActiveFilters && (
                <span
                  className="w-2 h-2 rounded-full bg-primary ml-1"
                  aria-label="filters applied"
                />
              )}
            </button>

            <div className="mb-6">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h2 className="text-section-title-mobile md:text-section-title font-bold text-on-surface">
                    Latest remote jobs
                  </h2>
                  <p className="text-meta text-on-surface-secondary mt-1">
                    Showing {allJobs.length} jobs{" "}
                    {hasNextPage && " • more available"}
                  </p>
                </div>
              </div>

              {hasActiveFilters && (
                <div className="flex flex-wrap items-center gap-2 mt-4">
                  {filters.tag && (
                    <div className="flex items-center gap-1.5 bg-badge-neutral-bg text-badge-neutral-text px-3 py-1 rounded-pill text-xs font-medium capitalize">
                      {filters.tag}
                      <button
                        onClick={() => setFilter("tag", undefined)}
                        aria-label={`Remove ${filters.tag} filter`}
                        className="hover:text-danger transition-colors cursor-pointer"
                      >
                        <X className="w-3 h-3" aria-hidden="true" />
                      </button>
                    </div>
                  )}
                  {filters.geo && (
                    <div className="flex items-center gap-1.5 bg-badge-neutral-bg text-badge-neutral-text px-3 py-1 rounded-pill text-xs font-medium uppercase">
                      {filters.geo}
                      <button
                        onClick={() => setFilter("geo", undefined)}
                        aria-label={`Remove ${filters.geo} filter`}
                        className="hover:text-danger transition-colors cursor-pointer"
                      >
                        <X className="w-3 h-3" aria-hidden="true" />
                      </button>
                    </div>
                  )}
                  {filters.industry && (
                    <div className="flex items-center gap-1.5 bg-badge-neutral-bg text-badge-neutral-text px-3 py-1 rounded-pill text-xs font-medium capitalize">
                      {filters.industry.replace("-", " ")}
                      <button
                        onClick={() => setFilter("industry", undefined)}
                        aria-label={`Remove ${filters.industry} filter`}
                        className="hover:text-danger transition-colors cursor-pointer"
                      >
                        <X className="w-3 h-3" aria-hidden="true" />
                      </button>
                    </div>
                  )}
                  <button
                    onClick={resetFilters}
                    className="lg:hidden text-meta text-danger hover:underline transition-colors cursor-pointer"
                  >
                    Clear all
                  </button>
                </div>
              )}
            </div>

            {/* States + Grid */}
            {isLoading ? (
              <JobCardSkeleton />
            ) : isError ? (
              <ErrorState onRetry={refetch} />
            ) : allJobs.length === 0 ? (
              <EmptyState onReset={resetFilters} />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {allJobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            )}

            <div className="mt-12 flex flex-col items-center gap-3">
              {hasNextPage && (
                <button
                  onClick={() => fetchNextPage()}
                  disabled={isFetchingNextPage}
                  className="flex items-center gap-2 border border-primary text-primary rounded-pill px-6 py-2 text-label-md font-medium hover:bg-primary/5 disabled:opacity-50 transition-colors cursor-pointer"
                >
                  {isFetchingNextPage ? "Loading..." : "Load More"}
                  <ChevronDown className="w-4 h-4" aria-hidden="true" />
                </button>
              )}
              <span className="text-mono-meta text-on-surface-muted">
                Showing {allJobs.length} jobs
              </span>
            </div>
          </div>
        </div>
      </Container>

      {/* 3. Mobile Filter Drawer */}
      {isMobileFiltersOpen && (
        <div className="fixed inset-0 z-100 flex lg:hidden">
          <div
            className="fixed inset-0 bg-black/50 transition-opacity"
            onClick={() => setIsMobileFiltersOpen(false)}
            aria-hidden="true"
          />

          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="filters-dialog-title"
            className="relative w-[85%] max-w-sm bg-background h-full overflow-y-auto p-5 flex flex-col shadow-xl animate-in slide-in-from-left duration-200"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 id="filters-dialog-title" className="text-xl font-bold">
                Filters
              </h2>
              <button
                onClick={() => setIsMobileFiltersOpen(false)}
                aria-label="Close filters"
                className="p-2 text-on-surface-muted hover:text-on-surface rounded-full bg-surface cursor-pointer"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            <div className="flex-1">
              <FilterSidebar />
            </div>

            <button
              onClick={() => setIsMobileFiltersOpen(false)}
              className="mt-6 w-full bg-primary text-on-primary py-3 rounded-control font-medium hover:opacity-90 transition-opacity"
            >
              Show Results ({allJobs.length})
            </button>
          </div>
        </div>
      )}
    </div>
  );
}