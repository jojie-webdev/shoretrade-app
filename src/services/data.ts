import axios from 'axios';
import { API } from 'consts';
import qs from 'qs';
import { GetSellerDashboardSalesMeta } from 'types/store/GetSellerDashboardSalesState';
import { GetSellerDashboardTopCategoriesMeta } from 'types/store/GetSellerDashboardTopCategoriesState';

const BASE_URL = `${API.URL}/${API.VERSION_NEXT}`;
const DATA_URL = `${BASE_URL}/data`;

export const getSellerDashboardSales = (
  data: GetSellerDashboardSalesMeta,
  token: string
) => {
  return axios({
    method: 'get',
    url: `${DATA_URL}/seller/sales?${qs.stringify(data)}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getSellerDashboardTopCategories = (
  data: GetSellerDashboardTopCategoriesMeta,
  token: string
) => {
  return axios({
    method: 'get',
    url: `${DATA_URL}/seller/top-categories?${qs.stringify(data)}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
