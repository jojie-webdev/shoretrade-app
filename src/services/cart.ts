import axios from 'axios';
import { API } from 'consts';
import { AddCartItemMeta } from 'types/store/AddCartItemState';
import { AddCartNegotiatedItemMeta } from 'types/store/AddCartNegotiatedItemState';
import { GetCartMeta } from 'types/store/GetCartState';
import { RemoveCartItemMeta } from 'types/store/RemoveCartItemState';

const BASE_URL = `${API.URL}/${API.VERSION_NEXT}`;
const CART_URL = `${BASE_URL}/cart`;
const CART_NEGOTIATED_URL = `${BASE_URL}/negotiations`;
const CART_ITEM_URL = `${CART_URL}/item`;
const CART_NEGOTIATED_ITEM_URL = (negotiationId: string) =>
  `${CART_NEGOTIATED_URL}/${negotiationId}/checkout`;

export const getCart = (data: GetCartMeta, token: string) => {
  return axios({
    method: 'get',
    url: `${CART_URL}/${data.employeeId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const addCartItem = (data: AddCartItemMeta, token: string) => {
  return axios({
    method: 'post',
    url: `${CART_ITEM_URL}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data,
  });
};

export const addCartNegotiatedItem = (
  data: AddCartNegotiatedItemMeta,
  token: string
) => {
  const payload = {
    boxes: data.boxes,
    employeeId: data.employeeId,
  };

  return axios({
    method: 'post',
    url: `${CART_NEGOTIATED_ITEM_URL(data.negotiationId)}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: payload,
  });
};

export const removeCartItem = (data: RemoveCartItemMeta, token: string) => {
  return axios({
    method: 'delete',
    url: `${CART_ITEM_URL}/`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data,
  });
};

export const extendCartExpiry = (
  data: {
    employeeId: string;
    cartId: string;
  },
  token: string
) => {
  return axios({
    method: 'post',
    url: `${CART_URL}/extend-expiry`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data,
  });
};

export const closeCart = (
  data: {
    employeeId: string;
    cartId: string;
    changeAddress?: boolean;
  },
  token: string
) => {
  return axios({
    method: 'post',
    url: `${CART_URL}/close`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data,
  });
};
