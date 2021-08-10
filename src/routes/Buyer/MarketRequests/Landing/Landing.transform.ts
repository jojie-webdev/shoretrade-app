import moment from 'moment';
import { sortWith, descend, prop } from 'ramda';
import { GetMarketRequestResponseItem } from 'types/store/GetMarketRequestState';
import { formatRunningDateDifference } from 'utils/MarketRequest';

import { Result } from './Landing.props';

export const getMarketRequestLandingData = (data: any): Result[] => {
  if (!data) return [];

  const getOfferStatus = (offers: any) => {
    if (!Array.isArray(offers)) {
      return ''
    }

    const arr = sortWith([descend(prop('createdAt'))])(offers);
    const first: any = arr[0];
    if (!first) {
      return '';
    } else {
      const x = moment().startOf('day').diff(moment(first.createdAt), 'days');
      if (x === 0) {
        return 'NEW OFFER';
      } else {
        return 'NEGOTIATION';
      }
    }
  };
  return data.map((item: GetMarketRequestResponseItem) => ({
    ...item,
    expiry: moment(item.createdAt).add(7, 'd').isBefore()
      ? 'Expired'
      : formatRunningDateDifference(
        moment(item.createdAt).add(7, 'd').format(),
        'day'
      ),
    offers: item?.offers?.length || 0,
    offerStatus: getOfferStatus(item.offers),
  }));
};
