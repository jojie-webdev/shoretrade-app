import axios from 'axios';
import { API } from 'consts';
import omit from 'ramda/es/omit';
import { AddCardAndPayRealPayload } from 'types/store/AddCardAndPayState';
import {
  GetNotificationsSettingsMeta,
  GetNotificationsSettingsPayload,
} from 'types/store/GetNotificationSettingsState';

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
        },
      },
    },
  };
  return Promise.resolve(mock);
};
