export type Job = {
  id: number;
  url: string;
  jobSlug: string;
  jobTitle: string;
  companyName: string;
  companyLogo: string;
  jobIndustry: string[];
  jobType: string[];
  jobGeo: string;
  jobLevel?: string;
  jobExcerpt: string;
  jobDescription: string;
  pubDate: string;
  salaryMin?: number;
  salaryMax?: number;
  salaryCurrency?: string;
  salaryPeriod?: string;
};

export type JobicySuccessResponse = {
  apiVersion: string;
  documentationUrl: string;
  friendlyNotice: string;
  jobCount: number;
  lastUpdate: string;
  nextCursor: string | null;
  hasMore: boolean;
  appliedFilters: Record<string, unknown>;
  jobs: Job[];
  statusCode: number;
  success: true;
  message?: string;
};

export type JobicyErrorResponse = {
  success: false;
  error: string;
};

export type JobicyResponse = JobicySuccessResponse | JobicyErrorResponse;

export type Location = {
  geoID: number;
  geoName: string;
  geoSlug: string;
};

export type LocationsResponse = {
  locations: Location[];
  appliedFilters: Record<string, unknown>;
};

export type Industry = {
  industryID: number;
  industryName: string;
  industrySlug: string;
};

export type IndustriesResponse = {
  industries: Industry[];
  appliedFilters: Record<string, unknown>;
};