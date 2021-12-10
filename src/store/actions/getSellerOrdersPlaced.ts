import { DEFAULT_PAGE_LIMIT } from 'consts';
import {
  GetAllSellerOrdersMeta,
  GetAllSellerOrdersPayload,
} from 'types/store/GetAllSellerOrdersState';
import { createAsyncAction } from 'utils/Redux';

const ns = 'GET_SELLER_ORDERS_PLACED';
const asyncAction = {
  ...createAsyncAction<GetAllSellerOrdersMeta, GetAllSellerOrdersPayload>(ns),
};

const getSellerOrdersPlacedActions = {
  ...asyncAction,

  request: (filter?: {
    page: string;
    term?: string;
  }): {
    type: string;
    meta: GetAllSellerOrdersMeta;
  } => ({
    type: asyncAction.REQUEST,
    meta: {
      status: 'PLACED',
      limit: DEFAULT_PAGE_LIMIT,
      page: filter?.page,
      term: filter?.term,
    },
  }),
};

export default getSellerOrdersPlacedActions;
