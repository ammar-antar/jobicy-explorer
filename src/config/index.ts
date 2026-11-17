export const API_CONFIG = {
  BASE_URL: 'https://jobicy.com',
  TIMEOUT_MS: 10000,
} as const;

export const QUERY_CONFIG = {
  DEFAULT_PAGE_SIZE: 20,
  JOBS_STALE_TIME: 45 * 60 * 1000,
  TAXONOMY_STALE_TIME: Infinity,
} as const;