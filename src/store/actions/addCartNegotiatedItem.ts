import {
  AddCartNegotiatedItemMeta,
  AddCartNegotiatedItemPayload,
} from 'types/store/AddCartNegotiatedItemState';
import { createAsyncAction } from 'utils/Redux';

const ns = 'ADD_CART_NEGOTIATED_ITEM';
const asyncAction = createAsyncAction<
  AddCartNegotiatedItemMeta,
  AddCartNegotiatedItemPayload
>(ns);

const addCartNegotiatedItemActions = {
  ...asyncAction,
};

export default addCartNegotiatedItemActions;
