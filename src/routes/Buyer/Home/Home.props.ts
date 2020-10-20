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
  loading: boolean;
  addresses: GetAddressesResponseItem[];
  addressOptions: { label: string; value: string }[];
  creditState: CreditState;
  creditBalance: string;
  featured: string[];
  recentlyAdded: GetBuyerHomepageResponseListingItem[];
  categories: CategoryResults[];
  favourites: GetBuyerHomepageResponseListingItem[];
  favouriteSellers: SellerResults[];
  sellers: SellerResults[];
  changeDefaultAddress: (id: string) => void;
  loadingHomePage: boolean;
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
