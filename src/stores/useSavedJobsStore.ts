import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Job } from '@/types/jobicy';

type SavedJobsState = {
  savedJobs: Job[];
  addJob: (job: Job) => void;
  removeJob: (id: number) => void;
  isSaved: (id: number) => boolean;
};

export const useSavedJobsStore = create<SavedJobsState>()(
  persist(
    (set, get) => ({
      savedJobs: [],
      addJob: (job) => 
        set((state) => ({ 
          savedJobs: [...state.savedJobs, job] 
        })),
      removeJob: (id) => 
        set((state) => ({ 
          savedJobs: state.savedJobs.filter((j) => j.id !== id) 
        })),
      isSaved: (id) => 
        get().savedJobs.some((j) => j.id === id),
    }),
    {
      name: 'jobicy-saved-jobs',
    }
  )
);