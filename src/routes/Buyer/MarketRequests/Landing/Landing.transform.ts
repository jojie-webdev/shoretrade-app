import { GetMarketRequestResponseItem } from 'types/store/GetMarketRequestState';
import { computeTimeRemaining } from 'utils/MarketRequest';

import { Result } from './Landing.props';

export const getMarketRequestLandingData = (data: any): Result[] =>
  data.map((item: GetMarketRequestResponseItem) => ({
    ...item,
    offersTotal: item.offers,
    expiry: computeTimeRemaining(item.createdAt),
  }));
