import {
  UpdateNotificationSettingsMetaData,
  UpdateNotificationSettingsPayload,
} from 'types/store/UpdateNotificationSettingsState';
import { createAsyncAction } from 'utils/Redux';

const ns = 'UPDATE_NOTIFICATION_SETTINGS';
const asyncAction = createAsyncAction<
  UpdateNotificationSettingsMetaData,
  UpdateNotificationSettingsPayload
>(ns);

const updateNotificationSettingsActions = {
  ...asyncAction,
};

export default updateNotificationSettingsActions;
