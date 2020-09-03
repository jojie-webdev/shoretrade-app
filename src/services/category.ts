import axios from 'axios';
import { API } from 'consts';

const BASE_URL = `${API.URL}/${API.VERSION}`;
const ENDPOINT_URL = `${BASE_URL}/category`;

export const getAllCategory = () => {
  return axios({
    method: 'get',
    url: `${ENDPOINT_URL}/all`,
  });
};
