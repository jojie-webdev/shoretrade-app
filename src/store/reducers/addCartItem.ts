import {
  AddCartItemMeta,
  AddCartItemPayload,
} from 'types/store/AddCartItemState';
import { createAsyncReducer } from 'utils/Redux';

import { addCartItemActions } from '../actions';

export default createAsyncReducer<AddCartItemMeta, AddCartItemPayload>(
  addCartItemActions
);
