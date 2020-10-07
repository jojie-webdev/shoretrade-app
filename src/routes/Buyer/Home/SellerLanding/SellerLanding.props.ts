import { ChangeEvent } from 'react';

import { GetBuyerHomepageResponseListingItem } from 'types/store/GetBuyerHomepageState';

export interface SellerLandingGeneratedProps {
  search: string;
  results: {
    companyImage: string;
    companyName: string;
    id: string;
  }[];
  onChangeSearchValue: (event: ChangeEvent<HTMLInputElement>) => void;
  resetSearchValue: () => void;
}
