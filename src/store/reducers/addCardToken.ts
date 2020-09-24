import {
  AddCardTokenMeta,
  AddCardTokenPayload,
} from 'types/store/AddCardTokenState';
import { createAsyncReducer } from 'utils/Redux';

import { addCardTokenActions } from '../actions';

export default createAsyncReducer<AddCardTokenMeta, AddCardTokenPayload>(
  addCardTokenActions
);
