import {
  GetMarketNotificationMeta,
  GetMarketNotificationPayload,
} from 'types/store/GetMarketNotificationState';
import { createAsyncReducer } from 'utils/Redux';

import { getMarketNotificationActions } from '../actions';

export default createAsyncReducer<
  GetMarketNotificationMeta,
  GetMarketNotificationPayload
>(getMarketNotificationActions);
