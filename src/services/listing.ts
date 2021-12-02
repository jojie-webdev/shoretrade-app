import axios from 'axios';
import { API } from 'consts';
import qs from 'qs';
import omit from 'ramda/es/omit';
import { CreateBulkListingRequestData } from 'types/store/CreateBulkListingState';
import { CreateCustomListingRequestData } from 'types/store/CreateCustomListingState';
import { CreateListingRequestData } from 'types/store/CreateListingState';
import { EndListingMeta } from 'types/store/EndListingState';
import { GetAllBuyerListingRequestOption } from 'types/store/GetAllBuyerListingsState';
import { GetBuyerSearchFilterDataMeta } from 'types/store/GetBuyerSearchFilterDataState';
import { GetHistoricalListingsMeta } from 'types/store/GetHistoricalListingsState';
import { GetListingBoxesMeta } from 'types/store/GetListingBoxesState';
import { GetListingFormDataMeta } from 'types/store/GetListingFormDataState';
import { GetListingsByTypeRequestData } from 'types/store/GetListingsByTypeState';
import { GetListingMeta } from 'types/store/GetListingState';
import { GetListingTypesByCategoryRequestData } from 'types/store/GetListingTypesByCategoryState';
import { GetMarketEstimateMeta } from 'types/store/GetMarketEstimateState';
import { GetShippingQuoteRequestData } from 'types/store/GetShippingQuoteState';
import { UpdateListingRequestData } from 'types/store/UpdateListingState';
import { UploadBulkMeta } from 'types/store/UploadBulkState';
import { GetListingsBySalesChannelMeta } from 'types/store/GetListingsBySalesChannelState';
import { GetListingByIdMeta } from 'types/store/GetListingByIdState';

const BASE_URL = `${API.URL}/${API.VERSION}`;
const ENDPOINT = 'listing';
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

export const getAllBuyerListings = (
  token: string,
  requestOptions?: Partial<GetAllBuyerListingRequestOption>
) => {
  let page = `&page=${requestOptions?.page || 1}`;
  let limit = `&limit=${requestOptions?.limit || 10}`;
  const sortOrder = requestOptions?.sortOrder || 'ASC';
  const csvEnpoint = requestOptions?.csv ? 'csv/' : '';
  let ids = requestOptions?.ids?.map((id) => `&id=${id}`)?.join('') || '';
  let exceptId =
    requestOptions?.exceptId?.map((id) => `&exceptId=${id}`)?.join('') || '';

  if (requestOptions?.ids?.length === 1) ids += '&id=';
  if (requestOptions?.exceptId?.length === 1) exceptId += '&exceptId=';

  if (requestOptions?.all) {
    page = '';
    limit = '';
  }

  let url = `${API.URL}/${API.VERSION_NEXT}/${ENDPOINT}/${csvEnpoint}all?sortOrder=${sortOrder}${page}${limit}${ids}${exceptId}`;
  if (requestOptions?.sortBy) url += `&sortBy=${requestOptions.sortBy}`;
  if (requestOptions?.term) url += `&term=${requestOptions.term}`;

  return axios({
    method: 'get',
    url,
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

export const getInactiveTypesByCategory = (id: string) => {
  return axios({
    method: 'get',
    url: `${LISTING_URL}/types-by-category/${id}?inactive=true`,
  });
};

export const uploadBulkListingCSV = (data: UploadBulkMeta, token: string) => {
  return axios({
    method: 'post',
    url: `${LISTING_URL}/bulk-upload`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data,
  });
};

export const createBulkListing = (
  data: CreateBulkListingRequestData[],
  token: string
) => {
  return axios({
    method: 'post',
    url: `${LISTING_URL}/bulk-create-listings`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data,
  });
};

export const getHistoricalListings = (
  data: GetHistoricalListingsMeta,
  token: string
) => {
  return axios({
    method: 'get',
    url: `${API.URL}/${API.VERSION_NEXT}/listing/historical?${qs.stringify(
      data
    )}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getListingsBySalesChannel = (
  data: GetListingsBySalesChannelMeta,
  token: string
) => {
  return axios({
    method: 'get',
    url: `${API.URL}/${API.VERSION_NEXT}/listing/sales-channel?${qs.stringify(
      data
    )}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export const getListingById = (
  data: GetListingByIdMeta,
  token: string
) => {
  return axios({
    method: 'get',
    url: `${API.URL}/${API.VERSION_NEXT}/listing/${data.listingId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
