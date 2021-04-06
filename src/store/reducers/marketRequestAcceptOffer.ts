import { AcceptOffer, NegotiationPayload } from 'types/store/MarketOfferState';
import { createAsyncReducer } from 'utils/Redux';

import { marketRequestAcceptOfferActions } from '../actions';

export default createAsyncReducer<AcceptOffer, NegotiationPayload>(
  marketRequestAcceptOfferActions
);
