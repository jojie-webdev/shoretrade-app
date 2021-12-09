import {
  GetTransactionHistoryMeta,
  GetTransactionHistoryPayload,
} from 'types/store/GetTransactionHistoryState';
import { createAsyncReducer } from 'utils/Redux';

import { getTransactionHistoryActions } from '../actions';

export default createAsyncReducer<
  GetTransactionHistoryMeta,
  GetTransactionHistoryPayload
>(getTransactionHistoryActions);
