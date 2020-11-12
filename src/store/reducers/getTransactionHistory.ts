import { createAsyncReducer } from 'utils/Redux';
import {
  GetTransactionHistoryMeta,
  GetTransactionHistoryPayload,
} from 'types/store/GetTransactionHistoryState';
import { getTransactionHistoryActions } from '../actions';

export default createAsyncReducer<
  GetTransactionHistoryMeta,
  GetTransactionHistoryPayload
>(getTransactionHistoryActions);
