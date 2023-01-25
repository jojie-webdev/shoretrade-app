import { Dispatch, SetStateAction } from 'react';

import { SearchProductTypeResponseItem } from 'types/store/SearchProductTypeState';

import { CreateStepProps } from '../Create.props';

export interface CategoryItem {
  id: string;
  name: string;
}

export interface CategorySelectionProps extends CreateStepProps {
  pendingSearch: boolean;
  hideSearchResult: boolean;
  search: (term: string) => void;
  typeSearchResults: SearchProductTypeResponseItem[];
  buying: any;
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  setSelectedCategory: Dispatch<SetStateAction<CategoryItem>>;
  updateCategory: (v: any) => void;
}
