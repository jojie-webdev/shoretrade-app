import {
  GetNotificationsMeta,
  GetNotificationsPayload,
} from 'types/store/GetNotificationsState';
import { createAsyncAction } from 'utils/Redux';

const ns = 'GET_NOTIFICATIONS';
const asyncAction = createAsyncAction<
  GetNotificationsMeta,
  GetNotificationsPayload
>(ns);

const getNotificationsActions = {
  ...asyncAction,
};

export default getNotificationsActions;
