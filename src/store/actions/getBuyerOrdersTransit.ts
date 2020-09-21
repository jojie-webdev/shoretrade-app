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
  request: (): {
    type: string;
    meta: GetBuyerOrdersMeta;
  } => ({
    type: asyncAction.REQUEST,
    meta: {
      status: 'TRANSIT',
    },
  }),
};

export default getBuyerOrdersTransitActions;
