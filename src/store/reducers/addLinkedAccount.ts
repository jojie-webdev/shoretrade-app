import {
  AddLinkedAccountMeta,
  AddLinkedAccountPayload,
} from 'types/store/AddLinkedAccountState';
import { createAsyncReducer } from 'utils/Redux';

import { addLinkedAccountActions } from '../actions';

export default createAsyncReducer<
  AddLinkedAccountMeta,
  AddLinkedAccountPayload
>(addLinkedAccountActions);
