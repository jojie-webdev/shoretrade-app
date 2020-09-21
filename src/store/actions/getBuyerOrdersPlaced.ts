import {
  GetBuyerOrdersMeta,
  GetBuyerOrdersPayload,
} from 'types/store/GetBuyerOrdersState';
import { createAsyncAction } from 'utils/Redux';

const ns = 'GET_BUYER_ORDERS_PLACED';
const asyncAction = createAsyncAction<
  GetBuyerOrdersMeta,
  GetBuyerOrdersPayload
>(ns);

const getBuyerOrdersPlacedActions = {
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
      status: 'PLACED',
      limit: 10,
      ...filter,
    },
  }),
};

export default getBuyerOrdersPlacedActions;
