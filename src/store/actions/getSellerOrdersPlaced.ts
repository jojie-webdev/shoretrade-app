import {
  GetSellerOrdersMeta,
  GetSellerOrdersPayload,
} from 'types/store/GetSellerOrdersState';
import { createAsyncAction } from 'utils/Redux';

const ns = 'GET_SELLER_ORDERS_PLACED';
const asyncAction = createAsyncAction<
  GetSellerOrdersMeta,
  GetSellerOrdersPayload
>(ns);

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
};

export default getSellerOrdersPlacedActions;
