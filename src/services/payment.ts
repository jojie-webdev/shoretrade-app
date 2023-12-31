import axios from 'axios';
import { API } from 'consts';
import omit from 'ramda/es/omit';
import { AddCardAndPayRealPayload } from 'types/store/AddCardAndPayState';
import { AddCardTokenRequestData } from 'types/store/AddCardTokenState';
import { ChargeCardMeta } from 'types/store/ChargeCardState';
import { DeleteCardMeta } from 'types/store/DeleteCardState';
import { GetPaymentMethodsMeta } from 'types/store/GetPaymentMethodsState';
import { GetPaymentModeMeta } from 'types/store/GetPaymentMode';
import { UpdateDefaultCardMeta } from 'types/store/UpdateDefaultCardState';

const BASE_URL = `${API.URL}/${API.VERSION}`;
const PAYMENT_URL = `${BASE_URL}/payment`;

export const getPaymentMethods = (
  data: GetPaymentMethodsMeta,
  token: string
) => {
  return axios({
    method: 'get',
    url: `${PAYMENT_URL}/customer-cards/${data.companyId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getPaymentMode = (data: GetPaymentModeMeta, token: string) => {
  return axios({
    method: 'get',
    url: `${PAYMENT_URL}/get-payment-mode`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const addCardToken = (data: AddCardTokenRequestData, token: string) => {
  return axios({
    method: 'post',
    url: `${PAYMENT_URL}/add-card-token/${data.companyId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: omit(['companyId'], data),
  });
};

export const updateDefaultCard = (
  data: UpdateDefaultCardMeta,
  token: string
) => {
  return axios({
    method: 'post',
    url: `${PAYMENT_URL}/update-default-card/${data.companyId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: omit(['companyId'], data),
  });
};

export const deleteCard = (data: DeleteCardMeta, token: string) => {
  return axios({
    method: 'post',
    url: `${PAYMENT_URL}/delete-card/${data.companyId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: omit(['companyId'], data),
  });
};

export const chargeCard = (data: ChargeCardMeta, token: string) => {
  return axios({
    method: 'post',
    url: `${PAYMENT_URL}/charge-card/${data.companyId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: omit(['companyId'], data),
  });
};

export const addCardAndPay = (
  data: AddCardAndPayRealPayload,
  token: string
) => {
  return axios({
    method: 'post',
    url: `${PAYMENT_URL}/add-card-and-pay`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: data,
  }).catch((e) => {
    return Promise.reject(e.response.data);
  });
};
