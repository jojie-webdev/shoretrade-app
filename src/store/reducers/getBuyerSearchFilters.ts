import {
  GetBuyerSearchFiltersMeta,
  GetBuyerSearchFiltersPayload,
} from 'types/store/GetBuyerSearchFiltersState';
import { createAsyncReducer } from 'utils/Redux';

import { getBuyerSearchFiltersActions } from '../actions';

export default createAsyncReducer<
  GetBuyerSearchFiltersMeta,
  GetBuyerSearchFiltersPayload
>(getBuyerSearchFiltersActions);
