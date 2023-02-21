import { createAsyncReducer } from 'utils/Redux';
import {
  CreateSellerCounterOfferMeta,
  CreateSellerCounterOfferPayload,
} from 'types/store/CreateSellerCounterOfferState';
import { createSellerCounterOfferActions } from '../actions';

export default createAsyncReducer<
  CreateSellerCounterOfferMeta,
  CreateSellerCounterOfferPayload
>(createSellerCounterOfferActions);
