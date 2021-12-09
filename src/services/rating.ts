import axios from 'axios';
import { API } from 'consts';
import omit from 'ramda/es/omit';
import { SendOrderRatingMeta } from 'types/store/SendOrderRatingState';

const RATING_URL_V1 = `${API.URL}/${API.VERSION}/rating`;

export const sendOrderRating = (data: SendOrderRatingMeta, token: string) => {
  return axios({
    method: 'post',
    url: `${RATING_URL_V1}/add/${data.orderId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: omit(['orderId'], data),
  }).catch((e) => {
    return Promise.reject(e.response.data);
  });
};
