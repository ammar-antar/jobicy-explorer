import axios, { AxiosError } from 'axios';
import { API_CONFIG } from '@/config';

export const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT_MS,
  headers: { Accept: 'application/json' },
});

apiClient.interceptors.response.use(
  (response) => {
    if (response.data && response.data.success === false) {
      return Promise.reject(new Error(response.data.error || 'API Error'));
    }
    return response;
  },
  (error: AxiosError) => {
    const apiError = error.response?.data as { error?: string } | undefined;
    return Promise.reject(new Error(apiError?.error || error.message));
  }
);