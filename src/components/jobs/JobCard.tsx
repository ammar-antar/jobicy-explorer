import { Link } from "react-router-dom";
import { Bookmark, MapPin, Clock, ArrowRight } from "lucide-react";
import type { Job } from "@/types/jobicy";
import { formatSalary, decodeHtmlEntities, timeAgo } from "@/utils/formatters";
import { useSavedJobsStore } from "@/stores/useSavedJobsStore";
import { cn } from "@/utils/cn";
import { CompanyLogo } from "./CompanyLogo";
type JobCardProps = {
  job: Job;
  showRemoveAction?: boolean;
};
export function JobCard({ job, showRemoveAction = false }: JobCardProps) {

  // Explicitly select the state and actions to ensure reactivity
  const savedJobs = useSavedJobsStore((state) => state.savedJobs);
  const addJob = useSavedJobsStore((state) => state.addJob);
  const removeJob = useSavedJobsStore((state) => state.removeJob);

  // Calculate if this specific job is saved based on the reactive state
  const saved = savedJobs.some((j) => j.id === job.id);

  const handleSaveToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (saved) {
      removeJob(job.id);
    } else {
      addJob(job);
    }
  };

  return (
    <Link
      to={`/jobs/${job.jobSlug}`}
      state={{ job }}
      className="bg-surface border border-border rounded-card p-card-padding flex flex-col h-full hover:border-primary transition-colors group cursor-pointer"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-start gap-3">
           <CompanyLogo name={job.companyName} logo={job.companyLogo} />
          <div>
            <h3 className="text-card-title font-semibold text-on-surface leading-tight mb-1 group-hover:text-primary transition-colors line-clamp-2">
              {job.jobTitle}
            </h3>
            <p className="text-meta text-on-surface-secondary">
              {job.companyName}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {showRemoveAction && saved && (
            <button
              onClick={handleSaveToggle}
              className="text-xs font-semibold text-danger hover:underline cursor-pointer px-2 py-1"
            >
              Remove
            </button>
          )}

          <button
            onClick={handleSaveToggle}
            className={cn(
              "transition-colors p-1.5 cursor-pointer rounded-md hover:bg-background",
              saved ? "text-saved" : "text-on-surface-muted hover:text-primary",
            )}
            aria-label={saved ? "Remove from saved" : "Save job"}
          >
            <Bookmark
              className="w-5 h-5"
              fill={saved ? "currentColor" : "none"}
            />
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-3">
        <span className="flex items-center gap-1 bg-badge-neutral-bg text-badge-neutral-text rounded-badge px-2 py-1 text-[11px] font-medium">
          <MapPin className="w-3 h-3" />
          {job.jobGeo}
        </span>
        <span className="bg-badge-neutral-bg text-badge-neutral-text rounded-badge px-2 py-1 text-[11px] font-medium">
          {job.jobType[0]}
        </span>
        {job.jobLevel && (
          <span className="bg-badge-neutral-bg text-badge-neutral-text rounded-badge px-2 py-1 text-[11px] font-medium">
            {job.jobLevel}
          </span>
        )}
      </div>

      <p className="text-meta text-on-surface-secondary line-clamp-3 mb-4 flex-1">
        {decodeHtmlEntities(job.jobExcerpt)}
      </p>

      <div className="flex flex-wrap items-center justify-between gap-y-3 gap-x-2 mt-auto pt-4 border-t border-border">
        <div className="flex flex-col shrink-0">
          <span className="font-mono text-mono-salary font-bold text-salary">
            {formatSalary(job)}
          </span>
          {job.salaryPeriod && (
            <span className="text-[11px] text-on-surface-muted">
              / {job.salaryPeriod}
            </span>
          )}
        </div>

        <div className="flex items-center gap-3 ml-auto">
          <div className="flex items-center gap-1 text-on-surface-muted text-xs">
            <Clock className="w-3.5 h-3.5" />
            {timeAgo(job.pubDate)}
          </div>

          <span className="flex items-center gap-1 text-xs font-semibold text-primary bg-primary/10 px-3 py-1.5 rounded-control group-hover:bg-primary group-hover:text-on-primary transition-all duration-200 whitespace-nowrap">
            Details
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
