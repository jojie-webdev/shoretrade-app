import {
  ReadMarketNotificationMeta,
  ReadMarketNotificationPayload,
} from 'types/store/ReadMarketNotificationState';
import { createAsyncAction } from 'utils/Redux';

const ns = 'READ_MARKET_NOTIFICATION';
const asyncAction = createAsyncAction<
  ReadMarketNotificationMeta,
  ReadMarketNotificationPayload
>(ns);

const readMarketNotificationActions = {
  ...asyncAction,
};

export default readMarketNotificationActions;
