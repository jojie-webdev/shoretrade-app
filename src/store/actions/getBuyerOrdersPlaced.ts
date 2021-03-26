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
    dateFrom: moment.Moment | null;
    dateTo: moment.Moment | null;
  }): {
    type: string;
    meta: GetBuyerOrdersMeta;
  } => ({
    type: asyncAction.REQUEST,
    meta: {
      status: 'PLACED',
      limit: 10,
      dateFrom: filter?.dateFrom?.format('M/DD/yyyy'),
      dateTo: filter?.dateTo?.format('M/DD/yyyy'),
      page: filter?.page,
    },
  }),
};

export default getBuyerOrdersPlacedActions;
