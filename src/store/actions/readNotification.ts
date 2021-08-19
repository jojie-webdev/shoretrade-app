import {
  ReadNotificationMetaData,
  ReadNotificationPayload,
} from 'types/store/ReadNotificationState';
import { createAsyncAction } from 'utils/Redux';

const ns = 'READ_NOTIFICATION';
const asyncAction = createAsyncAction<
  ReadNotificationMetaData,
  ReadNotificationPayload
>(ns);

const readNotificationActions = {
  ...asyncAction,
};

export default readNotificationActions;
