import { useSearchParams } from 'react-router-dom';
import { useCallback, useMemo } from 'react';

export type FilterState = {
  tag?: string;
  geo?: string;
  industry?: string;
};

export function useFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters: FilterState = useMemo(() => ({
    tag: searchParams.get('tag') || undefined,
    geo: searchParams.get('geo') || undefined,
    industry: searchParams.get('industry') || undefined,
  }), [searchParams]);

  const setFilter = useCallback((key: keyof FilterState, value: string | undefined) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      if (value) {
        newParams.set(key, value);
      } else {
        newParams.delete(key);
      }
      return newParams;
    });
  }, [setSearchParams]);

  const resetFilters = useCallback(() => {
    setSearchParams(new URLSearchParams());
  }, [setSearchParams]);

  return { filters, setFilter, resetFilters };
}