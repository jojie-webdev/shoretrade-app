import moment from 'moment';
import {
  isCounterOfferMade,
  isPaymentPending,
  isPaymentRequired,
} from 'routes/Seller/MarketBoard/Landing/Landing.transform';

export const getOfferStatus = (offer: any, from: 'seller' | 'buyer') => {
  if (!offer) {
    return '';
  }

  const { negotiations, status, createdAt } = offer;

  const daysPassed = moment().startOf('day').diff(moment(createdAt), 'days');

  if (status === 'ACCEPTED') {
    return 'ACCEPTED';
  }

  if (isPaymentRequired(negotiations) && !isPaymentPending(negotiations)) {
    return 'PAYMENT MISSED';
  }

  if (from === 'seller' && status === 'DECLINED') {
    return 'DECLINED';
  }

  if (isPaymentRequired(negotiations)) {
    return 'PAYMENT REQUIRED';
  }

  const isNotExpired = () => {
    const isNotExpired = daysPassed <= 7;

    return isNotExpired;
  };

  if (status === 'OPEN' && isNotExpired()) {
    if (from === 'seller') {
      if (
        negotiations?.length > 0 &&
        isCounterOfferMade(negotiations, 'buyer')
      ) {
        return 'NEW OFFER';
      }

      return 'NEGOTIATION';
    }
    if (from === 'buyer') {
      if (
        (negotiations?.length > 0 &&
          isCounterOfferMade(negotiations, 'seller')) ||
        !negotiations
      ) {
        return 'NEW OFFER';
      }

      return 'NEGOTIATION';
    }
  }
};
