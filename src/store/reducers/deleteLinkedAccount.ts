import {
  DeleteLinkedAccountMeta,
  DeleteLinkedAccountPayload,
} from 'types/store/DeleteLinkedAccountState';
import { createAsyncReducer } from 'utils/Redux';

import { deleteLinkedAccountActions } from '../actions';

export default createAsyncReducer<
  DeleteLinkedAccountMeta,
  DeleteLinkedAccountPayload
>(deleteLinkedAccountActions);
