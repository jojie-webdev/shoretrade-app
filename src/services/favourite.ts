import axios from 'axios';
import { API } from 'consts';
import { UpdateFavoriteSellerMeta } from 'types/store/UpdateFavoriteSellerState';
import { UpdateFavouriteProductMeta } from 'types/store/UpdateFavouriteProductState';

const BASE_URL = `${API.URL}/${API.VERSION}`;
const FAVOURITE_URL = `${BASE_URL}/favourite`;

export const updateFavouriteProduct = (
  data: UpdateFavouriteProductMeta,
  token: string
) => {
  return axios({
    method: 'post',
    url: `${FAVOURITE_URL}/product/${data.listingId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      favourite: data.favourite,
    },
  });
};

export const updateFavouriteSeller = (
  data: UpdateFavoriteSellerMeta,
  token: string
) => {
  return axios({
    method: 'post',
    url: `${FAVOURITE_URL}/seller/${data.sellerId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      favourite: data.favorite,
    },
  });
};
