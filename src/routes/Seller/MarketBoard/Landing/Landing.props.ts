import { Dispatch, SetStateAction } from 'react';

export type TabOptions = 'Buyer Requests' | 'My Active Offers';

export interface MarketBoardLandingGeneratedProps {
  currentTab: TabOptions;
  onChangeCurrentTab: (newTab: TabOptions) => void;

  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
}
