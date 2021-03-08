import { GetMarketRequestResponseItem } from 'types/store/GetMarketRequestState';
import { computeTimeRemaining } from 'utils/MarketRequest';

import { Result } from './Landing.props';

export const getMarketRequestLandingData = (data: any): Result[] => {
  if (!data) return [];
  return data.map((item: GetMarketRequestResponseItem) => ({
    ...item,
    offersTotal: Array.isArray(item.offers) ? item.offers.length : 0,
    expiry: computeTimeRemaining(item.createdAt),
  }));
};
