import { createAsyncAction } from 'utils/Redux';
import {
  UpdatePreferencesMeta,
  UpdatePreferencesPayload,
} from 'types/store/UpdatePreferencesState';

const ns = 'UPDATE_PREFERENCES';
const asyncAction = createAsyncAction<
  UpdatePreferencesMeta,
  UpdatePreferencesPayload
>(ns);

const updatePreferencesActions = {
  ...asyncAction,
};

export default updatePreferencesActions;
