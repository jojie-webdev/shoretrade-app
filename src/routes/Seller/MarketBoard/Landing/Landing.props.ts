import { Dispatch, SetStateAction } from 'react';

import { FilterModalProps } from 'components/module/FilterModal/FilterModal.props';
import { GetActiveOffersRequestResponseItem } from 'types/store/GetActiveOffersState';
import { GetAllMarketRequestResponseItem } from 'types/store/GetAllMarketRequestState';
import { GetAllNegoRequestResponseItem } from 'types/store/GetAllNegotiationsState';

import { TABS } from './Landing.constants';

export type TabOptions = 'Buyer Requests' | 'My Active Offers';

export interface MarketBoardLandingGeneratedProps {
  marketRequests: GetAllMarketRequestResponseItem[];
  sellingRequests: GetAllMarketRequestResponseItem[];
  buyerRequests: GetAllMarketRequestResponseItem[];
  activeOffers: GetActiveOffersRequestResponseItem[];
  negotiations:
    | (GetAllNegoRequestResponseItem & {
        expiry: any;
      })[]
    | undefined;
  isLoading: boolean;

  currentTab: TabOptions;
  onChangeCurrentTab: (newTab: TabOptions) => void;

  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;

  onClickOffer: (data: GetAllMarketRequestResponseItem) => void;
  onClickActiveOffer: (data: GetActiveOffersRequestResponseItem) => void;
  onClickFilterButton: () => void;

  filterModalProps: FilterModalProps;
  userPending: boolean;
  handleTabSelect: (selectedTab: TABS) => void;
  activeTab: string;
  onNegotiationClick: (data: GetAllNegoRequestResponseItem) => void;
  handleSearchNegotiations: (keyword: string) => void;
  searchNegoTerm: string;
}
