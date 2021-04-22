import { DEFAULT_PAGE_LIMIT } from 'consts';
import { ConfirmWeightMeta } from 'types/store/ConfirmWeightState';
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
    term: string;
    page: string;
    dateFrom: moment.Moment | null;
    dateTo: moment.Moment | null;
  }): {
    type: string;
    meta: GetSellerOrdersMeta;
  } => ({
    type: asyncAction.REQUEST,
    meta: {
      status: 'PLACED',
      dateFrom: filter?.dateFrom?.format('M/DD/yyyy'),
      dateTo: filter?.dateTo?.format('M/DD/yyyy'),
      term: filter?.term,
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
