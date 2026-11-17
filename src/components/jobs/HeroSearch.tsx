import { useState, useRef, useEffect } from "react";
import { Search, X, MapPin, ChevronDown, Check } from "lucide-react";
import { useFilters } from "@/hooks/useFilters";
import { useLocations } from "@/hooks/useTaxonomies";
import { cn } from "@/utils/cn";
import { InlineError } from "../ui/InlineError";

export function HeroSearch() {
  const { filters, setFilter } = useFilters();
  const {
    data: locationsData,
    isLoading: locationsLoading,
    isError,
    refetch,
  } = useLocations();

  const [searchTerm, setSearchTerm] = useState(filters.tag || "");
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsLocationOpen(false);
      }
    }
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsLocationOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setFilter("tag", searchTerm.trim() || undefined);
  };

  const handleSelectLocation = (slug: string | undefined) => {
    setFilter("geo", slug);
    setIsLocationOpen(false);
  };

  const locations = locationsData?.locations || [];

  return (
    <section className="bg-top-band text-on-band pb-16 pt-10 transition-colors duration-150 relative z-40">
      <div className="mx-auto w-full max-w-max px-4 md:px-5 lg:px-6">
        <div className="max-w-4xl">
          <h1 className="text-band-title-mobile md:text-band-title font-bold mb-3 tracking-tight">
            Remote Jobs
          </h1>
          <p className="text-body-md text-on-band-muted mb-8">
            Keyword search matches job titles and descriptions.
          </p>

          <form
            onSubmit={handleSearch}
            className="bg-surface border border-border rounded-control p-2 flex flex-col md:flex-row items-center gap-2 shadow-sm transition-colors duration-150"
          >
            {/* Search Input */}
            <div className="flex-1 flex items-center w-full px-3 gap-3">
              <Search
                className="w-5 h-5 text-on-surface-muted shrink-0"
                aria-hidden="true"
              />
              <label htmlFor="job-search" className="sr-only">
                Search jobs by keyword
              </label>
              <input
                id="job-search"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Software Engineer"
                className="w-full bg-transparent border-none outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 rounded-sm text-body-md text-on-surface placeholder:text-on-surface-muted h-10"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchTerm("");
                    setFilter("tag", undefined);
                  }}
                  aria-label="Clear search"
                  className="text-on-surface-muted hover:text-on-surface shrink-0 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" aria-hidden="true" />
                </button>
              )}
            </div>

            <div className="hidden md:block w-px h-8 bg-border shrink-0"></div>

            {/* Location Dropdown */}
            <div
              className="relative w-full md:w-auto shrink-0"
              ref={dropdownRef}
            >
              <button
                type="button"
                onClick={() => setIsLocationOpen(!isLocationOpen)}
                aria-expanded={isLocationOpen}
                aria-haspopup="listbox"
                aria-controls="location-listbox"
                className="w-full flex items-center justify-between px-4 h-12 md:h-10 gap-2 text-on-surface-secondary hover:text-on-surface transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" aria-hidden="true" />
                  <span className="text-label-md font-medium whitespace-nowrap">
                    {filters.geo
                      ? locations.find((l) => l.geoSlug === filters.geo)
                          ?.geoName || filters.geo.toUpperCase()
                      : "All locations"}
                  </span>
                </div>
                <ChevronDown
                  className={cn(
                    "w-4 h-4 transition-transform duration-200",
                    isLocationOpen && "rotate-180",
                  )}
                  aria-hidden="true"
                />
              </button>

              {isLocationOpen && (
                <div
                  id="location-listbox"
                  role="listbox"
                  aria-label="Filter by location"
                  className="absolute top-full left-0 mt-2 w-full md:w-70 bg-surface border border-border rounded-card shadow-lg z-50 overflow-hidden max-h-75 flex flex-col"
                >
                  <div className="p-2 overflow-y-auto">
                    <button
                      type="button"
                      role="option"
                      aria-selected={!filters.geo}
                      onClick={() => handleSelectLocation(undefined)}
                      className={cn(
                        "w-full flex items-center justify-between px-3 py-2 text-body-md text-left rounded-md hover:bg-badge-neutral-bg transition-colors cursor-pointer",
                        !filters.geo
                          ? "bg-badge-neutral-bg text-badge-neutral-text font-medium"
                          : "text-on-surface-secondary",
                      )}
                    >
                      All locations
                      {!filters.geo && (
                        <Check
                          className="w-4 h-4 text-primary"
                          aria-hidden="true"
                        />
                      )}
                    </button>

                    {locationsLoading ? (
                      <div className="p-3 text-center text-sm text-on-surface-muted">
                        Loading...
                      </div>
                    ) : isError ? (
                      <div className="p-2">
                        <InlineError
                          message="Couldn't load locations"
                          onRetry={refetch}
                        />
                      </div>
                    ) : locations.length === 0 ? (
                      <div className="p-3 text-center text-sm text-on-surface-muted">
                        No locations available
                      </div>
                    ) : (
                      locations.map((loc) => (
                        <button
                          key={loc.geoID}
                          type="button"
                          role="option"
                          aria-selected={filters.geo === loc.geoSlug}
                          onClick={() => handleSelectLocation(loc.geoSlug)}
                          className={cn(
                            "w-full flex items-center justify-between px-3 py-2 text-body-md text-left rounded-md hover:bg-badge-neutral-bg transition-colors cursor-pointer",
                            filters.geo === loc.geoSlug
                              ? "bg-badge-neutral-bg text-badge-neutral-text font-medium"
                              : "text-on-surface-secondary",
                          )}
                        >
                          {loc.geoName}
                          {filters.geo === loc.geoSlug && (
                            <Check
                              className="w-4 h-4 text-primary"
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

            <button
              type="submit"
              className="w-full md:w-auto bg-primary text-on-primary px-8 h-12 md:h-10 rounded-control font-medium text-label-md hover:opacity-90 transition-opacity shrink-0 cursor-pointer"
            >
              Search
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
