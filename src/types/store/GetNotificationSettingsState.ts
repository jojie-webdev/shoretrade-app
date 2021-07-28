import { GenericResponse } from 'types/GenericResponse';

export type GetNotificationsSettingsMeta = {
  companyId: string;
};

export interface CategoryStatus {
  enabled: boolean;
  supported: boolean;
}

export type GlobalNotificationsSettingsResponse = {
  sms: CategoryStatus; // Ex. 'Visa'
  browser: CategoryStatus;
  email: CategoryStatus;
};

export type GetNotificationsSettingsResponse = {
  globalSettings: GlobalNotificationsSettingsResponse;
};

export type GetNotificationsSettingsPayload = GenericResponse<{
  token: string;
  data: {
    globalSettings: GlobalNotificationsSettingsResponse;
  };
}>;
