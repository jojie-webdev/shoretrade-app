import {
  GetAllBuyerOrdersMeta,
  GetAllBuyerOrdersPayload,
} from 'types/store/GetAllBuyerOrdersState';
import { createAsyncAction } from 'utils/Redux';

const ns = 'GET_ALL_BUYER_ORDERS';
const asyncAction = createAsyncAction<
  GetAllBuyerOrdersMeta,
  GetAllBuyerOrdersPayload
>(ns);

const getAllBuyerOrdersActions = {
  ...asyncAction,
  request: () => ({
    type: asyncAction.REQUEST,
    meta: {},
  }),
};

export default getAllBuyerOrdersActions;
