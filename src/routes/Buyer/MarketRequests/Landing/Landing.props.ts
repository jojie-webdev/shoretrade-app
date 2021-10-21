import { Dispatch, SetStateAction } from 'react';

import {
  GetActiveOffersRequestResponseItem,
  Offer,
} from 'types/store/GetActiveOffersState';

export type Result = {
  id: string;
  type: string;
  offers: number;
  offerStatus: string;
  image: string;
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
}
