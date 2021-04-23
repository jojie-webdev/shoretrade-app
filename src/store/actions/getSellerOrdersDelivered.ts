import { DEFAULT_PAGE_LIMIT } from 'consts';
import {
  GetSellerOrdersMeta,
  GetSellerOrdersPayload,
} from 'types/store/GetSellerOrdersState';
import { createAsyncAction } from 'utils/Redux';

const ns = 'GET_SELLER_ORDERS_DELIVERED';
const asyncAction = createAsyncAction<
  GetSellerOrdersMeta,
  GetSellerOrdersPayload
>(ns);

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
      status: 'DELIVERED',
      dateFrom: filter?.dateFrom?.format('M/DD/yyyy'),
      dateTo: filter?.dateTo?.format('M/DD/yyyy'),
      term: filter?.term,
      limit: DEFAULT_PAGE_LIMIT,
      page: filter?.page,
    },
  }),
};

export default getSellerOrdersPlacedActions;
