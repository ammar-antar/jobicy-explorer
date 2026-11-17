import { QueryClient } from '@tanstack/react-query';
import { QUERY_CONFIG } from '@/config';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: QUERY_CONFIG.JOBS_STALE_TIME,
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});