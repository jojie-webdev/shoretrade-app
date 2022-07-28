import axios from 'axios';
import { API } from 'consts';
import { AddCartItemMeta } from 'types/store/AddCartItemState';
import { GetCartMeta } from 'types/store/GetCartState';
import { RemoveCartItemMeta } from 'types/store/RemoveCartItemState';

const BASE_URL = `${API.URL}/${API.VERSION_NEXT}`;
const AAS_URL = `${BASE_URL}/aas`;

export const syncAASBalance = (companyId: string) => {
  return axios({
    method: 'get',
    url: `${AAS_URL}/sync-balance?companyId=${companyId}`,
  });
};
