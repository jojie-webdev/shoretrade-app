export type SearchInterface = {
  count: string;
  label: string;
  value: string;
};

export interface SearchLandingGeneratedProps {
  data: SearchInterface[];
  isSearching: boolean;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onReset: () => void;
  saveSearchHistory: (id: string, label: string, count: string) => void;
  isTyping?: boolean;
}
