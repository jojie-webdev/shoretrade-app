import { Dispatch, ChangeEvent } from 'react';

export type RequestDetail = {
  id: string;
  type: string;
  offersTotal: number;
  image: string;
  status: string;
  expiry: string;
};

export interface MarketRequestDetailProps {
  data: RequestDetail;
  currentPath: string;
}
