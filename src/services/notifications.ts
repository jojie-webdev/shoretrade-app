import axios from 'axios';
import { API } from 'consts';
import omit from 'ramda/es/omit';
import { AddCardAndPayRealPayload } from 'types/store/AddCardAndPayState';
import {
  GetNotificationsSettingsMeta,
  GetNotificationsSettingsPayload,
} from 'types/store/GetNotificationSettingsState';
import {
  GetNotificationsMeta,
  GetNotificationsPayload,
} from 'types/store/GetNotificationsState';

const BASE_URL = `${API.URL}/${API.VERSION}`;

export const getNotifSettings = (
  data: GetNotificationsSettingsMeta,
  token: string
) => {
  const mock = {
    data: {
      data: {
        token: '000',
        data: {
          globalSettings: {
            sms: false,
            browser: true,
            email: false,
          },
          specificNotifications: [
            {
              id: '71ca8e17-8b44-4d5c-ae35-90145e396b01',
              resource: 'ACCOUNT', // -> Account
              name: 'New Order',
              settings: {
                push: {
                  enabled: true,
                  supported: true,
                }, //
                email: {
                  enabled: false,
                  supported: true,
                },
                sms: {
                  enabled: false,
                  supported: true,
                },
                inapp: {
                  enabled: false,
                  supported: true,
                },
              },
            },
            {
              id: '71ca8e17-8b44-4d5c-ae35-90145e396b01',
              resource: 'ACCOUNT', // -> Account
              name: 'Price Alerts',
              settings: {
                push: {
                  enabled: true,
                  supported: true,
                }, //
                email: {
                  enabled: false,
                  supported: true,
                },
                sms: {
                  enabled: false,
                  supported: true,
                },
                inapp: {
                  enabled: false,
                  supported: true,
                },
              },
            },
            {
              id: '71ca8e17-8b44-4d5c-ae35-90145e396b03',
              resource: 'ORDERING', // -> Account
              name: 'New Orders',
              settings: {
                push: {
                  enabled: true,
                  supported: true,
                }, //
                email: {
                  enabled: false,
                  supported: true,
                },
                sms: {
                  enabled: false,
                  supported: true,
                },
                inapp: {
                  enabled: false,
                  supported: true,
                },
              },
            },
          ],
        },
      },
    },
  };
  return Promise.resolve(mock);
};

export const getNotificationsData = (
  data: GetNotificationsMeta,
  token: string
) => {
  const mock = {
    data: {
      data: {
        token: '000',
        data: {
          globalSettings: {
            sms: false,
            browser: true,
            email: false,
          },
          specificNotifications: [
            {
              id: '71ca8e17-8b44-4d5c-ae35-90145e396b01',
              resource: 'ACCOUNT', // -> Account
              name: 'New Order',
              settings: {
                push: {
                  enabled: true,
                  supported: true,
                }, //
                email: {
                  enabled: false,
                  supported: true,
                },
                sms: {
                  enabled: false,
                  supported: true,
                },
                inapp: {
                  enabled: false,
                  supported: true,
                },
              },
            },
            {
              id: '71ca8e17-8b44-4d5c-ae35-90145e396b01',
              resource: 'ACCOUNT', // -> Account
              name: 'Price Alerts',
              settings: {
                push: {
                  enabled: true,
                  supported: true,
                }, //
                email: {
                  enabled: false,
                  supported: true,
                },
                sms: {
                  enabled: false,
                  supported: true,
                },
                inapp: {
                  enabled: false,
                  supported: true,
                },
              },
            },
            {
              id: '71ca8e17-8b44-4d5c-ae35-90145e396b03',
              resource: 'ORDERING', // -> Account
              name: 'New Orders',
              settings: {
                push: {
                  enabled: true,
                  supported: true,
                }, //
                email: {
                  enabled: false,
                  supported: true,
                },
                sms: {
                  enabled: false,
                  supported: true,
                },
                inapp: {
                  enabled: false,
                  supported: true,
                },
              },
            },
          ],
        },
      },
    },
  };
  return Promise.resolve(mock);
};
