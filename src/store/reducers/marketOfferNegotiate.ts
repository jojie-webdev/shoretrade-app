import { marketOfferNegotiateActions } from 'store/actions';
import {
  NegotiateOfferMeta,
  NegotiatePayload,
} from 'types/store/GetActiveOffersState';
import { createAsyncReducer } from 'utils/Redux';

export default createAsyncReducer<NegotiateOfferMeta, NegotiatePayload>(
  marketOfferNegotiateActions
);
