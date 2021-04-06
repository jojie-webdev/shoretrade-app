import {
  GetAccountCompletionMeta,
  GetAccountCompletionPayload,
} from 'types/store/GetAccountCompletionState';
import { createAsyncReducer } from 'utils/Redux';

import { getAccountCompletionActions } from '../actions';

export default createAsyncReducer<
  GetAccountCompletionMeta,
  GetAccountCompletionPayload
>(getAccountCompletionActions);
