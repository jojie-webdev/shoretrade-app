import { GenericResponse } from 'types/GenericResponse';

import { CategoryStatus } from './GetNotificationSettingsState';

export type UpdateNotificationSettingsMetaData = {
  global: {
    mobile: CategoryStatus;
    email: CategoryStatus;
    push: CategoryStatus;
  };
  custom: any;
};

export type UpdateNotificationSettingsPayload = GenericResponse;
