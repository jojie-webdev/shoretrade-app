import {
  NegotiateOffer,
  NegotiationPayload,
} from 'types/store/MarketOfferState';
import { createAsyncAction } from 'utils/Redux';

const ns = 'MARKET_REQUEST_NEGOTIATE_OFFER';
const asyncAction = createAsyncAction<NegotiateOffer, NegotiationPayload>(ns);

const marketRequestNegotiateOfferActions = {
  ...asyncAction,
};

export default marketRequestNegotiateOfferActions;
