import axios from 'axios';
import { API } from 'consts';

const BASE_URL = `${API.URL}/${API.VERSION_NEXT}`;
const SYSTEM_URL = `${BASE_URL}/system`;

export const getServerHealth = () => {
  return axios({
    method: 'get',
    url: `${SYSTEM_URL}/health`,
  });
};

export const sendReport = (error: string) => {
  return axios({
    method: 'post',
    url: `${SYSTEM_URL}/send-report`,
    data: {
      error,
      env: process.env.REACT_APP_ENV,
      platform: 'WEB',
    },
  });
};
