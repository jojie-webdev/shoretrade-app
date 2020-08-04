import axios from 'axios';
import { API } from 'consts';
import omit from 'ramda/es/omit';
import { ChangePasswordMeta } from 'types/store/ChangePasswordState';
import { UpdateBankDetailsRequestData } from 'types/store/UpdateBankDetailsState';
import {
  UpdateUserRequestData,
  UpdateUserImageRequestData,
} from 'types/store/UpdateUserState';

const BASE_URL = `${API.URL}/${API.VERSION}`;
const USER_URL = `${BASE_URL}/user`;

export const updateUser = (
  data:
    | UpdateUserRequestData
    | UpdateBankDetailsRequestData
    | UpdateUserImageRequestData,
  token: string
) => {
  return axios({
    method: 'post',
    url: `${USER_URL}/${data.userId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: omit(['userId'], data),
  });
};

export const changePassword = (data: ChangePasswordMeta, token: string) => {
  return axios({
    method: 'post',
    url: `${USER_URL}/change-password`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data,
  });
};
