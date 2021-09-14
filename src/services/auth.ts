import axios from 'axios';
import { API } from 'consts';
import { ForgotPasswordRequestData } from 'types/store/ForgotPasswordState';
import { LoginMeta } from 'types/store/LoginState';
import { RegisterRequestData } from 'types/store/RegisterState';
import { ResetPasswordMeta } from 'types/store/ResetPasswordState';
import { VerifyMeta } from 'types/store/VerifyState';
import { createBasicToken } from 'utils/Token';

const BASE_URL = `${API.URL}/${API.VERSION}`;
const AUTH_URL = `${BASE_URL}/auth`;
const USER_URL = `${BASE_URL}/user`;

export const login = (data: LoginMeta) => {
  return axios({
    method: 'post',
    url: `${AUTH_URL}/login`,
    headers: {
      Authorization: createBasicToken(data),
    },
    data: {},
  });
};

export const logout = (token: string) => {
  return axios({
    method: 'post',
    url: `${AUTH_URL}/logout`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {},
  });
};

export const verify = (data: VerifyMeta) => {
  return axios({
    method: 'post',
    url: `${AUTH_URL}/verify2fa`,
    data,
  });
};

export const register = (
  userGroup: 'seller' | 'buyer',
  data: RegisterRequestData
) => {
  return axios({
    method: 'post',
    url: `${USER_URL}/register/${userGroup}`,
    data,
  }).catch((e) => {
    return Promise.reject(e.response.data);
  });
};

export const forgotPassword = (data: ForgotPasswordRequestData) => {
  return axios({
    method: 'post',
    url: `${USER_URL}/forgot-password`,
    data,
  });
};

export const resetPassword = (data: ResetPasswordMeta) => {
  return axios({
    method: 'post',
    url: `${USER_URL}/reset-password`,
    data,
  }).catch((e) => {
    return Promise.reject(e.response.data);
  });
};

export const resendVerification = (data: LoginMeta) => {
  return axios({
    method: 'post',
    url: `${AUTH_URL}/login`,
    headers: {
      Authorization: createBasicToken(data),
    },
    data: {},
  });
};

export const getUser = (token: string) => {
  return axios({
    method: 'get',
    url: `${AUTH_URL}/get-user`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// check for existing email
export const validateAccount = (email: string) => {
  return axios({
    method: 'post',
    url: `${USER_URL}/validate`,
    data: {
      email,
    },
  });
};

export const getSocketToken = (token: string): Promise<string> => {
  return axios({
    method: 'get',
    url: `${API.URL}/${API.VERSION_NEXT}/auth/socket-token`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(({ data }) => data.temporary_token || '')
    .catch((e) => '');
};
