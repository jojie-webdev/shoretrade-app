import {
  DeleteNotificationMetaData,
  DeleteNotificationPayload,
} from 'types/store/DeleteNotificationState';
import { createAsyncReducer } from 'utils/Redux';

import { deleteNotificationActions } from '../actions';

export default createAsyncReducer<
  DeleteNotificationMetaData,
  DeleteNotificationPayload
>(deleteNotificationActions);
