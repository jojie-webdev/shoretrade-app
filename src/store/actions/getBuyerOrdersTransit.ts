import {
  GetBuyerOrdersMeta,
  GetBuyerOrdersPayload,
} from 'types/store/GetBuyerOrdersState';
import { createAsyncAction } from 'utils/Redux';

const ns = 'GET_BUYER_ORDERS_TRANSIT';
const asyncAction = createAsyncAction<
  GetBuyerOrdersMeta,
  GetBuyerOrdersPayload
>(ns);

const getBuyerOrdersTransitActions = {
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
      status: 'TRANSIT',
      dateFrom: filter?.dateFrom?.format('M/DD/yyyy'),
      dateTo: filter?.dateTo?.format('M/DD/yyyy'),
      page: filter?.page,
    },
  }),
};

export default getBuyerOrdersTransitActions;
