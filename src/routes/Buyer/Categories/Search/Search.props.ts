import { ChangeEvent } from 'react';

import { GetListingTypesByCategoryTypeItem } from 'types/store/GetListingTypesByCategoryState';

export interface CategoriesSearchGeneratedProps {
  loading: boolean;
  results: GetListingTypesByCategoryTypeItem[];
  isPendingAccount: boolean;

  search: string;
  onChangeSearchValue: (event: ChangeEvent<HTMLInputElement>) => void;
  onResetSearchValue: () => void;
}
