import moment from 'moment';
import {
  isCounterOfferMade,
  isPaymentPending,
  isPaymentRequired,
} from 'routes/Seller/MarketBoard/Landing/Landing.transform';
import {
  GetActiveOffersRequestResponseItem,
  Offer,
  OfferStatus,
} from 'types/store/GetActiveOffersState';

export const getOfferStatus = (
  offer: GetActiveOffersRequestResponseItem | Offer,
  from: 'seller' | 'buyer'
): OfferStatus | string => {
  if (!offer) {
    return '';
  }

  const { negotiations, status, createdAt } = offer;

  const daysPassed = moment().startOf('day').diff(moment(createdAt), 'days');

  if (status === OfferStatus.ACCEPTED) {
    return OfferStatus.ACCEPTED;
  }

  if (status === OfferStatus.PARTIAL) {
    return OfferStatus.PENDING_PAYMENT;
  }

  if (isPaymentRequired(negotiations) && !isPaymentPending(negotiations)) {
    return OfferStatus.PAYMENT_MISSED;
  }

  if (from === 'seller' && status === OfferStatus.DECLINED) {
    return OfferStatus.DECLINED;
  }

  if (isPaymentRequired(negotiations)) {
    return OfferStatus.NEGOTIATION;
  }

  const isNotExpired = () => {
    const isNotExpired = daysPassed <= 7;

    return isNotExpired;
  };

  if (status === OfferStatus.NEGOTIATION && isNotExpired()) {
    if (from === 'seller') {
      if (
        negotiations?.length > 0 &&
        isCounterOfferMade(negotiations, 'buyer')
      ) {
        return OfferStatus.NEW_OFFER;
      }

      return OfferStatus.NEGOTIATION;
    }
    if (from === 'buyer') {
      if (
        (negotiations?.length > 0 &&
          isCounterOfferMade(negotiations, 'seller')) ||
        !negotiations
      ) {
        return OfferStatus.NEW_OFFER;
      }

      return OfferStatus.NEGOTIATION;
    }
  }

  return '';
};

export const hasOfferWithPaymentRequired = (offers: Offer[]) => {
  if (!offers) {
    return;
  }

  const offer = offers.find(
    (offer) => getOfferStatus(offer, 'buyer') === 'PAYMENT REQUIRED'
  );

  return offer;
};
