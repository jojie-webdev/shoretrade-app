import { GenericResponse } from 'types/GenericResponse';

import { CategoryStatus } from './GetNotificationSettingsState';

export type UpdateNotificationSettingsMetaData = {
  global?: any;
  custom?: any;
};

export type UpdateNotificationSettingsPayload = GenericResponse;
