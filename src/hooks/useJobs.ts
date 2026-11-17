import { useInfiniteQuery } from '@tanstack/react-query';
import { getJobs, type GetJobsParams } from '@/services/jobsApi';
import { QUERY_CONFIG } from '@/config';

export function useJobs(filters: Omit<GetJobsParams, 'cursor'>) {
  return useInfiniteQuery({
    queryKey: ['jobs', filters],
    queryFn: async ({ pageParam }) => {
      return await getJobs({ 
        ...filters, 
        count: QUERY_CONFIG.DEFAULT_PAGE_SIZE, 
        cursor: pageParam 
      });
    },
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => (lastPage.hasMore ? lastPage.nextCursor : undefined),
    staleTime: QUERY_CONFIG.JOBS_STALE_TIME,
  });
}