import { ChangeEvent } from 'react';

import { GetBuyerHomepageResponseListingItem } from 'types/store/GetBuyerHomepageState';

export interface FavouritesGeneratedProps {
  results: GetBuyerHomepageResponseListingItem[];
  isPendingAccount: boolean;
  isLoadingResults: boolean;

  onChangeSearchValue: (event: ChangeEvent<HTMLInputElement>) => void;
  searchValue: string;
}
