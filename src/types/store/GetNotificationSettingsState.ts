import { GenericResponse } from 'types/GenericResponse';
import { NotificationType } from './GetNotificationsState';

export type GetNotificationsSettingsMeta = {
  companyId: string;
};

export interface CategoryStatus {
  enabled: boolean;
  supported: boolean;
}

export type GlobalNotificationsSettingsResponse = {
  mobile: boolean; // Ex. 'Visa'
  push: boolean;
  email: boolean;
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

// export type SettingsUpdateItem = {
//   push: {
//     enabled: boolean;
//   };
//   email: {
//     enabled: boolean;
//   };
//   mobile: {
//     enabled: boolean;
//   };
//   inapp: {
//     enabled: boolean;
//   };
// };

export type SettingsUpdateItem = {
  push: boolean;
  email: boolean;
  mobile: boolean;
  inapp: boolean;
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

export type NotificationResourceGroup = {
  resource: NotificationType | string;
  items: NotificationSettingItem[];
};

export type NotificationSettingItem = {
  title: string; // subgroup or name
  notificationIds: string[];
  settings: {
    inapp: {
      supported: boolean;
      enabled: boolean;
    };
    mobile: {
      supported: boolean;
      enabled: boolean;
    };
    email: {
      supported: boolean;
      enabled: boolean;
    };
    push: {
      supported: boolean;
      enabled: boolean;
    };
  };
};

export type SpecificNotificationSettingItem = {
  id: string;
  resource: string;
  name: string;
  subgroup: string;
  settings: SettingsToggleItem;
};

export enum CustomSettingKey {
  MOBILE = 'mobile',
  PUSH = 'push',
  EMAIL = 'email',
  INAPP = 'inapp',
}

// {
//   "id": "7913f9c4-9f45-4fff-8f87-bb7290a7aeba",
//   "resource": "ACCOUNT",
//   "name": "Password Reset",
//   "subgroup": null,
//   "settings": {
//     "push": {
//       "supported": true,
//       "enabled": true
//     },
//     "email": {
//       "supported": true,
//       "enabled": true
//     },
//     "mobile": {
//       "supported": true,
//       "enabled": true
//     },
//     "inapp": {
//       "supported": true,
//       "enabled": true
//     }
//   }
// }

export type GetNotificationsSettingsPayload = GenericResponse<{
  token: string;

  global: GlobalNotificationsSettingsResponse;
  custom: SpecificNotificationSettingItem[];
}>;
