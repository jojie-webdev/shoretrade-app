import { Dispatch, ChangeEvent } from 'react';

export type Results = {
  id: string;
  name: string;
  sortIndex: number;
  thumbnail: string;
};

export interface MarketRequestsLandingGeneratedProps {
  marketRequests: Results[];
  currentPath: string;
}
