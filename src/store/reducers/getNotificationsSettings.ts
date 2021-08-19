import {
  GetNotificationsSettingsMeta,
  GetNotificationsSettingsPayload,
} from 'types/store/GetNotificationSettingsState';
import { createAsyncReducer } from 'utils/Redux';

import { getNotificationsSettingsActions } from '../actions';

export default createAsyncReducer<
  GetNotificationsSettingsMeta,
  GetNotificationsSettingsPayload
>(getNotificationsSettingsActions);
