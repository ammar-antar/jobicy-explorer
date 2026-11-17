import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/utils/cn";
import { useFilters } from "@/hooks/useFilters";
import { useIndustries } from "@/hooks/useTaxonomies";
import { InlineError } from "../ui/InlineError";

export function FilterSidebar() {
  const { filters, setFilter, resetFilters } = useFilters();
  const {
    data: industriesData,
    isLoading: industriesLoading,
    isError,
    refetch,
  } = useIndustries();

  const [isIndustryOpen, setIsIndustryOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsIndustryOpen(false);
      }
    }
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsIndustryOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleSelectIndustry = (slug: string | undefined) => {
    setFilter("industry", slug);
    setIsIndustryOpen(false);
  };

  const industries = industriesData?.industries || [];
  const activeIndustryName = industries.find(
    (i) => i.industrySlug === filters.industry,
  )?.industryName;
  const hasActiveFilters = Boolean(
    filters.tag || filters.geo || filters.industry,
  );

  return (
    <div className="w-full">
      <div className="bg-surface border border-border rounded-card p-card-padding">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-card-title font-bold">Filters</h2>
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="text-meta text-danger hover:underline transition-colors cursor-pointer"
            >
              Clear all
            </button>
          )}
        </div>

        <div className="relative" ref={dropdownRef}>
          <h3 className="text-label-md font-semibold mb-3">Industry</h3>
          <button
            onClick={() => setIsIndustryOpen(!isIndustryOpen)}
            aria-expanded={isIndustryOpen}
            aria-haspopup="listbox"
            aria-controls="industry-listbox"
            className={cn(
              "w-full flex items-center justify-between bg-background border border-border rounded-control px-3 py-2 text-body-md transition-colors cursor-pointer",
              isIndustryOpen ? "border-primary" : "hover:border-primary",
            )}
          >
            <span
              className={cn(
                "truncate pr-2",
                activeIndustryName
                  ? "text-on-surface"
                  : "text-on-surface-secondary",
              )}
            >
              {activeIndustryName || "All industries"}
            </span>
            <ChevronDown
              aria-hidden="true"
              className={cn(
                "w-4 h-4 transition-transform duration-200",
                isIndustryOpen && "rotate-180",
              )}
            />
          </button>

          {isIndustryOpen && (
            <div
              id="industry-listbox"
              role="listbox"
              aria-label="Filter by industry"
              className="absolute top-full left-0 mt-1 w-full bg-surface border border-border rounded-card shadow-lg z-50 overflow-hidden max-h-75 flex flex-col"
            >
              <div className="p-2 overflow-y-auto">
                <button
                  type="button"
                  role="option"
                  aria-selected={!filters.industry}
                  onClick={() => handleSelectIndustry(undefined)}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2 text-body-md text-left rounded-md hover:bg-badge-neutral-bg transition-colors cursor-pointer",
                    !filters.industry
                      ? "bg-badge-neutral-bg font-medium text-on-surface"
                      : "text-on-surface-secondary cursor-pointer",
                  )}
                >
                  All industries
                  {!filters.industry && (
                    <Check className="w-4 h-4 text-primary" aria-hidden="true" />
                  )}
                </button>

                {industriesLoading ? (
                  <div className="p-3 text-center text-sm text-on-surface-muted">
                    Loading...
                  </div>
                ) : isError ? (
                  <div className="p-2">
                    <InlineError
                      message="Couldn't load industries"
                      onRetry={refetch}
                    />
                  </div>
                ) : industries.length === 0 ? (
                  <div className="p-3 text-center text-sm text-on-surface-muted">
                    No industries available
                  </div>
                ) : (
                  industries.map((ind) => (
                    <button
                      key={ind.industryID}
                      type="button"
                      role="option"
                      aria-selected={filters.industry === ind.industrySlug}
                      onClick={() => handleSelectIndustry(ind.industrySlug)}
                      className={cn(
                        "w-full flex items-center justify-between px-3 py-2 text-body-md text-left rounded-md hover:bg-badge-neutral-bg transition-colors cursor-pointer",
                        filters.industry === ind.industrySlug
                          ? "bg-badge-neutral-bg font-medium text-on-surface"
                          : "text-on-surface-secondary",
                      )}
                    >
                      <span className="truncate pr-2">{ind.industryName}</span>
                      {filters.industry === ind.industrySlug && (
                        <Check
                          className="w-4 h-4 text-primary shrink-0"
                          aria-hidden="true"
                        />
                      )}
                    </button>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}