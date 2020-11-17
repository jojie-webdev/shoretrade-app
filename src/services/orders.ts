import axios from 'axios';
import { API } from 'consts';
import omit from 'ramda/es/omit';
import { ConfirmWeightMeta } from 'types/store/ConfirmWeightState';
import { GetSellerOrdersMeta } from 'types/store/GetSellerOrdersState';
import { OrderMeta } from 'types/store/OrderState';
import { PlaceOrderMeta } from 'types/store/PlaceOrderState';
import { SendMessageMeta } from 'types/store/SendMessageState';

const BASE_URL = `${API.URL}/${API.VERSION}`;
const ORDER_URL = `${BASE_URL}/order`;

export const order = (data: OrderMeta, token: string) => {
  return axios({
    method: 'post',
    url: `${ORDER_URL}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data,
  });
};

export const getSellerOrders = (data: GetSellerOrdersMeta, token: string) => {
  return axios({
    method: 'get',
    url: `${ORDER_URL}/get-seller-orders-new?status=${
      data.status || ''
    }&limit=${data.limit || ''}&page=${data.page || ''}&dateFrom=${
      data.dateFrom || ''
    }&dateTo=${data.dateTo || ''}`,
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

export const getBuyerOrders = (data: GetSellerOrdersMeta, token: string) => {
  return axios({
    method: 'get',
    url: `${ORDER_URL}/get-buyer-orders-new?status=${data.status || ''}&limit=${
      data.limit || ''
    }&page=${data.page || ''}&dateFrom=${data.dateFrom || ''}&dateTo=${
      data.dateTo || ''
    }`,
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
