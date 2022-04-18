import axios from 'axios';
import { API } from 'consts';
import { AddCartItemMeta } from 'types/store/AddCartItemState';
import { GetCartMeta } from 'types/store/GetCartState';
import { RemoveCartItemMeta } from 'types/store/RemoveCartItemState';

const BASE_URL = `${API.URL}/${API.VERSION_NEXT}`;
const CART_URL = `${BASE_URL}/cart`;
const CART_ITEM_URL = `${CART_URL}/item`;

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
