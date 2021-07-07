import {
  GetAllBuyerListingsMeta,
  GetAllBuyerListingsPayload,
} from 'types/store/GetAllBuyerListingsState';
import { createAsyncAction } from 'utils/Redux';

const ns = 'GET_ALL_BUYER_LISTINGS';
const asyncAction = createAsyncAction<
  GetAllBuyerListingsMeta,
  GetAllBuyerListingsPayload
>(ns);

const getAllBuyerListingsActions = {
  ...asyncAction,
  request: (payload: any = {}) => ({
    type: asyncAction.REQUEST,
    meta: {},
    payload,
  }),
  requestCsv: (payload: any) => ({
    type: `${asyncAction.REQUEST}/CSV`,
    payload,
  }),
  requestCsvSuccess: () => ({
    type: `${asyncAction.SUCCESS}/CSV`,
  }),
};

export default getAllBuyerListingsActions;
