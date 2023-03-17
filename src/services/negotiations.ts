import axios from 'axios';
import { API } from 'consts';
import queryString from 'query-string';
import { omit } from 'ramda';
import { AcceptNegotiationMeta } from 'types/store/AcceptNegotiationState';
import { CreateBuyerCounterNegotiationMeta } from 'types/store/CreateBuyerCounterNegotiationState';
import { CreateSellerCounterOfferMeta } from 'types/store/CreateSellerCounterOfferState';
import { DeclineNegotiationMeta } from 'types/store/DeclineNegotiationState';
import { GetAllNegotiationsMeta } from 'types/store/GetAllNegotiationsState';
import { GetNegotiationByIdMeta } from 'types/store/GetNegotiationByIdState';

const BASE_URL_V2 = `${API.URL}/${API.VERSION_NEXT}`;
const NEGOTIATION_URL_V2 = `${BASE_URL_V2}/negotiations`;

export const getAllNegotiations = (
  negotiations: GetAllNegotiationsMeta,
  token: string
) => {
  const query = queryString.stringify(negotiations);
  console.log('getAllNegotiations > query > ', query);

  return axios({
    method: 'get',
    url: `${NEGOTIATION_URL_V2}?${query}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getNegotiationById = (
  negotiation: GetNegotiationByIdMeta,
  token: string
) => {
  const url = `${NEGOTIATION_URL_V2}/${negotiation.negotiationRequestId}`;

  return axios({
    method: 'get',
    url,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createSellerCounterOffer = (
  negotiation: CreateSellerCounterOfferMeta,
  token: string
) => {
  const url = `${NEGOTIATION_URL_V2}/${negotiation.negotiationRequestId}/counterOffer`;

  const modifiedNegotiation = omit(['negotiationRequestId'], negotiation);

  return axios({
    method: 'post',
    url,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: modifiedNegotiation,
  });
};

export const createBuyerCounterNegotiation = (
  negotiation: CreateBuyerCounterNegotiationMeta,
  token: string
) => {
  const url = `${NEGOTIATION_URL_V2}/`;

  return axios({
    method: 'post',
    url,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: negotiation,
  });
};

export const acceptNegotiation = (
  negotiation: AcceptNegotiationMeta,
  token: string
) => {
  const url = `${NEGOTIATION_URL_V2}/${negotiation.negotiationRequestId}/accept`;

  const modifiedNegotiation = omit(['negotiationRequestId'], negotiation);

  return axios({
    method: 'post',
    url,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: modifiedNegotiation,
  });
};

export const declineNegotiation = (
  negotiation: DeclineNegotiationMeta,
  token: string
) => {
  const url = `${NEGOTIATION_URL_V2}/${negotiation.negotiationRequestId}/decline`;

  const modifiedNegotiation = omit(['negotiationRequestId'], negotiation);

  return axios({
    method: 'post',
    url,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: modifiedNegotiation,
  });
};
