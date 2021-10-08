import {
  RemoveCartItemMeta,
  RemoveCartItemPayload,
} from 'types/store/RemoveCartItemState';
import { createAsyncAction } from 'utils/Redux';

const ns = 'REMOVE_CART_ITEM';
const asyncAction = createAsyncAction<
  RemoveCartItemMeta,
  RemoveCartItemPayload
>(ns);

const removeCartItemActions = {
  ...asyncAction,
};

export default removeCartItemActions;
