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

  if (
    status === 'OPEN' &&
    negotiations?.length > 0 &&
    isCounterOfferMade(negotiations, from)
  ) {
    return 'NEGOTIATION';
  }

  console.log(daysPassed);

  if (daysPassed <= 7 && status === 'OPEN' && (!negotiations || negotiations?.length === 0)) {
    return 'NEW OFFER';
  }
};
