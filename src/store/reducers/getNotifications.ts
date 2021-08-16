import {
  GetNotificationsMeta,
  GetNotificationsPayload,
} from 'types/store/GetNotificationsState';
import { createAsyncReducer } from 'utils/Redux';

import { getNotificationsActions } from '../actions';

export default createAsyncReducer<
  GetNotificationsMeta,
  GetNotificationsPayload
>(getNotificationsActions);
