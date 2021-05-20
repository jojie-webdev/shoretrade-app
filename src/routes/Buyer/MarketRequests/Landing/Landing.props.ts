import { Dispatch, SetStateAction } from 'react';

export type Result = {
  id: string;
  type: string;
  offers: number;
  image: string;
  expiry: string;
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
}
