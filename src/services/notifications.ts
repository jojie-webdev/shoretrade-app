import axios from 'axios';
import { API } from 'consts';
import { DeleteNotificationMetaData } from 'types/store/DeleteNotificationState';
import { GetNotificationsSettingsMeta } from 'types/store/GetNotificationSettingsState';
import { ReadNotificationMetaData } from 'types/store/ReadNotificationState';
import { UpdateNotificationSettingsMetaData } from 'types/store/UpdateNotificationSettingsState';

const BASE_URL = `${API.URL}/${API.VERSION_NEXT}/notification`;

export const getNotifSettings = (
  data: GetNotificationsSettingsMeta,
  token: string
) => {
  return axios({
    method: 'get',
    url: `${BASE_URL}/preferences`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateNotifSettings = (
  data: UpdateNotificationSettingsMetaData,
  token: string
) => {
  return axios({
    method: 'post',
    url: `${BASE_URL}/preferences`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data,
  });
};

export const getNotificationsData = (token: string) => {
  return axios({
    method: 'get',
    url: `${BASE_URL}/all`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const readNotificationApi = (
  token: string,
  data?: ReadNotificationMetaData
) => {
  return axios({
    method: 'get',
    url: `${BASE_URL}/read/${data?.id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteNotificationApi = (
  token: string,
  data?: DeleteNotificationMetaData
) => {
  return axios({
    method: 'DELETE',
    url: `${BASE_URL}/${data?.id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
