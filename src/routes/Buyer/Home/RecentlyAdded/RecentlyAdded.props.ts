import { ChangeEvent } from 'react';

import { GetBuyerHomepageResponseListingItem } from 'types/store/GetBuyerHomepageState';

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
  negotiationCredit: number;
  handleShowNegoModal: (listingId: string) => void;
}
