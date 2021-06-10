import { Dispatch } from 'react';

export type SearchInterface = {
  count: string;
  label: string;
  value: string;
};

export interface SearchLandingGeneratedProps {
  data: SearchInterface[];
  isSearching: boolean;
  searchTerm: string;
  setSearchTerm: Dispatch<string>;
  onReset: () => void;
  saveSearchHistory: (id: string, label: string, count: string) => void;
}
