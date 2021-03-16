import {
  GetSellerOrdersMeta,
  GetSellerOrdersPayload,
} from 'types/store/GetSellerOrdersState';
import { createAsyncAction } from 'utils/Redux';

const ns = 'GET_SELLER_ORDERS_PLACED';
const asyncAction = {
  ...createAsyncAction<GetSellerOrdersMeta, GetSellerOrdersPayload>(ns),
  // For Confirm Weight
  UPDATE_OPTIMISTICALLY: `${ns}/UPDATE_OPTIMISTICALLY`,
  // For Ship Order
  UPDATE_SHIP_ORDER_OPTIMISTICALLY: `${ns}/UPDATE_SHIP_ORDER_OPTIMISTICALLY`,
};

const getSellerOrdersPlacedActions = {
  ...asyncAction,

  request: (filter?: {
    page: string;
    dateFrom: string;
    dateTo: string;
  }): {
    type: string;
    meta: GetSellerOrdersMeta;
  } => ({
    type: asyncAction.REQUEST,
    meta: {
      status: 'PLACED',
      limit: 10,
      ...filter,
    },
  }),

  updateShipOrderOptimisitically: (orderId: string) => ({
    type: asyncAction.UPDATE_SHIP_ORDER_OPTIMISTICALLY,
    meta: {
      orderId,
    },
  }),

  // For Confirm Weight
  updateOptimistically: (orderId: string, orderLineItemId: string) => ({
    type: asyncAction.UPDATE_OPTIMISTICALLY,
    meta: {
      orderId,
      orderLineItemId,
    },
  }),
};

export default getSellerOrdersPlacedActions;
