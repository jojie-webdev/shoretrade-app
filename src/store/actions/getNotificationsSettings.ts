import {
  GetNotificationsSettingsMeta,
  GetNotificationsSettingsPayload,
} from 'types/store/GetNotificationSettingsState';
import { createAsyncAction } from 'utils/Redux';

const ns = 'GET_NOTIFICATIONS_SETTINGS';
const asyncAction = createAsyncAction<
  GetNotificationsSettingsMeta,
  GetNotificationsSettingsPayload
>(ns);

const getNotificationsSettingsActions = {
  ...asyncAction,
};

export default getNotificationsSettingsActions;
