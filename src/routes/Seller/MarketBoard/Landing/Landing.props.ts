import { Dispatch, SetStateAction } from 'react';

import { GetActiveOffersRequestResponseItem } from 'types/store/GetActiveOffersState';
import { GetAllMarketRequestResponseItem } from 'types/store/GetAllMarketRequestState';

export type TabOptions = 'Buyer Requests' | 'My Active Offers';

export interface MarketBoardLandingGeneratedProps {
  buyerRequests: GetAllMarketRequestResponseItem[];
  activeOffers: GetActiveOffersRequestResponseItem[];
  isLoading: boolean;

  currentTab: TabOptions;
  onChangeCurrentTab: (newTab: TabOptions) => void;

  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;

  onClickOffer: (data: GetAllMarketRequestResponseItem) => void;
}
