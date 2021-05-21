import axios from 'axios';
import { API } from 'consts';
import { CreateMarketOfferRequestData } from 'types/store/CreateMarketOfferState';
import { DeleteMarketRequestMeta } from 'types/store/DeleteMarketRequestState';
import { EditableMarketRequestPayload } from 'types/store/EditableMarketRequest';
import { NegotiateOfferMeta } from 'types/store/GetActiveOffersState';
import { GetAllMarketRequestFiltersMeta } from 'types/store/GetAllMarketRequestFiltersState';
import { GetMarketRequestBuyerFiltersMeta } from 'types/store/GetMarketRequestBuyerFiltersState';
import { AcceptOffer } from 'types/store/MarketOfferState';
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

export const getAllMarketRequestFilters = (
  data: GetAllMarketRequestFiltersMeta,
  token: string
) => {
  return axios({
    method: 'get',
    url: `${MARKET_REQUEST_URL}/get-seller-search-filter-data/${data.companyId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getMarketRequestBuyerFilters = (
  data: GetMarketRequestBuyerFiltersMeta,
  token: string
) => {
  return axios({
    method: 'get',
    url: `${MARKET_REQUEST_URL}/offers/get-buyer-search-filter-data/${data.buyerId}`,
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

export const deleteRequest = (data: DeleteMarketRequestMeta, token: string) => {
  return axios({
    method: 'get',
    url: `${MARKET_REQUEST_URL}/delete/${data.id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
