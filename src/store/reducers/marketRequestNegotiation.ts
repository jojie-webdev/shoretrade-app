import {
  NegotiateOffer,
  NegotiationPayload,
} from 'types/store/MarketOfferState';
import { createAsyncReducer } from 'utils/Redux';

import { marketRequestNegotiationOfferActions } from '../actions';

export default createAsyncReducer<NegotiateOffer, NegotiationPayload>(
  marketRequestNegotiationOfferActions
);
