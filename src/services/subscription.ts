import axios from 'axios';
import { API } from 'consts';
import { CancelSubscriptionPlanMeta } from 'types/store/CancelSubscriptionPlanState';
import { GetActivePlanMeta } from 'types/store/GetActivePlanState';
import { RenewSubscriptionPlanMeta } from 'types/store/RenewSubscriptionPlanState';
import { UpdateSubscriptionPlanMeta } from 'types/store/UpdateSubscriptionPlanState';

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
    url: `${URL}/company/active-plan/${companyId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).catch((e) => {
    return Promise.reject(e.response.data);
  });
};

export const updatePlan = (
  param: {
    companyId: string;
    saasInterval?: string;
    isSaasSubscribed?: boolean;
  },
  token: string
) => {
  return axios({
    method: 'patch',
    url: `${URL}/company/update-preference`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: param,
  }).catch((e) => {
    return Promise.reject(e.response.data);
  });
};

export const renewPlan = (param: RenewSubscriptionPlanMeta, token: string) => {
  return axios({
    method: 'post',
    url: `${URL}/company/renew-account`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: param,
  }).catch((e) => {
    return Promise.reject(e.response.data);
  });
};
