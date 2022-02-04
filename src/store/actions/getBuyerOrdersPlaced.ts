import { DEFAULT_PAGE_LIMIT } from 'consts';
import {
  GetAllBuyerOrdersMeta,
  GetAllBuyerOrdersPayload,
} from 'types/store/GetAllBuyerOrdersState';
import { createAsyncAction } from 'utils/Redux';

const ns = 'GET_BUYER_ORDERS_PLACED';
const asyncAction = createAsyncAction<
  GetAllBuyerOrdersMeta,
  GetAllBuyerOrdersPayload
>(ns);

const getBuyerOrdersPlacedActions = {
  ...asyncAction,
  request: (filter?: {
    term: string;
    page: string;
    dateFrom: moment.Moment | null;
    dateTo: moment.Moment | null;
  }): {
    type: string;
    meta: GetAllBuyerOrdersMeta;
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
};

export default getBuyerOrdersPlacedActions;
