import { ChangeEvent } from 'react';

import { GetBuyerHomepageResponseListingItem } from 'types/store/GetBuyerHomepageState';

export interface RecentlyAddedGeneratedProps {
  results: GetBuyerHomepageResponseListingItem[];
  onChangeSearchValue: (event: ChangeEvent<HTMLInputElement>) => void;
  search: string;
  resetSearchValue: () => void;
}
