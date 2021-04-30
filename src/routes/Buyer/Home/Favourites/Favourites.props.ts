import { ChangeEvent } from 'react';

import { GetBuyerHomepageResponseListingItem } from 'types/store/GetBuyerHomepageState';

export interface FavouritesGeneratedProps {
  results: GetBuyerHomepageResponseListingItem[];
  onChangeSearchValue: (event: ChangeEvent<HTMLInputElement>) => void;
  search: string;
  resetSearchValue: () => void;
  isPendingAccount: boolean;
}
