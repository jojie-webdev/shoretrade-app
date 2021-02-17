import { Dispatch, ChangeEvent } from 'react';

export type RequestDetail = {
  id: string;
  name: string;
  offersTotal: number;
  offers: any[];
  thumbnail: string;
  timeRemaining: string;
};

export interface MarketRequestDetailProps {
  data: RequestDetail;
  currentPath: string;
}
