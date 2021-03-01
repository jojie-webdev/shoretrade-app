import axios from 'axios';
import { API } from 'consts';

const BASE_URL = `${API.URL}/${API.VERSION}`;
const CATEGORY_URL = `${BASE_URL}/category`;

export const getAllCategory = () => {
  return axios({
    method: 'get',
    url: `${CATEGORY_URL}/all`,
  });
};

export const getAvailableCategories = () => {
  return axios({
    method: 'get',
    url: `${CATEGORY_URL}/all?inactive=true`,
  });
};
