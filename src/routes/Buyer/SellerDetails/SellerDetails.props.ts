import { ChangeEvent, Dispatch, SetStateAction } from 'react';

import { SellerRatingProps } from 'components/module/SellerRating/SellerRating.props';
import { GetAllListingsResponseItem } from 'types/store/GetAllListingsState';
import { GetListingResponseItem } from 'types/store/GetListingState';

export interface SellerDetailsGeneratedProps {
  productSearchResultsHeader: { count: string; label: string; value: string }[];
  onReset: () => void;
  searchWord: string;
  setSearchWord: Dispatch<SetStateAction<string>>;
  recent: { count: string; label: string; value: string }[];
  saveSearchHistory: (id: string, label: string, count: string) => void;
  searching: () => void;
  loadingProductSearch: boolean;
  sellerRatingProps: SellerRatingProps;
  results: GetAllListingsResponseItem[];
  // products: GetListingResponseItem[];
  onChangeSearchValue: (event: ChangeEvent<HTMLInputElement>) => void;
  searchValue: string;
  resetSearchValue: () => void;
  onLoad: (sellerId: string) => void;
  sellerId: string;
  addresses: { label: string; value: string }[];
  selectedAddress: string;
  selectAddress: (id: string) => void;
  loading: boolean;
}
