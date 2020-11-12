import axios from 'axios';
import { API } from 'consts';
import qs from 'qs';
import omit from 'ramda/es/omit';
import { CreateCustomListingRequestData } from 'types/store/CreateCustomListingState';
import { CreateListingRequestData } from 'types/store/CreateListingState';
import { EndListingMeta } from 'types/store/EndListingState';
import { GetBuyerSearchFilterDataMeta } from 'types/store/GetBuyerSearchFilterDataState';
import { GetListingBoxesMeta } from 'types/store/GetListingBoxesState';
import { GetListingFormDataMeta } from 'types/store/GetListingFormDataState';
import { GetListingsByTypeRequestData } from 'types/store/GetListingsByTypeState';
import { GetListingMeta } from 'types/store/GetListingState';
import { GetListingTypesByCategoryRequestData } from 'types/store/GetListingTypesByCategoryState';
import { GetMarketEstimateMeta } from 'types/store/GetMarketEstimateState';
import {
  GetShippingQuoteMeta,
  GetShippingQuoteRequestData,
} from 'types/store/GetShippingQuoteState';
import { UpdateFavouriteProductMeta } from 'types/store/UpdateFavouriteProductState';
import { UpdateListingRequestData } from 'types/store/UpdateListingState';

const BASE_URL = `${API.URL}/${API.VERSION}`;
const LISTING_URL = `${BASE_URL}/listing`;

export const getAllListings = (token: string) => {
  return axios({
    method: 'get',
    url: `${LISTING_URL}/get-all-listings`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const endListing = (data: EndListingMeta, token: string) => {
  return axios({
    method: 'post',
    url: `${LISTING_URL}/end/${data.listingId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      companyId: data.companyId,
    },
  });
};

export const getListingFormData = (
  data: GetListingFormDataMeta,
  token: string
) => {
  return axios({
    method: 'get',
    url: `${LISTING_URL}/form-data/${data.typeId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createListing = (
  data: CreateListingRequestData,
  token: string
) => {
  return axios({
    method: 'post',
    url: `${LISTING_URL}/create`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data,
  });
};

export const updateListing = (
  data: UpdateListingRequestData,
  token: string
) => {
  return axios({
    method: 'post',
    url: `${LISTING_URL}/update/${data.listingId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: omit(['listingId'], data),
  });
};

export const getCustomFormData = (token: string) => {
  return axios({
    method: 'get',
    url: `${LISTING_URL}/get-custom-form-data`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createCustomListing = (
  data: CreateCustomListingRequestData,
  token: string
) => {
  return axios({
    method: 'post',
    url: `${LISTING_URL}/create-custom`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data,
  });
};

export const getListingTypesByCategory = (
  data: GetListingTypesByCategoryRequestData,
  token: string
) => {
  return axios({
    method: 'get',
    url: `${LISTING_URL}/types-by-category/${data.categoryId}?address=${data.addressId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getBuyerSearchFilterData = (
  data: GetBuyerSearchFilterDataMeta,
  token: string
) => {
  return axios({
    method: 'get',
    url: `${LISTING_URL}/get-buyer-search-filter-data/${data.typeId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getListingsByType = (
  data: GetListingsByTypeRequestData,
  filterData: {
    catchmentArea?: string;
    sizeRangeFrom?: number | string;
    sizeRangeTo?: number | string;
    specifications?: string;
    showUngraded?: boolean;
  },
  token: string
) => {
  const params = {
    address: data.addressId,
    ...filterData,
  };

  return axios({
    method: 'get',
    url: `${LISTING_URL}/find/${data.typeId}?${qs.stringify(params)}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getListing = (data: GetListingMeta, token: string) => {
  return axios({
    method: 'get',
    url: `${LISTING_URL}/get/${data.listingId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getListingBoxes = (data: GetListingBoxesMeta, token: string) => {
  return axios({
    method: 'get',
    url: `${LISTING_URL}/find-boxes/${data.listingId}?weight=${data.weight}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getShippingQuote = (
  data: GetShippingQuoteRequestData,
  token: string
) => {
  return axios({
    method: 'post',
    url: `${LISTING_URL}/shipping/get-quote`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    timeout: 10000,
    data,
  });
};

export const getMarketEstimate = (
  data: GetMarketEstimateMeta,
  token: string
) => {
  return axios({
    method: 'get',
    url: `${LISTING_URL}/market-estimate/${data.typeId}?${qs.stringify(data)}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
