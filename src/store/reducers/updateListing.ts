import {
  UpdateListingMeta,
  UpdateListingPayload,
} from 'types/store/UpdateListingState';
import { createAsyncReducer } from 'utils/Redux';

import { updateNotificationSettingsActions } from '../actions';

export default createAsyncReducer<UpdateListingMeta, UpdateListingPayload>(
  updateNotificationSettingsActions
);
