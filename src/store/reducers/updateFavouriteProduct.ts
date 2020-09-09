import {
  UpdateFavouriteProductMeta,
  UpdateFavouriteProductPayload,
} from 'types/store/UpdateFavouriteProductState';
import { createAsyncReducer } from 'utils/Redux';

import { updateFavouriteProductActions } from '../actions';

export default createAsyncReducer<
  UpdateFavouriteProductMeta,
  UpdateFavouriteProductPayload
>(updateFavouriteProductActions);
