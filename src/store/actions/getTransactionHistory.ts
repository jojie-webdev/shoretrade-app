import { createAsyncAction } from 'utils/Redux';
import {
  GetTransactionHistoryMeta,
  GetTransactionHistoryPayload,
} from 'types/store/GetTransactionHistoryState';

const ns = 'GET_TRANSACTION_HISTORY';
const asyncAction = createAsyncAction<
  GetTransactionHistoryMeta,
  GetTransactionHistoryPayload
>(ns);

const getLinkedAccountsActions = {
  ...asyncAction,
};

export default getLinkedAccountsActions;
