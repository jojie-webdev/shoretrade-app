import { ChangeEvent } from 'react';

import { GetListingTypesByCategoryTypeItem } from 'types/store/GetListingTypesByCategoryState';

export interface CategoriesSearchGeneratedProps {
  onChangeSearchValue: (event: ChangeEvent<HTMLInputElement>) => void;
  searchValue: string;
  resetSearchValue: () => void;
  loading: boolean;
  results: GetListingTypesByCategoryTypeItem[];
  onLoad: (categoryId: string) => void;
  categoryId: string;
}
