import {
  ReadMarketNotificationMeta,
  ReadMarketNotificationPayload,
} from 'types/store/ReadMarketNotificationState';
import { createAsyncReducer } from 'utils/Redux';

import { readMarketNotificationActions } from '../actions';

export default createAsyncReducer<
  ReadMarketNotificationMeta,
  ReadMarketNotificationPayload
>(readMarketNotificationActions);
