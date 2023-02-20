import axios from 'axios';
import { API } from 'consts';
import { omit } from 'ramda';
import { CreateNegotiation_2Meta } from 'types/store/CreateNegotiation_2State';
import { GetNegotiationByIdMeta } from 'types/store/GetNegotiationByIdState';

const BASE_URL = `${API.URL}/${API.VERSION}`;
const v2_BASE_URL = `${API.URL}/${API.VERSION_NEXT}`;
const MARKET_REQUEST_URL = `${BASE_URL}/negotiations`;
const V2_MARKET_REQUEST_URL = `${v2_BASE_URL}/negotiations`;
const LISTING_URL = `${BASE_URL}/listing`;

export const getAllNegotiations = (token: string) => {
  return axios({
    method: 'get',
    url: V2_MARKET_REQUEST_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getNegotiationById = (
  negotiation: GetNegotiationByIdMeta,
  token: string
) => {
  const url = `${V2_MARKET_REQUEST_URL}/${negotiation.negotiationRequestId}`;

  return axios({
    method: 'get',
    url,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
