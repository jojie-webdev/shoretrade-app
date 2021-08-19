import {
  DeleteNotificationMetaData,
  DeleteNotificationPayload,
} from 'types/store/DeleteNotificationState';
import { createAsyncAction } from 'utils/Redux';

const ns = 'DELETE_NOTIFICATION';
const asyncAction = createAsyncAction<
  DeleteNotificationMetaData,
  DeleteNotificationPayload
>(ns);

const deleteNotificationActions = {
  ...asyncAction,
};

export default deleteNotificationActions;
