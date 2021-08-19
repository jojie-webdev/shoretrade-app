import {
  ReadNotificationMetaData,
  ReadNotificationPayload,
} from 'types/store/ReadNotificationState';
import { createAsyncReducer } from 'utils/Redux';

import { readNotificationActions } from '../actions';

export default createAsyncReducer<
  ReadNotificationMetaData,
  ReadNotificationPayload
>(readNotificationActions);
