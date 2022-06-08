import { ChangeEvent } from 'react';

import { GetAllListingsResponseItem } from 'types/store/GetAllListingsState';

export interface SellerRatingProps {
  companyName: string;
  companyImage: string;
  companyLocation: string;
  rating: string | number;
  listings?: Array<any>;
  isFavorite?: boolean;
  onFavorite: () => Promise<any>;
}

export interface SellerDetailsGeneratedProps {
  sellerRatingProps: SellerRatingProps;
  results: GetAllListingsResponseItem[];
  onChangeSearchValue: (event: ChangeEvent<HTMLInputElement>) => void;
  searchValue: string;
  resetSearchValue: () => void;
  loading: boolean;
  listingCount: number;
}
