import { useQuery } from '@tanstack/react-query';
import { getLocations, getIndustries } from '@/services/jobsApi';
import { QUERY_CONFIG } from '@/config';

export function useLocations() {
  return useQuery({
    queryKey: ['locations'],
    queryFn: getLocations,
    staleTime: QUERY_CONFIG.TAXONOMY_STALE_TIME,
  });
}

export function useIndustries() {
  return useQuery({
    queryKey: ['industries'],
    queryFn: getIndustries,
    staleTime: QUERY_CONFIG.TAXONOMY_STALE_TIME,
  });
}