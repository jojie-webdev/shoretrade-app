import {
  GetSellerOrdersMeta,
  GetSellerOrdersPayload,
} from 'types/store/GetSellerOrdersState';
import { createAsyncAction } from 'utils/Redux';

const ns = 'GET_SELLER_ORDERS';
const asyncAction = createAsyncAction<
  GetSellerOrdersMeta,
  GetSellerOrdersPayload
>(ns);

const getSellerOrdersActions = {
  ...asyncAction,
  request: () => ({
    type: asyncAction.REQUEST,
    meta: {},
  }),
};

export default getSellerOrdersActions;
