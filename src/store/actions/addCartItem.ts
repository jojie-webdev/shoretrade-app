import {
  AddCartItemMeta,
  AddCartItemPayload,
} from 'types/store/AddCartItemState';
import { createAsyncAction } from 'utils/Redux';

const ns = 'ADD_CART_ITEM';
const asyncAction = createAsyncAction<AddCartItemMeta, AddCartItemPayload>(ns);

const addCartItemActions = {
  ...asyncAction,
};

export default addCartItemActions;
