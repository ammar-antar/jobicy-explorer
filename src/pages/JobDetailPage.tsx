import { useLocation, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, Building2, ExternalLink, Bookmark } from 'lucide-react';
import type { Job } from '@/types/jobicy';
import { formatSalary, timeAgo } from '@/utils/formatters';
import { Container } from '@/components/ui/Container';
import { useSavedJobsStore } from '@/stores/useSavedJobsStore';
import { cn } from '@/utils/cn';
import {CompanyLogo} from '@/components/jobs/CompanyLogo'
import { sanitizeHtml } from '@/utils/sanitize';
export function JobDetailPage() {
  const location = useLocation();
  const job = location.state?.job as Job | undefined;

  const savedJobs = useSavedJobsStore((state) => state.savedJobs);
  const addJob = useSavedJobsStore((state) => state.addJob);
  const removeJob = useSavedJobsStore((state) => state.removeJob);

  const saved = job ? savedJobs.some((j) => j.id === job.id) : false;

  const handleSaveToggle = () => {
    if (!job) return;
    if (saved) {
      removeJob(job.id);
    } else {
      addJob(job);
    }
  };

  if (!job) {
    return (
      <div className="flex flex-col items-center justify-center py-32 px-4 text-center">
        <Building2 className="w-16 h-16 text-on-surface-muted mb-4" />
        <h2 className="text-section-title font-bold mb-2">Job Not Found</h2>
        <p className="text-body-md text-on-surface-secondary mb-6 max-w-md">
          The job details are unavailable. This can happen if you refreshed the page or accessed the link directly.
        </p>
        <Link 
          to="/" 
          className="bg-primary text-on-primary px-6 py-2 rounded-control font-medium hover:opacity-90 transition-opacity"
        >
          Back to Jobs
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen py-10">
      <Container>
        
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-on-surface-secondary hover:text-primary transition-colors mb-8 text-label-md font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to jobs
        </Link>

        <div className="bg-surface border border-border rounded-card p-6 md:p-10">
          
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <CompanyLogo name={job.companyName} logo={job.companyLogo} size='lg' />
              <div>
                <h1 className="text-section-title md:text-[32px] font-bold text-on-surface leading-tight mb-2">
                  {job.jobTitle}
                </h1>
                <div className="flex flex-wrap items-center gap-2 text-body-md text-on-surface-secondary">
                  <span className="font-semibold text-on-surface">{job.companyName}</span>
                  <span className="hidden sm:inline">•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    Posted {timeAgo(job.pubDate)}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
              <button 
                onClick={handleSaveToggle}
                className={cn(
                  "w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-control font-medium border transition-colors cursor-pointer",
                  saved 
                    ? "bg-saved/10 border-saved text-saved hover:bg-saved/20" 
                    : "bg-surface border-border text-on-surface hover:border-primary hover:text-primary"
                )}
              >
                <Bookmark className="w-5 h-5" fill={saved ? "currentColor" : "none"} />
                {saved ? 'Saved' : 'Save Job'}
              </button>

              <a 
                href={job.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-primary text-on-primary px-8 py-3 rounded-control font-medium hover:opacity-90 transition-opacity shrink-0"
              >
                Apply Now
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            <span className="flex items-center gap-1.5 bg-badge-neutral-bg text-badge-neutral-text rounded-badge px-3 py-1.5 text-sm font-medium">
              <MapPin className="w-4 h-4" />
              {job.jobGeo}
            </span>
            <span className="bg-badge-neutral-bg text-badge-neutral-text rounded-badge px-3 py-1.5 text-sm font-medium">
              {job.jobType.join(', ')}
            </span>
            {job.jobLevel && (
              <span className="bg-badge-neutral-bg text-badge-neutral-text rounded-badge px-3 py-1.5 text-sm font-medium">
                {job.jobLevel}
              </span>
            )}
            <span className="font-mono text-mono-salary font-bold text-salary bg-salary/10 rounded-badge px-3 py-1.5 flex items-center ml-auto">
              {formatSalary(job)} {job.salaryPeriod && `/ ${job.salaryPeriod}`}
            </span>
          </div>

          <div className="h-px w-full bg-border mb-8"></div>

          <div>
            <h2 className="text-xl font-bold text-on-surface mb-6">Job Description</h2>
            <div 
              className="prose prose-sm md:prose-base prose-slate max-w-none text-on-surface-secondary 
                         [&>p]:mb-4 [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:mb-4 [&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:mb-4 
                         [&>h3]:text-lg [&>h3]:font-bold [&>h3]:text-on-surface [&>h3]:mt-6 [&>h3]:mb-3 
                         [&>a]:text-primary [&>a]:underline hover:[&>a]:opacity-80"
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(job.jobDescription) }}
            />
          </div>

        </div>
      </Container>
    </div>
  );
}