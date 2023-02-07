import axios from 'axios';
import { API } from 'consts';

const BASE_URL = `${API.URL}/${API.VERSION}`;
const v2_BASE_URL = `${API.URL}/${API.VERSION_NEXT}`;
const MARKET_REQUEST_URL = `${BASE_URL}/negotiations`;
const V2_MARKET_REQUEST_URL = `${v2_BASE_URL}/VERSION_NEXT`;

export const getAllNegotiations = (token: string) => {
  return axios({
    method: 'get',
    url: V2_MARKET_REQUEST_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
