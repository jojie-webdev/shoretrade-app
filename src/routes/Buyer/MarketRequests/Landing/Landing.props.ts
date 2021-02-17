import { Dispatch, ChangeEvent } from 'react';

export type Result = {
  id: string;
  type: string;
  offersTotal: number;
  image: string;
  expiry: string;
  offers: any[];
};

export interface MarketRequestsLandingGeneratedProps {
  marketRequests: Result[];
  currentPath: string;
  onClickItem: (row: any) => void;
}
