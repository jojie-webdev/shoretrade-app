import {
  GetAllMarketRequestMeta,
  GetAllMarketRequestPayload,
} from 'types/store/GetAllMarketRequestState';
import { createAsyncReducer } from 'utils/Redux';

import { getAllMarketRequestActions } from '../actions';

export default createAsyncReducer<
  GetAllMarketRequestMeta,
  GetAllMarketRequestPayload
>(getAllMarketRequestActions);
