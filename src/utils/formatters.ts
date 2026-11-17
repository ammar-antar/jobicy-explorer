import type { Job } from '@/types/jobicy';

export function formatSalary(job: Job): string {
  if (!job.salaryMin || !job.salaryCurrency) {
    return 'Salary not disclosed';
  }
  const min = job.salaryMin.toLocaleString();
  const max = job.salaryMax ? ` – ${job.salaryMax.toLocaleString()}` : '';
  return `${min}${max} ${job.salaryCurrency}`;
}

export function decodeHtmlEntities(text: string): string {
  if (!text) return '';
  return text
    .replace(/&hellip;/g, '...')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

export function timeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) return 'Today';
  if (diffInDays === 1) return '1d ago';
  if (diffInDays < 30) return `${diffInDays}d ago`;
  return `${Math.floor(diffInDays / 30)}mo ago`;
}