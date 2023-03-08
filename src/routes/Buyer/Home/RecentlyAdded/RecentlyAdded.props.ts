import { ChangeEvent } from 'react';

import { GetBuyerHomepageResponseListingItem } from 'types/store/GetBuyerHomepageState';
import { GetNegotiationCreditRequestResponseItem } from 'types/store/GetNegotiationCreditState';

export interface RecentlyAddedGeneratedProps {
  results: GetBuyerHomepageResponseListingItem[];
  isPendingAccount: boolean;
  isLoadingResults: boolean;

  onChangeSearchValue: (event: ChangeEvent<HTMLInputElement>) => void;
  onResetSearchValue: () => void;
  searchValue: string;
  canNegotiate?: boolean;
  handleNegotiableToggle: (show: boolean) => void;
  showNegotiable: { showNegotiable: boolean };
  handleShowNegoCreditsModal: () => void;
  negotiationCredit: GetNegotiationCreditRequestResponseItem | undefined;
  handleShowNegoModal: (listingId: string) => void;
}
