import {
  GetAllNegotiationsMeta,
  GetAllNegotiationsPayload,
} from 'types/store/GetAllNegotiationsState';
import { createAsyncReducer } from 'utils/Redux';

import { getAllNegotiationsActions } from '../actions';

export default createAsyncReducer<
  GetAllNegotiationsMeta,
  GetAllNegotiationsPayload
>(getAllNegotiationsActions);
