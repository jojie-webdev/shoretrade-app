import { GenericResponse } from 'types/GenericResponse';

import { CategoryStatus } from './GetNotificationSettingsState';

export type UpdateNotificationSettingsMetaData = {
  global: {
    mobile: boolean;
    email: boolean;
    push: boolean;
  };
  custom: any;
};

export type UpdateNotificationSettingsPayload = GenericResponse;
