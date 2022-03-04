import axios from 'axios';
import { API } from 'consts';
import { GetActivePlanMeta } from 'types/store/GetActivePlanState';

const URL = `${API.URL}/${API.VERSION_NEXT}/subscription`;

export const getPlans = () => {
  return axios({
    method: 'get',
    url: `${URL}/plans`,
  }).catch((e) => {
    return Promise.reject(e.response.data);
  });
};

export const getActivePlan = (
  { companyId }: GetActivePlanMeta,
  token: string
) => {
  return axios({
    method: 'get',
    url: `${URL}/active-plan/${companyId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).catch((e) => {
    return Promise.reject(e.response.data);
  });
};
