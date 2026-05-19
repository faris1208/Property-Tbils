import { create } from 'zustand';
import { PropertyFilters } from '@/types';

interface FilterState {
  filters: PropertyFilters;
  setFilters: (filters: Partial<PropertyFilters>) => void;
  resetFilters: () => void;
}

const defaults: PropertyFilters = {
  page: 1,
  limit: 12,
  sort: 'newest',
};

export const useFilterStore = create<FilterState>((set) => ({
  filters: defaults,
  setFilters: (filters) =>
    set((state) => ({ filters: { ...state.filters, ...filters, page: 1 } })),
  resetFilters: () => set({ filters: defaults }),
}));
