import {
  RemoveCartItemMeta,
  RemoveCartItemPayload,
} from 'types/store/RemoveCartItemState';
import { createAsyncReducer } from 'utils/Redux';

import { removeCartItemActions } from '../actions';

export default createAsyncReducer<RemoveCartItemMeta, RemoveCartItemPayload>(
  removeCartItemActions
);
