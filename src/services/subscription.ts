import axios from 'axios';
import { API } from 'consts';

const URL = `${API.URL}/${API.VERSION_NEXT}/subscription`;

export const getPlans = () => {
  return axios({
    method: 'get',
    url: `${URL}/plans`,
  }).catch((e) => {
    return Promise.reject(e.response.data);
  });
};

export const getFreeTrialExpiry = (token: string) => {
  return axios({
    method: 'get',
    url: `${URL}/free-trial-expiry`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).catch((e) => {
    return Promise.reject(e.response.data);
  });
};
