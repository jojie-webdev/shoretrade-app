import { GenericResponse } from 'types/GenericResponse';

export type GetNotificationsSettingsMeta = {
  companyId: string;
};

export interface CategoryStatus {
  enabled: boolean;
  supported: boolean;
}

export type GlobalNotificationsSettingsResponse = {
  mobile: CategoryStatus; // Ex. 'Visa'
  push: CategoryStatus;
  email: CategoryStatus;
};

export type SettingsToggleItem = {
  push: {
    supported: boolean;
    enabled: boolean;
  };
  email: {
    supported: boolean;
    enabled: boolean;
  };
  mobile: {
    supported: boolean;
    enabled: boolean;
  };
  inapp: {
    supported: boolean;
    enabled: boolean;
  };
};

// {
//   id: '71ca8e17-8b44-4d5c-ae35-90145e396b03',
//   resource: 'ORDERING', // -> Account
//   name: 'New Orders',
//   settings: {
//     push: true, //
//     email: true,
//     sms: false,
//     inapp: true,
//   },
// },

export type SpecificNotificationSettingItem = {
  id: string;
  resource: string;
  name: string;
  settings: SettingsToggleItem;
};

export type GetNotificationsSettingsPayload = GenericResponse<{
  token: string;

  global: GlobalNotificationsSettingsResponse;
  specificNotifications: SpecificNotificationSettingItem[];
}>;
