import { apiClient } from './apiClient';
import type { 
  JobicySuccessResponse, 
  LocationsResponse, 
  IndustriesResponse 
} from '@/types/jobicy';

export type GetJobsParams = {
  count?: number;
  cursor?: string | null;
  geo?: string;
  industry?: string;
  tag?: string;
};

export const getJobs = async (params: GetJobsParams): Promise<JobicySuccessResponse> => {
  const response = await apiClient.get<JobicySuccessResponse>('/api/jobs', { params });
  return response.data;
};

export const getLocations = async (): Promise<LocationsResponse> => {
  const response = await apiClient.get<LocationsResponse>('/api/jobs', {
    params: { get: 'locations' },
  });
  return response.data;
};

export const getIndustries = async (): Promise<IndustriesResponse> => {
  const response = await apiClient.get<IndustriesResponse>('/api/jobs', {
    params: { get: 'industries' },
  });
  return response.data;
};