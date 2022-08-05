import { Dispatch, SetStateAction } from 'react';

import { Category } from 'types/store/GetCategories';
import { MarketInterestItem } from 'types/store/GetMarketInterestsState';

export type Listing = {
  id: string;
  name: string;
  thumbnail: string;
  categoryId?: string;
};

export interface MarketInterestsGeneratedProps {
  isInner: boolean;
  setIsInner: Dispatch<SetStateAction<boolean>>;
  currentCategoryId: string;
  setCurrentCategoryId: Dispatch<SetStateAction<string>>;
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  selectedCategories: {
    id: string;
    name: string;
    categoryId: string;
  }[];
  setSelectedCategories: Dispatch<
    SetStateAction<
      {
        id: string;
        name: string;
        categoryId: string;
      }[]
    >
  >;
  setCategories: Dispatch<SetStateAction<Category[]>>;
  setInnerCategories: Dispatch<SetStateAction<Listing[]>>;
  selling: MarketInterestItem[];
  categories: Category[];
  innerCategories: Listing[];
  loadingInnerCategories: boolean;
  onPressCategory: (id: string) => void;
  onPressInnerCategory: (listing: {
    id: string;
    name: string;
    categoryId: string;
  }) => void;
  onSave: () => void;
  isSaving: boolean;
  companyRelationship?: string;
}
