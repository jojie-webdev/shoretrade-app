import { GetCartMeta, GetCartPayload } from 'types/store/GetCartState';
import { createAsyncAction } from 'utils/Redux';

const ns = 'GET_CART';
const asyncAction = createAsyncAction<GetCartMeta, GetCartPayload>(ns);

const getCartActions = {
  ...asyncAction,
};

export default getCartActions;
