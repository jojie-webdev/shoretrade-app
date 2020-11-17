import { Dispatch, SetStateAction } from 'react';

export interface SearchLandingGeneratedProps {
  search: () => void;
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  loading: boolean;
  results: { count: string; label: string; value: string }[];
  onReset: () => void;
  recent: { count: string; label: string; value: string }[];
  addresses: { label: string; value: string }[];
  selectedAddress: string;
  selectAddress: (id: string) => void;
  saveSearchHistory: (id: string, label: string, count: string) => void;
}
