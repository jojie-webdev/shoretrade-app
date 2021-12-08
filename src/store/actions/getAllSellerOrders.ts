import {
  GetAllSellerOrdersMeta,
  GetAllSellerOrdersPayload,
} from 'types/store/GetAllSellerOrdersState';
import { createAsyncAction } from 'utils/Redux';

const ns = 'GET_ALL_SELLER_ORDERS';
const asyncAction = createAsyncAction<
  GetAllSellerOrdersMeta,
  GetAllSellerOrdersPayload
>(ns);

const getAllSellerOrdersActions = {
  ...asyncAction,
  request: () => ({
    type: asyncAction.REQUEST,
    meta: {},
  }),
};

export default getAllSellerOrdersActions;
