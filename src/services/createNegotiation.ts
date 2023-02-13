import axios from 'axios';
import { API } from 'consts';
import { omit } from 'ramda';
import { CreateNegotiationMeta } from 'types/store/CreateNegotiationState';

const BASE_URL = `${API.URL}/v2`;
const LISTING_URL = `${BASE_URL}/listing`;

export const createNegotiation = (
  data: CreateNegotiationMeta,
  token: string
) => {
  const modifiedData = omit(['listingId'], data);

  return axios({
    method: 'post',
    url: `${LISTING_URL}/${data.listingId}/negotiations`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: modifiedData,
  });
};
