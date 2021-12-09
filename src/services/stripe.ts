import axios from 'axios';
import { STRIPE_PUBLIC_KEY } from 'consts';
import qs from 'qs';

const BASE_URL = `https://api.stripe.com/v1/tokens`;

export const createCardToken = (card: {
  number: number;
  exp_month: string;
  exp_year: string;
  cvc: number;
  name: string;
}) => {
  return axios({
    method: 'post',
    url: BASE_URL,
    headers: {
      Authorization: `Bearer ${STRIPE_PUBLIC_KEY}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: qs.stringify({
      card,
    }),
  }).catch((e) => {
    return Promise.reject(e.response.data.error);
  });
};
