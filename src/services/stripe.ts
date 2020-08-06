import axios from 'axios';
import { STRIPE_PUBLIC_KEY } from 'consts';
import qs from 'qs';
import { createBasicToken } from 'utils/Token';

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
      Authorization: createBasicToken({
        email: STRIPE_PUBLIC_KEY,
        password: '',
      }),
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: qs.stringify({
      card,
    }),
  });
};
