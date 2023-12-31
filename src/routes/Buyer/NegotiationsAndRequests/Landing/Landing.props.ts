import { Dispatch, SetStateAction } from 'react';
import { NegotiationWithExpiry } from 'routes/Seller/MarketBoard/Landing/Landing.props';

import {
  GetActiveOffersRequestResponseItem,
} from 'types/store/GetActiveOffersState';
import { GetAllNegoRequestResponseItem } from 'types/store/GetAllNegotiationsState';
import { GetNegotiationCreditRequestResponseItem } from 'types/store/GetNegotiationCreditState';

export type Result = {
  id: string;
  type: string;
  offers: number;
  requestStatus: string;
  image: string;
  status: string;
  expiry: string;
  metric: string;
  paymentRequired: boolean;
  weight?: {
    from: number;
    to: number;
  };
  measurementUnit?: string;
  specs?: string;
  size?: { from: number; to: number; options: any; ungraded: boolean };
};

export interface MarketRequestsLandingGeneratedProps {
  marketRequests: Result[];
  negotiations:
    | NegotiationWithExpiry[]
    | undefined;
  currentPath: string;
  onClickItem: (row: any) => void;
  isPendingAccount: boolean;
  onDelete: (id: string) => void;
  itemToDelete: {
    value: null | string;
  };
  pendingDeleteMarketRequest: boolean;
  setItemToDelete: Dispatch<SetStateAction<{ value: null | string }>>;
  loading: boolean;
  activeOffersData: GetActiveOffersRequestResponseItem[];
  reverseMarketPlace: boolean;
  canNegotiate: boolean;
  handleTabSelect: (selectedTab: TABS) => void;
  selectedTab: string;
  handleSearchChange: (text: string) => void;
  searchKeyword: string;
  onClickNegoItem: (
    row: GetAllNegoRequestResponseItem & {
      expiry: any;
    }
  ) => void;
  negotiationCredit: GetNegotiationCreditRequestResponseItem | undefined;
}

export enum TABS {
  NEGOTIATIONS = 'Negotiations',
  MARKET_REQUEST = 'Market Request',
}
