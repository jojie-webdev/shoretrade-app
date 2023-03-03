import { ChangeEvent } from 'react';

import { GetBuyerHomepageResponseListingItem } from 'types/store/GetBuyerHomepageState';

export interface FavouritesGeneratedProps {
  results: GetBuyerHomepageResponseListingItem[];
  isPendingAccount: boolean;
  isLoadingResults: boolean;

  onChangeSearchValue: (event: ChangeEvent<HTMLInputElement>) => void;
  onResetSearchValue: () => void;
  searchValue: string;
  handleShowNegoCreditsModal: () => void;
  negotiationCredit: string;
  handleShowNegoModal: (listingId: string) => void;
}
