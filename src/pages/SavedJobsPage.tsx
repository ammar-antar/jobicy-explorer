import { Link } from 'react-router-dom';
import { Bookmark } from 'lucide-react';
import { useSavedJobsStore } from '@/stores/useSavedJobsStore';
import { JobCard } from '@/components/jobs/JobCard';
import { Container } from '@/components/ui/Container';

export function SavedJobsPage() {
  const savedJobs = useSavedJobsStore((state) => state.savedJobs);

  return (
    <Container className="py-12 pb-20">
      <div className="mb-8">
        <h1 className="text-section-title font-bold text-on-surface">Saved Jobs</h1>
        <p className="text-meta text-on-surface-secondary mt-1">
          {savedJobs.length} {savedJobs.length === 1 ? 'job' : 'jobs'} saved on this device
        </p>
      </div>

      {savedJobs.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center bg-surface border border-border rounded-card">
          <Bookmark className="w-12 h-12 text-on-surface-muted mb-4" />
          <h2 className="text-xl font-bold text-on-surface mb-2">No saved jobs yet</h2>
          <p className="text-body-md text-on-surface-secondary mb-6 max-w-sm">
            Tap the bookmark icon on any job to save it here for later.
          </p>
          <Link 
            to="/" 
            className="bg-primary text-on-primary px-6 py-2 rounded-control font-medium hover:opacity-90 transition-opacity"
          >
            Browse Jobs
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {savedJobs.map((job) => (
            <JobCard key={job.id} job={job} showRemoveAction={true} />
          ))}
        </div>
      )}
    </Container>
  );
}