import axios from 'axios';
import { API } from 'consts';

const BASE_URL = `${API.URL}/${API.VERSION}`;
const CATEGORY_URL = `${BASE_URL}/category`;

export const getAvailableCategories = (term?: string) => {
  return axios({
    method: 'get',
    url: `${CATEGORY_URL}/all?inactive=true${term ? `&term=${term}` : ''}`,
  });
};
