import {
  GetAllMarketRequestFiltersMeta,
  GetAllMarketRequestFiltersPayload,
} from 'types/store/GetAllMarketRequestFiltersState';
import { createAsyncReducer } from 'utils/Redux';

import { getAllMarketRequestFiltersActions } from '../actions';

export default createAsyncReducer<
  GetAllMarketRequestFiltersMeta,
  GetAllMarketRequestFiltersPayload
>(getAllMarketRequestFiltersActions);
