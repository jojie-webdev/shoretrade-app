import axios from 'axios';
import { API } from 'consts';
import { CreateMarketOfferMeta } from 'types/store/CreateMarketOfferState';

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

export const createMarketOffer = (
  data: CreateMarketOfferMeta,
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
