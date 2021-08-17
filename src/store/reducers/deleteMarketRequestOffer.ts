import {
  DeleteMarketRequestOfferMeta,
  DeleteMarketRequestOfferPayload,
} from 'types/store/DeleteMarketRequestOfferState';
import { createAsyncReducer } from 'utils/Redux';

import { deleteMarketRequestOfferActions } from '../actions';

export default createAsyncReducer<
  DeleteMarketRequestOfferMeta,
  DeleteMarketRequestOfferPayload
>(deleteMarketRequestOfferActions);
