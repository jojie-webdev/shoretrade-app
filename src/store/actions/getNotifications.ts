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
  request: () => ({
    type: asyncAction.REQUEST,
    meta: {},
  }),
};

export default getNotificationsActions;
