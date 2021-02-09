import { Dispatch, ChangeEvent } from 'react';

export type Results = {
  id: string;
  name: string;
  offersTotal: number;
  thumbnail: string;
  timeRemaining: string;
};

export interface MarketRequestsLandingGeneratedProps {
  marketRequests: Results[];
  currentPath: string;
}
