import axios from 'axios';
import { API } from 'consts';

const BASE_URL = `${API.URL}/${API.VERSION_NEXT}`;
const LICENSE_URL = `${BASE_URL}/license`;

export const getStates = () => {
  return axios({
    method: 'get',
    url: `${LICENSE_URL}/states`,
  });
};
