import moment from 'moment';

import { formatRunningDateDifference } from '.';

export const createdAtToExpiry = (createdAt?: string) => {
  const expiry = moment(createdAt).add(7, 'd').isBefore()
    ? 'Expired'
    : formatRunningDateDifference(moment(createdAt).add(7, 'd').format());

  return expiry;
};
