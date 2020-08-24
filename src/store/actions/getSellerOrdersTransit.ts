import {
  GetSellerOrdersMeta,
  GetSellerOrdersPayload,
} from 'types/store/GetSellerOrdersState';
import { createAsyncAction } from 'utils/Redux';

const ns = 'GET_SELLER_ORDERS_TRANSIT';
const asyncAction = createAsyncAction<
  GetSellerOrdersMeta,
  GetSellerOrdersPayload
>(ns);

const getSellerOrdersPlacedActions = {
  ...asyncAction,
  request: (): {
    type: string;
    meta: GetSellerOrdersMeta;
  } => ({
    type: asyncAction.REQUEST,
    meta: {
      status: 'TRANSIT',
    },
  }),
};

export default getSellerOrdersPlacedActions;
