import {
  CreateMarketOfferMeta,
  CreateMarketOfferPayload,
} from 'types/store/CreateMarketOfferState';
import { createAsyncReducer } from 'utils/Redux';

import { createMarketOfferActions } from '../actions';

export default createAsyncReducer<
  CreateMarketOfferMeta,
  CreateMarketOfferPayload
>(createMarketOfferActions);
