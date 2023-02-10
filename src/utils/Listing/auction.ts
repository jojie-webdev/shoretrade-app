import moment from 'moment';

export const isPreAuctionExpired = (auctionDate: string) => {
  const modifiedAuctionDate = moment(auctionDate).startOf('day');
  const diffTime = Math.abs(
    new Date(modifiedAuctionDate.toISOString()).getTime() - new Date().getTime()
  );

  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays <= 1) {
    return new Date().getHours() >= 16;
  }

  return false;
};
