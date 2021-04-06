import { AcceptOffer, NegotiationPayload } from 'types/store/MarketOfferState';
import { createAsyncAction } from 'utils/Redux';

const ns = 'MARKET_REQUEST_ACCEPT_OFFER';
const asyncAction = createAsyncAction<AcceptOffer, NegotiationPayload>(ns);

const marketRequestAcceptOfferActions = {
  ...asyncAction,
};

export default marketRequestAcceptOfferActions;
