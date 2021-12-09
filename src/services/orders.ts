import axios from 'axios';
import { API } from 'consts';
import moment from 'moment';
import omit from 'ramda/es/omit';
import { ConfirmWeightMeta } from 'types/store/ConfirmWeightState';
import { GetAllSellerOrdersMeta } from 'types/store/GetAllSellerOrdersState';
import { GetSellerOrdersMeta } from 'types/store/GetSellerOrdersState';
import { OrderMeta } from 'types/store/OrderState';
import { PlaceOrderMeta } from 'types/store/PlaceOrderState';
import { SendDisputeMeta } from 'types/store/SendDisputeState';
import { SendMessageMeta } from 'types/store/SendMessageState';

const BASE_URL = `${API.URL}/${API.VERSION}`;
const BASE_URL_V2 = `${API.URL}/${API.VERSION_NEXT}`;
const ORDER_URL = `${BASE_URL}/order`;
const ORDER_URL_V2 = `${BASE_URL_V2}/order`;

export const order = (data: OrderMeta, token: string) => {
  return axios({
    method: 'post',
    url: `${ORDER_URL}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data,
  }).catch((e) => {
    return Promise.reject(e.response.data);
  });
};

export const getSellerOrders = (
  data: GetSellerOrdersMeta & {
    page?: string;
  },
  token: string
) => {
  return axios({
    method: 'get',
    url: `${ORDER_URL}/get-seller-orders-new?status=${
      data.status || ''
    }&limit=${data.limit || ''}&page=${data.page || ''}&term=${
      data.term || ''
    }&dateFrom=${data.dateFrom || ''}&dateTo=${data.dateTo || ''}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const confirmWeight = (data: ConfirmWeightMeta, token: string) => {
  return axios({
    method: 'post',
    url: `${ORDER_URL}/confirm-weight/${data.orderId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: omit(['orderId'], data),
  });
};

export const placeOrder = (data: PlaceOrderMeta, token: string) => {
  return axios({
    method: 'post',
    url: `${ORDER_URL}/place-order/${data.orderId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: omit(['orderId'], data),
  });
};

export const getBuyerOrders = (
  data: GetSellerOrdersMeta & {
    page?: string;
  },
  token: string
) => {
  //ADD 1 day to the end Date
  const modifiedEndDate = moment(data.dateTo)
    .add(1, 'days')
    .format('M/DD/yyyy');
  return axios({
    method: 'get',
    url: `${ORDER_URL}/get-buyer-orders-new?status=${data.status || ''}&limit=${
      data.limit || ''
    }&page=${data.page || ''}&term=${data.term || ''}&dateFrom=${
      data.dateFrom || ''
    }&dateTo=${modifiedEndDate || ''}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const sendMessage = (data: SendMessageMeta, token: string) => {
  return axios({
    method: 'post',
    url: `${ORDER_URL}/aquafuture-messages/${data.buyerId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: omit(['buyerId'], data),
  });
};

export const sendDispute = (data: SendDisputeMeta, token: string) => {
  return axios({
    method: 'post',
    url: `${ORDER_URL}/dispute-messages/${data.orderId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: omit(['orderId'], data),
  });
};

export const getAllSellerOrders = (
  data: GetAllSellerOrdersMeta,
  token: string
) => {
  return axios({
    method: 'get',
    url: `${ORDER_URL_V2}/all/seller?status=${data.status || ''}&limit=${
      data.limit || ''
    }&page=${data.page || ''}&term=${data.term}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
