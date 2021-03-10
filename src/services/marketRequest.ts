import axios from 'axios';
import { API } from 'consts';
import { CreateMarketOfferRequestData } from 'types/store/CreateMarketOfferState';
import { EditableMarketRequestPayload } from 'types/store/EditableMarketRequest';
import {
  AcceptOffer,
  NegotiateOfferMeta,
} from 'types/store/GetActiveOffersState';
import { ReadMarketNotificationMeta } from 'types/store/ReadMarketNotificationState';

const BASE_URL = `${API.URL}/${API.VERSION}`;
const MARKET_REQUEST_URL = `${BASE_URL}/market-request`;

export const getAllMarketRequest = (token: string, queryString?: string) => {
  return axios({
    method: 'get',
    url: `${MARKET_REQUEST_URL}?${queryString}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getActiveOffers = (token: string, queryString?: string) => {
  return axios({
    method: 'get',
    url: `${MARKET_REQUEST_URL}/offers?${queryString}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createMarketRequest = (
  data: EditableMarketRequestPayload,
  token: string
) => {
  return axios({
    method: 'post',
    url: `${MARKET_REQUEST_URL}/create`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data,
  });
};

export const createMarketOffer = (
  data: CreateMarketOfferRequestData,
  token: string
) => {
  return axios({
    method: 'post',
    url: `${MARKET_REQUEST_URL}/offer`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data,
  });
};

export const getMarketNotification = (token: string) => {
  return axios({
    method: 'get',
    url: `${MARKET_REQUEST_URL}/notification`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const readMarketNotification = (
  data: ReadMarketNotificationMeta,
  token: string
) => {
  return axios({
    method: 'post',
    url: `${MARKET_REQUEST_URL}/notification/read`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data,
  });
};

export const negotiateOffer = (data: NegotiateOfferMeta, token: string) => {
  return axios({
    method: 'post',
    url: `${MARKET_REQUEST_URL}/negotiate`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data,
  });
};

export const acceptOffer = (data: AcceptOffer, token: string) => {
  return axios({
    method: 'post',
    url: `${MARKET_REQUEST_URL}/accept-offer`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data,
  });
};
