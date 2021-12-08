import { DEFAULT_PAGE_LIMIT } from 'consts';
import { ConfirmWeightMeta } from 'types/store/ConfirmWeightState';
import {
  GetAllSellerOrdersMeta,
  GetAllSellerOrdersPayload,
} from 'types/store/GetAllSellerOrdersState';
import { createAsyncAction } from 'utils/Redux';

const ns = 'GET_SELLER_ORDERS_PLACED';
const asyncAction = {
  ...createAsyncAction<GetAllSellerOrdersMeta, GetAllSellerOrdersPayload>(ns),
  // For Confirm Weight
  UPDATE_OPTIMISTICALLY: `${ns}/UPDATE_OPTIMISTICALLY`,
  // For Ship Order
  UPDATE_SHIP_ORDER_OPTIMISTICALLY: `${ns}/UPDATE_SHIP_ORDER_OPTIMISTICALLY`,
};

const getSellerOrdersPlacedActions = {
  ...asyncAction,

  request: (filter?: {
    page: string;
  }): {
    type: string;
    meta: GetAllSellerOrdersMeta;
  } => ({
    type: asyncAction.REQUEST,
    meta: {
      status: 'PLACED',
      pending: false,
      limit: DEFAULT_PAGE_LIMIT,
      page: filter?.page,
    },
  }),

  updateShipOrderOptimisitically: (orderId: string) => ({
    type: asyncAction.UPDATE_SHIP_ORDER_OPTIMISTICALLY,
    meta: {
      orderId,
    },
  }),

  // For Confirm Weight
  updateOptimistically: (meta: Partial<ConfirmWeightMeta>) => ({
    type: asyncAction.UPDATE_OPTIMISTICALLY,
    meta,
  }),
};

export default getSellerOrdersPlacedActions;
