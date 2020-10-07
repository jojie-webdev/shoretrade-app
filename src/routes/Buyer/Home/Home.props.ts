import { ChangeEvent } from 'react';

import { GetBuyerHomepageResponseListingItem } from 'types/store/GetBuyerHomepageState';

export type CategoryResults = {
  id: string;
  name: string;
  sortIndex: number;
  thumbnail: string;
};

export type SellerResults = {
  companyImage: string;
  companyName: string;
  id: string;
};

export type CreditState = 'normal' | 'pending' | 'empty' | 'lessThan';

export interface HomeGeneratedProps {
  categories: CategoryResults[];
  favouriteSellers: SellerResults[];
  sellers: SellerResults[];
  creditState: CreditState;
  creditBalance: string;
  favourites: GetBuyerHomepageResponseListingItem[];
  recentlyAdded: GetBuyerHomepageResponseListingItem[];
  onChangeSearchValue: (event: ChangeEvent<HTMLInputElement>) => void;
  search: string;
  resetSearchValue: () => void;
  addresses: { label: string; value: string }[];
  selectedAddress: string;
  selectAddress: (id: string) => void;
  loading: boolean;
  featured: string[];
}
