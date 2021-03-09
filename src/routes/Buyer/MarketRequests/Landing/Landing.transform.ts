import { GetMarketRequestResponseItem } from 'types/store/GetMarketRequestState';
import { formatRunningDateDifference } from 'utils/MarketRequest';

import { Result } from './Landing.props';

export const getMarketRequestLandingData = (data: any): Result[] => {
  if (!data) return [];
  return data.map((item: GetMarketRequestResponseItem) => ({
    ...item,
    expiry: formatRunningDateDifference(item.createdAt),
  }));
};
