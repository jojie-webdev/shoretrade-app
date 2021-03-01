import axios from 'axios';
import { API } from 'consts';

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
