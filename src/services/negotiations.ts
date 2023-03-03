import axios from 'axios';
import { API } from 'consts';
import { omit } from 'ramda';
import { AcceptNegotiationMeta } from 'types/store/AcceptNegotiationState';
import { CreateBuyerCounterNegotiationMeta } from 'types/store/CreateBuyerCounterNegotiationState';
import { CreateSellerCounterOfferMeta } from 'types/store/CreateSellerCounterOfferState';
import { DeclineNegotiationMeta } from 'types/store/DeclineNegotiationState';
import { GetNegotiationByIdMeta } from 'types/store/GetNegotiationByIdState';

const BASE_URL_V2 = `${API.URL}/${API.VERSION_NEXT}`;
const Negotiation_URL_V2 = `${BASE_URL_V2}/negotiations`;

export const getAllNegotiations = (token: string) => {
  return axios({
    method: 'get',
    url: Negotiation_URL_V2,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getNegotiationById = (
  negotiation: GetNegotiationByIdMeta,
  token: string
) => {
  const url = `${Negotiation_URL_V2}/${negotiation.negotiationRequestId}`;

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
  const url = `${Negotiation_URL_V2}/${negotiation.negotiationRequestId}/counterOffer`;

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
  const url = `${Negotiation_URL_V2}/`;

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
  const url = `${Negotiation_URL_V2}/${negotiation.negotiationRequestId}/accept`;

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
  const url = `${Negotiation_URL_V2}/${negotiation.negotiationRequestId}/decline`;

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
