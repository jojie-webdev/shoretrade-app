import { Dispatch, SetStateAction } from 'react';

import { Category } from 'types/store/GetCategories';
import { MarketInterestItem } from 'types/store/GetMarketInterestsState';

export type Listing = {
  id: string;
  name: string;
  thumbnail: string;
};

export interface MarketInterestsGeneratedProps {
  isInner: boolean;
  setIsInner: Dispatch<SetStateAction<boolean>>;
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  selectedCategories: Listing[];
  setSelectedCategories: Dispatch<SetStateAction<Listing[]>>;

  buying: MarketInterestItem[];
  categories: Category[];
  innerCategories: Listing[];
  loadingInnerCategories: boolean;

  onPressCategory: (id: string) => void;
  onPressInnerCategory: (listing: Listing) => void;
  onSave: () => void;

  isSaving: boolean;
}
