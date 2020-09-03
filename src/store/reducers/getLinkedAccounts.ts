import {
  GetLinkedAccountsMeta,
  GetLinkedAccountsPayload,
} from 'types/store/GetLinkedAccountsState';
import { createAsyncReducer } from 'utils/Redux';

import { getLinkedAccountsActions } from '../actions';

export default createAsyncReducer<
  GetLinkedAccountsMeta,
  GetLinkedAccountsPayload
>(getLinkedAccountsActions);
