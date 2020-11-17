import {
  UpdateFavoriteSellerMeta,
  UpdateFavoriteSellerPayload,
} from 'types/store/UpdateFavoriteSellerState';
import { createAsyncReducer } from 'utils/Redux';

import { updateFavoriteSellerActions } from '../actions';

export default createAsyncReducer<
  UpdateFavoriteSellerMeta,
  UpdateFavoriteSellerPayload
>(updateFavoriteSellerActions);
