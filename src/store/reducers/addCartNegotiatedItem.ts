import {
  AddCartNegotiatedItemMeta,
  AddCartNegotiatedItemPayload,
} from 'types/store/AddCartNegotiatedItemState';
import { createAsyncReducer } from 'utils/Redux';

import { addCartNegotiatedItemActions } from '../actions';

export default createAsyncReducer<
  AddCartNegotiatedItemMeta,
  AddCartNegotiatedItemPayload
>(addCartNegotiatedItemActions);
