import { ChangeEvent } from 'react';

import { GetListingTypesByCategoryTypeItem } from 'types/store/GetListingTypesByCategoryState';

export interface CategoriesSearchGeneratedProps {
  loading: boolean;
  results: GetListingTypesByCategoryTypeItem[];
  isSuccess: boolean;
  isPendingAccount: boolean;
}
