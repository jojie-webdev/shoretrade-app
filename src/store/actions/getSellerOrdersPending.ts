import { DEFAULT_PAGE_LIMIT } from 'consts';
import { ConfirmWeightMeta } from 'types/store/ConfirmWeightState';
import {
  GetAllSellerOrdersMeta,
  GetAllSellerOrdersPayload,
} from 'types/store/GetAllSellerOrdersState';
import { createAsyncAction } from 'utils/Redux';

const ns = 'GET_SELLER_ORDERS_PENDING';

const asyncAction = {
  ...createAsyncAction<GetAllSellerOrdersMeta, GetAllSellerOrdersPayload>(ns),
  // For Confirm Weight
  UPDATE_OPTIMISTICALLY: `${ns}/UPDATE_OPTIMISTICALLY`,
};

const getSellerOrdersPendingActions = {
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
      status: 'PENDING',
      limit: DEFAULT_PAGE_LIMIT,
      page: filter?.page,
      term: filter?.term,
    },
  }),

  // For Confirm Weight
  updateOptimistically: (meta: Partial<ConfirmWeightMeta>) => ({
    type: asyncAction.UPDATE_OPTIMISTICALLY,
    meta,
  }),
};

export default getSellerOrdersPendingActions;
