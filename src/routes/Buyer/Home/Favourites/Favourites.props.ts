import { ChangeEvent } from 'react';

import { GetBuyerHomepageResponseListingItem } from 'types/store/GetBuyerHomepageState';
import { GetNegotiationCreditRequestResponseItem } from 'types/store/GetNegotiationCreditState';

export interface FavouritesGeneratedProps {
  results: GetBuyerHomepageResponseListingItem[];
  isPendingAccount: boolean;
  isLoadingResults: boolean;

  onChangeSearchValue: (event: ChangeEvent<HTMLInputElement>) => void;
  onResetSearchValue: () => void;
  searchValue: string;
  handleShowNegoCreditsModal: () => void;
  negotiationCredit: GetNegotiationCreditRequestResponseItem | undefined;
  handleShowNegoModal: (listingId: string) => void;
  canNegotiate: boolean;
}
