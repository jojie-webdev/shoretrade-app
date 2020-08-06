import axios from 'axios';
import { API } from 'consts';
import qs from 'qs';
import omit from 'ramda/es/omit';
import { AddAddressMeta } from 'types/store/AddAddressState';
import { AddLinkedAccountMeta } from 'types/store/AddLinkedAccountState';
import { DeleteLinkedAccountMeta } from 'types/store/DeleteLinkedAccountState';
import { GetAddressesMeta } from 'types/store/GetAddressesState';
import { GetBankDetailsMeta } from 'types/store/GetBankDetailsState';
import { GetBuyerHomepageRequestData } from 'types/store/GetBuyerHomepageState';
import { GetCoopUsersRequest } from 'types/store/GetCoopUsersState';
import { GetSellerByIdMeta } from 'types/store/GetSellerByIdState';
import { GetTransactionHistoryMeta } from 'types/store/GetTransactionHistoryState';
import { UpdateAddressMeta } from 'types/store/UpdateAddressState';

const BASE_URL = `${API.URL}/${API.VERSION}`;
const COMPANY_URL = `${BASE_URL}/company`;

export const getCoopUsers = (data: GetCoopUsersRequest, token: string) => {
  return axios({
    method: 'get',
    url: `${COMPANY_URL}/get-coop-users/${data.userId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getAddresses = (data: GetAddressesMeta, token: string) => {
  return axios({
    method: 'get',
    url: `${COMPANY_URL}/get-addresses/${data.companyId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const addAddress = (data: AddAddressMeta, token: string) => {
  return axios({
    method: 'post',
    url: `${COMPANY_URL}/add-address/${data.companyId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: omit(['companyId'], data),
  });
};

export const updateAddress = (data: UpdateAddressMeta, token: string) => {
  return axios({
    method: 'post',
    url: `${COMPANY_URL}/update-address/${data.addressId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: omit(['addressId'], data),
  });
};

export const getLinkedAccounts = (data: GetAddressesMeta, token: string) => {
  return axios({
    method: 'get',
    url: `${COMPANY_URL}/get-linked-accounts/${data.companyId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const addLinkedAccount = (data: AddLinkedAccountMeta, token: string) => {
  return axios({
    method: 'post',
    url: `${COMPANY_URL}/add-linked-account/${data.companyId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: omit(['companyId'], data),
  });
};

export const deleteLinkedAccount = (
  data: DeleteLinkedAccountMeta,
  token: string
) => {
  return axios({
    method: 'post',
    url: `${COMPANY_URL}/delete-linked-account/${data.companyId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data,
  });
};

export const getBankDetails = (data: GetBankDetailsMeta, token: string) => {
  return axios({
    method: 'get',
    url: `${COMPANY_URL}/bank-details/${data.companyId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

type GetSellerDashboardRequest = {
  dateFrom: string;
  dateTo: string;
};

export const getSellerDashboard = (
  data: GetSellerDashboardRequest,
  token: string
) => {
  return axios({
    method: 'get',
    url: `${COMPANY_URL}/seller-dashboard?dateFrom=${data.dateFrom}&dateTo=${data.dateTo}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

type GetSellerGraphDashboardRequest = {
  dateFrom: string;
  dateTo: string;
};

export const getSellerGraphDashboard = (
  data: GetSellerGraphDashboardRequest,
  token: string
) => {
  return axios({
    method: 'get',
    url: `${COMPANY_URL}/seller-graph-dashboard?dateFrom=${data.dateFrom}&dateTo=${data.dateTo}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

type GetSellerTypeDashboardRequest = {
  dateFrom: string;
  dateTo: string;
  categoryId: string;
};

export const getSellerTypeDashboard = (
  data: GetSellerTypeDashboardRequest,
  token: string
) => {
  return axios({
    method: 'get',
    url: `${COMPANY_URL}/seller-type-dashboard/${data.categoryId}?dateFrom=${data.dateFrom}&dateTo=${data.dateTo}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getSellerMarketPricesSearch = (search: string, token: string) => {
  return axios({
    method: 'get',
    url: search
      ? `${COMPANY_URL}/seller-market-price-search?search=${search}`
      : `${COMPANY_URL}/seller-market-price-search`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

type GetSellerMarketPriceRequest = {
  typeId: string;
  sizeFrom?: string;
  sizeTo?: string;
  region?: string;
  stateIds?: string[];
};

export const getSellerMarketPrice = (
  { typeId, ...data }: GetSellerMarketPriceRequest,
  token: string
) => {
  return axios({
    method: 'get',
    url: `${COMPANY_URL}/seller-market-price/${typeId}?${qs.stringify(data)}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getBuyerHomepage = (
  { addressId }: GetBuyerHomepageRequestData,
  token: string
) => {
  return axios({
    method: 'get',
    url: `${COMPANY_URL}/buyer-homepage?address=${addressId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getSellerByCompanyId = (
  data: GetSellerByIdMeta,
  token: string
) => {
  return axios({
    method: 'get',
    url: `${COMPANY_URL}/get-seller/${data.sellerId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getTransactionHistory = (
  data: GetTransactionHistoryMeta,
  token: string
) => {
  return axios({
    method: 'get',
    url: `${COMPANY_URL}/transaction-history/${data.companyId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
