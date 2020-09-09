import {
  UpdateFavouriteProductMeta,
  UpdateFavouriteProductPayload,
} from 'types/store/UpdateFavouriteProductState';
import { createAsyncAction } from 'utils/Redux';

const ns = 'UPDATE_FAVOURITE_PRODUCT';
const asyncAction = createAsyncAction<
  UpdateFavouriteProductMeta,
  UpdateFavouriteProductPayload
>(ns);

const updateFavouriteProductActions = {
  ...asyncAction,
};

export default updateFavouriteProductActions;
