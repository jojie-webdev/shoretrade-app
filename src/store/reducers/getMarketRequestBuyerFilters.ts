import {
  GetMarketRequestBuyerFiltersMeta,
  GetMarketRequestBuyerFiltersPayload,
} from 'types/store/GetMarketRequestBuyerFiltersState';
import { createAsyncReducer } from 'utils/Redux';

import { getMarketRequestBuyerFiltersActions } from '../actions';

export default createAsyncReducer<
  GetMarketRequestBuyerFiltersMeta,
  GetMarketRequestBuyerFiltersPayload
>(getMarketRequestBuyerFiltersActions);
