import {
  DeleteMarketRequestMeta,
  DeleteMarketRequestPayload,
} from 'types/store/DeleteMarketRequestState';
import { createAsyncReducer } from 'utils/Redux';

import { deleteMarketRequestActions } from '../actions';

export default createAsyncReducer<
  DeleteMarketRequestMeta,
  DeleteMarketRequestPayload
>(deleteMarketRequestActions);
