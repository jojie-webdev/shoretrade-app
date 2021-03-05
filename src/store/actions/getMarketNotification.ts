import {
  GetMarketNotificationMeta,
  GetMarketNotificationPayload,
} from 'types/store/GetMarketNotificationState';
import { createAsyncAction } from 'utils/Redux';

const ns = 'GET_MARKET_NOTIFICATION';
const asyncAction = createAsyncAction<
  GetMarketNotificationMeta,
  GetMarketNotificationPayload
>(ns);

const getMarketNotificationActions = {
  ...asyncAction,
};

export default getMarketNotificationActions;
