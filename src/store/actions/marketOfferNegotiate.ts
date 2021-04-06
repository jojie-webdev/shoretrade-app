import {
  NegotiateOfferMeta,
  NegotiatePayload,
} from 'types/store/GetActiveOffersState';
import { createAsyncAction } from 'utils/Redux';

const ns = 'MARKET_OFFER_NEGOTIATE';
const asyncAction = createAsyncAction<NegotiateOfferMeta, NegotiatePayload>(ns);

const marketOfferNegotiateActions = {
  ...asyncAction,
};

export default marketOfferNegotiateActions;
