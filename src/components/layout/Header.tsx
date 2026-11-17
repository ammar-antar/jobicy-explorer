import { NavLink, Link } from "react-router-dom";
import { LayoutGrid, Moon, Sun } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { cn } from "@/utils/cn";
import { useUIStore } from "@/stores/uiStore";
import { useSavedJobsStore } from "@/stores/useSavedJobsStore";

export function Header() {
  const { theme, toggleTheme } = useUIStore();
  const savedCount = useSavedJobsStore((state) => state.savedJobs.length);

  return (
    <header className="bg-top-band text-on-band border-b border-border/20 sticky top-0 z-50 transition-colors duration-150">
      <Container className="h-16 md:h-18 flex items-center justify-between">
        <div className="flex items-center gap-3 sm:gap-6 md:gap-8 h-full">
          <Link to="/" className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <LayoutGrid className="w-5 h-5 sm:w-6 sm:h-6 text-active-tab-line" />
            <span className="text-sm sm:text-base md:text-[20px] font-bold tracking-tight">
              Jobicy Explorer
            </span>
          </Link>

          <nav className="flex items-center h-full gap-3 sm:gap-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                cn(
                  "h-full flex items-center text-xs sm:text-label-md transition-colors",
                  isActive
                    ? "border-b-2 border-active-tab-line text-on-band font-medium"
                    : "text-on-band-muted hover:text-on-band",
                )
              }
            >
              Jobs
            </NavLink>

            <NavLink
              to="/saved"
              className={({ isActive }) =>
                cn(
                  "h-full flex items-center gap-1 sm:gap-2 text-xs sm:text-label-md transition-colors",
                  isActive
                    ? "border-b-2 border-active-tab-line text-on-band font-medium"
                    : "text-on-band-muted hover:text-on-band",
                )
              }
            >
              Saved
              {savedCount > 0 && (
                <span className="bg-on-band/10 text-on-band text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded-pill">
                  {savedCount}
                </span>
              )}
            </NavLink>
          </nav>
        </div>

        <button
          onClick={toggleTheme}
          className="text-on-band-muted hover:text-on-band transition-colors p-2 rounded-full hover:bg-on-band/5 shrink-0 cursor-pointer"
          aria-label="Toggle theme"
        >
          {theme === "light" ? (
            <Moon className="w-4 h-4 sm:w-5 sm:h-5" />
          ) : (
            <Sun className="w-4 h-4 sm:w-5 sm:h-5" />
          )}
        </button>
      </Container>
    </header>
  );
}