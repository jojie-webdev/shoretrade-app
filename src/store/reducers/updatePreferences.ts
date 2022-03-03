import {
  UpdatePreferencesMeta,
  UpdatePreferencesPayload,
} from 'types/store/UpdatePreferencesState';
import { createAsyncReducer } from 'utils/Redux';

import { updatePreferencesActions } from '../actions';

export default createAsyncReducer<
  UpdatePreferencesMeta,
  UpdatePreferencesPayload
>(updatePreferencesActions);
