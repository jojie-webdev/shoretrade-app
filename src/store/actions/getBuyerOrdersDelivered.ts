import {
  GetBuyerOrdersMeta,
  GetBuyerOrdersPayload,
} from 'types/store/GetBuyerOrdersState';
import { createAsyncAction } from 'utils/Redux';

const ns = 'GET_BUYER_ORDERS_DELIVERED';
const asyncAction = createAsyncAction<
  GetBuyerOrdersMeta,
  GetBuyerOrdersPayload
>(ns);

const getBuyerOrdersDeliveredActions = {
  ...asyncAction,
  request: (filter?: {
    page: string;
    dateFrom: string;
    dateTo: string;
  }): {
    type: string;
    meta: GetBuyerOrdersMeta;
  } => ({
    type: asyncAction.REQUEST,
    meta: {
      status: 'DELIVERED',
      limit: 10,
      ...filter,
    },
  }),
};

export default getBuyerOrdersDeliveredActions;
