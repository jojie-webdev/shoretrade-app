import { DEFAULT_PAGE_LIMIT } from 'consts';
import {
  GetAllSellerOrdersMeta,
  GetAllSellerOrdersPayload,
} from 'types/store/GetAllSellerOrdersState';
import { createAsyncAction } from 'utils/Redux';

const ns = 'GET_SELLER_ORDERS_TRANSIT';
const asyncAction = createAsyncAction<
  GetAllSellerOrdersMeta,
  GetAllSellerOrdersPayload
>(ns);

const getSellerOrdersTransitActions = {
  ...asyncAction,
  request: (filter?: {
    page: string;
  }): {
    type: string;
    meta: GetAllSellerOrdersMeta;
  } => ({
    type: asyncAction.REQUEST,
    meta: {
      status: 'TRANSIT',
      limit: DEFAULT_PAGE_LIMIT,
      page: filter?.page,
    },
  }),
};

export default getSellerOrdersTransitActions;
