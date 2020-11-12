import { ChangeEvent } from 'react';

import { SellerRatingProps } from 'components/module/SellerRating/SellerRating.props';
import { GetAllListingsResponseItem } from 'types/store/GetAllListingsState';

export interface SellerDetailsGeneratedProps {
  sellerRatingProps: SellerRatingProps;
  results: GetAllListingsResponseItem[];
  onChangeSearchValue: (event: ChangeEvent<HTMLInputElement>) => void;
  searchValue: string;
  resetSearchValue: () => void;
  loading: boolean;
}
