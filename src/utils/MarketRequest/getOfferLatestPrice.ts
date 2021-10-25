import {
  GetActiveOffersRequestResponseItem,
  Offer,
} from 'types/store/GetActiveOffersState';

export const getOfferLatestPrice = (
  offer: GetActiveOffersRequestResponseItem | Offer
): number => {
  let latestPrice = offer.price || 0;
  if (offer.negotiations) {
    const newOfferArr = offer.negotiations.filter(
      (i: any) => i.type === 'NEW_OFFER'
    );
    const newOfferLatest = newOfferArr.slice(-1)[0];
    if (newOfferLatest) {
      latestPrice = newOfferLatest.price;
    }
  }

  return latestPrice;
};
