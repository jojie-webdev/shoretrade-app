import {
  UpdateFavoriteSellerMeta,
  UpdateFavoriteSellerPayload,
} from 'types/store/UpdateFavoriteSellerState';
import { createAsyncAction } from 'utils/Redux';

const ns = 'UPDATE_FAVOURITE_SELLER';
const asyncAction = createAsyncAction<
  UpdateFavoriteSellerMeta,
  UpdateFavoriteSellerPayload
>(ns);

const updateFavoriteSellerActions = {
  ...asyncAction,
};

export default updateFavoriteSellerActions;
