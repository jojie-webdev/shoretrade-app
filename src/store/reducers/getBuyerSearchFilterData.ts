import {
  GetBuyerSearchFilterDataMeta,
  GetBuyerSearchFilterDataPayload,
} from 'types/store/GetBuyerSearchFilterDataState';
import { createAsyncReducer } from 'utils/Redux';

import { getBuyerSearchFilterDataActions } from '../actions';

export default createAsyncReducer<
  GetBuyerSearchFilterDataMeta,
  GetBuyerSearchFilterDataPayload
>(getBuyerSearchFilterDataActions);
