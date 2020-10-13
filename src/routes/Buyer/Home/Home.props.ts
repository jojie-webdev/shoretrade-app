import { Dispatch, SetStateAction, ChangeEvent } from 'react';

import { GetAddressesResponseItem } from 'types/store/GetAddressesState';
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
  search: () => void;
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  loading: boolean;
  results: { count: string; label: string; value: string }[];
  onReset: () => void;
  recent: { count: string; label: string; value: string }[];
  addresses: GetAddressesResponseItem[];
  addressOptions: { label: string; value: string }[];
  selectedAddress: string;
  selectAddress: (id: string) => void;
  saveSearchHistory: (id: string, label: string, count: string) => void;
  categories: CategoryResults[];
  favouriteSellers: SellerResults[];
  sellers: SellerResults[];
  creditState: CreditState;
  creditBalance: string;
  favourites: GetBuyerHomepageResponseListingItem[];
  recentlyAdded: GetBuyerHomepageResponseListingItem[];
  featured: string[];
  changeDefaultAddress: (id: string) => void;
}
