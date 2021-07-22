import { GenericResponse } from 'types/GenericResponse';

export type GetNotificationsSettingsMeta = {
  companyId: string;
};

export type GlobalNotificationsSettingsResponse = {
  sms: boolean; // Ex. 'Visa'
  browser: boolean;
  email: boolean;
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
