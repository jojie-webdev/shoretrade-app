import {
  GetLinkedAccountsMeta,
  GetLinkedAccountsPayload,
} from 'types/store/GetLinkedAccountsState';
import { createAsyncAction } from 'utils/Redux';

const ns = 'GET_LINKED_ACCOUNTS';
const asyncAction = createAsyncAction<
  GetLinkedAccountsMeta,
  GetLinkedAccountsPayload
>(ns);

const getLinkedAccountsActions = {
  ...asyncAction,
};

export default getLinkedAccountsActions;
