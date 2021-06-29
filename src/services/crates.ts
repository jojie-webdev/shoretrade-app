import axios from 'axios';
import { API } from 'consts';
import { GetCratesMeta } from 'types/store/GetCrates';

const BASE_URL = `${API.URL}/v2`;
const CRATES_URL = `${BASE_URL}/crate`;

export const getCrates = (data: GetCratesMeta, token: string) => {
  return axios({
    method: 'get',
    url: `${CRATES_URL}/summary/${data.companyId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getAvailableCrates = (data: GetCratesMeta, token: string) => {
  return axios({
    method: 'get',
    url: `${CRATES_URL}/available/${data.companyId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
