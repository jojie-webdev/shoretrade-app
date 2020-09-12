import { ChangeEvent } from 'react';

import { GetBuyerHomepageResponseListingItem } from 'types/store/GetBuyerHomepageState';

export interface FavouritesGeneratedProps {
  results: GetBuyerHomepageResponseListingItem[];
  onChangeSearchValue: (event: ChangeEvent<HTMLInputElement>) => void;
  search: string;
  resetSearchValue: () => void;
  addresses: { label: string; value: string }[];
  selectedAddress: string;
  selectAddress: (id: string) => void;
}
