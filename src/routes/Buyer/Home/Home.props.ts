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
  creditState: CreditState;
  creditBalance: string;
  featured: string[];
  recentlyAdded: GetBuyerHomepageResponseListingItem[];
  categories: CategoryResults[];
  favourites: GetBuyerHomepageResponseListingItem[];
  favouriteSellers: SellerResults[];
  sellers: SellerResults[];
  changeDefaultAddress: (id: string) => void;
}

export interface HomeData {
  bannerData: {
    app: string[];
    web: string[];
  };
  categories: {
    id: string;
    name: string;
    sortIndex: number;
    thumbnail: string;
  }[];
  favouriteListing: GetBuyerHomepageResponseListingItem[];
  favouriteSellers: {
    companyImage: string;
    companyName: string;
    id: string;
  }[];
  recentListing: GetBuyerHomepageResponseListingItem[];
  sellers: {
    companyImage: string;
    companyName: string;
    id: string;
  }[];
}
