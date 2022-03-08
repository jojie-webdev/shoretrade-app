import { GenericResponse } from 'types/GenericResponse';

import { UserSearchPreferences } from './GetUserState';

export type UpdatePreferencesMeta = {
  search: UserSearchPreferences;
};

// TODO: Update response value
export type UpdatePreferencesPayload = GenericResponse<{
  searchPreferences: UserSearchPreferences;
}>;
