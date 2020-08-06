import axios from 'axios';
import { API } from 'consts';
import { SearchAndCountProductTypeMeta } from 'types/store/SearchAndCountProductTypeState';
import { SearchProductTypeMeta } from 'types/store/SearchProductTypeState';

const BASE_URL = `${API.URL}/${API.VERSION}`;
const TYPE_URL = `${BASE_URL}/type`;

export const searchProductType = (
  data: SearchProductTypeMeta,
  token: string
) => {
  return axios({
    method: 'get',
    url: `${TYPE_URL}/find?term=${data.term}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const searchAndCountProductType = (
  data: SearchAndCountProductTypeMeta,
  token: string
) => {
  return axios({
    method: 'get',
    url: `${TYPE_URL}/find-and-count?term=${data.term}&address=${data.address}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
