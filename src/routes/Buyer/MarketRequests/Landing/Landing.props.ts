import { Dispatch, SetStateAction } from 'react';

export type Result = {
  id: string;
  type: string;
  offers: number;
  offerStatus: any;
  image: string;
  expiry: string;
  weight?: {
    from: number;
    to: number;
  };
  sizeFrom?: number;
  sizeTo?: number;
  sizeUngraded?: boolean;
  sizeOptions?: [];
  measurementUnit?: string;
  specifications?: [];
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
}
