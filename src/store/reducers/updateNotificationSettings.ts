import {
  UpdateNotificationSettingsMetaData,
  UpdateNotificationSettingsPayload,
} from 'types/store/UpdateNotificationSettingsState';
import { createAsyncReducer } from 'utils/Redux';

import { updateListingActions } from '../actions';

export default createAsyncReducer<
  UpdateNotificationSettingsMetaData,
  UpdateNotificationSettingsPayload
>(updateListingActions);
