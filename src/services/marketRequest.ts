import axios from 'axios';
import { API } from 'consts';
import { CreateMarketOfferRequestData } from 'types/store/CreateMarketOfferState';
import { EditableMarketRequestPayload } from 'types/store/EditableMarketRequest';

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
